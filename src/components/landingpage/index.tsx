import React from 'react'
import Hero from './hero'
import MidSection from './midSection'
import HowItWorks from './howitworks'
import Bottomsection from './bottomsection'
import FAQ from './faq'
import Footer from '../footer'
export default function LandingPage() {
  return (
    <div className='w-full'>
          <Hero/>
          <MidSection/>
          <HowItWorks />
          <Bottomsection />
          <FAQ />
          <Footer />
    </div>
  )
}
