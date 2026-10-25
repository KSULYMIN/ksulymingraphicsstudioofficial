import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
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
  { title: 'Logo concept study', category: 'Logo', image: images.logo, span: 'wide' },
  { title: 'Brand identity direction', category: 'Branding', image: images.brand, span: 'standard' },
  { title: 'Executive CV layout', category: 'Documents', image: images.cv, span: 'standard' },
  { title: 'Business stationery direction', category: 'Print', image: images.business, span: 'standard' },
  { title: 'Social launch concept', category: 'Social', image: images.social, span: 'standard' },
  { title: 'Event poster direction', category: 'Print', image: images.poster, span: 'standard' },
]

const processSteps = [
  { number: '01', title: 'Brief & goals', text: 'We clarify your audience, requirements, deliverables, budget, and deadline before design work begins.' },
  { number: '02', title: 'Concept direction', text: 'The chosen package defines the concepts and design direction that will be explored.' },
  { number: '03', title: 'Review & refine', text: 'Feedback is handled within the revision rounds agreed for your project.' },
  { number: '04', title: 'Final handover', text: 'Approved files are prepared in the formats and deliverables agreed at the start.' },
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

const createProjectReference = () =>
  `KG-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).padEnd(6, '0').toUpperCase()}`

const submitNetlifyForm = async (form: HTMLFormElement, extraFields: Record<string, string> = {}) => {
  const formData = new FormData(form)
  Object.entries(extraFields).forEach(([key, value]) => formData.set(key, value))
  const hasFiles = Array.from(form.querySelectorAll<HTMLInputElement>('input[type="file"]'))
    .some((input) => Boolean(input.files?.length))

  const requestInit: RequestInit = hasFiles
    ? { method: 'POST', body: formData }
    : {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          Array.from(formData.entries()).map(([key, value]) => [
            key,
            typeof value === 'string' ? value : value.name,
          ]),
        ),
      }

  const response = await fetch('/__forms.html', requestInit)
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
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [rating, setRating] = useState(5)
  const [showTop, setShowTop] = useState(false)
  const [submittingForms, setSubmittingForms] = useState<string[]>([])
  const [projectReference, setProjectReference] = useState('')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('ksulymin-theme') as 'light' | 'dark' | null
      if (saved === 'light' || saved === 'dark') setTheme(saved)
      const savedReference = window.localStorage.getItem('ksulymin-project-reference')
      if (savedReference && /^KG-\d{4}-[A-Z0-9]{6}$/.test(savedReference)) {
        setProjectReference(savedReference)
      }
    } catch {
      // The site remains usable when browser storage is disabled.
    }
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
    try {
      window.localStorage.setItem('ksulymin-theme', theme)
    } catch {
      // Theme still applies for this session when storage is unavailable.
    }
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

  const filteredPortfolio = useMemo(
    () => portfolio.filter((item) => portfolioFilter === 'All' || item.category === portfolioFilter),
    [portfolioFilter],
  )

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    if (!normalizedQuery) return []

    const terms = [
      ...services.map((item) => ({ title: item[1], href: '#services', type: 'Service' })),
      ...portfolio.map((item) => ({ title: item.title, href: '#portfolio', type: item.category })),
      ...prices.map((item) => ({ title: item.name + ' package ' + item.price, href: '#pricing', type: 'Pricing' })),
      ...processSteps.map((item) => ({ title: item.title, href: '#process', type: 'Process' })),
      ...faqs.map((item) => ({ title: item[0], href: '#faq', type: 'FAQ' })),
    ]

    return terms
      .filter((item) => item.title.toLocaleLowerCase().includes(normalizedQuery))
      .slice(0, 8)
  }, [query])

  const notify = (message: string) => setToast(message)
  const isSubmitting = (formName: string) => submittingForms.includes(formName)

  const handleForm = (success: string) => async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formName = form.name

    // The DOM guard prevents a second rapid submit before React rerenders.
    if (form.dataset.submitting === 'true') return
    form.dataset.submitting = 'true'
    setSubmittingForms((current) => [...new Set([...current, formName])])

    const reference = formName === 'order' ? createProjectReference() : ''
    try {
      await submitNetlifyForm(form, reference ? { project_reference: reference } : {})
      form.reset()
      if (formName === 'feedback') setRating(5)
      if (reference) {
        setProjectReference(reference)
        try {
          window.localStorage.setItem('ksulymin-project-reference', reference)
        } catch {
          // The confirmation stays visible for the current session.
        }
        notify(`${success} Reference: ${reference}.`)
      } else {
        notify(success)
      }
    } catch {
      notify('We could not confirm this submission. Please retry once, or contact us on WhatsApp if the problem continues.')
    } finally {
      form.dataset.submitting = 'false'
      setSubmittingForms((current) => current.filter((name) => name !== formName))
    }
  }

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText('+923125278796')
      notify('Payment number copied to clipboard.')
    } catch {
      notify('Automatic copy was unavailable. Please copy +923125278796 manually.')
    }
  }

  const copyProjectReference = async () => {
    if (!projectReference) return
    try {
      await navigator.clipboard.writeText(projectReference)
      notify('Project reference copied to clipboard.')
    } catch {
      notify(`Copy unavailable. Your project reference is ${projectReference}.`)
    }
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

        <section className="stats-band" aria-label="How the studio works">
          <div className="section-wrap stats-grid">
            <div className="stat"><strong>Brief-first</strong><span>Goals agreed upfront</span></div>
            <div className="stat"><strong>Clear scope</strong><span>Deliverables defined</span></div>
            <div className="stat"><strong>Revisions</strong><span>Included in each package</span></div>
            <div className="stat"><strong>Digital</strong><span>Remote collaboration</span></div>
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
              <div><p className="eyebrow">Visual directions</p><h2 className="section-title">Designed to <em>stand apart.</em></h2></div>
              <p>Visual directions across identity, print, documents, and social design. Client case studies should be published only when the studio has permission to show the work.</p>
            </div>
            <div className="filter-row" role="group" aria-label="Portfolio filters">
              {['All', 'Logo', 'Branding', 'Documents', 'Print', 'Social'].map((filter) => (
                <button className={portfolioFilter === filter ? 'active' : ''} onClick={() => setPortfolioFilter(filter)} key={filter}>{filter}</button>
              ))}
            </div>
            <div className="portfolio-grid">
              {filteredPortfolio.map((item, index) => (
                <article className={`portfolio-card ${item.span}`} key={item.title}>
                  <img src={imageUrl(item.image, item.span === 'wide' ? 1100 : 760, 700)} alt={`${item.title} visual direction reference`} loading="lazy" />
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

        <section id="process" className="section ink-section">
          <div className="section-wrap">
            <div className="section-heading inverse">
              <div><p className="eyebrow light">How projects move</p><h2 className="section-title">Clear steps.<br /><em>Better collaboration.</em></h2></div>
              <p>A simple process makes scope, communication, revisions, and delivery easier to understand before a project starts.</p>
            </div>
            <div className="service-grid process-grid">
              {processSteps.map((step) => (
                <article className="service-card process-card" key={step.number}>
                  <span className="process-step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="working-standards" className="section paper-section">
          <div className="section-wrap">
            <div className="section-heading">
              <div><p className="eyebrow">A transparent working style</p><h2 className="section-title">Trust is built <em>into the process.</em></h2></div>
              <p>Authentic client testimonials and completed case studies should be published only when the studio has confirmed permission and supporting details.</p>
            </div>
            <div className="review-grid">
              <article className="review-card"><h3>Defined deliverables</h3><p>Agree the scope, file formats, usage, timeline, and included deliverables before work starts.</p></article>
              <article className="review-card"><h3>Clear revisions</h3><p>Use the revision allowance in the selected package and confirm extra work before proceeding.</p></article>
              <article className="review-card"><h3>Honest proof</h3><p>Show real client feedback and portfolio work only when it is authentic and approved for public display.</p></article>
            </div>
          </div>
        </section>

        <section id="order" className="section order-section grain-section">
          <div className="section-wrap form-split">
            <div className="form-intro"><p className="eyebrow light">Start a project</p><h2 className="section-title">Tell us what you’re <em>building.</em></h2><p>Share the essentials and the studio responds on WhatsApp with the best next step.</p><ul><li><Check />Clear project guidance</li><li><Check />Private file handling</li><li><Check />No-obligation quote</li></ul></div>
            <form name="order" className="studio-form light-form" encType="multipart/form-data" onSubmit={handleForm('Your project request is in. We’ll reply on WhatsApp soon.')} aria-busy={isSubmitting('order')}>
              <input type="hidden" name="form-name" value="order" /><input type="hidden" name="project_reference" value={projectReference} /><Honeypot />
              <div className="field-grid"><Field label="Your name" name="name" required autoComplete="name" /><Field label="WhatsApp number" name="whatsapp" type="tel" required autoComplete="tel" /><SelectField label="Service" name="service" options={services.map((item) => item[1])} /><Field label="Budget (PKR)" name="budget" type="number" min={1} step={1} required /><Field label="Preferred deadline" name="deadline" type="date" required /><FileField label="Reference file (max 7 MB)" name="attachment" /></div>
              <label className="full-field">Project details<textarea name="details" rows={5} maxLength={3000} placeholder="What do you need, and what should the design achieve?" required /></label>
              <button className="button acid submit-button" type="submit" disabled={isSubmitting('order')} aria-busy={isSubmitting('order')}>{isSubmitting('order') ? 'Sending brief…' : 'Send project brief'} <Send /></button>
              {projectReference && <div className="project-reference" aria-live="polite"><div><small>Your latest project reference</small><strong>{projectReference}</strong><p>Keep this code and include it when sending payment proof or asking about your project.</p></div><button type="button" onClick={copyProjectReference}><Copy /> Copy reference</button></div>}
            </form>
          </div>
        </section>

        <section id="payment" className="section paper-section">
          <div className="section-wrap payment-layout">
            <div><p className="eyebrow">Manual payment</p><h2 className="section-title">Simple local <em>payment.</em></h2><p className="lead">Transfer using one of the listed wallets, then submit your transaction details for manual verification. This page does not process card payments or automatically confirm transfers.</p>
              <p className="payment-safety">Safety: never share your wallet PIN, password, or one-time verification code (OTP). Confirm the recipient details in your wallet before sending funds.</p>
              <div className="payment-methods">
                <PaymentCard name="Easypaisa Digital Bank" account="Member Khan" onCopy={copyNumber} />
                <PaymentCard name="JazzCash" account="MAMBAR KHAN" onCopy={copyNumber} />
              </div>
            </div>
            <form name="payment-verification" className="studio-form payment-form" encType="multipart/form-data" onSubmit={handleForm('Payment proof received. Verification is now pending.')} aria-busy={isSubmitting('payment-verification')}>
              <input type="hidden" name="form-name" value="payment-verification" /><Honeypot />
              <span className="form-icon"><Upload /></span><h3>Submit payment proof</h3><p>Include the exact transaction ID and amount. The studio will check the transfer manually; sending this form is not payment confirmation.</p>
              <Field label="Your name" name="name" required autoComplete="name" /><Field label="WhatsApp number" name="whatsapp" type="tel" required autoComplete="tel" />
              <label>Project reference (optional)<input name="project_reference" value={projectReference} onChange={(event) => setProjectReference(event.currentTarget.value)} placeholder="e.g. KG-2026-ABC123" autoComplete="off" /></label>
              <SelectField label="Payment method" name="method" options={['Easypaisa Digital Bank', 'JazzCash']} /><Field label="Amount paid (PKR)" name="amount" type="number" min={1} step={1} required /><Field label="Transaction ID / reference" name="transaction_id" required maxLength={120} autoComplete="off" /><FileField label="Payment screenshot (max 7 MB)" name="screenshot" required accept="image/png,image/jpeg,image/webp,image/gif" />
              <button className="button ink-button submit-button" type="submit" disabled={isSubmitting('payment-verification')} aria-busy={isSubmitting('payment-verification')}>{isSubmitting('payment-verification') ? 'Submitting proof…' : 'Submit payment proof'} <Check /></button>
              <small className="verification-note"><Clock3 />Your proof is pending a manual check. Never send a PIN or OTP.</small>
            </form>
          </div>
        </section>

        <section id="feedback" className="section soft-section">
          <div className="section-wrap feedback-layout">
            <div><p className="eyebrow">Share your experience</p><h2 className="section-title">Your feedback helps us <em>grow.</em></h2><p className="lead">Completed a project with us? Tell us what worked and what could be even better.</p></div>
            <form name="feedback" className="studio-form" onSubmit={handleForm('Thank you! Your feedback has been submitted.')} aria-busy={isSubmitting('feedback')}>
              <input type="hidden" name="form-name" value="feedback" /><input type="hidden" name="rating" value={rating} /><Honeypot />
              <div className="field-grid"><Field label="Your name" name="name" required /><Field label="WhatsApp number" name="whatsapp" type="tel" required /><Field label="Email (optional)" name="email" type="email" /></div>
              <fieldset className="rating-field"><legend>Your rating</legend><div>{[1, 2, 3, 4, 5].map((star) => <button type="button" key={star} onClick={() => setRating(star)} aria-label={`${star} star${star > 1 ? 's' : ''}`}><Star fill={star <= rating ? 'currentColor' : 'none'} /></button>)}</div></fieldset>
              <label className="full-field">Feedback message<textarea name="message" rows={5} placeholder="Tell us about your experience..." required /></label>
              <button className="button ink-button submit-button" type="submit" disabled={isSubmitting('feedback')} aria-busy={isSubmitting('feedback')}>{isSubmitting('feedback') ? 'Submitting feedback…' : 'Submit feedback'} <Send /></button>
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
          <div className="newsletter-panel grain-section"><div><p className="eyebrow light">Studio notes</p><h2>Fresh ideas in your inbox.</h2><p>Occasional design tips, new work, and studio updates. Useful, concise, never noisy.</p><form name="newsletter" onSubmit={handleForm('You’re on the list. Welcome to Studio Notes!')} aria-busy={isSubmitting('newsletter')}><input type="hidden" name="form-name" value="newsletter" /><Honeypot /><label><span className="sr-only">Email address</span><Mail /><input name="email" type="email" placeholder="Your email address" autoComplete="email" required /></label><button type="submit" aria-label={isSubmitting('newsletter') ? 'Subscribing' : 'Subscribe'} disabled={isSubmitting('newsletter')}><ArrowRight /></button></form></div></div>
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

function Honeypot() { return <label className="honeypot">Do not fill this out<input name="bot-field" tabIndex={-1} autoComplete="off" /></label> }

function Field({
  label,
  name,
  type = 'text',
  required = false,
  min,
  max,
  step,
  maxLength,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  min?: string | number
  max?: string | number
  step?: string | number
  maxLength?: number
  autoComplete?: string
}) {
  return <label>{label}<input name={name} type={type} required={required} min={min} max={max} step={step} maxLength={maxLength} autoComplete={autoComplete ?? (type === 'tel' ? 'tel' : type === 'email' ? 'email' : undefined)} /></label>
}

function SelectField({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  return <label>{label}<select name={name} required defaultValue=""><option value="" disabled>Select an option</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
}

function FileField({
  label,
  name,
  required = false,
  accept = 'image/*,.pdf,.doc,.docx',
  maxBytes = 7 * 1024 * 1024,
}: {
  label: string
  name: string
  required?: boolean
  accept?: string
  maxBytes?: number
}) {
  const [fileName, setFileName] = useState('Choose a file')

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]
    input.setCustomValidity('')

    if (!file) {
      setFileName('Choose a file')
      return
    }

    if (file.size > maxBytes) {
      input.value = ''
      setFileName('Choose a file')
      input.setCustomValidity('Please choose a file no larger than 7 MB.')
      input.reportValidity()
      return
    }

    const acceptedTypes = accept.split(',').map((item) => item.trim().toLowerCase())
    const accepted = acceptedTypes.some((rule) => {
      if (rule === 'image/*') return file.type.startsWith('image/')
      if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule)
      return file.type.toLowerCase() === rule
    })
    if (!accepted) {
      input.value = ''
      setFileName('Choose a file')
      input.setCustomValidity('Please choose a file in one of the accepted formats.')
      input.reportValidity()
      return
    }

    setFileName(file.name)
  }

  return (
    <label className="file-field">
      {label}
      <span>
        <Upload />
        <b>{fileName}</b>
        <input name={name} type="file" accept={accept} required={required} onChange={handleFileChange} />
      </span>
    </label>
  )
}

function PaymentCard({ name, account, onCopy }: { name: string; account: string; onCopy: () => void }) {
  return <article className="payment-card"><div><span>{name === 'JazzCash' ? 'JC' : 'EP'}</span><p><strong>{name}</strong><small>Digital wallet</small></p></div><dl><div><dt>Number</dt><dd>(+92) 312 5278796</dd></div><div><dt>Account name</dt><dd>{account}</dd></div></dl><button onClick={onCopy} type="button"><Copy />Copy number</button></article>
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return <a href={href} target="_blank" rel="noreferrer"><span>{icon}{label}</span><ArrowUpRight /></a>
}
