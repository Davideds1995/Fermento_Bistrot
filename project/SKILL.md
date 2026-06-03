---
name: fermento-design
description: Use this skill to generate well-branded interfaces and assets for Fermento — Caffè · Bistrot (a vintage, engraved-sign Italian bistrot identity), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy
assets out and create static HTML files for the user to view. If working on
production code, you can copy assets and read the rules here to become an expert
in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they
want to build or design, ask some questions, and act as an expert designer who
outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation
- **Tokens:** `colors_and_type.css` — ink-on-cream palette, the three serif
  families (Cinzel / Playfair Display / EB Garamond), spacing, radii, shadows,
  paper grain. Import it first.
- **Assets:** `assets/` — the logo (`logo-fermento.png`, ivory variant) and the
  scroll-flourish ornament (ink / gold / ivory). Copy what you reference.
- **Components & patterns:** `ui_kits/website/` is a working React + Babel build
  of the full bistrot site. `components.jsx` holds the atoms (Icon, Logo, Button,
  Field, Badge, Modal, PhotoPlate); the page files show how they compose.
- **Cards:** `preview/` has small specimens for colour, type, components, brand.

## Golden rules (do not break the vibe)
- Monochrome **ink `#2C2E35` on cream `#F4ECDA`**; antique gold `#9C7C46` is the
  ONLY accent and stays discreet (prices, eyebrows, filets). Terracotta only for
  required marks / destructive actions.
- Italian copy. Voice = *noi* / formal *voi*. UPPERCASE engraved labels, sentence
  case prose. Prices `€ 13,00`. No emoji.
- Near-square corners (1–3px). Soft paper shadows, never glossy. Lots of white
  space. Fine filets and the logo flourish as dividers.
- Restrained motion (translate-up, ~480ms, reduced-motion aware). No bounce,
  no gradients, no glassmorphism beyond the cream header veil.
- Imagery = warm sepia duotone inside keyline-framed plates.
