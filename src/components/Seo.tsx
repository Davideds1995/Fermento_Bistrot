import { useEffect } from 'react'

export const SITE_URL = 'https://fermentobistrot.com'
export const SITE_NAME = 'Fermento — Caffè · Bistrot'
const DEFAULT_IMAGE = `${SITE_URL}/assets/calice-e-pane.webp`

interface SeoProps {
  title: string
  description: string
  path: string
  noindex?: boolean
  image?: string
  jsonLd?: object
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo({ title, description, path, noindex = false, image = DEFAULT_IMAGE, jsonLd }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    document.title = title

    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', url)

    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'it_IT')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld]')
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.setAttribute('data-seo-jsonld', 'true')
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }
  }, [title, description, path, noindex, image, jsonLd])

  return null
}
