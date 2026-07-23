import { useEffect, useRef } from 'react'
import Nav from './Nav'
import grafanaLogo from './logos/grafana.svg'
import signozLogo from './logos/signoz.svg'
import prometheusLogo from './logos/prometheus.svg'
import kubernetesLogo from './logos/kubernetes.svg'
import istioLogo from './logos/istio.svg'
import thanosLogo from './logos/thanos.svg'

const REPO = 'https://github.com/mansiverma897993/noz-in'

// noz-in mark (center): flow ">>" into a target bar — "migrate into".
function NozInMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-label="noz-in">
      <path d="M3 7.5 L7 12 L3 16.5" />
      <path d="M9.5 7.5 L13.5 12 L9.5 16.5" />
      <path d="M18 5 L18 19" stroke="#7190f9" />
    </svg>
  )
}

const brands: { name: string; logo: string }[] = [
  { name: 'Grafana', logo: grafanaLogo },
  { name: 'Prometheus', logo: prometheusLogo },
  { name: 'Kubernetes', logo: kubernetesLogo },
  { name: 'Istio', logo: istioLogo },
  { name: 'Thanos', logo: thanosLogo },
]

export default function Home() {
  const pipelineRef = useRef<HTMLDivElement>(null)
  const nodeStackRef = useRef<HTMLDivElement>(null)
  const nodeXRef = useRef<HTMLDivElement>(null)
  const nodeShieldRef = useRef<HTMLDivElement>(null)
  const glowPathRef = useRef<SVGPathElement>(null)
  const corePathRef = useRef<SVGPathElement>(null)
  const gradientRef = useRef<SVGLinearGradientElement>(null)
  const splashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pipeline = pipelineRef.current
    const nodeStack = nodeStackRef.current
    const nodeX = nodeXRef.current
    const nodeShield = nodeShieldRef.current
    const glowPath = glowPathRef.current
    const corePath = corePathRef.current
    const gradient = gradientRef.current
    const splash = splashRef.current
    if (!pipeline || !nodeStack || !nodeX || !nodeShield || !glowPath || !corePath || !gradient || !splash) return

    const computePath = () => {
      const pRect = pipeline.getBoundingClientRect()
      const sRect = nodeStack.getBoundingClientRect()
      const xRect = nodeX.getBoundingClientRect()
      const shRect = nodeShield.getBoundingClientRect()
      const startX = sRect.left + sRect.width / 2 - pRect.left
      const startY = sRect.top + sRect.height / 2 - pRect.top
      const midX = xRect.left + xRect.width / 2 - pRect.left
      const midY = xRect.top + xRect.height / 2 - pRect.top
      const endX = shRect.left + shRect.width / 2 - pRect.left
      const endY = shRect.top + shRect.height / 2 - pRect.top
      const d = `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`
      glowPath.setAttribute('d', d)
      corePath.setAttribute('d', d)
    }

    const setGradient = (percentage: number) => {
      const center = percentage * 100
      gradient.setAttribute('x1', `${center - 5}%`)
      gradient.setAttribute('x2', `${center + 5}%`)
      gradient.setAttribute('y1', '0%')
      gradient.setAttribute('y2', '0%')
    }

    computePath()
    const onResize = () => computePath()
    window.addEventListener('resize', onResize)

    // Respect reduced-motion: draw a static, fully-lit beam and skip the loop.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setGradient(0.5)
      glowPath.style.opacity = '0.6'
      corePath.style.opacity = ''
      return () => window.removeEventListener('resize', onResize)
    }

    type Phase = 'p1' | 'splash' | 'p2' | 'idle'
    let state: Phase = 'p1'
    let lastStateChange = performance.now()
    let raf = 0

    const setBeamVisible = (visible: boolean) => {
      glowPath.style.opacity = visible ? '0.6' : '0'
      corePath.style.opacity = visible ? '' : '0'
    }

    const loop = (now: number) => {
      const elapsed = now - lastStateChange
      if (state === 'p1') {
        const p = Math.min(elapsed / 800, 1)
        setGradient(p * 0.5)
        if (p < 0.4) nodeStack.classList.add('active')
        else nodeStack.classList.remove('active')
        if (p >= 1) {
          nodeStack.classList.remove('active')
          state = 'splash'; lastStateChange = now
          setBeamVisible(false)
          splash.classList.add('animate')
        }
      } else if (state === 'splash') {
        if (elapsed >= 800) {
          state = 'p2'; lastStateChange = now
          splash.classList.remove('animate')
          setBeamVisible(true)
        }
      } else if (state === 'p2') {
        const p = Math.min(elapsed / 800, 1)
        setGradient(0.5 + p * 0.5)
        if (p > 0.6) nodeShield.classList.add('active')
        if (p >= 1) {
          nodeShield.classList.remove('active')
          state = 'idle'; lastStateChange = now
        }
      } else {
        if (elapsed >= 1000) { state = 'p1'; lastStateChange = now }
      }
      raf = requestAnimationFrame(loop)
    }

    setGradient(0)
    setBeamVisible(true)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <main className="home">
      <Nav />

      <section className="hero-card">
        <div className="hero-grid" aria-hidden="true" />

        <div className="icon-pipeline" ref={pipelineRef} id="how">
          <svg className="beam-svg" aria-hidden="true">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse" ref={gradientRef}>
                <stop offset="0%" stopColor="#4e74f8" stopOpacity="0" />
                <stop offset="20%" stopColor="#4e74f8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="80%" stopColor="#23c4f8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#23c4f8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path ref={glowPathRef} stroke="url(#beam-gradient)" strokeWidth={2} fill="none" filter="url(#glow)" style={{ opacity: 0.6 }} />
            <path ref={corePathRef} stroke="url(#beam-gradient)" strokeWidth={0.8} fill="none" />
          </svg>

          <div className="icon-node node-light-right" id="node-stack" ref={nodeStackRef} title="Grafana"><img src={grafanaLogo} alt="Grafana" /></div>
          <div className="pipeline-line" />
          <div className="center-wrap">
            <div className="splash" ref={splashRef} aria-hidden="true" />
            <div className="icon-node-center" id="node-x" ref={nodeXRef} title="noz-in"><NozInMark /></div>
          </div>
          <div className="pipeline-line right" />
          <div className="icon-node node-light-left" id="node-shield" ref={nodeShieldRef} title="SigNoz"><img src={signozLogo} alt="SigNoz" /></div>
        </div>

        <div className="hero-content">
          <h1 className="hero-heading">
            The honest way to
            <strong>migrate into SigNoz</strong>
          </h1>
          <p className="hero-sub">
            Every Grafana dashboard migrates in seconds. Only what's proven equivalent on
            your live data becomes native. It never claims a conversion it can't prove.
          </p>
          <a href={`${REPO}#reproduce`} className="btn-cta">Get Started</a>
        </div>
      </section>

      <p className="brands-caption">Proven against real dashboards from</p>
      <div className="marquee" role="group" aria-label="Dashboard sources noz-in migrates from: Grafana, Prometheus, Kubernetes, Istio, Thanos">
        <div className="marquee-track">
          <ul className="marquee-group">
            {brands.map((b) => (
              <li className="brand-item" key={b.name}>
                <img src={b.logo} alt={b.name} />
                <span>{b.name}</span>
              </li>
            ))}
          </ul>
          <ul className="marquee-group" aria-hidden="true">
            {brands.map((b) => (
              <li className="brand-item" key={b.name + '-dup'}>
                <img src={b.logo} alt="" />
                <span>{b.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
