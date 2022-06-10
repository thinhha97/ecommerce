import React from 'react'

import { Product, FooterBanner, HeroBanner } from '../components'

const index = () => {
  return (
    <>
      HeroBanner
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Style for women</p>
      </div>
      <div className="products-container">
        {['product1', 'product2'].map((product) => product)}
      </div>
      Footer
    </>
  )
}

export default index
