import { useEffect, useRef } from 'react'
import Nav from './Nav'
import './scenes.css'

const REPO = 'https://github.com/mansiverma897993/noz-in'

const floorQueries = [
  'node_cpu_seconds_total',
  'rate(http_requests_total[5m])',
  'histogram_quantile(0.99, …)',
  'node_memory_MemAvailable_bytes',
  'node_load1',
]

// typed helper for the --i stagger custom property
const v = (i: number): React.CSSProperties => ({ ['--i' as string]: i } as React.CSSProperties)

export default function Method() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const scenes = Array.from(rootRef.current?.querySelectorAll('.scene') ?? [])
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      scenes.forEach((s) => s.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.3 },
    )
    scenes.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <main ref={rootRef} className="scenes">
      <Nav />

      {/* 1 — intro */}
      <section className="scene scene-intro">
        <p className="eyebrow reveal" style={v(0)}>The method</p>
        <h1 className="kinetic">
          <span className="line reveal" style={v(1)}>Every query migrates.</span>
          <span className="line reveal accent" style={v(2)}>Only proof earns native.</span>
        </h1>
        <p className="scene-lead reveal" style={v(3)}>
          A Grafana dashboard is hundreds of PromQL queries, and PromQL doesn't mean the
          same thing on SigNoz. noz-in never guesses.
        </p>
        <div className="scroll-cue reveal" style={v(4)} aria-hidden="true"><span /></div>
      </section>

      {/* 2 — the floor */}
      <section className="scene scene-split">
        <div className="scene-copy">
          <p className="scene-kicker reveal" style={v(0)}>01 · the floor</p>
          <h2 className="reveal" style={v(1)}>Nothing hits the ground.</h2>
          <p className="reveal" style={v(2)}>
            Every query migrates. When a query can't be proven equivalent to a native
            Builder query, noz-in emits the PromQL verbatim and SigNoz runs it. Every
            dashboard renders, and nothing gets dropped without a reason code you can read.
          </p>
        </div>
        <div className="scene-visual floor-viz" aria-hidden="true">
          <div className="chips">
            {floorQueries.map((q, i) => (
              <span className="chip reveal" style={v(i)} key={q}>{q}</span>
            ))}
          </div>
          <div className="floor-bar reveal" style={v(5)}>
            <span>the floor — every query renders</span>
          </div>
        </div>
      </section>

      {/* 3 — three roads */}
      <section className="scene scene-split reverse">
        <div className="scene-copy">
          <p className="scene-kicker reveal" style={v(0)}>02 · three roads</p>
          <h2 className="reveal" style={v(1)}>Decided, never guessed.</h2>
          <p className="reveal" style={v(2)}>Every query takes one of three roads, and each carries a stable reason code.</p>
          <ul className="road-list">
            <li className="reveal" style={v(3)}><b className="r-native">native</b> proven equivalent on your live data — brings back drilldown</li>
            <li className="reveal" style={v(4)}><b className="r-pass">passthrough</b> verified PromQL that SigNoz runs directly</li>
            <li className="reveal" style={v(5)}><b className="r-review">review</b> genuinely ambiguous, so it's flagged</li>
          </ul>
        </div>
        <div className="scene-visual roads-viz" aria-hidden="true">
          <svg viewBox="0 0 380 260" preserveAspectRatio="xMidYMid meet">
            <circle className="src pop" style={v(0)} cx="22" cy="130" r="9" />
            <path className="road draw" style={v(0)} d="M31 130 C 150 130, 180 44, 288 44" stroke="#4e74f8" />
            <path className="road draw" style={v(1)} d="M31 130 C 150 130, 180 130, 288 130" stroke="#23c4f8" />
            <path className="road draw" style={v(2)} d="M31 130 C 150 130, 180 216, 288 216" stroke="#8b90a0" />
            <g className="end-node pop" style={v(3)}><circle cx="296" cy="44" r="7" fill="#4e74f8" /><text x="310" y="49">native</text></g>
            <g className="end-node pop" style={v(4)}><circle cx="296" cy="130" r="7" fill="#23c4f8" /><text x="310" y="135">passthrough</text></g>
            <g className="end-node pop" style={v(5)}><circle cx="296" cy="216" r="7" fill="#8b90a0" /><text x="310" y="221">review</text></g>
          </svg>
        </div>
      </section>

      {/* 4 — the invariant / phase shift (the money shot) */}
      <section className="scene scene-split">
        <div className="scene-copy">
          <p className="scene-kicker reveal" style={v(0)}>03 · the invariant</p>
          <h2 className="reveal" style={v(1)}>Native is a measurement, not a claim.</h2>
          <p className="reveal" style={v(2)}>
            Before it calls a query native, noz-in runs the Builder query and its own PromQL
            against your live SigNoz and compares them point by point — a one-step phase
            shift a magnitude check would miss. If they're off by a step, it refuses.
          </p>
        </div>
        <div className="scene-visual phase-viz" aria-hidden="true">
          <svg viewBox="0 0 480 250" preserveAspectRatio="xMidYMid meet">
            <text className="axis-note" x="240" y="26">builder[t] = promql[t + 1 step]</text>
            {[[60,150,60,118],[130,90,130,150],[200,66,200,90],[270,112,270,66],[340,160,340,112],[410,84,410,160]].map((g, i) => (
              <line className="gap" style={v(i)} key={i} x1={g[0]} y1={g[1]} x2={g[2]} y2={g[3]} />
            ))}
            <polyline className="wave promql draw" style={v(0)} points="60,150 130,90 200,66 270,112 340,160 410,84" />
            <polyline className="wave builder draw" style={v(1)} points="60,118 130,150 200,90 270,66 340,112 410,160" />
            <g className="verdict-stamp reject">
              <rect x="150" y="196" width="180" height="40" rx="10" />
              <text x="240" y="221">phase shift · refused</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 5 — propose, verify, adopt */}
      <section className="scene scene-center scene-loop">
        <p className="scene-kicker reveal" style={v(0)}>04 · the agent, on a leash</p>
        <h2 className="center-title reveal" style={v(1)}>Proposed by the agent.<br /><span className="accent">Proven by the tool.</span></h2>
        <div className="loop-steps" aria-hidden="true">
          <div className="step reveal" style={v(2)}><b>propose</b><small>an agent suggests a Builder query</small></div>
          <div className="link reveal" style={v(3)} />
          <div className="step reveal" style={v(4)}><b>verify</b><small>live differential on your target</small></div>
          <div className="link reveal" style={v(5)} />
          <div className="step adopt reveal" style={v(6)}><b>ADOPTED</b><small>fidelity = exact</small></div>
        </div>
        <p className="scene-lead center reveal" style={v(7)}>The worst a wrong proposal can do is stay passthrough.</p>
      </section>

      {/* 6 — CTA */}
      <section className="scene scene-center scene-cta">
        <h2 className="center-title reveal" style={v(0)}>Read the code.</h2>
        <div className="method-cta reveal" style={v(1)}>
          <a className="btn-cta" href={REPO}>Read the code</a>
          <a className="method-link" href={`${REPO}#reproduce`}>Reproduce it locally &rarr;</a>
        </div>
      </section>
    </main>
  )
}
