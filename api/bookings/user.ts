import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../lib/prisma';
import { getUserFromRequest, requireAuth } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const user = await getUserFromRequest(req);
    requireAuth(user);

    const bookings = await prisma.booking.findMany({
      where: {
        userId: user.userId,
        status: { in: ['HOLD', 'CONFIRMED'] },
      },
      include: {
        court: {
          select: {
            id: true,
            name: true,
            type: true,
            location: true,
          },
        },
        payment: {
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      courtName: booking.court.name,
      courtType: booking.court.type,
      courtLocation: booking.court.location,
      date: booking.date,
      timeSlot: booking.timeSlot,
      duration: booking.duration,
      status: booking.status,
      amount: booking.amount,
      expiresAt: booking.expiresAt,
      confirmedAt: booking.confirmedAt,
      paymentStatus: booking.payment?.status,
      createdAt: booking.createdAt,
    }));

    return res.status(200).json({
      success: true,
      data: {
        bookings: formattedBookings,
      },
    });
  } catch (error) {
    console.error('Fetch user bookings failed:', error);

    if (error instanceof Error && error.message === 'Unauthorized') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch bookings',
    });
  }
}

