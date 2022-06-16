import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBagCheckFill } from 'react-icons/bs'

import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext()

  useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    runFireworks();
  }, [])

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Cảm ơn bạn đã mua sắm tại Fashion X!</h2>
        <p className="email-msg">Vui lòng kiểm tra hóa đơn trong hộp thư đến</p>
        <p className="description">
          Nếu có vấn đề, vui lòng gửi email vào địa chỉ
          <a className="email" href="mailto:support@fashionx.click">
            support@fashionx.click
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Tiếp tục mua sắm
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Success
