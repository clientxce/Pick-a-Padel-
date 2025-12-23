import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { createRazorpayOrder } from '../../lib/razorpay';
import { getUserFromRequest, requireAuth } from '../../lib/auth';
import { VALID_TIME_SLOTS } from '../../types/api';

const holdSchema = z.object({
  courtId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/),
  userEmail: z.string().email(),
  userName: z.string().optional(),
  userPhone: z.string().optional(),
  notes: z.string().optional(),
});

const HOLD_DURATION_MINUTES = parseInt(process.env.BOOKING_HOLD_DURATION_MINUTES || '10');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await getUserFromRequest(req);
    requireAuth(user);

    const validatedData = holdSchema.parse(req.body);
    const { courtId, date: dateString, timeSlot, userEmail, userName, userPhone, notes } = validatedData;

    if (!VALID_TIME_SLOTS.includes(timeSlot as any)) {
      return res.status(400).json({ 
        error: 'Invalid time slot',
        message: `Time slot must be one of: ${VALID_TIME_SLOTS.join(', ')}`
      });
    }

    const bookingDate = new Date(`${dateString}T${timeSlot}:00`);
    if (bookingDate < new Date()) {
      return res.status(400).json({
        error: 'Invalid date',
        message: 'Cannot book time slots in the past'
      });
    }

    const dateOnly = new Date(dateString);

    const result = await prisma.$transaction(async (tx) => {
      const court = await tx.court.findUnique({
        where: { id: courtId },
      });

      if (!court) {
        throw new Error('Court not found');
      }

      if (court.status !== 'ACTIVE') {
        throw new Error(`Court is currently ${court.status.toLowerCase()}`);
      }

      const existingBooking = await tx.booking.findFirst({
        where: {
          courtId,
          date: dateOnly,
          timeSlot,
          status: { in: ['HOLD', 'CONFIRMED'] },
        },
      });

      if (existingBooking) {
        throw new Error('SLOT_ALREADY_BOOKED');
      }

      const amountInPaise = court.pricePerHour;
      const razorpayOrder = await createRazorpayOrder({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `booking_${Date.now()}`,
        notes: {
          courtId: court.id,
          courtName: court.name,
          date: dateString,
          timeSlot,
          userId: user.userId,
        },
      });

      const payment = await tx.payment.create({
        data: {
          razorpayOrderId: razorpayOrder.id,
          amount: amountInPaise,
          currency: 'INR',
          status: 'CREATED',
          email: userEmail,
          phone: userPhone || null,
        },
      });

      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + HOLD_DURATION_MINUTES);

      const booking = await tx.booking.create({
        data: {
          courtId,
          userId: user.userId,
          userEmail,
          userName: userName || user.name || null,
          userPhone: userPhone || null,
          date: dateOnly,
          timeSlot,
          duration: 60,
          status: 'HOLD',
          amount: amountInPaise,
          paymentId: payment.id,
          notes: notes || null,
          expiresAt,
        },
        include: {
          court: {
            select: {
              id: true,
              name: true,
              type: true,
              pricePerHour: true,
            },
          },
        },
      });

      return { booking, payment, razorpayOrder };
    });

    return res.status(201).json({
      success: true,
      data: {
        bookingId: result.booking.id,
        orderId: result.razorpayOrder.id,
        amount: result.booking.amount,
        currency: 'INR',
        keyId: process.env.VITE_RAZORPAY_KEY_ID,
        expiresAt: result.booking.expiresAt,
        court: result.booking.court,
        booking: {
          id: result.booking.id,
          date: result.booking.date,
          timeSlot: result.booking.timeSlot,
          duration: result.booking.duration,
          status: result.booking.status,
        },
      },
    });
  } catch (error) {
    console.error('Booking hold creation failed:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request data',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    if (error instanceof Error) {
      if (error.message === 'SLOT_ALREADY_BOOKED') {
        return res.status(409).json({
          error: 'Slot already taken',
          message: 'This time slot has been booked. Please select another.',
          code: 'SLOT_UNAVAILABLE',
        });
      }

      if (error.message === 'Unauthorized') {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (error.message.includes('Court')) {
        return res.status(400).json({ error: error.message });
      }
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
}

