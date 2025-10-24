import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      {/* 404 Illustration */}
      <div className="relative w-full flex flex-col items-center justify-center">
        <h1 className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-extrabold text-gray-900 select-none leading-none">
          404
        </h1>

        {/* Person Illustration inside the "0" */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-64 sm:w-72 md:w-80">
          {/* <img
            src="/images/404-image.png"
            alt="Confused person illustration"
            className="w-full object-contain"
          /> */}
        </div>
      </div>

      {/* Text Section */}
      <div className="mt-8 md:mt-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          Oops!
        </h2>
        <p className="text-gray-600 text-base md:text-lg font-medium">
          Something went wrong
        </p>
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          The page you’re looking for isn’t found. We suggest you head back to
          the home page.
        </p>

        <Button
          onClick={() => navigate("/")}
          className="mt-6 bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md shadow-md transition-all duration-300"
        >
          Back to home page
        </Button>
      </div>
    </section>
  );
}
