import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
    {
        title: "Real Estate",
        desc: "Smart investments and housing innovations.",
        img: "/images/real-estate.jpg",
        url: "/category/Real%20Estate"
    },
    {
        title: "Healthcare",
        desc: "Modern technologies transforming patient care.",
        img: "/images/healthcare.jpg",
        url: "/category/Healthcare"
    },
    {
        title: "Finance",
        desc: "Empowering financial inclusion.",
        img: "/images/Finance_Banking.jpg",
        url: "/category/Finance%20&%20Banking"
    },
    {
        title: "E-Commerce",
        desc: "Revolutionizing digital shopping.",
        img: "/images/Retail_E-commerce.jpg",
        url: "/category/Retail%20&%20E-commerce"
    },
    {
        title: "Hospitality",
        desc: "Innovating guest experiences worldwide.",
        img: "/images/Hospitality_Tourism.jpg",
        url: "/category/Hospitality%20&%20Tourism"
    },
];

export default function InnovationsSection() {
    return (
        <section className="py-10 px-6 md:px-12 lg:px-24 bg-white" id="gallery">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug">
                    Shaping the Future with Innovation
                </h2>
                <p className="text-gray-500 mt-3 text-base md:text-lg">
                    Discover industries and technologies that are redefining growth.
                </p>
            </div>


            {/* Grid Layout */}
            <motion.div
                className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Left Column (6 cols) */}
                <motion.div
                    variants={cardAnimation}
                    className="lg:col-span-6"
                >
                    <HoverCard {...cards[0]} height="h-[380px] md:h-[450px]" />
                </motion.div>

                {/* Right Column (6 cols) */}
                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                    {cards.slice(1).map((card, i) => (
                        <motion.div key={i} variants={cardAnimation}>
                            <HoverCard {...card} height="h-[170px] md:h-[220px]" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Button */}
            {/* <div className="flex justify-center mt-12">
                <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                    <Button variant="default" className="flex items-center gap-2 rounded-full px-6 py-3">
                        View More <ArrowRight className="w-4 h-4" />
                    </Button>
                </motion.div>
            </div> */}
        </section>
    );
}

// HoverCard component
function HoverCard({ title, desc, img, height, url }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a href={url} rel="noopener noreferrer">
            <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer group ${height}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <img
                    src={img}
                    alt={title}
                     loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div
                    className={`absolute inset-0 transition-all duration-500 ${
                        hovered ? "bg-black/60" : "bg-black/20"
                    } flex flex-col justify-center items-center text-center text-white px-4`}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-xs md:text-sm mt-1 text-gray-200">{desc}</p>
                    </motion.div>
                </div>
            </motion.div>
        </a>
    );
}


// Entrance animation variants
const cardAnimation = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};
