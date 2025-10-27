
import HeroSection from '@/components/Hero'
import Gallery from '@/components/Gallery'
import React from 'react'
import WhyChooseUs from '@/components/Whyus'
import FeaturedServices from '@/components/FeaturedServices'
import BusinessListingForm from '@/components/BuisnessListingForm'

const Home = () => {
    return (
        <>

            <HeroSection />
            <Gallery />
            <FeaturedServices />
            <WhyChooseUs />
            <BusinessListingForm />
        
        </>
    )
}

export default Home