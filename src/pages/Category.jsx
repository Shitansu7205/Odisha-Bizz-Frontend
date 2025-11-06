import React from 'react'
import { motion } from 'framer-motion'
import FilterCategory from '../components/FilterCategory'


const Category = () => {
  return (
    <>

      {/* Hero Section */}
      <section className="relative w-full h-60 sm:h-[300px] lg:h-[360px] flex items-center justify-center overflow-hidden">
        <img
          src="https://ctsdemo.com/odishabiz-website/assets/images/Finance_Banking.jpg"
          alt="Background Image"
          className="absolute inset-0 w-full h-full object-cover"
           loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 text-center text-white px-4"
        >
          <p className="text-sm sm:text-base text-gray-300 mb-2 tracking-wide">
            Empowering businesses with technology & innovation
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-lg">
            Our Category
          </h1>
        </motion.div>
      </section>

      <FilterCategory />

    </>
  )
}

export default Category