// app/book/[apiKey]/layout.tsx
import { ThemeContainer } from '@/components/common/ThemeContainer';

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContainer>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ThemeContainer>
  );
}
