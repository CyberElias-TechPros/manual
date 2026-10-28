'use client'
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f7fafc', color: '#12233d', font: '15px/1.6 system-ui, sans-serif' }}>
        <main style={{ maxWidth: '38rem', margin: '0 auto', padding: '3rem 1rem' }}>
          <h1 style={{ fontSize: '1.4rem' }}>CEA Learn could not start</h1>
          <p style={{ opacity: .75 }}>Reload the page. If it happens again, the app is likely mid-deploy — try in a minute.</p>
          <button type="button" onClick={reset} style={{ marginTop: '1rem', minHeight: 44, borderRadius: 999, background: '#1a365d', color: '#fff', border: 0, padding: '0 1rem', fontSize: '.9rem', fontWeight: 500 }}>
            Reload
          </button>
        </main>
      </body>
    </html>
  )
}
