import Nav from './Nav'

const REPO = 'https://github.com/mansiverma897993/noz-in'

export default function Method() {
  return (
    <main>
      <Nav />

      <article className="method">
        <header className="method-head">
          <p className="eyebrow">The method</p>
          <h1 className="method-title">Every query migrates.<br />Only proof earns native.</h1>
          <p className="method-lead">
            A Grafana dashboard is hundreds of PromQL queries, and PromQL does not mean
            the same thing on SigNoz. noz-in never guesses. It rests on one floor and one
            invariant, and it tells you the truth about every query it touches.
          </p>
        </header>

        <section className="method-section">
          <h2>The floor</h2>
          <p>
            Every query always migrates. When a PromQL query cannot be proven equivalent
            to a native SigNoz Builder query, the verbatim PromQL is emitted and SigNoz
            runs it directly. One hundred percent of dashboards come out the other side
            rendering — nothing is silently dropped, and every decision carries a stable
            reason code you can read.
          </p>
        </section>

        <section className="method-section">
          <h2>The invariant</h2>
          <p>
            Nothing is emitted as <em>native</em> on a parser's opinion. Before a Builder
            query is promoted, it is executed against your live SigNoz alongside its own
            PromQL passthrough and compared point for point — including a one-step temporal
            phase-shift check that a magnitude tolerance alone would miss. Native stops
            being a claim and becomes a measurement.
          </p>
        </section>

        <section className="method-section">
          <h2>Three roads</h2>
          <dl className="roads">
            <div className="road">
              <dt>native</dt>
              <dd>A Builder query proven equivalent on your live data. Restores drilldown and click-to-filter.</dd>
            </div>
            <div className="road">
              <dt>passthrough</dt>
              <dd>Verified PromQL that SigNoz executes directly. The safe floor — always renders.</dd>
            </div>
            <div className="road">
              <dt>needs review</dt>
              <dd>Genuinely ambiguous. Flagged with a reason code instead of guessed.</dd>
            </div>
          </dl>
        </section>

        <section className="method-section">
          <h2>How native is earned</h2>
          <p>
            SigNoz's <code>latest</code> labels each bucket at its start; PromQL evaluates
            at the boundary. The two can be numerically identical yet one step apart in
            time. A magnitude-only check would call that a match — noz-in refuses it. The
            differential is phase-aware: it will not adopt a shifted result, no matter how
            close the numbers are.
          </p>
        </section>

        <section className="method-section">
          <h2>Propose, verify, adopt</h2>
          <p>
            Where equivalence cannot be proven deterministically, an agent may propose a
            Builder query — but the CLI verifies it against live data before anything is
            adopted. Proposed by the agent, proven by the tool. The worst a wrong proposal
            can do is stay passthrough.
          </p>
        </section>

        <div className="method-cta">
          <a className="btn-cta" href={REPO}>Read the code</a>
          <a className="method-link" href={`${REPO}#reproduce`}>Reproduce it locally &rarr;</a>
        </div>
      </article>
    </main>
  )
}
