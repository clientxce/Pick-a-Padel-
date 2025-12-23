import { useCallback } from 'react';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  onSuccess: (response: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) => void;
  onFailure?: (error: any) => void;
}

export function useRazorpay() {
  const openRazorpay = useCallback((options: RazorpayOptions) => {
    if (typeof window === 'undefined') {
      console.error('Razorpay can only be used in browser');
      return;
    }

    if (!window.Razorpay) {
      toast.error('Payment system not loaded. Please refresh the page.');
      return;
    }

    const rzpOptions = {
      key: options.keyId,
      amount: options.amount,
      currency: options.currency,
      order_id: options.orderId,
      name: 'Pick A Padel',
      description: 'Court Booking Payment',
      image: '/logo.png',
      prefill: {
        email: options.userEmail || '',
        name: options.userName || '',
        contact: options.userPhone || '',
      },
      theme: {
        color: '#a6cf4a',
      },
      handler: function (response: any) {
        options.onSuccess({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: function () {
          toast.info('Payment cancelled');
          options.onFailure?.(new Error('Payment cancelled by user'));
        },
      },
    };

    const razorpay = new window.Razorpay(rzpOptions);
    
    razorpay.on('payment.failed', function (response: any) {
      toast.error('Payment failed: ' + response.error.description);
      options.onFailure?.(response.error);
    });

    razorpay.open();
  }, []);

  return { openRazorpay };
}

