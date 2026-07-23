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
            A Grafana dashboard is hundreds of PromQL queries, and PromQL doesn't mean the
            same thing on SigNoz. noz-in never guesses. It's built on one floor and one
            invariant, and it's honest about what it does to every query.
          </p>
        </header>

        <section className="method-section">
          <h2>The floor</h2>
          <p>
            Every query migrates. When a query can't be proven equivalent to a native
            Builder query, noz-in emits the PromQL verbatim and SigNoz runs it. Every
            dashboard renders. Nothing gets dropped without a reason code you can read.
          </p>
        </section>

        <section className="method-section">
          <h2>The invariant</h2>
          <p>
            noz-in won't call a query <em>native</em> on a parser's opinion. Before it
            promotes a Builder query, it runs that query and its own PromQL against your
            live SigNoz and compares them point by point. That includes a one-step phase
            shift a magnitude check would miss. Native stops being a claim and becomes a
            measurement.
          </p>
        </section>

        <section className="method-section">
          <h2>Three roads</h2>
          <dl className="roads">
            <div className="road">
              <dt>native</dt>
              <dd>A Builder query proven equivalent on your live data. Brings back drilldown and click-to-filter.</dd>
            </div>
            <div className="road">
              <dt>passthrough</dt>
              <dd>Verified PromQL that SigNoz runs directly. This is the floor, and it always renders.</dd>
            </div>
            <div className="road">
              <dt>needs review</dt>
              <dd>Genuinely ambiguous, so it's flagged with a reason code instead of guessed.</dd>
            </div>
          </dl>
        </section>

        <section className="method-section">
          <h2>How native is earned</h2>
          <p>
            SigNoz's <code>latest</code> labels each bucket at its start; PromQL evaluates
            at the boundary. The two can be numerically identical yet one step apart in
            time. A magnitude-only check would call that a match. noz-in refuses it: the
            differential is phase-aware, so it won't adopt a shifted result no matter how
            close the numbers are.
          </p>
        </section>

        <section className="method-section">
          <h2>Propose, verify, adopt</h2>
          <p>
            When equivalence can't be proven deterministically, an agent can propose a
            Builder query. The CLI still verifies it against live data before it's adopted.
            Proposed by the agent, proven by the tool. The worst a wrong proposal can do is
            stay passthrough.
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
