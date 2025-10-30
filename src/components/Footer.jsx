import React from "react";

import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedin, FaGlobe, FaArrowRight } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0b2c71] text-white relative">
      {/* Top green subscription bar */}
      <div className="bg-green-600 text-white py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-center md:text-left font-medium">
            Subscribe and be notified about new locations
          </span>

          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-full bg-white text-green-600 placeholder:text-green-500 border border-white focus:outline-none focus:ring-2 focus:ring-white w-64 md:w-72"
            />
            <button className="bg-white text-green-600 rounded-full px-4 py-2 hover:bg-gray-100 transition font-bold">
              &rarr;
            </button>
          </div>
        </div>
      </div>


      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col gap-4">
          <img
            src="https://ctsdemo.com/odishabiz-website/assets/images/odishabiz-logo.png"
            alt="Odisha Bizz"
            className="h-12 object-contain"
          />
          <p className="text-gray-200 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white">Categories</h4>
          <a href="#" className="text-gray-300 hover:text-green-600 transition">
            Real Estate
          </a>
          <a href="#" className="text-gray-300 hover:text-green-600 transition">
            E-Learning
          </a>
          <a href="#" className="text-gray-300 hover:text-green-600 transition">
            IT Sector
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-green-600 transition"
          >
            Artificial Intelligence
          </a>
          <a href="#" className="text-gray-300 hover:text-green-600 transition">
            Innovation & Tech
          </a>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white">Contact</h4>
          <p className="text-gray-300 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <p className="text-gray-300">+91 9876543210</p>
          <p className="text-gray-300">abc@gmail.com</p>
        </div>

        {/* Map */}
        <div>
          <iframe
            title="Crushaders Tech Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.256187564327!2d85.8228506145462!3d20.25998218642938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909a0c1fa1bff%3A0x7b6d03d6163cf0f3!2sCrushaders%20Tech!5e0!3m2!1sen!2sin!4v1698143539390!5m2!1sen!2sin"
            className="w-full h-48 rounded-md"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-[#081d53] text-gray-300 text-sm py-4 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center">
        <span>
          &copy; Copyright 2025 Odisha Biz. All Rights Reserved | Developed By{" "}
          <strong>Crushaders Tech</strong>
        </span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-green-600">
            <FaFacebookF className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-green-600">
            <FaXTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-green-600">
            <FaInstagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-green-600">
            <FaLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
