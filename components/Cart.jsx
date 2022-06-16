import React, { useRef } from 'react'
import Link from 'next/link'
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import Toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef()
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQty,
    onRemove,
  } = useStateContext()
  const handleCheckout = async () => {
    const stripe = await getStripe()

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })

    if (response.statusCode === 500) return

    const data = await response.json()

    Toast.loading('Đang chuyển hướng đến trang thanh toán...')
    console.log('DATA',data)
    stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Giỏ hàng của bạn</span>
          <span className="cart-num-items">({totalQuantities} sản phẩm)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Bạn hiện đang không có sản phẩm nào trong giỏ hàng.</h3>
            <Link href="/">
              <button onClick={() => setShowCart(false)} className="btn">
                Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <img
                  src={urlFor(item?.image[0])}
                  alt=""
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>₫{item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => toggleCartItemQty(item._id, 'dec')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num" >
                          {item.quantity}
                        </span>
                        <span
                          className="plus"
                          onClick={() => toggleCartItemQty(item._id, 'inc')}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Tổng: </h3>
              <h3>₫{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button className="btn" onClick={handleCheckout}>
                Thanh Toán
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
