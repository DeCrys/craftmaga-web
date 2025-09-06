import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { grantRank } from '@/lib/mc/grant-rank'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  console.log('[WEBHOOK] ========== WEBHOOK CALLED ==========')
  console.log('[WEBHOOK] Timestamp:', new Date().toISOString())
  
  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    console.error('[WEBHOOK] Missing signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const buf = Buffer.from(await req.arrayBuffer())
  const secret = process.env.STRIPE_SECRET_KEY
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secret || !whSecret) {
    console.error('[WEBHOOK] Stripe secrets not configured')
    console.error('[WEBHOOK] - STRIPE_SECRET_KEY:', secret ? 'SET' : 'MISSING')
    console.error('[WEBHOOK] - STRIPE_WEBHOOK_SECRET:', whSecret ? 'SET' : 'MISSING')
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const stripe = new Stripe(secret)
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, whSecret)
    console.log('[WEBHOOK] ✅ Signature verified successfully')
  } catch (err: unknown) {
    console.error('[WEBHOOK] ❌ Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    console.log(`[WEBHOOK] Event type: ${event.type}`)
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      
      console.log('[WEBHOOK] ========== SESSION DEBUG ==========')
      console.log('[WEBHOOK] Session ID:', session.id)
      console.log('[WEBHOOK] Payment status:', session.payment_status)
      console.log('[WEBHOOK] Full session metadata:', session.metadata)
      
      const packageId = session.metadata?.packageId
      const username  = session.metadata?.username
      const pkgName   = session.metadata?.pkgName
      
      console.log('[WEBHOOK] ========== METADATA DEBUG ==========')
      console.log(`[WEBHOOK] Raw metadata values:`)
      console.log(`[WEBHOOK] - packageId: "${packageId}" (type: ${typeof packageId}, length: ${packageId?.length || 'N/A'})`)
      console.log(`[WEBHOOK] - username: "${username}" (type: ${typeof username}, length: ${username?.length || 'N/A'})`)
      console.log(`[WEBHOOK] - pkgName: "${pkgName}" (type: ${typeof pkgName}, length: ${pkgName?.length || 'N/A'})`)
      
      // Check for hidden characters
      if (pkgName) {
        console.log(`[WEBHOOK] - pkgName hex: ${Buffer.from(pkgName).toString('hex')}`)
        console.log(`[WEBHOOK] - pkgName trimmed: "${pkgName.trim()}"`)
      }
      
      console.log('[WEBHOOK] Validation check:', {
        is_paid: session.payment_status === 'paid',
        has_packageId: !!packageId,
        has_username: !!username,
        has_pkgName: !!pkgName
      })
      
      if (session.payment_status === 'paid' && packageId && username && pkgName) {
        console.log(`[WEBHOOK] ========== GRANTING RANK ==========`)
        console.log(`[WEBHOOK] Attempting to grant "${pkgName}" to user "${username}"`)
        
        try {
          await grantRank(username, pkgName)
          console.log(`[WEBHOOK] ✅ Successfully granted ${pkgName} to ${username}`)
        } catch (grantError) {
          console.error('[WEBHOOK] ❌ Error granting rank:', grantError)
          
          if (grantError instanceof Error) {
            console.error('[WEBHOOK] Grant error name:', grantError.name)
            console.error('[WEBHOOK] Grant error message:', grantError.message)
            console.error('[WEBHOOK] Grant error stack:', grantError.stack)
          }
        }
      } else {
        console.warn('[WEBHOOK] ❌ Cannot grant rank - missing data or not paid:')
        console.warn('[WEBHOOK] - payment_status:', session.payment_status)
        console.warn('[WEBHOOK] - has_packageId:', !!packageId)
        console.warn('[WEBHOOK] - has_username:', !!username)
        console.warn('[WEBHOOK] - has_pkgName:', !!pkgName)
      }
    } else {
      console.log(`[WEBHOOK] Ignoring event type: ${event.type}`)
    }
    
    console.log('[WEBHOOK] ========== WEBHOOK COMPLETED ==========')
    return NextResponse.json({ received: true }, { status: 200 })
    
  } catch (e: unknown) {
    console.error('[WEBHOOK] ❌ Webhook handler error:', e)
    
    if (e instanceof Error) {
      console.error('[WEBHOOK] Error name:', e.name)
      console.error('[WEBHOOK] Error message:', e.message)
      console.error('[WEBHOOK] Error stack:', e.stack)
    }
    
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
