import React from "react";

import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedin, FaGlobe, FaArrowRight } from "react-icons/fa6";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full bg-[#0b2c71] text-white relative" >
      {/* Top green subscription bar */}
      <div className="bg-[#249732] text-white py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-center md:text-left font-medium">
            Subscribe and be notified about new locations
          </span>

          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded-full bg-white text-[#249732] placeholder:text-[#249732] border border-white focus:outline-none focus:ring-2 focus:ring-white w-64 md:w-72"
            />
            <button className="bg-white text-[#249732] rounded-full px-4 py-2 hover:bg-gray-100 transition-all duration-1000 transform hover:-translate-y-1 font-bold cursor-pointer shadow-md">
              &rarr;
            </button>

          </div>
        </div>
      </div>


      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid md:grid-cols-4 gap-8">
        {/* Logo + Description */}
        <div className="flex flex-col gap-4 items-start">
          <img
            src="/images/logo.png"
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
          <a href="#" className="text-gray-300 hover:text-[#249732] transition">
            Real Estate
          </a>
          <a href="#" className="text-gray-300 hover:text-[#249732] transition">
            E-Learning
          </a>
          <a href="#" className="text-gray-300 hover:text-[#249732] transition">
            IT Sector
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-[#249732] transition"
          >
            Artificial Intelligence
          </a>
          <a href="#" className="text-gray-300 hover:text-[#249732] transition">
            Innovation & Tech
          </a>
        </div>

        {/* Contact */}
        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="font-semibold text-white">Contact</h4>
          {/* 📍 Address */}
          <div className="flex items-start gap-2 text-gray-300">
            <FaMapMarkerAlt className="text-[#249732] mt-1" />
            <p>
              Bhubaneswar,Odisha
            </p>
          </div>

          {/* 📞 Phone */}
          <div className="flex items-center gap-2 text-gray-300">
            <FaPhoneAlt className="text-[#249732]" />
            <a href="tel:+919876543210" className="hover:text-[#249732] transition">
              +91 9876543210
            </a>
          </div>

          {/* ✉️ Email */}
          <div className="flex items-center gap-2 text-gray-300">
            <FaEnvelope className="text-[#249732]" />
            <a href="mailto:abc@gmail.com" className="hover:text-[#249732] transition">
              abc@gmail.com
            </a>
          </div>
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
      <div className="bg-[#081d53] text-gray-300 text-sm py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <span>
            &copy; Copyright 2025 Odisha Biz. All Rights Reserved | Developed By{" "}
            <strong>
              <a
                href="https://crushaderstech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#249732] transition-colors duration-300 font-semibold"
              >
                Crushaders Tech
              </a>
            </strong>

          </span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="https://www.facebook.com/" target="_blank" className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white border border-white/5 ml-1.5 hover:text-[#249732] transition-colors duration-300">
              <FaFacebookF className="text-base" />
            </a>
            <a href="https://twitter.com/" target="_blank" className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white border border-white/5 ml-1.5 hover:text-[#249732] transition-colors duration-300">
              <FaXTwitter className="text-base" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white border border-white/5 ml-1.5 hover:text-[#249732] transition-colors duration-300">
              <FaInstagram className="text-base" />
            </a>
            <a
              href="https://www.linkedin.com/" target="_blank"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white border border-white/5 ml-1.5 hover:text-[#249732] transition-colors duration-300"
            >
              <FaLinkedin className="text-base" />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
