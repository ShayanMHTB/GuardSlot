// components/booking/PaymentForm.tsx
'use client';

import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { SelectedBooking, Provider } from '@/types/calendar';

interface PaymentFormProps {
  booking: SelectedBooking;
  customer: any;
  provider: Provider;
  onSuccess: () => void;
  onBack: () => void;
}

export function PaymentForm({
  booking,
  customer,
  provider,
  onSuccess,
  onBack,
}: PaymentFormProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    saveCard: false,
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required';
    } else if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!paymentData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    if (!paymentData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (paymentData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!paymentData.nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    setPaymentData((prev) => ({ ...prev, [field]: formattedValue }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePaymentForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      onSuccess();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div>
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-6">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Payment Details
              </CardTitle>
              <p className="text-muted-foreground text-center">
                Secure payment powered by Stripe
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card Number */}
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-sm font-medium">
                    Card Number *
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      type="text"
                      value={paymentData.cardNumber}
                      onChange={(e) =>
                        handleInputChange('cardNumber', e.target.value)
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`pl-10 ${
                        errors.cardNumber
                          ? 'border-destructive focus-visible:ring-destructive'
                          : ''
                      }`}
                    />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-sm text-destructive">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-sm font-medium">
                      Expiry Date *
                    </Label>
                    <Input
                      id="expiryDate"
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={(e) =>
                        handleInputChange('expiryDate', e.target.value)
                      }
                      placeholder="MM/YY"
                      maxLength={5}
                      className={
                        errors.expiryDate
                          ? 'border-destructive focus-visible:ring-destructive'
                          : ''
                      }
                    />
                    {errors.expiryDate && (
                      <p className="text-sm text-destructive">
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-sm font-medium">
                      CVV *
                    </Label>
                    <Input
                      id="cvv"
                      type="text"
                      value={paymentData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className={
                        errors.cvv
                          ? 'border-destructive focus-visible:ring-destructive'
                          : ''
                      }
                    />
                    {errors.cvv && (
                      <p className="text-sm text-destructive">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                {/* Name on Card */}
                <div className="space-y-2">
                  <Label htmlFor="nameOnCard" className="text-sm font-medium">
                    Name on Card *
                  </Label>
                  <Input
                    id="nameOnCard"
                    type="text"
                    value={paymentData.nameOnCard}
                    onChange={(e) =>
                      handleInputChange('nameOnCard', e.target.value)
                    }
                    placeholder="John Doe"
                    className={
                      errors.nameOnCard
                        ? 'border-destructive focus-visible:ring-destructive'
                        : ''
                    }
                  />
                  {errors.nameOnCard && (
                    <p className="text-sm text-destructive">
                      {errors.nameOnCard}
                    </p>
                  )}
                </div>

                {/* Security Badge */}
                <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    disabled={isProcessing}
                    className="sm:w-auto w-full"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Details
                  </Button>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="sm:flex-1 w-full"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Complete Booking (${booking.totalPrice})
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Booking Summary */}
        <div>
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Service Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{provider.services[0].name}</h4>
                    <p className="text-sm text-muted-foreground">
                      with {provider.name}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {provider.services[0].duration}min
                  </Badge>
                </div>

                {booking.date && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {booking.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}

                {booking.timeSlot && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{booking.timeSlot.time}</span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Customer Details */}
              {customer && (
                <div className="space-y-2">
                  <h4 className="font-medium">Customer</h4>
                  <div className="text-sm space-y-1">
                    <p>
                      {customer.firstName} {customer.lastName}
                    </p>
                    <p className="text-muted-foreground">{customer.email}</p>
                    <p className="text-muted-foreground">{customer.phone}</p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Service Fee:</span>
                  <span>${booking.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Processing Fee:</span>
                  <span>$0</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${booking.totalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
