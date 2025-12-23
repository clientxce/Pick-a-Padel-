import { BookingStatus, PaymentStatus, CourtType } from '@prisma/client';

export interface HoldBookingRequest {
  courtId: string;
  date: string;
  timeSlot: string;
  userEmail: string;
  userName?: string;
  userPhone?: string;
  notes?: string;
}

export interface VerifyPaymentRequest {
  bookingId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export interface HoldBookingResponse {
  success: true;
  data: {
    bookingId: string;
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
    expiresAt: Date;
    court: {
      id: string;
      name: string;
      type: CourtType;
      pricePerHour: number;
    };
    booking: {
      id: string;
      date: Date;
      timeSlot: string;
      duration: number;
      status: BookingStatus;
    };
  };
}

export interface VerifyPaymentResponse {
  success: true;
  data: {
    booking: {
      id: string;
      status: BookingStatus;
      confirmedAt: Date;
    };
    payment: {
      id: string;
      status: PaymentStatus;
    };
  };
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  code?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export const VALID_TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
] as const;

export type TimeSlot = typeof VALID_TIME_SLOTS[number];

