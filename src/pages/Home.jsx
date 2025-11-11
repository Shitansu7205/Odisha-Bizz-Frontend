
import HeroSection from '@/components/Hero'
import Gallery from '@/components/Gallery'
import React from 'react'
import WhyChooseUs from '@/components/Whyus'
import FeaturedServices from '@/components/FeaturedServices'
import Cta from '@/components/Cta'
import HomeSearchHeader from '@/components/HomeSearchHeader'
import HomeBanner from '@/components/HomeBanner'

const Home = () => {
    return (
        <>
            <HomeSearchHeader />
            {/* <HeroSection /> */}
            <HomeBanner />
            {/* <Gallery /> */}
            <FeaturedServices />
            {/* <Cta /> */}
            <WhyChooseUs />
            {/* <BusinessListingForm /> */}

        </>
    )
}

export default Home