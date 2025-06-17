// hooks/useBookingCalendar.ts
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  CalendarDay,
  TimeSlot,
  SelectedBooking,
  BookingStep,
  Provider,
} from '@/types/calendar';

export function useBookingCalendar(provider?: Provider) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<SelectedBooking>({
    date: null,
    timeSlot: null,
    duration: 60,
    totalPrice: 0,
  });
  const [currentStep, setCurrentStep] = useState<BookingStep['id']>('date');

  // Check if a date is available based on provider's availability rules
  const isDateAvailable = useCallback(
    (date: Date, provider?: Provider): boolean => {
      if (!provider) return true;

      // Don't allow past dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) return false;

      // Check if provider has availability rules for this day of week
      const dayOfWeek = date.getDay();
      const hasAvailability = provider.availability?.some(
        (rule) => rule.dayOfWeek === dayOfWeek,
      );

      return hasAvailability;
    },
    [],
  );

  // Generate time slots for a specific date
  const generateTimeSlotsForDate = useCallback(
    (date: Date, provider?: Provider): TimeSlot[] => {
      if (!provider || !isDateAvailable(date, provider)) return [];

      const dayOfWeek = date.getDay();
      const availabilityRule = provider.availability?.find(
        (rule) => rule.dayOfWeek === dayOfWeek,
      );

      if (!availabilityRule) return [];

      const slots: TimeSlot[] = [];
      const [startHour, startMinute] = availabilityRule.startTime
        .split(':')
        .map(Number);
      const [endHour, endMinute] = availabilityRule.endTime
        .split(':')
        .map(Number);

      let currentTime = new Date(date);
      currentTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date(date);
      endTime.setHours(endHour, endMinute, 0, 0);

      while (currentTime < endTime) {
        const timeString = currentTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });

        // Check if this time conflicts with break times
        const isBreakTime = availabilityRule.breakTimes?.some((breakTime) => {
          const [breakStartHour, breakStartMinute] = breakTime.start
            .split(':')
            .map(Number);
          const [breakEndHour, breakEndMinute] = breakTime.end
            .split(':')
            .map(Number);

          const breakStart = new Date(date);
          breakStart.setHours(breakStartHour, breakStartMinute, 0, 0);

          const breakEnd = new Date(date);
          breakEnd.setHours(breakEndHour, breakEndMinute, 0, 0);

          return currentTime >= breakStart && currentTime < breakEnd;
        });

        // Check if slot is in the past
        const now = new Date();
        const isPast = currentTime <= now;

        slots.push({
          id: `${date.toISOString().split('T')[0]}-${timeString}`,
          time: timeString,
          available: !isBreakTime && !isPast,
          price: provider.services[0]?.price || 0,
          duration: provider.services[0]?.duration || 60,
        });

        // Move to next 30-minute slot
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }

      return slots;
    },
    [isDateAvailable],
  );

  // Generate calendar days for current month view
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and how many days to show from previous month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days: CalendarDay[] = [];

    // Add days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isAvailable: false,
        slots: [],
        dayOfWeek: date.getDay(),
      });
    }

    // Add days from current month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected =
        selectedBooking.date?.toDateString() === date.toDateString();
      const isAvailable = isDateAvailable(date, provider);

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isAvailable,
        slots: generateTimeSlotsForDate(date, provider),
        dayOfWeek: date.getDay(),
      });
    }

    // Add days from next month to complete the grid (42 days total)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isAvailable: false,
        slots: [],
        dayOfWeek: date.getDay(),
      });
    }

    return days;
  }, [
    currentDate,
    selectedBooking.date,
    provider,
    isDateAvailable,
    generateTimeSlotsForDate,
  ]);

  const bookingSteps: BookingStep[] = [
    {
      id: 'date',
      title: 'Select Date',
      completed: selectedBooking.date !== null,
      current: currentStep === 'date',
    },
    {
      id: 'time',
      title: 'Choose Time',
      completed: selectedBooking.timeSlot !== null,
      current: currentStep === 'time',
    },
    {
      id: 'details',
      title: 'Your Details',
      completed: false,
      current: currentStep === 'details',
    },
    {
      id: 'payment',
      title: 'Payment',
      completed: false,
      current: currentStep === 'payment',
    },
  ];

  const selectDate = (date: Date) => {
    setSelectedBooking((prev) => ({
      ...prev,
      date,
      timeSlot: null, // Reset time slot when date changes
    }));
    setCurrentStep('time');
  };

  const selectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedBooking((prev) => ({
      ...prev,
      timeSlot,
      duration: timeSlot.duration || 60,
      totalPrice: timeSlot.price || 0,
    }));
    setCurrentStep('details');
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const goToStep = (stepId: BookingStep['id']) => {
    setCurrentStep(stepId);
  };

  return {
    calendarDays,
    currentDate,
    selectedBooking,
    currentStep,
    bookingSteps,
    selectDate,
    selectTimeSlot,
    goToNextMonth,
    goToPreviousMonth,
    goToStep,
    setCurrentDate,
  };
}
