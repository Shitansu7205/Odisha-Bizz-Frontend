
import HeroSection from '@/components/Hero'
import Gallery from '@/components/Gallery'
import React from 'react'
import WhyChooseUs from '@/components/Whyus'
import FeaturedServices from '@/components/FeaturedServices'
import Cta from '@/components/Cta'

const Home = () => {
    return (
        <>

            <HeroSection />
            <Gallery />
            <FeaturedServices />
            <Cta />
            <WhyChooseUs />
            {/* <BusinessListingForm /> */}

        </>
    )
}

export default Home