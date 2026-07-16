import { Link } from 'react-router-dom'
import { HOURS } from '../data/content'
import { useLanguage } from '../lib/i18n'
import Icon from './Icon'
import { WhatsAppIcon, InstagramIcon, FacebookIcon } from './SocialIcons'

const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/393395734497',
  instagram: 'https://www.instagram.com/fermentocaffebistrot/?hl=it',
  facebook: 'https://www.facebook.com/Fermentocaffebistrot/?locale=it_IT',
  tripadvisor: 'https://www.tripadvisor.it/Restaurant_Review-g187791-d3845009-Reviews-Fermento_Caffe_Bistrot-Rome_Lazio.html',
  googleReviews: 'https://www.google.com/search?q=Fermento+Caff%C3%A8+Bistrot+Recensioni',
}

export default function Footer() {
  const { lang, t } = useLanguage()
  const hours = HOURS[lang]

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="center">
          <img src="https://hrrxbbsjcynbwlmiidfx.supabase.co/storage/v1/object/public/Image/logo-fermento-ivory.png" alt="Fermento" className="foot-logo" />

          <div className="foot-social">
            <a className="foot-social-btn" href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon size={19} />
            </a>
            <a className="foot-social-btn" href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon size={19} />
            </a>
            <a className="foot-social-btn" href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon size={19} />
            </a>
          </div>

          <div className="foot-reviews">
            <a className="foot-review-btn" href={SOCIAL_LINKS.tripadvisor} target="_blank" rel="noopener noreferrer">
              <Icon name="star" size={13} /> {t('footer.reviewOnTripadvisor')}
            </a>
            <a className="foot-review-btn" href={SOCIAL_LINKS.googleReviews} target="_blank" rel="noopener noreferrer">
              <Icon name="star" size={13} /> {t('footer.reviewOnGoogle')}
            </a>
          </div>

          <hr className="filet" style={{ maxWidth: 320, margin: '0 auto' }} />
        </div>

        <div className="foot-cols">
          <div>
            <h4>{t('footer.whereWeAre')}</h4>
            <p>Piazza di Villa Carpegna 38</p>
            <p>00165 Roma (RM)</p>
            <p style={{ marginTop: 12 }}>
              <a href="tel:+390666000316" className="btn btn-outline btn-sm foot-call-btn">
                <Icon name="phone" size={13} /> {t('footer.callUs')} +39 06 6600 0316
              </a>
            </p>
            <p>
              <a href="mailto:fermentoefamily@gmail.com">fermentoefamily@gmail.com</a>
            </p>
          </div>

          <div>
            <h4>{t('footer.hours')}</h4>
            {hours.map(({ d, h }) => (
              <p key={d}>
                <span style={{ color: 'rgba(244,236,218,0.5)', fontSize: '0.8rem' }}>{d}</span>
                <br />
                {h}
              </p>
            ))}
          </div>

          <div>
            <h4>{t('footer.theVenue')}</h4>
            <p><Link to="/chi-siamo">{t('footer.about')}</Link></p>
            <p><Link to="/menu">{t('footer.menu')}</Link></p>
            <p>
              <a href="#prenotazione" onClick={e => {
                e.preventDefault()
                document.getElementById('prenotazione')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                {t('footer.book')}
              </a>
            </p>
          </div>
        </div>

        <div className="legal">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Fermento — Caffè · Bistrot · P.IVA IT 15405801000 ·{' '}
            <Link to="/privacy">{t('footer.privacy')}</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
