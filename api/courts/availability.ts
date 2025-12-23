import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../../lib/prisma';
import { VALID_TIME_SLOTS } from '../../types/api';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, courtId } = req.query;

    if (!date || typeof date !== 'string') {
      return res.status(400).json({
        error: 'Missing or invalid date parameter',
        message: 'Date must be in YYYY-MM-DD format',
      });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        error: 'Invalid date format',
        message: 'Date must be in YYYY-MM-DD format',
      });
    }

    const dateOnly = new Date(date);

    const courts = await prisma.court.findMany({
      where: {
        ...(courtId && typeof courtId === 'string' ? { id: courtId } : {}),
        status: 'ACTIVE',
      },
      select: {
        id: true,
        name: true,
        type: true,
        pricePerHour: true,
      },
    });

    if (courts.length === 0) {
      return res.status(404).json({
        error: 'No courts found',
        message: courtId ? 'Court not found or inactive' : 'No active courts available',
      });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        date: dateOnly,
        status: { in: ['HOLD', 'CONFIRMED'] },
      },
      select: {
        courtId: true,
        timeSlot: true,
      },
    });

    const courtsWithAvailability = courts.map(court => {
      const bookedSlots = bookings
        .filter(b => b.courtId === court.id)
        .map(b => b.timeSlot);

      const availableSlots = VALID_TIME_SLOTS.filter(
        slot => !bookedSlots.includes(slot)
      );

      return {
        courtId: court.id,
        courtName: court.name,
        type: court.type,
        pricePerHour: court.pricePerHour,
        availableSlots,
        bookedSlots,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        date,
        courts: courtsWithAvailability,
      },
    });
  } catch (error) {
    console.error('Availability check failed:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch availability',
    });
  }
}

