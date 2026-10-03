import { useState } from 'react';
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CircleAlert,
  FileCheck2,
  Gauge,
  Layers3,
  LoaderCircle,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';
import {
  complexities,
  EvaluationRequestSchema,
  EvaluationResultSchema,
  languages,
  type EvaluationRequest,
  type EvaluationResult,
} from '../../../packages/contracts/src/index.js';

const initialForm: EvaluationRequest = {
  assetName: 'API authorization service',
  linesOfCode: 8420,
  language: 'TypeScript',
  complexity: 'high',
  reusePercent: 12,
  hourlyRate: 145,
};

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function updateField<K extends keyof EvaluationRequest>(field: K, value: EvaluationRequest[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function runEstimate() {
    setError('');
    const parsedInput = EvaluationRequestSchema.safeParse(form);
    if (!parsedInput.success) {
      setError(parsedInput.error.issues[0]?.message ?? 'Check the submitted values.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsedInput.data),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        const message = typeof payload === 'object' && payload !== null && 'error' in payload
          ? String(payload.error)
          : 'The estimate could not be calculated.';
        throw new Error(message);
      }

      const parsedResult = EvaluationResultSchema.safeParse(payload);
      if (!parsedResult.success) throw new Error('The API returned an invalid estimate.');
      setResult(parsedResult.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The API could not be reached.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#estimate" aria-label="Cod3Eval workbench">
          <span className="brand-mark">C3</span>
          <span className="brand-name">cod3eval<span>.ai</span></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="primary-nav" aria-label="Workspace">
          <a className="nav-link active" href="#estimate"><Gauge size={17} />Valuation</a>
          <a className="nav-link" href="#methodology"><BookOpen size={17} />Method</a>
          <a className="nav-link" href="#data-handling"><Layers3 size={17} />Evidence</a>
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-foot">
          <span className="api-indicator"><i /> API connected</span>
          <span className="version-label">BUILD 0.1.0</span>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>Workbench</span><span className="crumb-divider">/</span><strong>New estimate</strong></div>
          <div className="topbar-meta"><span className="environment-tag"><span />LOCAL MODEL</span><span className="avatar">N</span></div>
        </header>

        <div className="page-content">
          <section className="page-heading">
            <div>
              <div className="eyebrow"><ScanLine size={14} /> ASSET ANALYSIS</div>
              <h1>Valuation workbench</h1>
              <p>Estimate software replacement cost from explicit, editable assumptions.</p>
            </div>
            <div className="heading-stamp"><span>ESTIMATE ID</span><code>LOCAL / UNSIGNED</code></div>
          </section>

          <div className="workspace-grid">
            <section className="panel input-panel" id="estimate" aria-labelledby="asset-title">
              <div className="panel-heading">
                <div className="panel-icon"><Layers3 size={17} /></div>
                <div><span className="section-index">01 / INPUT</span><h2 id="asset-title">Asset profile</h2></div>
              </div>
              <div className="form-fields">
                <label className="field">
                  <span>Asset name</span>
                  <input value={form.assetName} maxLength={80} onChange={(event) => updateField('assetName', event.target.value)} />
                </label>
                <label className="field">
                  <span>Source lines of code</span>
                  <div className="input-suffix"><input type="number" min="1" max="1000000" value={form.linesOfCode} onChange={(event) => updateField('linesOfCode', Number(event.target.value))} /><em>LOC</em></div>
                </label>
                <div className="field-row">
                  <label className="field">
                    <span>Primary language</span>
                    <select value={form.language} onChange={(event) => updateField('language', event.target.value as EvaluationRequest['language'])}>
                      {languages.map((language) => <option key={language}>{language}</option>)}
                    </select>
                  </label>
                  <label className="field">
                    <span>Complexity</span>
                    <select value={form.complexity} onChange={(event) => updateField('complexity', event.target.value as EvaluationRequest['complexity'])}>
                      {complexities.map((complexity) => <option key={complexity} value={complexity}>{complexity.replace('-', ' ')}</option>)}
                    </select>
                  </label>
                </div>
                <label className="field range-field">
                  <span className="range-label">Reusable code <strong>{form.reusePercent}%</strong></span>
                  <input type="range" min="0" max="95" step="1" value={form.reusePercent} onChange={(event) => updateField('reusePercent', Number(event.target.value))} />
                  <span className="range-ends"><span>New build</span><span>Mostly reused</span></span>
                </label>
                <label className="field">
                  <span>Loaded engineering rate</span>
                  <div className="input-suffix currency-input"><em>$</em><input type="number" min="25" max="1000" step="5" value={form.hourlyRate} onChange={(event) => updateField('hourlyRate', Number(event.target.value))} /><em>USD / HR</em></div>
                </label>
              </div>
              <div className="input-footnote"><CircleAlert size={14} /><span>Inputs are supplied by you and are not independently verified.</span></div>
              <button className="run-button" type="button" onClick={runEstimate} disabled={isLoading}>
                {isLoading ? <LoaderCircle className="spin" size={17} /> : <Activity size={17} />}
                {isLoading ? 'Calculating' : 'Run estimate'}
                {!isLoading && <ArrowUpRight size={16} />}
              </button>
            </section>

            <section className="panel result-panel" aria-labelledby="result-title">
              <div className="result-topline">
                <div className="panel-heading">
                  <div className="panel-icon lime-icon"><Activity size={17} /></div>
                  <div><span className="section-index">02 / OUTPUT</span><h2 id="result-title">Replacement cost</h2></div>
                </div>
                <span className="model-badge">MODEL 0.1.0</span>
              </div>

              {result ? (
                <>
                  <div className="result-value-label">INDICATIVE POINT ESTIMATE</div>
                  <div className="result-value">{money.format(result.replacementCost)}</div>
                  <div className="range-card">
                    <div className="range-card-top"><span>Scenario range</span><span>USD</span></div>
                    <div className="range-values"><div><ArrowDownRight size={15} /><strong>{money.format(result.rangeLow)}</strong></div><div><ArrowUpRight size={15} /><strong>{money.format(result.rangeHigh)}</strong></div></div>
                    <div className="range-track"><span /></div>
                    <div className="range-track-labels"><span>−25%</span><span>BASE</span><span>+35%</span></div>
                  </div>
                  <div className="result-stats">
                    <div><span>ADJUSTED SIZE</span><strong>{result.adjustedLinesOfCode.toLocaleString()} <small>LOC</small></strong></div>
                    <div><span>ESTIMATED EFFORT</span><strong>{result.estimatedEffortHours.toLocaleString()} <small>HRS</small></strong></div>
                  </div>
                  <div className="result-caption"><span className="result-dot" />Calculated from current inputs · {result.assetName}</div>
                </>
              ) : (
                <div className="empty-result">
                  <div className="empty-orbit"><Activity size={23} /></div>
                  <strong>Your estimate will appear here</strong>
                  <span>Set the asset assumptions, then run the model.</span>
                  <div className="empty-rule" />
                  <span className="empty-foot">No score or certificate is generated until a calculation completes.</span>
                </div>
              )}
              {error && <div className="error-message" role="alert"><CircleAlert size={16} />{error}</div>}
              {result && <p className="disclaimer">{result.disclaimer}</p>}
            </section>

            <aside className="panel evidence-panel" id="data-handling" aria-labelledby="evidence-title">
              <div className="panel-heading">
                <div className="panel-icon amber-icon"><ShieldCheck size={17} /></div>
                <div><span className="section-index">03 / REVIEW</span><h2 id="evidence-title">Evidence status</h2></div>
              </div>
              <div className="status-banner"><span className="status-mark"><Check size={14} /></span><div><strong>Calculation ready</strong><span>Local model · unsigned</span></div></div>
              <div className="evidence-list">
                <div className="evidence-row"><FileCheck2 size={16} /><div><strong>Input record</strong><span>Form values only</span></div><span className="status-text">LOCAL</span></div>
                <div className="evidence-row"><Gauge size={16} /><div><strong>Method</strong><span>Replacement-cost estimate</span></div><span className="status-text">v0.1.0</span></div>
                <div className="evidence-row"><ShieldCheck size={16} /><div><strong>Signature</strong><span>No cryptographic proof</span></div><span className="status-text muted">NONE</span></div>
              </div>
              <div className="evidence-note" id="methodology">
                <span className="note-kicker">MODEL NOTE</span>
                <p>A transparent baseline estimate using configured productivity, complexity, reuse, and labor-rate assumptions.</p>
                <a href="/docs/valuation.md">Read methodology <ArrowUpRight size={13} /></a>
              </div>
              <div className="data-note">
                <span className="note-kicker">DATA HANDLING</span>
                <p>Inputs are sent to this project's local API and are not persisted by the current implementation.</p>
              </div>
            </aside>
          </div>
          <footer className="page-footer"><span>COD3EVAL / VALUATION WORKBENCH</span><span>ESTIMATES ARE NOT ATTESTATIONS</span></footer>
        </div>
      </main>
    </div>
  );
}

export default App;