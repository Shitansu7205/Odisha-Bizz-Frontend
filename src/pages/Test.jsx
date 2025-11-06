import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function ListPropertyPopup() {
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 30, seconds: 0 });

  // ⏰ Real countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) return prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center py-10">
      {/* ✅ Trigger Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-all duration-300"
          >
            Show Offer
          </Button>
        </DialogTrigger>

        {/* ✅ Popup Content */}
        <DialogContent
          className="max-w-2xl p-0 overflow-hidden rounded-2xl border-0 bg-white sm:flex transition-all duration-300 ease-in-out"
        >
          {/* Left Side */}
          <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center text-center bg-white">
            <div className="flex justify-center mb-4">
              <Home className="w-6 h-6 text-purple-600" />
            </div>

            <h4 className="text-sm font-semibold text-gray-600 tracking-wide">
              DON’T MISS OUT ON
            </h4>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              List your property <br /> absolutely FREE!
            </h2>
            <p className="text-gray-500 text-sm mt-3">
              Join thousands of hosts earning extra income. Offer ends soon!
            </p>

            {/* Timer */}
            <div className="flex justify-center items-center gap-6 mt-6">
              <TimerBox label="Hours" value={timeLeft.hours} />
              <TimerBox label="Minutes" value={timeLeft.minutes} />
              <TimerBox label="Seconds" value={timeLeft.seconds} />
            </div>

            {/* CTA Button */}
            <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-3 text-sm font-semibold">
              List Now for Free
            </Button>
          </div>

          {/* Right Side Gradient */}
          <div className="hidden sm:flex w-1/2 bg-linear-to-tr from-purple-500 via-pink-400 to-blue-400 items-center justify-center relative">
            <div className="absolute w-48 h-48 bg-linear-to-tr from-purple-300 via-pink-300 to-blue-300 rounded-full opacity-50 blur-2xl"></div>
            <div className="relative w-48 h-48 bg-white/10 border border-white/30 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full"></div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ⏱ Small Timer Box Component
function TimerBox({ label, value }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl font-bold text-purple-600">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}
