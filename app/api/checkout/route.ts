import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { PRICE_MAP } from '../../lib/prices'  // import z lib/prices.ts

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
})

export async function POST(req: NextRequest) {
  try {
    const { packageId, username } = await req.json()

    const product = PRICE_MAP[packageId as string]
    if (!product) return NextResponse.json({ error: 'Unknown package' }, { status: 400 })
    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Missing username' }, { status: 400 })
    }

    const successUrl = `${process.env.SITE_URL}/success?pkg=${packageId}`
    const cancelUrl  = `${process.env.SITE_URL}/cancelled`

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      currency: 'czk',
      line_items: [
        {
          price_data: {
            currency: 'czk',
            product_data: { name: product.name, description: product.description },
            unit_amount: product.amountCZK * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        packageId,
        username,
        rank: product.rank,
      },
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (e) {
    console.error('/api/checkout error', e)
    return NextResponse.json({ error: 'Checkout init failed' }, { status: 500 })
  }
}
