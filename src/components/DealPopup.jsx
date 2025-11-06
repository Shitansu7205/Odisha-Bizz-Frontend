import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Home, X } from "lucide-react";

// Add this font in your main index.html or tailwind config:
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap" rel="stylesheet">

export default function ListPropertyPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 1, minutes: 30, seconds: 0 });
    const popupRef = useRef(null);

    // ⏱ Countdown Timer
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

    // 💡 Auto open after 5 seconds (only once)
    useEffect(() => {
        const hasOpened = localStorage.getItem("popupOpened");
        if (!hasOpened) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                localStorage.setItem("popupOpened", "true");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    // 🧠 Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <>
            {/* ✅ Sticky Button (attached to right edge) */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-1/2 right-0 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg rounded-l-xl px-3 py-1.5 z-50 cursor-pointer transition-all duration-300"
                style={{
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                }}
            >
                Free Listing
            </button>



            {/* ✅ Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-40 transition-opacity duration-300">
                    <div
                        ref={popupRef}
                        className="relative bg-white w-[90%] sm:w-[80%] md:w-[60%] max-w-5xl rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl transition-all duration-300 ease-in-out"
                    >
                        {/* ❌ Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                        >
                            <X size={24} />
                        </button>

                        {/* Left Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center text-center">
                            <div className="flex justify-center mb-4">
                                <Home className="w-7 h-7 text-purple-600" />
                            </div>

                            <h4 className="text-sm font-semibold text-gray-600 tracking-wide">
                                DON’T MISS OUT ON
                            </h4>

                            {/* 🎨 Classic Font Title */}
                            <h2
                                className="text-3xl md:text-4xl font-bold text-gray-900 mt-2"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                List Your Property <br /> Absolutely <span className="text-purple-600">FREE!</span>
                            </h2>

                            <p className="text-gray-500 text-sm mt-3">
                                Join thousands of hosts earning extra income — start listing for free today.
                            </p>

                            {/* Timer */}
                            <div className="flex justify-center items-center gap-5 mt-6">
                                <TimerBox label="Hours" value={timeLeft.hours} />
                                <TimerBox label="Minutes" value={timeLeft.minutes} />
                                <TimerBox label="Seconds" value={timeLeft.seconds} />
                            </div>

                            {/* CTA Button */}
                            <Link
                                to="/contact"
                                className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300"
                            >
                                Contact Us to List
                            </Link>
                        </div>

                        {/* Right Gradient Section */}
                        <div className="hidden md:flex w-1/2 bg-linear-to-tr from-purple-500 via-pink-400 to-blue-400 items-center justify-center relative">
                            {/* Outer glowing linear circle */}
                            <div className="absolute w-64 h-64 bg-linear-to-tr from-purple-300 via-pink-300 to-blue-300 rounded-full opacity-50 blur-2xl"></div>

                            {/* Inner circle container */}
                            <div className="relative w-56 h-56 bg-white/10 border border-white/30 rounded-full flex items-center justify-center">
                                <div className="w-50 h-50 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden">
                                    {/* 🖼️ Add your image here */}
                                    <img
                                        src="/images/trial-img.png"
                                        alt="Listing Illustration"
                                        className="w-90 h-90 object-contain"
                                         loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

// ⏱ Timer Box
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
