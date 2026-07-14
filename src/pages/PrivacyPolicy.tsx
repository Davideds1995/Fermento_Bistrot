import Header from '../components/Header'
import Footer from '../components/Footer'
import { Flourish } from '../components/Divider'
import Seo from '../components/Seo'

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Fermento Caffè Bistrot Roma"
        description="Informativa sul trattamento dei dati personali di Fermento Caffè Bistrot, ai sensi del Regolamento (UE) 2016/679 (GDPR)."
        path="/privacy"
      />
      <Header />
      <main>

        {/* ── Page header ── */}
        <section className="section" style={{ background: 'var(--paper-3)', backgroundImage: 'var(--grain)', textAlign: 'center', paddingBottom: 'var(--sp-7)' }}>
          <div className="wrap-narrow">
            <div className="eyebrow-row">
              <span className="eyebrow">Informativa</span>
            </div>
            <h1>Privacy Policy</h1>
            <Flourish small />
          </div>
        </section>

        {/* ── Policy body ── */}
        <section className="section">
          <div className="wrap-narrow" style={{ color: 'var(--ink-700)', lineHeight: 1.7 }}>

            <p style={{ color: 'var(--ink-500)', fontStyle: 'italic' }}>
              Ultimo aggiornamento: 14 luglio 2026
            </p>

            <p>
              La presente informativa descrive come Fermento — Caffè · Bistrot tratta i dati
              personali raccolti attraverso il form di prenotazione presente sul sito
              fermentobistrot.com, ai sensi del Regolamento (UE) 2016/679 ("GDPR") e del
              D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018 ("Codice Privacy").
            </p>

            <h2 style={{ marginTop: 'var(--sp-7)' }}>1. Titolare del trattamento</h2>
            <p>
              Il Titolare del trattamento è Fermento — Caffè · Bistrot, P.IVA IT 15405801000,
              con sede in Piazza di Villa Carpegna 38, 00165 Roma (RM).<br />
              Per qualsiasi richiesta relativa al trattamento dei dati personali potete
              contattarci all'indirizzo <a href="mailto:fermentoefamily@gmail.com">fermentoefamily@gmail.com</a>{' '}
              o al numero <a href="tel:+390666000316">+39 06 6600 0316</a>.
            </p>

            <h2>2. Dati raccolti</h2>
            <p>
              Attraverso il form di prenotazione raccogliamo: nome e cognome, numero di
              telefono, indirizzo email, data e ora richiesta, numero di persone ed eventuali
              note facoltative (ad es. allergie, intolleranze, occasioni speciali o richieste
              particolari).
            </p>

            <h2>3. Finalità e base giuridica del trattamento</h2>
            <p>
              I dati sono trattati per gestire la richiesta di prenotazione, confermarla,
              comunicare con voi in merito al tavolo riservato (conferme, modifiche,
              eventuali disdette) e rispondere a richieste specifiche indicate nelle note.
              La base giuridica è l'esecuzione di misure precontrattuali richieste
              dall'interessato e, ove la prenotazione vada a buon fine, l'esecuzione del
              servizio richiesto (art. 6.1.b GDPR). Non utilizziamo i vostri dati per finalità
              di marketing, se non a fronte di un consenso separato ed esplicito che non è
              richiesto da questo form.
            </p>

            <h2>4. Dati relativi ad allergie o intolleranze</h2>
            <p>
              Le informazioni su allergie o intolleranze alimentari, se fornite volontariamente
              nel campo note, possono costituire una categoria particolare di dati ai sensi
              dell'art. 9 GDPR (dati relativi alla salute). Inserendo tali informazioni nel
              form, l'interessato presta il proprio consenso esplicito al loro trattamento
              (art. 9.2.a GDPR), limitatamente alla finalità di garantire un servizio sicuro
              e adeguato in sala.
            </p>

            <h2>5. Periodo di conservazione</h2>
            <p>
              I dati raccolti tramite il form di prenotazione sono conservati per un periodo
              massimo di 12 mesi dalla data della prenotazione o dall'ultimo contatto con il
              cliente, decorso il quale vengono cancellati o resi anonimi, salvo che una loro
              ulteriore conservazione sia richiesta per adempiere a un obbligo di legge o per
              accertare, esercitare o difendere un diritto in sede giudiziaria.
            </p>

            <h2>6. Destinatari dei dati</h2>
            <p>
              I dati sono trattati dal personale di Fermento autorizzato alla gestione delle
              prenotazioni e possono essere trattati, in qualità di responsabili del
              trattamento, da fornitori terzi che ci forniscono servizi tecnici, in
              particolare l'hosting del database (Supabase) e l'invio delle email di
              conferma prenotazione. Tali fornitori trattano i dati esclusivamente per nostro
              conto e secondo le nostre istruzioni.
            </p>

            <h2>7. Trasferimento dei dati</h2>
            <p>
              I dati sono conservati su server ubicati nell'Unione Europea. Non effettuiamo
              trasferimenti di dati verso Paesi extra-UE al di fuori delle garanzie previste
              dal GDPR.
            </p>

            <h2>8. Diritti dell'interessato</h2>
            <p>
              In qualsiasi momento potete esercitare, contattandoci agli indirizzi indicati
              al punto 1, i diritti previsti dagli articoli 15-22 GDPR: accesso ai dati,
              rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e
              opposizione al trattamento. Avete inoltre il diritto di proporre reclamo al
              Garante per la Protezione dei Dati Personali (www.garanteprivacy.it) qualora
              riteniate che il trattamento dei vostri dati violi la normativa vigente.
            </p>

            <h2>9. Processo decisionale automatizzato</h2>
            <p>
              Non effettuiamo alcuna forma di profilazione né di processo decisionale
              automatizzato sui dati raccolti.
            </p>

            <h2>10. Cookie</h2>
            <p>
              Il sito utilizza esclusivamente cookie tecnici necessari al funzionamento
              dell'area riservata di gestione (login del personale). Non sono presenti
              cookie di profilazione o di marketing di terze parti.
            </p>

            <h2>11. Modifiche alla presente informativa</h2>
            <p>
              La presente informativa può essere aggiornata nel tempo. La data di ultimo
              aggiornamento è indicata in cima alla pagina.
            </p>

          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
