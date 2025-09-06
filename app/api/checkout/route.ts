import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'
import { PRICE_MAP } from '@/lib/prices'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { packageId, username } = await req.json()

    const product = PRICE_MAP[packageId as string]
    if (!product) {
      return NextResponse.json({ error: 'Unknown package' }, { status: 400 })
    }
    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Missing username' }, { status: 400 })
    }

    const baseUrl = process.env.SITE_URL || req.nextUrl.origin
    const successUrl = `${baseUrl}/success?pkg=${packageId}`
    const cancelUrl  = `${baseUrl}/cancelled`

    const secret = process.env.STRIPE_SECRET_KEY
    if (!secret) {
      console.error('STRIPE_SECRET_KEY is not configured')
      return NextResponse.json({ error: 'Payment configuration missing' }, { status: 500 })
    }
    const stripe = new Stripe(secret)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      currency: 'czk',
      line_items: [
        {
          price_data: {
            currency: 'czk',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.amountCZK * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        packageId,
        username,
        pkgName: product.rank, // sjednocený klíč, sedí s webhookem
      },
    })

    return NextResponse.json({ url: session.url }, { status: 200 })
  } catch (e) {
    console.error('/api/checkout error', e)
    return NextResponse.json({ error: 'Checkout init failed' }, { status: 500 })
  }
}
