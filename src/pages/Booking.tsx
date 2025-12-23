import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Check } from "lucide-react";

const courts = [
  { id: 1, name: "Court 1", type: "Indoor" },
  { id: 2, name: "Court 2", type: "Indoor" },
  { id: 3, name: "Court 3", type: "Outdoor" },
  { id: 4, name: "Court 4", type: "Outdoor" },
  { id: 5, name: "Court 5", type: "Premium" },
];

const timeSlots = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00",
];

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentMonth);

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return checkDate < today;
  };

  const handleDateSelect = (day: number) => {
    if (isPast(day)) return;
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const canProceed = selectedDate && selectedTime && selectedCourt;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Book Your Court
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mt-4">
              Reserve <span className="text-gradient-lime">Your Slot</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Select your preferred date, time, and court to book your padel session.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-card rounded-2xl p-6 md:p-8 border border-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Select Date</h2>
              </div>

              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <h3 className="text-lg font-semibold">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={nextMonth}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-muted-foreground text-sm font-medium py-2"
                  >
                    {day}
                  </div>
                ))}
                {[...Array(firstDayOfMonth)].map((_, index) => (
                  <div key={`empty-${index}`} />
                ))}
                {[...Array(daysInMonth)].map((_, index) => {
                  const day = index + 1;
                  const past = isPast(day);
                  return (
                    <button
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      disabled={past}
                      className={`
                        h-12 rounded-lg font-medium text-sm transition-all
                        ${past ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-muted cursor-pointer"}
                        ${isToday(day) && !isSelected(day) ? "border border-primary" : ""}
                        ${isSelected(day) ? "bg-primary text-primary-foreground" : ""}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Select Time</h2>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      py-3 rounded-lg text-sm font-medium transition-all
                      ${
                        selectedTime === time
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Court Selection */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold">Select Court</h2>
                </div>

                <div className="space-y-3">
                  {courts.map((court) => (
                    <button
                      key={court.id}
                      onClick={() => setSelectedCourt(court.id)}
                      className={`
                        w-full flex items-center justify-between p-4 rounded-lg transition-all
                        ${
                          selectedCourt === court.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }
                      `}
                    >
                      <div className="text-left">
                        <div className="font-semibold">{court.name}</div>
                        <div className={`text-sm ${selectedCourt === court.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                          {court.type}
                        </div>
                      </div>
                      {selectedCourt === court.id && <Check size={20} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {selectedDate
                        ? selectedDate.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{selectedTime || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Court</span>
                    <span className="font-medium">
                      {selectedCourt
                        ? courts.find((c) => c.id === selectedCourt)?.name
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between text-base">
                      <span className="font-semibold">Duration</span>
                      <span className="font-bold text-primary">1 Hour</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mt-6"
                  disabled={!canProceed}
                >
                  Confirm Booking
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
