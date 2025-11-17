import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ReactRating from "react-rating"; // Import react-rating

const testimonials = [
  {
    name: "Craig Bator",
    role: "Business Owner",
    company: "Cuttack Traders",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto",
    rating: 5,
    content:
      "Odisha Bizz helped my shop reach thousands of new customers across Cuttack and Bhubaneswar. The platform is easy to use and super effective for local growth.",
  },
  {
    name: "Martin Dorwart",
    role: "Startup Founder",
    company: "Odisha Tech Hub",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto",
    rating: 4,
    content:
      "Listing our services on Odisha Bizz instantly improved our visibility. We started receiving genuine leads within just a few days.",
  },
  {
    name: "Sarah Johnson",
    role: "Hotel Manager",
    company: "Puri Beach Resorts",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto",
    rating: 5,
    content:
      "Thanks to Odisha Bizz, tourists can now easily find and book our hotel. The support team is helpful and the platform UI is simple and clean.",
  },
  {
    name: "Alex Chen",
    role: "Restaurant Owner",
    company: "Bhubaneswar Food Point",
    avatar:
      "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=40&height=40&format=auto",
    rating: 4,
    content:
      "Odisha Bizz gave our restaurant the online presence we always needed. Customer engagement has doubled since we joined the platform.",
  },
];

const TestimonialsComponentPage = () => {
  return (
    <section className="bg-gray-100 py-18">
      {" "}
      {/* Background color and padding */}
      <Carousel
        className="mx-auto flex max-w-7xl gap-12 px-4 max-sm:flex-col sm:items-center sm:gap-16 sm:px-6 lg:gap-24 lg:px-8"
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        {/* Left Content */}
        <div className="space-y-5 sm:w-1/2 lg:w-1/3">
          {/* Tagline */}
          <p className="text-green-700 text-xs font-semibold uppercase tracking-wide">
            Real Customers • Real Stories
          </p>

          {/* Main Title */}
          <h2 className="text-xl font-bold sm:text-4xl lg:text-2xl text-green-700 leading-tight">
            Odisha Customer Feedback
          </h2>

          {/* Subtitle */}
          <p className="text-muted-foreground text-sm sm:text-xl leading-relaxed text-black">
            Hear how businesses across Odisha are growing faster with our
            platform — from local shops to top city brands.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <CarouselPrevious
              variant="default"
              className="
        static translate-y-0 rounded-md 
        px-4 py-2 
        bg-green-100 text-green-700 
        hover:bg-green-200 
        disabled:bg-green-50 disabled:text-green-400
      "
            >
              Previous
            </CarouselPrevious>

            <CarouselNext
              variant="default"
              className="
        static translate-y-0 rounded-md 
        px-4 py-2 
        bg-green-100 text-green-700 
        hover:bg-green-200 
        disabled:bg-green-50 disabled:text-green-400
      "
            >
              Next
            </CarouselNext>
          </div>
        </div>

        {/* Right Testimonial Carousel */}
        <div className="relative max-w-196 sm:w-1/2 lg:w-2/3">
          <CarouselContent className="sm:-ml-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="sm:pl-6 lg:basis-1/2">
                <Card className="hover:border-green-600 h-full transition-colors duration-300">
                  {" "}
                  {/* Green hover border */}
                  <CardContent className="space-y-5">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10 rounded-full">
                        <AvatarImage
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="rounded-full text-sm">
                          {testimonial.name
                            .split(" ", 2)
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-muted-foreground text-sm">
                          {testimonial.role} at <br></br>{" "}
                          <span className="text-card-foreground font-semibold">
                            {testimonial.company}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Rating Component with Green Color */}
                    <ReactRating
                      initialRating={testimonial.rating}
                      readonly
                      emptySymbol="fa fa-star-o"
                      fullSymbol="fa fa-star"
                      className="text-yellow-500"
                    />
                    <p>{testimonial.content}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
};

export default TestimonialsComponentPage;
