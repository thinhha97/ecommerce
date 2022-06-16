import { loadStripe } from '@stripe/stripe-js'

let stripePromises

const getStripe = () => {
  if (!stripePromises) {
    stripePromises = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromises
}

export default getStripe
