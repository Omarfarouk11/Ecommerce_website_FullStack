import React from 'react'
import Navbar from '../../component/navbar/Navbar'
import Products from '../../component/products/Products'
import Category from '../../component/category/Category'
import Slider from '../../component/slider/Slider'
const Home = () => {
  return (
    <div className='HomeContainer'>
      <Navbar/>
      <Slider/>
      <Category/>
      <Products/>
    </div>
    
  )
}

export default Home