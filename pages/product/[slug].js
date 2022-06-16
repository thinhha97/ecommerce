import React, { useState } from 'react'
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai'
import { client, urlFor } from '../../lib/client'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

const ProductDetails = ({ products, product }) => {
  const { image, name, details, price } = product
  const [index, setIndex] = useState(0)
  const { decreaseQty, increaseQty, qty, onAdd, setShowCart } =
    useStateContext()

  const handleBuyNow = () => {
    onAdd(product, qty)
    setShowCart(true)
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              alt=""
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(30)</p>
          </div>
          <p className="price">₫{price}</p>
          <div className="quantity">
            <h3>Số lượng: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decreaseQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={increaseQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Thêm vào giỏ
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Mua ngay
            </button>
          </div>
          <h4>Thông tin sản phẩm: </h4>
          <p>{details}</p>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>Có thể bạn sẽ thích</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query)

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery = '*[_type == "product"]'
  const product = await client.fetch(productQuery)
  const products = await client.fetch(productsQuery)

  return {
    props: { products, product },
  }
}

export default ProductDetails
