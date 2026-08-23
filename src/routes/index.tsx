import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Clock3,
  Copy,
  Facebook,
  FileText,
  Grid2X2,
  Instagram,
  Laptop,
  Layers3,
  ListChecks,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Music2,
  Palette,
  PenTool,
  Play,
  Search,
  Send,
  Share2,
  Sparkles,
  Star,
  Sun,
  Upload,
  UserRoundCheck,
  X,
} from 'lucide-react'
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

export const Route = createFileRoute('/')({ component: StudioPage })

const imageUrl = (url: string, width: number, height?: number) =>
  `/.netlify/images?url=${encodeURIComponent(url)}&w=${width}${height ? `&h=${height}&fit=cover` : ''}&q=82`

const images = {
  hero: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1800&q=90',
  about: 'https://images.unsplash.com/photo-1600697395543-ef3ee6e9af7b?auto=format&fit=crop&w=1200&q=85',
  logo: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1200&q=85',
  brand: 'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?auto=format&fit=crop&w=1000&q=85',
  cv: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=85',
  business: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=85',
  social: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=85',
  poster: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?auto=format&fit=crop&w=900&q=85',
}

const services = [
  ['01', 'Logo Design', PenTool],
  ['02', 'Brand Identity', Palette],
  ['03', 'CV & Resume Design', FileText],
  ['04', 'Business Documents', ListChecks],
  ['05', 'Business Cards', Clipboard],
  ['06', 'Social Media Design', Share2],
  ['07', 'Posters & Flyers', Play],
  ['08', 'Book & Cover Design', Layers3],
  ['09', 'Complete Design Kits', Grid2X2],
] as const

const portfolio = [
  { title: 'Nexa Studio Identity', category: 'Logo', image: images.logo, span: 'wide' },
  { title: 'Aster Brand System', category: 'Branding', image: images.brand, span: 'standard' },
  { title: 'Executive CV Suite', category: 'Documents', image: images.cv, span: 'standard' },
  { title: 'MKM Business Essentials', category: 'Print', image: images.business, span: 'standard' },
  { title: 'Social Launch Campaign', category: 'Social', image: images.social, span: 'standard' },
  { title: 'Culture Night Poster', category: 'Print', image: images.poster, span: 'standard' },
]

const reviews = [
  { name: 'Ayesha Noor', role: 'Founder, Anmol Studio', text: 'The identity feels premium, focused, and unmistakably ours. Every file arrived organized and ready to use.', rating: 5 },
  { name: 'Hamza Iqbal', role: 'Small Business Owner', text: 'Fast communication and an excellent final result. The social media kit gave our launch a professional edge.', rating: 5 },
  { name: 'Sarah Khan', role: 'Marketing Consultant', text: 'Strong creative thinking, careful revisions, and very clean execution. I would happily work with the studio again.', rating: 5 },
]

const faqs = [
  ['How quickly can my project start?', 'Most projects begin within 1–2 business days after the brief and payment confirmation are complete.'],
  ['How many revisions are included?', 'Every package includes a defined revision allowance. Larger identity projects include additional review rounds.'],
  ['Which files do I receive?', 'Final delivery can include JPG, PNG, PDF, SVG, and editable source files depending on the selected package.'],
  ['Can you work with international clients?', 'Yes. Project communication and delivery are fully online, with WhatsApp used for quick updates.'],
  ['How do I confirm a payment?', 'Choose a payment method, send the amount, then upload the transaction screenshot using the payment verification form.'],
]

const prices = [
  { name: 'Starter', price: 'PKR 3,500', note: 'For one focused design need', features: ['1 design concept', '2 revision rounds', 'High-resolution files', '3–4 day delivery'] },
  { name: 'Professional', price: 'PKR 8,500', note: 'For growing brands', features: ['3 design concepts', '4 revision rounds', 'Source files included', 'Social media variations'], featured: true },
  { name: 'Signature', price: 'Custom', note: 'For complete brand systems', features: ['Creative direction', 'Full identity toolkit', 'Priority collaboration', 'Flexible deliverables'] },
]

const submitNetlifyForm = async (form: HTMLFormElement) => {
  const response = await fetch('/__forms.html', { method: 'POST', body: new FormData(form) })
  if (!response.ok) throw new Error('Submission failed')
}

function StudioPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [portfolioFilter, setPortfolioFilter] = useState('All')
  const [testimonial, setTestimonial] = useState(0)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [rating, setRating] = useState(5)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('ksulymin-theme') as 'light' | 'dark' | null
    if (saved) setTheme(saved)
    const timer = window.setTimeout(() => setLoading(false), 850)
    const onScroll = () => setShowTop(window.scrollY > 650)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('ksulymin-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(''), 3600)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal-on-scroll')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => setTestimonial((current) => (current + 1) % reviews.length), 6000)
    return () => window.clearInterval(timer)
  }, [])

  const filteredPortfolio = useMemo(
    () => portfolio.filter((item) => portfolioFilter === 'All' || item.category === portfolioFilter),
    [portfolioFilter],
  )

  const searchResults = useMemo(() => {
    if (!query.trim()) return []
    const terms = [
      ...services.map((item) => ({ title: item[1], href: '#services', type: 'Service' })),
      ...portfolio.map((item) => ({ title: item.title, href: '#portfolio', type: item.category })),
      ...faqs.map((item) => ({ title: item[0], href: '#faq', type: 'FAQ' })),
    ]
    return terms.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 7)
  }, [query])

  const notify = (message: string) => setToast(message)

  const handleForm = (success: string) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    try {
      await submitNetlifyForm(form)
      form.reset()
      setRating(5)
      notify(success)
    } catch {
      notify('Something went wrong. Please try again or contact us on WhatsApp.')
    }
  }

  const copyNumber = async () => {
    await navigator.clipboard.writeText('+923125278796')
    notify('Payment number copied to clipboard.')
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className={`loader ${loading ? '' : 'loader-hidden'}`} aria-hidden={!loading}>
        <div className="loader-mark">KG</div><span>Creative work is loading</span>
      </div>

      <header className="site-header">
        <nav className="nav-wrap" aria-label="Primary navigation">
          <a href="#home" className="brand" aria-label="KSULYMIN Graphics home">
            <span className="brand-mark">KG</span>
            <span><strong>KSULYMIN</strong><small>Graphics Studio</small></span>
          </a>
          <div className="desktop-nav">
            {['Home', 'About', 'Services', 'Portfolio', 'Pricing', 'FAQ'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
            ))}
          </div>
          <div className="nav-actions">
            <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search website"><Search /></button>
            <button className="icon-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
            <a className="button acid desktop-cta" href="#order">Start a project</a>
            <button className="icon-button mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          {['Home', 'About', 'Services', 'Portfolio', 'Pricing', 'FAQ', 'Contact'].map((item) => (
            <a key={item} onClick={() => setMenuOpen(false)} href={`#${item.toLowerCase()}`}>{item}<ArrowUpRight /></a>
          ))}
        </div>
      </header>

      <main id="main-content">
        <section id="home" className="hero grain-section">
          <img src={imageUrl(images.hero, 1800, 1100)} alt="Creative designer reviewing a bold visual identity" fetchPriority="high" />
          <div className="hero-overlay" />
          <div className="section-wrap hero-content">
            <div className="hero-copy reveal-up">
              <p className="eyebrow light"><span />Creative design studio · Pakistan</p>
              <h1>Ideas made <em>visible.</em><br />Brands made <span className="outline">memorable.</span></h1>
              <p>Distinctive graphic design for ambitious people and growing businesses — built with clarity, character, and commercial purpose.</p>
              <div className="button-row">
                <a className="button acid" href="#order">Start your project <ArrowUpRight /></a>
                <a className="button ghost" href="#portfolio">View portfolio <Grid2X2 /></a>
              </div>
            </div>
            <aside className="hero-card glass-card">
              <small>Studio capabilities</small>
              <strong>Brand identity<br />Print design<br />Digital content</strong>
              <span>Available worldwide <i /></span>
            </aside>
          </div>
        </section>

        <section className="stats-band" aria-label="Studio statistics">
          <div className="section-wrap stats-grid">
            <Counter value={250} suffix="+" label="Projects delivered" />
            <Counter value={98} suffix="%" label="Happy clients" />
            <Counter value={7} suffix="+" label="Years creating" />
            <Counter value={24} suffix="h" label="Average response" />
          </div>
        </section>

        <section id="about" className="section paper-section">
          <div className="section-wrap split-grid">
            <div className="image-stack reveal-on-scroll">
              <img src={imageUrl(images.about, 1000, 760)} alt="Designer shaping a visual concept at a studio desk" loading="lazy" />
              <div className="image-badge">Design that works as hard as you do.</div>
            </div>
            <div className="content-block reveal-on-scroll">
              <p className="eyebrow">About the studio</p>
              <h2 className="section-title">Thoughtful design.<br /><em>Real business impact.</em></h2>
              <p className="lead">KSULYMIN Graphics transforms ideas into confident visual systems. Every project balances originality, practical thinking, and polished craft.</p>
              <div className="principles">
                <div><span><Sparkles /></span><p><strong>Original by design</strong>Every concept begins with your story, not a template.</p></div>
                <div><span><Search /></span><p><strong>Detail obsessed</strong>Typography, spacing, and delivery files are carefully refined.</p></div>
                <div><span><MessageCircle /></span><p><strong>Easy collaboration</strong>Clear updates, honest advice, and a friendly revision process.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section ink-section grain-section">
          <div className="section-wrap">
            <div className="section-heading inverse">
              <div><p className="eyebrow light">What we create</p><h2 className="section-title">Creative services.<br /><em>One clear standard.</em></h2></div>
              <p>From a single business card to a complete brand system, every deliverable is shaped to look sharp and work beautifully.</p>
            </div>
            <div className="service-grid">
              {services.map(([number, title, Icon]) => (
                <article className="service-card reveal-on-scroll" key={title}>
                  <span className="service-icon"><Icon /></span><small>{number}</small><h3>{title}</h3><ArrowUpRight className="service-arrow" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="section paper-section">
          <div className="section-wrap">
            <div className="section-heading">
              <div><p className="eyebrow">Selected work</p><h2 className="section-title">Designed to <em>stand apart.</em></h2></div>
              <p>A selection of identity, print, document, and social design crafted for real-world use.</p>
            </div>
            <div className="filter-row" role="group" aria-label="Portfolio filters">
              {['All', 'Logo', 'Branding', 'Documents', 'Print', 'Social'].map((filter) => (
                <button className={portfolioFilter === filter ? 'active' : ''} onClick={() => setPortfolioFilter(filter)} key={filter}>{filter}</button>
              ))}
            </div>
            <div className="portfolio-grid">
              {filteredPortfolio.map((item, index) => (
                <article className={`portfolio-card ${item.span}`} key={item.title}>
                  <img src={imageUrl(item.image, item.span === 'wide' ? 1100 : 760, 700)} alt={`${item.title} graphic design project`} loading="lazy" />
                  <div><span>0{index + 1} · {item.category}</span><h3>{item.title}</h3><ArrowUpRight /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="section soft-section">
          <div className="section-wrap">
            <div className="center-heading"><p className="eyebrow">Straightforward pricing</p><h2 className="section-title">A clear place to <em>begin.</em></h2><p>Final pricing depends on scope. These popular starting points make planning easier.</p></div>
            <div className="pricing-grid">
              {prices.map((price) => (
                <article className={`price-card ${price.featured ? 'featured' : ''}`} key={price.name}>
                  {price.featured && <span className="popular">Most popular</span>}
                  <p>{price.name}</p><h3>{price.price}</h3><small>{price.note}</small>
                  <ul>{price.features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul>
                  <a href="#order" className={`button ${price.featured ? 'acid' : 'outline-button'}`}>Choose {price.name}<ArrowRight /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section ink-section testimonial-section" aria-label="Client testimonials">
          <div className="section-wrap testimonial-wrap">
            <div className="quote-mark">“</div>
            <div className="stars" aria-label={`${reviews[testimonial].rating} out of 5 stars`}>{Array.from({ length: 5 }).map((_, index) => <Star key={index} fill="currentColor" />)}</div>
            <blockquote>{reviews[testimonial].text}</blockquote>
            <p><strong>{reviews[testimonial].name}</strong><span>{reviews[testimonial].role}</span></p>
            <div className="slider-controls">
              <button onClick={() => setTestimonial((testimonial - 1 + reviews.length) % reviews.length)} aria-label="Previous testimonial"><ChevronLeft /></button>
              <span>{testimonial + 1} / {reviews.length}</span>
              <button onClick={() => setTestimonial((testimonial + 1) % reviews.length)} aria-label="Next testimonial"><ChevronRight /></button>
            </div>
          </div>
        </section>

        <section id="reviews" className="section paper-section">
          <div className="section-wrap">
            <div className="section-heading"><div><p className="eyebrow">Customer reviews</p><h2 className="section-title">Kind words.<br /><em>Five-star energy.</em></h2></div><p>Trusted by entrepreneurs, professionals, and growing brands who value good design and clear communication.</p></div>
            <div className="review-grid">
              {reviews.map((review) => <article className="review-card" key={review.name}><div className="stars">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} fill="currentColor" />)}</div><p>“{review.text}”</p><footer><span>{review.name.charAt(0)}</span><div><strong>{review.name}</strong><small>{review.role}</small></div></footer></article>)}
            </div>
          </div>
        </section>

        <section id="order" className="section order-section grain-section">
          <div className="section-wrap form-split">
            <div className="form-intro"><p className="eyebrow light">Start a project</p><h2 className="section-title">Tell us what you’re <em>building.</em></h2><p>Share the essentials and the studio responds on WhatsApp with the best next step.</p><ul><li><Check />Clear project guidance</li><li><Check />Private file handling</li><li><Check />No-obligation quote</li></ul></div>
            <form name="order" className="studio-form light-form" encType="multipart/form-data" onSubmit={handleForm('Your project request is in. We’ll reply on WhatsApp soon.')}>
              <input type="hidden" name="form-name" value="order" /><Honeypot />
              <div className="field-grid"><Field label="Your name" name="name" required /><Field label="WhatsApp number" name="whatsapp" type="tel" required /><SelectField label="Service" name="service" options={services.map((item) => item[1])} /><Field label="Budget (PKR)" name="budget" type="number" required /><Field label="Preferred deadline" name="deadline" type="date" required /><FileField label="Reference file (max 8MB)" name="attachment" /></div>
              <label className="full-field">Project details<textarea name="details" rows={5} placeholder="What do you need, and what should the design achieve?" required /></label>
              <button className="button acid submit-button" type="submit">Send project brief <Send /></button>
            </form>
          </div>
        </section>

        <section id="payment" className="section paper-section">
          <div className="section-wrap payment-layout">
            <div><p className="eyebrow">Secure payment</p><h2 className="section-title">Simple local <em>payment.</em></h2><p className="lead">Use either digital wallet below, then upload the transaction screenshot for verification.</p>
              <div className="payment-methods">
                <PaymentCard name="Easypaisa Digital Bank" account="Member Khan" onCopy={copyNumber} />
                <PaymentCard name="JazzCash" account="MAMBAR KHAN" onCopy={copyNumber} />
              </div>
            </div>
            <form name="payment-verification" className="studio-form payment-form" encType="multipart/form-data" onSubmit={handleForm('Payment proof received. Verification is now pending.')}>
              <input type="hidden" name="form-name" value="payment-verification" /><Honeypot />
              <span className="form-icon"><Upload /></span><h3>Verify your payment</h3><p>Upload a clear screenshot showing the transaction ID and amount.</p>
              <Field label="Your name" name="name" required /><Field label="WhatsApp number" name="whatsapp" type="tel" required /><SelectField label="Payment method" name="method" options={['Easypaisa Digital Bank', 'JazzCash']} /><Field label="Amount paid (PKR)" name="amount" type="number" required /><FileField label="Payment screenshot (max 8MB)" name="screenshot" required />
              <button className="button ink-button submit-button" type="submit">I’ve Paid <Check /></button>
              <small className="verification-note"><Clock3 />Verification usually takes up to 24 hours.</small>
            </form>
          </div>
        </section>

        <section id="feedback" className="section soft-section">
          <div className="section-wrap feedback-layout">
            <div><p className="eyebrow">Share your experience</p><h2 className="section-title">Your feedback helps us <em>grow.</em></h2><p className="lead">Completed a project with us? Tell us what worked and what could be even better.</p></div>
            <form name="feedback" className="studio-form" onSubmit={handleForm('Thank you! Your feedback has been submitted.')}>
              <input type="hidden" name="form-name" value="feedback" /><input type="hidden" name="rating" value={rating} /><Honeypot />
              <div className="field-grid"><Field label="Your name" name="name" required /><Field label="WhatsApp number" name="whatsapp" type="tel" required /><Field label="Email (optional)" name="email" type="email" /></div>
              <fieldset className="rating-field"><legend>Your rating</legend><div>{[1, 2, 3, 4, 5].map((star) => <button type="button" key={star} onClick={() => setRating(star)} aria-label={`${star} star${star > 1 ? 's' : ''}`}><Star fill={star <= rating ? 'currentColor' : 'none'} /></button>)}</div></fieldset>
              <label className="full-field">Feedback message<textarea name="message" rows={5} placeholder="Tell us about your experience..." required /></label>
              <button className="button ink-button submit-button" type="submit">Submit feedback <Send /></button>
            </form>
          </div>
        </section>

        <section id="faq" className="section paper-section">
          <div className="section-wrap faq-layout">
            <div className="faq-intro"><p className="eyebrow">Frequently asked</p><h2 className="section-title">Good questions.<br /><em>Clear answers.</em></h2><p>Still curious? A quick WhatsApp message is always welcome.</p><a href="https://wa.me/923125278796" target="_blank" rel="noreferrer" className="text-link">Ask on WhatsApp <ArrowUpRight /></a></div>
            <div className="faq-list">{faqs.map(([question, answer], index) => <article className={faqOpen === index ? 'open' : ''} key={question}><button onClick={() => setFaqOpen(faqOpen === index ? null : index)} aria-expanded={faqOpen === index}><span>{question}</span><ChevronDown /></button><div><p>{answer}</p></div></article>)}</div>
          </div>
        </section>

        <section className="map-news-section">
          <div className="map-panel"><iframe title="Map showing KSULYMIN Graphics service area in Pakistan" src="https://www.google.com/maps?q=Pakistan&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          <div className="newsletter-panel grain-section"><div><p className="eyebrow light">Studio notes</p><h2>Fresh ideas in your inbox.</h2><p>Occasional design tips, new work, and studio updates. Useful, concise, never noisy.</p><form name="newsletter" onSubmit={handleForm('You’re on the list. Welcome to Studio Notes!')}><input type="hidden" name="form-name" value="newsletter" /><Honeypot /><label><span className="sr-only">Email address</span><Mail /><input name="email" type="email" placeholder="Your email address" required /></label><button type="submit" aria-label="Subscribe"><ArrowRight /></button></form></div></div>
        </section>

        <section id="contact" className="section contact-section ink-section grain-section">
          <div className="section-wrap contact-layout"><div><p className="eyebrow light">Let’s make something</p><h2 className="section-title">Ready when <em>you are.</em></h2><p>Have a project in mind? Start with a friendly WhatsApp conversation.</p><a href="https://wa.me/923125278796" target="_blank" rel="noreferrer" className="button acid">Chat on WhatsApp <MessageCircle /></a></div><div className="contact-links"><SocialLink icon={<MessageCircle />} label="WhatsApp" href="https://wa.me/923125278796" /><SocialLink icon={<Instagram />} label="Instagram" href="https://www.instagram.com/KsulyminGraphicsOfficial" /><SocialLink icon={<Music2 />} label="TikTok" href="https://www.tiktok.com/@ksulymingraphicsofficial" /><SocialLink icon={<Facebook />} label="Facebook" href="https://www.facebook.com/KSULYMINGraphicsCo" /><SocialLink icon={<BriefcaseBusiness />} label="Fiverr" href="https://www.fiverr.com/" /><SocialLink icon={<UserRoundCheck />} label="Upwork" href="https://www.upwork.com/" /><SocialLink icon={<Laptop />} label="Freelancer" href="https://www.freelancer.com/" /></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="section-wrap"><a href="#home" className="brand"><span className="brand-mark">KG</span><span><strong>KSULYMIN</strong><small>Graphics Studio</small></span></a><p>Creative design for ambitious ideas.</p><nav aria-label="Footer navigation"><a href="#about">About</a><a href="#services">Services</a><a href="#portfolio">Portfolio</a><a href="#contact">Contact</a></nav><small>© 2026 KSULYMIN Graphics Studio. All rights reserved.</small></div></footer>

      <a className="whatsapp-float" href="https://wa.me/923125278796" target="_blank" rel="noreferrer" aria-label="Chat with KSULYMIN Graphics on WhatsApp"><MessageCircle /><span>Chat with us</span></a>
      <button className={`back-top ${showTop ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><ArrowUp /></button>
      {toast && <div className="toast" role="status"><Check /><span>{toast}</span><button onClick={() => setToast('')} aria-label="Dismiss notification"><X /></button></div>}

      {searchOpen && <div className="search-modal" role="dialog" aria-modal="true" aria-label="Website search" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false) }}><div><button className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X /></button><label><Search /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services, projects, or questions..." /></label><div className="search-results">{query && !searchResults.length && <p>No results found. Try “logo” or “payment”.</p>}{searchResults.map((result) => <a key={`${result.type}-${result.title}`} href={result.href} onClick={() => { setSearchOpen(false); setQuery('') }}><span><small>{result.type}</small>{result.title}</span><ArrowUpRight /></a>)}</div></div></div>}
    </div>
  )
}

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const start = performance.now()
      const animate = (time: number) => {
        const progress = Math.min((time - start) / 1200, 1)
        setCount(Math.floor(value * (1 - Math.pow(1 - progress, 3))))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: 0.5 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [value])
  return <div className="stat" ref={ref}><strong>{count}{suffix}</strong><span>{label}</span></div>
}

function Honeypot() { return <label className="honeypot">Do not fill this out<input name="bot-field" tabIndex={-1} autoComplete="off" /></label> }

function Field({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label>{label}<input name={name} type={type} required={required} /></label>
}

function SelectField({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  return <label>{label}<select name={name} required defaultValue=""><option value="" disabled>Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}

function FileField({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  const [fileName, setFileName] = useState('Choose a file')
  return <label className="file-field">{label}<span><Upload /><b>{fileName}</b><input name={name} type="file" accept="image/*,.pdf,.doc,.docx" required={required} onChange={(event: ChangeEvent<HTMLInputElement>) => setFileName(event.target.files?.[0]?.name || 'Choose a file')} /></span></label>
}

function PaymentCard({ name, account, onCopy }: { name: string; account: string; onCopy: () => void }) {
  return <article className="payment-card"><div><span>{name === 'JazzCash' ? 'JC' : 'EP'}</span><p><strong>{name}</strong><small>Digital wallet</small></p></div><dl><div><dt>Number</dt><dd>(+92) 312 5278796</dd></div><div><dt>Account name</dt><dd>{account}</dd></div></dl><button onClick={onCopy} type="button"><Copy />Copy number</button></article>
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return <a href={href} target="_blank" rel="noreferrer"><span>{icon}{label}</span><ArrowUpRight /></a>
}
