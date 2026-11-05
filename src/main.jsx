import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Menu as MenuIcon,
  X,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Star
} from "lucide-react";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const ZOMATO = "https://www.zomato.com/shrirampur/mandies-fast-food-restaurant-shrirampur-locality/order";
const INSTAGRAM = "https://www.instagram.com/mandies.co/";
const categories = ["All", "Pizza & Pasta", "Burgers & Sandwiches", "Snacks", "Combo Meals", "Salads", "Desserts", "Drinks", "Happy Hour"];

const menu = [
  { name: "Classic Margherita Pizza", category: "Pizza & Pasta", desc: "Fresh dough, tomato sauce and a generous layer of cheese.", price: null, tag: "Classic", image: "marpizza" },
  { name: "Cheese N Corn Pizza", category: "Pizza & Pasta", desc: "Sweet corn and melted cheese on a fresh dough base.", price: null, tag: "Cheesy", image: "ncorn" },
  { name: "Veggie Nation Pizza", category: "Pizza & Pasta", desc: "Capsicum, tomato, onion, black olives and cheese.", price: null, tag: "Veg", image: "nation" },
  { name: "El Mexicana Pizza", category: "Pizza & Pasta", desc: "Cheese, bell pepper, sweet corn, jalapeño and red paprika.", price: null, tag: "Spicy", image: "maxicanpizza" },
  { name: "Paneer 69 Pizza", category: "Pizza & Pasta", desc: "Spicy paneer chunks, capsicum, red paprika and cheese.", price: null, tag: "Popular", image: "paneer69" },
  { name: "Veggie Pizza", category: "Pizza & Pasta", desc: "Onion, tomato, capsicum, corn and cheese on fresh dough.", price: 189, tag: "Bestseller", image: "pizzaveg" },
  { name: "Paneer Pizza", category: "Pizza & Pasta", desc: "A cheesy and hearty paneer-topped pizza.", price: 189, tag: "Bestseller", image: "paneer" },
  { name: "Pan Tossed Penne Pasta", category: "Pizza & Pasta", desc: "Tender penne tossed in garlic butter.", price: null, tag: "Comfort food", image: "pasta" },
  { name: "Mumbai Masala Penne Pasta", category: "Pizza & Pasta", desc: "Pasta in a creamy, garlicky and spicy masala sauce.", price: null, tag: "Spicy", image: "masalap" },
  { name: "White Sauce Cheese Pasta", category: "Pizza & Pasta", desc: "Penne pasta coated in a rich cheesy white sauce.", price: null, tag: "Creamy", image: "white" },
  { name: "Red Sauce Pasta", category: "Pizza & Pasta", desc: "Penne pasta in a tangy, medium-spicy sauce.", price: null, tag: "Tangy", image: "red" },
  { name: "Mac N Cheese Pasta", category: "Pizza & Pasta", desc: "Macaroni folded into a creamy cheese sauce.", price: null, tag: "Cheesy", image: "cheese" },
  { name: "Classic Veggie Burger", category: "Burgers & Sandwiches", desc: "Fresh veggies and a perfectly seasoned patty.", price: 100, tag: "Bestseller", image: "burger" },
  { name: "Classic Burger", category: "Burgers & Sandwiches", desc: "A simple favourite with bun, patty and signature sauce.", price: 59, tag: "Value pick", image: "classic" },
  { name: "Aloo Tikki Classic Burger", category: "Burgers & Sandwiches", desc: "A crispy aloo tikki in a soft burger bun.", price: 80, tag: "Popular", image: "aloo" },
  { name: "Paneer Zinger Delight Burger", category: "Burgers & Sandwiches", desc: "Crispy, spiced paneer in a soft bun.", price: 150, tag: "Fan favourite", image: "paneerburger" },
  { name: "Paneer Zinger Delight Cheese Burger", category: "Burgers & Sandwiches", desc: "Paneer, spices and gooey melted cheese in every bite.", price: 180, tag: "Cheese lover", image: "zinger" },
  { name: "Grilled Veggie Cheese Sandwich", category: "Burgers & Sandwiches", desc: "Grilled sandwich with thecha mayo, veggies and cheese.", price: null, tag: "Grilled", image: "sandwich" },
  { name: "Grilled Clubhouse Supreme Sandwich", category: "Burgers & Sandwiches", desc: "Mixed veggie mayo salad with a cheese slice.", price: null, tag: "Supreme", image: "clubhouse" },
  { name: "French Fries (Salted)", category: "Snacks", desc: "Crispy golden french fries, lightly salted.", price: null, tag: "Crispy", image: "french" },
  { name: "Peri Peri French Fries", category: "Snacks", desc: "Golden fries tossed in tangy, spicy peri peri seasoning.", price: 140, tag: "Spicy", image: "peri" },
  { name: "Loaded French Fries", category: "Snacks", desc: "Golden fries loaded with melting cheese and signature sauce.", price: 180, tag: "Loaded", image: "load" },
  { name: "Funky French Fries", category: "Snacks", desc: "Fries tossed in cheese sauce with a touch of peri peri.", price: null, tag: "Cheesy", image: "funky" },
  { name: "Paneer Kurkurey (Peri Peri)", category: "Snacks", desc: "Crunchy paneer bites served with mayo dip.", price: null, tag: "Crunchy", image: "kurkure" },
  { name: "Cheese Poppers", category: "Snacks", desc: "Crispy, cheese-loaded poppers.", price: 100, tag: "Snack time", image: "snack" },
  { name: "Veg Nuggets", category: "Snacks", desc: "Crispy vegetable nuggets, perfect for sharing.", price: 120, tag: "Crispy", image: "nuggets" },
  { name: "Grilled Paneer Veggie Salad", category: "Salads", desc: "Grilled paneer with exotic veggies in mayo dressing.", price: null, tag: "Fresh", image: "salad" },
  { name: "Sportsmans Sauteed Veggies", category: "Salads", desc: "High-fibre veggies sautéed in garlic butter and pepper.", price: null, tag: "Light bite", image: "salad" },
  { name: "Brownie", category: "Desserts", desc: "Fudgy brownie with a delicious chocolate crunch.", price: null, tag: "Sweet treat", image: "dessert" },
  { name: "Choco Lava Cake", category: "Desserts", desc: "Chocolate cake with a rich, gooey ganache centre.", price: null, tag: "Chocolate", image: "lava" },
  { name: "Cold Coffee", category: "Drinks", desc: "Creamy, thick cold coffee — strong and sweet.", price: null, tag: "Chilled", image: "drink" },
  { name: "KitKat Milkshake", category: "Drinks", desc: "A thick chocolate shake with KitKat goodness.", price: null, tag: "Milkshake", image: "kitkat" },
  { name: "Oreo Milkshake", category: "Drinks", desc: "Oreo cookies, milk and vanilla ice cream blended smooth.", price: null, tag: "Milkshake", image: "drink" },
  { name: "Cad B Shake", category: "Drinks", desc: "Chocolate bar, cocoa, milk and vanilla ice cream.", price: null, tag: "Chocolate", image: "cadb" },
  { name: "Irani Bun Maska", category: "Happy Hour", desc: "Fluffy, buttery Irani-style bun maska.", price: null, tag: "Tea-time", image: "bun" },
  { name: "Irani Bun Maska with Chai", category: "Happy Hour", desc: "Buttery Irani bun maska paired with special tea.", price: null, tag: "Tea-time", image: "chai" },
  { name: "Paneer Zinger Burger Combo", category: "Combo Meals", desc: "Paneer zinger burger, regular fries and a 250 ml soft drink.", price: null, tag: "Combo", image: "vegcombo" },
  { name: "Veggie Burger Combo", category: "Combo Meals", desc: "Classic veggie burger, regular fries and a 250 ml soft drink.", price: null, tag: "Combo", image: "burgercombo" },
  { name: "Margherita Pizza Combo", category: "Combo Meals", desc: "7-inch Margherita pizza, fries and a 250 ml soft drink.", price: null, tag: "Combo", image: "combo" },
  { name: "Grilled Sandwich Combo", category: "Combo Meals", desc: "Grilled veggie sandwich, french fries and a 250 ml soft drink.", price: null, tag: "Combo", image: "sandwichcombo" }
];

const imageFor = {
  marpizza:"/images/menu/margarita.jpeg",
  pizzaveg: "/images/menu/veggie-pizza.png",
  ncorn:"/images/menu/Ncorn.jpeg",
  nation:"/images/menu/nation.jpeg",
  maxicanpizza:"/images/menu/maxican.jpeg",
  paneer69:"/images/menu/paneer 69.jpeg",
  paneer:"/images/menu/paneer.jpeg",
  pasta: "/images/menu/penne-pasta.webp",
  masalap:"/images/menu/masalap.jpeg",
  white:"/images/menu/white.jpeg",
  red:"/images/menu/red.jpeg",
  cheese:"/images/menu/cheese.jpeg",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=85",
  classic:"/images/menu/classic.jpeg",
  aloo:"/images/menu/aloo.jpeg",
  paneerburger:"/images/menu/paneerburger.jpeg",
  zinger:"/images/menu/zinger.jpeg",
  sandwich: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=85",
  clubhouse:"/images/menu/clubsandwich.jpeg",
  french: "/images/menu/french.jpeg",
  peri:"/images/menu/peri.jpeg",
  load:"/images/menu/load.jpeg",
  funky:"/images/menu/funky.jpeg",
  kurkure:"/images/menu/kurkure.jpeg",
  snack: "/images/menu/poppers.jpeg",
  nuggets:"/images/menu/nuggets.jpeg",
  salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=85",
  dessert: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=85",
  lava:"/images/menu/lava.jpeg",
  drink: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=85",
  kitkat:"/images/menu/kitkat.jpeg",
  cadb:"/images/menu/cadb.jpeg",
  bun:"/images/menu/bun.jpeg",
  chai:"/images/menu/chai.jpeg",
  combo: "/images/menu/combo.jpeg",
  vegcombo:"/images/menu/vegcombo.jpeg",
  burgercombo:"/images/menu/burgercombo.jpeg",
  sandwichcombo:"/images/menu/sandwichcombo.jpeg"
};

function Loader() {
  return <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .65 } }}>
    <div className="loader-mark">M<span>’</span></div>
    <p className="loader-kicker">GOOD FOOD. GOOD MOOD.</p>
    <div className="loader-track"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.25, ease: "easeInOut" }} /></div>
    <motion.p className="loader-line" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>Warming up something delicious…</motion.p>
  </motion.div>
}

function App() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1550); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => gsap.fromTo(el, { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }));
      gsap.fromTo(".hero-copy > *", { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: .12, duration: .8, ease: "power3.out", delay: .1 });
    });
    return () => ctx.revert();
  }, [loading]);
  const shown = menu.filter(item => (active === "All" || item.category === active) && (item.name + " " + item.desc).toLowerCase().includes(search.toLowerCase()));
  const jump = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false) };
  return <>
    <AnimatePresence>{loading && <Loader />}</AnimatePresence>
    <header className="nav-wrap">
      <nav className="nav glass">
        <a className="brand" href="#home" onClick={e => { e.preventDefault(); jump("home") }}><img src="/images/mandies-logo-original.png" alt="Mandie's Fast Food Restaurant logo" /></a>
        <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
          {["Home", "About", "Menu", "Contact"].map(x => <a key={x} href={"#" + x.toLowerCase()} onClick={e => { e.preventDefault(); jump(x.toLowerCase()) }}>{x}</a>)}
          <a className="nav-order" href={ZOMATO} target="_blank" rel="noreferrer">Order on Zomato <ArrowUpRight size={15} /></a>
        </div>
        <button className="mobile-toggle" aria-label="Toggle navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <MenuIcon />}</button>
      </nav>
    </header>
    <main>
      <section className="hero" id="home">
        <div className="hero-bg"></div><div className="hero-shade"></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot"></span> SHIRRAMPUR · FAST FOOD & GOOD TIMES</span>
            <h1>Big cravings.<br /><em>Bigger</em> flavours.</h1>
            <p>From cheesy pizza to crispy bites and feel-good shakes — your next favourite meal is waiting.</p>
            <a className="text-link" href={INSTAGRAM} target="_blank" rel="noreferrer">
              <span className="insta-glyph">◎</span>
              Follow our vibe
            </a>
            <div className="hero-meta"><span><Star size={15} fill="currentColor" /> Made for food lovers</span><span><MapPin size={15} /> Shrirampur, Maharashtra</span></div>
          </div>
          <div className="hero-stamp"><span>FRESH</span><b>♡</b><span>· TASTY ·</span></div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><i></i><span>01 / 04</span></div>
      </section>
      <section className="intro section-pad" id="about">
        <div className="intro-label reveal"><span className="eyebrow">A LITTLE ABOUT US</span><span className="line"></span></div>
        <div className="intro-content reveal"><h2>Good food has<br />a <em>way</em> of bringing<br />us together.</h2><div><p className="intro-big">At Mandie's, every craving deserves a little celebration.</p><p>Whether it's a quick snack, a pizza night, a burger break or a chilled shake, find something that hits the spot. Explore our menu and place your order through Zomato.</p><a className="under-link" href={INSTAGRAM} target="_blank" rel="noreferrer">Get to know us <ArrowUpRight size={16} /></a></div></div>
        <div className="intro-cards reveal"><div><span>01</span><b>Made for cravings</b><small>Everyday favourites, big flavour.</small></div><div><span>02</span><b>Something for everyone</b><small>Pizza, burgers, snacks & more.</small></div><div><span>03</span><b>Easy online ordering</b><small>Order securely through Zomato.</small></div></div>
      </section>
      <section className="menu-section section-pad" id="menu" ref={menuRef}>
        <div className="menu-heading reveal"><div><span className="eyebrow">THE GOOD STUFF</span><h2>Explore our <em>menu.</em></h2></div><p>Find your favourite, then tap order to continue on Zomato.</p></div>
        <div className="menu-toolbar reveal">
          <div className="filters">{categories.map(c => <button key={c} className={active === c ? "filter active" : "filter"} onClick={() => setActive(c)}>{c}</button>)}</div>
          <input className="search" placeholder="Search dishes..." value={search} onChange={e => setSearch(e.target.value)} aria-label="Search menu" />
        </div>
        <div className="menu-count"><span>{shown.length} PICKS TO LOVE</span><span>MENU · MANDIE'S</span></div>
        <div className="food-grid">
          {shown.map((item, i) => <motion.article className="food-card" key={item.name} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: (i % 6) * .035 }}>
            <div className="food-image"><img src={imageFor[item.image]} alt={item.name} loading="lazy" /><span className="food-tag">{item.tag}</span><span className="veg-mark" title="Vegetarian">V</span></div>
            <div className="food-info"><div className="food-title"><h3>{item.name}</h3><strong>{item.price ? `₹${item.price}` : "On Zomato"}</strong></div><p>{item.desc}</p><a href={ZOMATO} target="_blank" rel="noreferrer" className="order-link">Order on Zomato <ArrowUpRight size={15} /></a></div>
          </motion.article>)}
        </div>
        {shown.length === 0 && <div className="empty">No dishes found. Try another search.</div>}
        <div className="menu-foot reveal"><p>Prices and availability can change. Check the latest menu on Zomato before ordering.</p><a className="btn btn-primary" href={ZOMATO} target="_blank" rel="noreferrer">View full menu on Zomato <ExternalLink size={16} /></a></div>
      </section>
      <section className="cta-section">
        <div className="cta-inner reveal"><span className="eyebrow">YOUR NEXT BITE IS CALLING</span><h2>Craving something<br /><em>delicious?</em></h2><p>Browse the live menu and order directly from Mandie's on Zomato.</p><a href={ZOMATO} target="_blank" rel="noreferrer" className="btn btn-light">Let's order <ArrowUpRight size={18} /></a></div>
      </section>
      <section className="contact section-pad" id="contact">
        <div className="contact-head reveal"><span className="eyebrow">COME SAY HELLO</span><h2>Find <em>us.</em></h2></div>
        <div className="contact-grid reveal">
          <div className="contact-main"><h3>Mandie's<br /><em>Fast Food Restaurant</em></h3><p>Good food, good company, and a little something for every craving.</p><a className="btn btn-primary" href={ZOMATO} target="_blank" rel="noreferrer">Order / View location <ArrowUpRight size={17} /></a></div>
          <div className="contact-details">
            <div>
              <span className="insta-glyph">◎</span>
              <span>
                <b>Follow along</b>
                <small>
                  <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                    @mandies.co
                  </a>
                </small>
              </span>
            </div>            
            <div><Phone /><span><b>Call us</b><small><a href="tel:+917620172655">+91 76201 72655</a></small></span></div>
            <div><Clock /><span><b>Order online</b><small>Check current availability on Zomato</small></span></div>
            <div><span><b>Follow along</b><small><a href={INSTAGRAM} target="_blank" rel="noreferrer">@mandies.co</a></small></span></div>
          </div>
          <div className="map-card"><div className="map-pattern"></div><MapPin size={34} /><b>Mandie's · Shrirampur</b><a href="https://www.google.com/maps/search/?api=1&query=Mandies+Kitchen+Silver+Sands+Apartment+Shrirampur" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} /></a></div>
        </div>
      </section>
    </main>
    <footer><a className="footer-brand" href="#home">Mandie's<span>®</span></a><p>Good food. Good mood. Made with ♥ in Shrirampur.</p><div><a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a><a href={ZOMATO} target="_blank" rel="noreferrer">Zomato</a><a href="#home">Back to top ↑</a></div><small>© {new Date().getFullYear()} Mandie's. All rights reserved.</small></footer>
  </>;
}

createRoot(document.getElementById("root")).render(<App />);
