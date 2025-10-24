
import HeroSection from '@/components/Hero'
import Gallery from '@/components/Gallery'
import React from 'react'
import WhyChooseUs from '@/components/Whyus'
import FeaturedServices from '@/components/FeaturedServices'

const Home = () => {
    return (
        <>

            <HeroSection />
            <Gallery />
            <FeaturedServices />
            <WhyChooseUs />
        
        </>
    )
}

export default Home