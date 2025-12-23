import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { verifyPaymentSignature } from '../../lib/razorpay';
import { getUserFromRequest, requireAuth } from '../../lib/auth';

const verifySchema = z.object({
  bookingId: z.string().min(1),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await getUserFromRequest(req);
    requireAuth(user);

    const validatedData = verifySchema.parse(req.body);
    const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = validatedData;

    const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValid) {
      return res.status(400).json({
        error: 'Invalid payment signature',
        message: 'Payment verification failed',
        code: 'INVALID_SIGNATURE',
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { id: bookingId },
        include: { payment: true },
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      if (booking.userId !== user.userId) {
        throw new Error('Unauthorized');
      }

      if (booking.status !== 'HOLD') {
        throw new Error(`Booking is ${booking.status}`);
      }

      if (booking.expiresAt && booking.expiresAt < new Date()) {
        throw new Error('Booking has expired');
      }

      const updatedPayment = await tx.payment.update({
        where: { id: booking.paymentId! },
        data: {
          razorpayPaymentId,
          razorpaySignature,
          status: 'PAID',
        },
      });

      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: 'CONFIRMED',
          confirmedAt: new Date(),
          expiresAt: null,
        },
      });

      return { booking: updatedBooking, payment: updatedPayment };
    });

    return res.status(200).json({
      success: true,
      data: {
        booking: {
          id: result.booking.id,
          status: result.booking.status,
          confirmedAt: result.booking.confirmedAt,
        },
        payment: {
          id: result.payment.id,
          status: result.payment.status,
        },
      },
    });
  } catch (error) {
    console.error('Payment verification failed:', error);

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
      if (error.message === 'Unauthorized') {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (error.message.includes('expired') || error.message.includes('Booking')) {
        return res.status(400).json({
          error: error.message,
          code: 'BOOKING_INVALID',
        });
      }
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
}

