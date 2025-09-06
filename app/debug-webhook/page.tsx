'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DebugWebhookPage() {
  const [logs, setLogs] = useState<string[]>([])
  
  const testWebhookEndpoint = () => {
    // Test dostupnosti webhook endpointu
    fetch('/api/stripe-webhook', {
      method: 'GET',
    })
    .then(res => {
      if (res.ok) {
        setLogs(prev => [...prev, `✅ Webhook endpoint je dostupný (${res.status})`])
      } else {
        setLogs(prev => [...prev, `❌ Webhook endpoint nedostupný (${res.status})`])
      }
    })
    .catch(err => {
      setLogs(prev => [...prev, `❌ Chyba při testování endpoint: ${err.message}`])
    })
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Webhook Debug Panel</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Informace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="inline-block px-2 py-1 bg-muted rounded text-sm font-medium mb-2">Webhook URL</div>
                <p className="p-2 bg-muted rounded font-mono text-sm">
                  {typeof window !== 'undefined' ? `${window.location.origin}/api/stripe-webhook` : 'Loading...'}
                </p>
              </div>
              
              <div>
                <div className="inline-block px-2 py-1 bg-muted rounded text-sm font-medium mb-2">Test Mode</div>
                <p className="text-sm text-muted-foreground">
                  Stripe je momentálně v test módu. Použijte test webhook URL ve Stripe dashboard.
                </p>
              </div>
              
              <div>
                <div className="inline-block px-2 py-1 bg-muted rounded text-sm font-medium mb-2">Požadované události</div>
                <p className="text-sm">
                  <code>checkout.session.completed</code>
                </p>
              </div>

              <Button onClick={testWebhookEndpoint} className="w-full">
                Test Webhook Endpoint
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Debugging kroky</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <h3 className="font-semibold">1. Zkontrolujte Stripe Webhook nastavení:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Přihlaste se do Stripe Dashboard</li>
                  <li>Jděte na Developers → Webhooks</li>
                  <li>Přidejte webhook endpoint: <code className="bg-muted px-1 rounded">{typeof window !== 'undefined' ? `${window.location.origin}/api/stripe-webhook` : 'Loading...'}</code></li>
                  <li>Vyberte událost: <code className="bg-muted px-1 rounded">checkout.session.completed</code></li>
                  <li>Zkopírujte webhook signing secret do .env jako STRIPE_WEBHOOK_SECRET</li>
                </ul>
              </div>

              <div className="text-sm space-y-2">
                <h3 className="font-semibold">2. Otestujte transakci:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Použijte test kartu: <code className="bg-muted px-1 rounded">4242 4242 4242 4242</code></li>
                  <li>Libovolný datum v budoucnosti a CVC</li>
                  <li>Sledujte console logy aplikace</li>
                </ul>
              </div>

              <div className="text-sm space-y-2">
                <h3 className="font-semibold">3. Zkontrolujte logy:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Aplikační logy: [WEBHOOK] a [GRANT-RANK] zprávy</li>
                  <li>Stripe Dashboard → Webhooks → Historie událostí</li>
                  <li>RCON připojení na server</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Logy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Zatím žádné logy...</p>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="p-2 bg-muted rounded text-sm font-mono">
                      {log}
                    </div>
                  ))
                )}
              </div>
              
              {logs.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setLogs([])}
                  className="mt-4"
                >
                  Vymazat logy
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}