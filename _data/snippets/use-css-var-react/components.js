import { useMemo, useEffect } from 'react'

export const useCssVar = ({ name, root = document.body }) => {
  const controls = useMemo(
    () => ({
      set: value => root.style.setProperty(name, value),
      get: () => root.style.getPropertyValue(name),
      remove: () => root.style.removeProperty(name),
    }),
    [name, root]
  )
  useEffect(() => {
    return () => controls.remove()
  }, [controls])
  return controls
}

const styles = {
  button: {
    padding: '0.5rem 1rem',
    background: 'var(--pink)',
    color: 'var(--bg)',
    textAlign: 'center',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  input: {
    padding: '0.5rem 1rem',
    background: 'var(--bg)',
    color: 'var(--fg)',
    border: '2px solid var(--pink)',
  },
}

const IMAGE_SIZE = '80px'

export const EXAMPLE_CSS_VAR = '--example-css-var'
export const EXAMPLE_TRANSFORM = `rotate(calc(var(${EXAMPLE_CSS_VAR}, 45) * 1deg))`

export const Example = () => {
  const controls = useCssVar({
    name: EXAMPLE_CSS_VAR,
  })

  useEffect(() => {
    controls.set('0')
  }, [controls])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          style={styles.input}
          type="number"
          placeholder="image rotation degrees"
          defaultValue=""
          onChange={event => {
            const value = event.target.valueAsNumber
            if (!Number.isFinite(value)) return
            controls.set((value % 360).toFixed(2))
          }}
        />
        <button style={styles.button} onClick={() => controls.remove()}>
          Remove CSS Var
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <img
          style={{
            margin: '0',
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            transform: EXAMPLE_TRANSFORM,
            transition: 'transform 250ms ease-in-out',
          }}
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          loading="lazy"
          decoding="async"
          src="/logo.png"
        />
      </div>
    </div>
  )
}