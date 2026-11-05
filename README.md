# Mandie's Restaurant Website

A responsive React + Vite restaurant showcase for Mandie's. It includes:
- Home, About, Menu and Contact sections
- Category filters and menu search
- GSAP scroll reveal animations and Framer Motion menu transitions
- Animated loading screen
- Glassmorphism navigation
- Every menu CTA redirects to the supplied Zomato order page (no cart or payment flow)
- Original supplied logo file retained; brightness is adjusted with CSS only
- Generated hero food photograph in `public/images/food-hero.png`

## Run locally
```bash
npm install
npm run dev
```
Then open the local URL printed by Vite.

## Build
```bash
npm run build
npm run preview
```

## Menu / pricing note
Zomato's supplied page was not directly accessible to automated extraction, and its indexed menu view hid dish prices behind login. Dish names and descriptions are based on the indexed Mandie's menu listing. Prices shown for a small number of dishes were cross-checked against a Shrirampur Mandie's listing on Swiggy; all other prices intentionally say **On Zomato** rather than displaying invented prices. Verify current prices, menu availability, and outlet details with the restaurant before publishing.

To edit menu items, update the `menu` array near the top of `src/main.jsx`. The Zomato and Instagram links are defined near the top of that file.
# mandies
