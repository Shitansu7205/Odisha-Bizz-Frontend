import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Plus, Eye } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden">
            {/* Background video/image with overlay */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
            >
                <source src="/videos/banner-vedio.mp4" type="video/mp4" />
                {/* fallback image */}
                <img src="/images/business-background.jpg" alt="Background"  loading="lazy"/>
            </video>
            <div className="absolute inset-0 bg-black/50"></div> {/* Slight black overlay */}

            {/* Hero Content */}
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-md flex items-center gap-2.5 rounded-full border border-white/20 px-4 py-2"
                >
                    <Badge className="rounded-full bg-white/20 text-white">Odish-Bizz</Badge>
                    <span className="text-white text-sm">Solution for client-facing businesses</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-snug relative"
                >
                    <span className="relative inline-block">
                        Excellence
                        <svg
                            width="100%"
                            height="12"
                            viewBox="0 0 223 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute left-0 bottom-0 w-full translate-y-1/2"
                        >
                            <path
                                d="M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551"
                                stroke="url(#paint0_linear_10365_68643)"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_10365_68643"
                                    x1="18.8541"
                                    y1="3.72033"
                                    x2="42.6487"
                                    y2="66.6308"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="var(--primary)" />
                                    <stop offset="1" stopColor="var(--primary-foreground)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <br /> That Spans Every Industry
                </motion.h1>


                {/* Paragraph */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/80 max-w-2xl"
                >
                    Dive into innovative solutions that help your business grow, streamline processes, and maximize impact across all sectors.
                </motion.p>


                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-6 flex items-center gap-2"
                >
                    <span className="inline-flex items-center -space-x-2.5">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Avatar key={index} className="size-8">
                                <AvatarImage
                                    src={`https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri3/avatar${index + 1
                                        }.png`}
                                    alt={`User ${index + 1}`}
                                />
                            </Avatar>
                        ))}
                    </span>
                    <p className="tracking-tight ml-2 text-white text-lg font-semibold">
                        +1000{' '}
                        <Badge className="bg-blue-600 text-white text-xs px-1.5 py-0.5 align-middle rounded-sm">
                            Businesses
                        </Badge>{' '}
                        already reached us
                    </p>


                </motion.div>
                {/* Main CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {/* Add Your Own Button */}
                    <Button
                        size="lg"
                        asChild
                        className="flex items-center gap-2 bg-white text-black font-semibold rounded-full px-6 py-3 shadow-md hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
                    >
                        <Link to="/listing/create">
                            <Plus size={20} /> Add Your Own
                        </Link>
                    </Button>

                    {/* Explore Properties Button */}
                    <Button
                        size="lg"
                        asChild
                        className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full px-6 py-3 hover:bg-white/30 hover:scale-105 transition-transform duration-300"
                    >
                        <a href="#gallery">
                            <Eye size={20} /> Explore Properties
                        </a>
                    </Button>
                </motion.div>


            </div>
        </section>
    );
};

export default HeroSection;
