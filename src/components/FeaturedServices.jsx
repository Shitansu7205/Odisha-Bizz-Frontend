import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    HeartPulse,
    Banknote,
    ShoppingBag,
    Plane,
    Factory,
    Zap,
    Truck,
    Clapperboard,
    Leaf,
    Gem,
    Building2,
    BookOpen,
    Cpu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export const services = [
    {
        title: "Real Estate",
        description: "Building dreams, one property at a time.",
        author: "Lorem Ipsum",
        icon: <Building2 className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg",
        link: "/real-estate",
    },
    {
        title: "Healthcare",
        description: "Caring for your health, every step of the way.",
        author: "Lorem Ipsum",
        icon: <HeartPulse className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/healthcare.jpg",
        link: "/healthcare",
    },
    {
        title: "Finance & Banking",
        description: "Smart solutions for your financial growth.",
        author: "Lorem Ipsum",
        icon: <Banknote className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/Finance_Banking.jpg",
        link: "/finance",
    },
    {
        title: "Retail & E-commerce",
        description: "Bringing the best products to your doorstep.",
        author: "Lorem Ipsum",
        icon: <ShoppingBag className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/Retail_E-commerce.jpg",
        link: "/retail",
    },
    {
        title: "Hospitality & Tourism",
        description: "Creating memorable experiences around the world.",
        author: "Lorem Ipsum",
        icon: <Plane className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/Hospitality_Tourism.jpg",
        link: "/tourism",
    },
    {
        title: "Manufacturing & Industrial",
        description: "Powering progress through innovation and efficiency.",
        author: "Lorem Ipsum",
        icon: <Factory className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg",
        link: "/manufacturing",
    },
    {
        title: "Energy & Utilities",
        description: "Sustaining the future with clean and smart energy.",
        author: "Lorem Ipsum",
        icon: <Zap className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg",
        link: "/energy",
    },
    {
        title: "Transportation & Logistics",
        description: "Delivering efficiency across every mile.",
        author: "Lorem Ipsum",
        icon: <Truck className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg",
        link: "/transportation",
    },
    {
        title: "Media & Entertainment",
        description: "Inspiring creativity and connecting people worldwide.",
        author: "Lorem Ipsum",
        icon: <Clapperboard className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg",
        link: "/media",
    },
    {
        title: "Agriculture & Food",
        description: "Cultivating growth from farm to table.",
        author: "Lorem Ipsum",
        icon: <Leaf className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg",
        link: "/agriculture",
    },
    {
        title: "Jewellery",
        description: "Crafting elegance that defines your style.",
        author: "Lorem Ipsum",
        icon: <Gem className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg",
        link: "/jewellery",
    },
    {
        title: "Education & Learning",
        description: "Empowering minds through innovative education.",
        author: "Lorem Ipsum",
        icon: <BookOpen className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg",
        link: "/education",
    },
    {
        title: "Technology & Innovation",
        description: "Innovating the future, one idea at a time.",
        author: "Lorem Ipsum",
        icon: <Cpu className="w-5 h-5 text-green-600" />,
        image: "https://ctsdemo.com/odishabiz-website/assets/images/real-estate.jpg",
        link: "/technology",
    },
];

export default function FeaturedServices() {
    const navigate = useNavigate();
    const [visibleCards, setVisibleCards] = useState(4);
    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Handle responsiveness
    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth < 640) setVisibleCards(1); // mobile
            else if (window.innerWidth < 1024) setVisibleCards(2); // tablet
            else setVisibleCards(4); // desktop
        };

        updateVisibleCards();
        window.addEventListener("resize", updateVisibleCards);
        return () => window.removeEventListener("resize", updateVisibleCards);
    }, []);

    const extendedServices = [...services, ...services.slice(0, visibleCards)];
    const totalCards = services.length;

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIndex((prev) => prev + 1);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setIndex((prev) => prev - 1);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (index > totalCards) {
            setTimeout(() => setIndex(1), 800);
        }
        if (index < 0) {
            setTimeout(() => setIndex(totalCards - 1), 800);
        }
        const timer = setTimeout(() => setIsAnimating(false), 800);
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <section className="bg-linear-to-br from-gray-50 via-white to-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
                    Our Featured Services.
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Explore innovative solutions designed to empower every sector.
                </p>

                <div className="relative  lg:pl-9 lg:pr-9">
                    {/* Prev Button */}
                    <button
                        onClick={prevSlide}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-200 z-10"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    {/* Carousel */}
                    <div className="overflow-hidden lg:pl-2 lg:pr-1 lg:pb-1 lg:pt-1  ">
                        <motion.div
                            className="flex gap-4"
                            animate={{ x: `-${index * (100 / visibleCards)}%` }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            {extendedServices.map((service, i) => (
                                <Card
                                    key={i}
                                    className={`shrink-0 rounded-2xl shadow-md overflow-hidden bg-white transition-all pt-0`}
                                    style={{
                                        width: `calc(${100 / visibleCards}% - 1rem)`,
                                    }}
                                >
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <CardContent className="p-5 flex flex-col h-56 justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                {service.icon}
                                                <Badge variant="secondary">{service.author}</Badge>
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm">{service.description}</p>
                                        </div>
                                        {/* <Button
                                            onClick={() => navigate(service.link)}
                                            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-2 mt-4"
                                        >
                                            Learn More
                                        </Button> */}
                                        <Link
                                            to={`/category/${service.title}`}
                                            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5 py-1.5 mt-4 text-center text-sm font-bold"
                                        >
                                            Learn More
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </motion.div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={nextSlide}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-200 z-10"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                </div>
            </div>
        </section>
    );
}
