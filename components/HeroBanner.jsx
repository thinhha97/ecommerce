import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'

const HeroBanner = ({
  heroBanner: {
    smallText,
    midText,
    largeText,
    image,
    product,
    buttonText,
    desc,
  },
}) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="styles-solo">{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText}</h1>
        <img src={urlFor(image)} alt="styles" className="hero-banner-image" />
        <div>
          <Link href={`product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          {/* <div className="desc">
            <h5>Description</h5>
            <p>{desc}</p>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
