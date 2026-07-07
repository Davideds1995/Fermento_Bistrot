// Supabase Edge Function: invia via Resend le email legate a una prenotazione
// (richiesta ricevuta, confermata, cancellata). Non tocca il DB: riceve tutti
// i dati necessari nel body della richiesta.

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM_ADDRESS = 'Fermento Bistrot <prenotazioni@fermentobistrot.com>'
const REPLY_TO = 'fermentoefamily@gmail.com'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

type EmailType = 'request_received' | 'confirmed' | 'cancelled'

interface ReservationEmailPayload {
  type: EmailType
  name: string
  email: string
  date: string
  time: string
  people: number | string
  adminMessage?: string | null
}

const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
  'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MESI[m - 1]} ${y}`
}

function subjectFor(type: EmailType) {
  switch (type) {
    case 'request_received': return 'Fermento Bistrot — Richiesta di prenotazione ricevuta'
    case 'confirmed': return 'Fermento Bistrot — Prenotazione confermata'
    case 'cancelled': return 'Fermento Bistrot — Aggiornamento sulla tua prenotazione'
  }
}

function bodyFor(payload: ReservationEmailPayload) {
  const firstName = payload.name.split(' ')[0]
  const when = `<strong>${formatDate(payload.date)}</strong> alle <strong>${payload.time}</strong>`
  const people = `<strong>${payload.people} persone</strong>`
  const note = payload.adminMessage?.trim()
    ? `<p style="margin-top:16px;padding:12px 16px;background:#f4ece1;border-radius:8px;">${payload.adminMessage.trim()}</p>`
    : ''

  let intro: string
  switch (payload.type) {
    case 'request_received':
      intro = `Abbiamo ricevuto la tua richiesta di prenotazione per ${people} il ${when}. Ti confermeremo la disponibilità entro poche ore.`
      break
    case 'confirmed':
      intro = `La tua prenotazione per ${people} il ${when} è confermata!`
      break
    case 'cancelled':
      intro = `Siamo spiacenti, non possiamo confermare la tua prenotazione per ${people} il ${when}.`
      break
  }

  return `
    <div style="font-family:Georgia,serif;color:#2b2420;max-width:480px;margin:0 auto;">
      <h2 style="font-weight:normal;">Ciao ${firstName},</h2>
      <p>${intro}</p>
      ${note}
      <p style="margin-top:24px;color:#6b6259;font-size:14px;">
        Per qualsiasi domanda rispondi pure a questa email.<br/>
        A presto, Fermento Bistrot
      </p>
    </div>
  `
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  try {
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY non configurata')
    }

    const payload = await req.json() as ReservationEmailPayload
    if (!payload?.email || !payload?.type) {
      throw new Error('Payload non valido: email e type sono obbligatori')
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [payload.email],
        reply_to: REPLY_TO,
        subject: subjectFor(payload.type),
        html: bodyFor(payload),
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Resend ha risposto ${res.status}: ${text}`)
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: (error as Error).message }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }
})
