// app/book/[apiKey]/page.tsx
'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Check,
  User,
  CreditCard,
  Calendar,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { CustomerForm } from '@/components/booking/CustomerForm';
import { PaymentForm } from '@/components/booking/PaymentForm';
import { ThemeToggler } from '@/components/common/ThemeToggler';
import { useBookingCalendar } from '@/hooks/useBookingCalendar';
import { Provider } from '@/types/calendar';

// Mock provider data - replace with real API call
const mockProvider: Provider = {
  id: '1',
  name: 'Sarah Johnson',
  business: 'Hair Studio Pro',
  avatar:
    'https://images.unsplash.com/photo-1494790108755-2616b25d6d5b?w=150&h=150&fit=crop&crop=face',
  timezone: 'EST',
  services: [
    {
      id: '1',
      name: 'Hair Cut & Style',
      duration: 60,
      price: 85,
      description: 'Professional haircut with styling',
    },
  ],
  availability: [
    {
      dayOfWeek: 1,
      startTime: '09:00',
      endTime: '17:00',
      breakTimes: [{ start: '12:00', end: '13:00' }],
    },
    {
      dayOfWeek: 2,
      startTime: '09:00',
      endTime: '17:00',
      breakTimes: [{ start: '12:00', end: '13:00' }],
    },
    {
      dayOfWeek: 3,
      startTime: '09:00',
      endTime: '17:00',
      breakTimes: [{ start: '12:00', end: '13:00' }],
    },
    {
      dayOfWeek: 4,
      startTime: '09:00',
      endTime: '17:00',
      breakTimes: [{ start: '12:00', end: '13:00' }],
    },
    {
      dayOfWeek: 5,
      startTime: '09:00',
      endTime: '17:00',
      breakTimes: [{ start: '12:00', end: '13:00' }],
    },
  ],
};

export default function BookingPage({
  params,
}: {
  params: { apiKey: string };
}) {
  const { currentStep, bookingSteps, selectedBooking, goToStep } =
    useBookingCalendar(mockProvider);
  const [customerData, setCustomerData] = useState<any>(null);

  const stepProgress = bookingSteps.findIndex((step) => step.current) * 25;

  const renderStepContent = () => {
    switch (currentStep) {
      case 'date':
      case 'time':
        return (
          <BookingCalendar
            provider={mockProvider}
            onDateSelect={(date) => console.log('Date selected:', date)}
            onTimeSelect={(timeSlot) => console.log('Time selected:', timeSlot)}
          />
        );
      case 'details':
        return (
          <CustomerForm
            onSubmit={(data) => {
              setCustomerData(data);
              goToStep('payment');
            }}
            onBack={() => goToStep('time')}
          />
        );
      case 'payment':
        return (
          <PaymentForm
            booking={selectedBooking}
            customer={customerData}
            provider={mockProvider}
            onSuccess={() => console.log('Payment successful')}
            onBack={() => goToStep('details')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={mockProvider.avatar}
              alt={mockProvider.name}
              className="w-16 h-16 rounded-lg object-cover ring-2 ring-muted shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-background rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{mockProvider.business}</h1>
            <p className="text-muted-foreground">with {mockProvider.name}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {mockProvider.services[0].name}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {mockProvider.services[0].duration}min
              </Badge>
              <Badge variant="outline" className="text-xs">
                ${mockProvider.services[0].price}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggler />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-8 py-6 border-b">
        <div className="flex items-center justify-between mb-4">
          {bookingSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center space-x-3">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                  ${
                    step.completed
                      ? 'bg-primary text-primary-foreground'
                      : step.current
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }
                `}
                >
                  {step.completed ? (
                    <Check className="h-5 w-5" />
                  ) : step.id === 'date' ? (
                    <Calendar className="h-4 w-4" />
                  ) : step.id === 'time' ? (
                    <Clock className="h-4 w-4" />
                  ) : step.id === 'details' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <CreditCard className="h-4 w-4" />
                  )}
                </div>
                <div className="hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      step.current ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>

              {index < bookingSteps.length - 1 && (
                <div className="w-16 h-0.5 mx-4 bg-muted">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: step.completed ? '100%' : '0%' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <Progress value={stepProgress} className="h-1.5" />
      </div>

      {/* Main Content */}
      <div className="p-8">{renderStepContent()}</div>

      {/* Booking Summary Sidebar (when booking is selected) */}
      {(selectedBooking.date || selectedBooking.timeSlot) && (
        <div className="fixed bottom-6 right-6 w-80 bg-card border rounded-lg shadow-lg p-6 z-50">
          <h3 className="font-semibold mb-4">Booking Summary</h3>

          <div className="space-y-3 text-sm">
            {selectedBooking.date && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">
                  {selectedBooking.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}

            {selectedBooking.timeSlot && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">
                  {selectedBooking.timeSlot.time}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium">
                {mockProvider.services[0].name}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{selectedBooking.duration}min</span>
            </div>

            <div className="border-t pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg">
                  ${selectedBooking.totalPrice}
                </span>
              </div>
            </div>
          </div>

          {currentStep === 'time' && selectedBooking.timeSlot && (
            <Button onClick={() => goToStep('details')} className="w-full mt-4">
              Continue to Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
