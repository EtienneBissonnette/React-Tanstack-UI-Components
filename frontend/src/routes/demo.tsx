import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/demo')({
  component: DemoPage,
})

function DemoPage() {
  return (
    <div className="demo">
      <h1 className="demo__title">Component Demo</h1>

      {/* Colors */}
      <section className="demo__section">
        <h2 className="demo__section-title">Colors</h2>
        <div className="demo__color-grid">
          <div className="demo__color-swatch" data-color="bg">
            --color-bg
          </div>
          <div className="demo__color-swatch" data-color="bg-secondary">
            --color-bg-secondary
          </div>
          <div className="demo__color-swatch" data-color="primary">
            --color-primary
          </div>
          <div className="demo__color-swatch" data-color="danger">
            --color-danger
          </div>
          <div className="demo__color-swatch" data-color="success">
            --color-success
          </div>
          <div className="demo__color-swatch" data-color="warning">
            --color-warning
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="demo__section">
        <h2 className="demo__section-title">Typography</h2>
        <p style={{ fontSize: 'var(--text-xs)' }}>Text XS (12px)</p>
        <p style={{ fontSize: 'var(--text-sm)' }}>Text SM (14px)</p>
        <p style={{ fontSize: 'var(--text-base)' }}>Text Base (16px)</p>
        <p style={{ fontSize: 'var(--text-lg)' }}>Text LG (18px)</p>
        <p style={{ fontSize: 'var(--text-xl)' }}>Text XL (20px)</p>
        <p style={{ fontSize: 'var(--text-2xl)' }}>Text 2XL (24px)</p>
      </section>

      {/* Spacing */}
      <section className="demo__section">
        <h2 className="demo__section-title">Spacing</h2>
        <div className="demo__spacing-grid">
          {[1, 2, 3, 4, 6, 8, 12].map((n) => (
            <div key={n} className="demo__spacing-item">
              <div
                className="demo__spacing-box"
                style={{ width: `var(--space-${n})`, height: `var(--space-${n})` }}
              />
              <span>--space-{n}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons (placeholder for future components) */}
      <section className="demo__section">
        <h2 className="demo__section-title">Buttons</h2>
        <div className="demo__button-grid">
          <button className="button">Default</button>
          <button className="button" data-intent="primary">
            Primary
          </button>
          <button className="button" data-intent="danger">
            Danger
          </button>
          <button className="button" data-size="sm">
            Small
          </button>
          <button className="button" data-size="lg">
            Large
          </button>
        </div>
      </section>

      {/* Theme Toggle */}
      <section className="demo__section">
        <h2 className="demo__section-title">Theme</h2>
        <button
          className="button"
          data-intent="primary"
          onClick={() => {
            const html = document.documentElement
            const current = html.getAttribute('data-theme')
            html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark')
          }}
        >
          Toggle Dark Mode
        </button>
      </section>
    </div>
  )
}
