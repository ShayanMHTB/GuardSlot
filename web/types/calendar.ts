// types/calendar.ts
export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price?: number;
  duration?: number; // in minutes
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isAvailable: boolean;
  slots: TimeSlot[];
  dayOfWeek: number;
}

export interface BookingStep {
  id: 'date' | 'time' | 'details' | 'payment';
  title: string;
  completed: boolean;
  current: boolean;
}

export interface SelectedBooking {
  date: Date | null;
  timeSlot: TimeSlot | null;
  duration: number;
  totalPrice: number;
}

export interface Provider {
  id: string;
  name: string;
  business: string;
  avatar?: string;
  timezone: string;
  services: Service[];
  availability: AvailabilityRule[];
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description?: string;
}

export interface AvailabilityRule {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // "09:00"
  endTime: string; // "17:00"
  breakTimes?: {
    start: string;
    end: string;
  }[];
}
