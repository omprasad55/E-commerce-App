import React, { useContext } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import TopBrands from '../components/TopBrands'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import NInjaMask from '../components/NInjaMask'

const Home = () => {

  


  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <TopBrands/>
      <BestSeller/>
      <NInjaMask/>
      <OurPolicy/>
      <NewsLetterBox/>
      
    </div>
  )
}

export default Home
