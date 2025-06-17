// components/booking/BookingCalendar.tsx
'use client';

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/helper/cn';
import { useBookingCalendar } from '@/hooks/useBookingCalendar';
import { CalendarDay, Provider } from '@/types/calendar';

interface BookingCalendarProps {
  provider?: Provider;
  onDateSelect?: (date: Date) => void;
  onTimeSelect?: (timeSlot: any) => void;
}

export function BookingCalendar({
  provider,
  onDateSelect,
  onTimeSelect,
}: BookingCalendarProps) {
  const {
    calendarDays,
    currentDate,
    selectedBooking,
    selectDate,
    selectTimeSlot,
    goToNextMonth,
    goToPreviousMonth,
  } = useBookingCalendar(provider);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth || !day.isAvailable) return;

    selectDate(day.date);
    onDateSelect?.(day.date);
  };

  const handleTimeSlotClick = (timeSlot: any) => {
    if (!timeSlot.available) return;

    selectTimeSlot(timeSlot);
    onTimeSelect?.(timeSlot);
  };

  const selectedDay = calendarDays.find(
    (day) => day.isSelected && day.isCurrentMonth,
  );

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <p className="text-muted-foreground mt-1">
            Select your preferred date and time
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar Grid */}
        <div className="space-y-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, index) => {
              const hasSlots = day.slots.length > 0;
              const availableSlots = day.slots.filter(
                (slot) => slot.available,
              ).length;

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  disabled={!day.isCurrentMonth || !day.isAvailable}
                  className={cn(
                    'aspect-square p-2 text-sm font-medium rounded-lg transition-all duration-200 relative group',
                    'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                    day.isCurrentMonth
                      ? day.isAvailable
                        ? day.isSelected
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : day.isToday
                          ? 'bg-muted text-foreground border-2 border-primary'
                          : hasSlots
                          ? 'bg-muted hover:bg-accent border'
                          : 'bg-muted/50 text-muted-foreground'
                        : 'text-muted-foreground cursor-not-allowed'
                      : 'text-muted-foreground/50 cursor-not-allowed',
                  )}
                >
                  <span className="block">{day.date.getDate()}</span>

                  {/* Available slots indicator */}
                  {day.isCurrentMonth && day.isAvailable && hasSlots && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          day.isSelected
                            ? 'bg-primary-foreground'
                            : availableSlots > 0
                            ? 'bg-green-500'
                            : 'bg-yellow-500',
                        )}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Limited</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-full" />
              <span>Unavailable</span>
            </div>
          </div>
        </div>

        {/* Time Slots Panel */}
        <div className="space-y-4">
          {selectedDay ? (
            <>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-muted rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {selectedDay.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDay.slots.filter((slot) => slot.available).length}{' '}
                    slots available
                  </p>
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {selectedDay.slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleTimeSlotClick(slot)}
                    disabled={!slot.available}
                    className={cn(
                      'p-3 rounded-lg text-left transition-all duration-200 group',
                      'hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                      slot.available
                        ? selectedBooking.timeSlot?.id === slot.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-muted hover:bg-accent border'
                        : 'bg-muted/50 border-muted cursor-not-allowed opacity-50',
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{slot.time}</span>
                    </div>
                    {slot.price && (
                      <div className="text-sm opacity-75">${slot.price}</div>
                    )}
                    {!slot.available && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        Unavailable
                      </Badge>
                    )}
                  </button>
                ))}
              </div>

              {selectedDay.slots.filter((slot) => slot.available).length ===
                0 && (
                <div className="text-center py-8">
                  <div className="p-4 bg-muted rounded-lg">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground font-medium">
                      No available slots
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Please select another date
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="p-6 bg-muted/50 rounded-lg">
                <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground font-medium mb-2">
                  Select a date
                </p>
                <p className="text-sm text-muted-foreground">
                  Choose an available date to see time slots
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
