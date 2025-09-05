import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { grantRank } from '@/lib/mc/grant-rank'

export const runtime = 'nodejs'



export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')
  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  const buf = Buffer.from(await req.arrayBuffer())

  const secret = process.env.STRIPE_SECRET_KEY
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret || !whSecret) {
    console.error('Stripe secrets not configured')
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }
  const stripe = new Stripe(secret)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, whSecret)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Webhook signature verification failed.', err.message)
    } else {
      console.error('Webhook signature verification failed.', err)
    }
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const packageId = session.metadata?.packageId
      const username  = session.metadata?.username
      const pkgName   = session.metadata?.pkgName

      if (session.payment_status === 'paid' && packageId && username && pkgName) {
        await grantRank({ packageId, username, pkgName })
      }
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Webhook handler error', e.message)
    } else {
      console.error('Webhook handler error', e)
    }
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
