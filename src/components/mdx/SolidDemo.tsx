import { type HyperScript } from 'hyper-dom-expressions'
import { useEffect, useRef, useState } from 'react'
import { Component, createComponent, createSignal, createEffect } from 'solid-js'
import h from 'solid-js/h'
import { render } from 'solid-js/web'

import cx from '~/utils/cx'
import { useHydrated } from '~/utils/use-hydrated'
import { RefreshIcon } from '../icons'
import { DEMO_CLASSNAMES } from './utils'

type SolidStuff = {
  createSignal: typeof createSignal
  createEffect: typeof createEffect
  h: HyperScript
}

interface SolidDemoProps {
  create: (stuff: SolidStuff) => { component: Component }
}

const SolidDemo: React.FC<SolidDemoProps> = props => {
  const hydrated = useHydrated()

  const [key, setKey] = useState<number>(0)
  const solidRoot = useRef<HTMLDivElement>(null)
  const createSolidDemo = props.create

  useEffect(() => {
    const root = solidRoot.current
    if (!root || !hydrated) return

    const demo = createSolidDemo({
      createEffect,
      createSignal,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      h,
    })

    const unmount = render(() => createComponent(demo.component, {}), root)

    return () => {
      root.innerHTML = ''
      unmount()
    }
  }, [key, hydrated, createSolidDemo])

  return (
    <div className={cx('demo-wrapper', DEMO_CLASSNAMES.root)}>
      <div className="absolute left-0 top-0 rounded-br bg-drac-purple py-1 px-2 text-sm font-bold text-drac-base">
        contains real <code>solid-js</code>!!
      </div>
      <div className="h-7" />
      <div ref={solidRoot}></div>
      <div className={DEMO_CLASSNAMES.spacing} />
      <div className={DEMO_CLASSNAMES.footer}>
        <button onClick={() => setKey(p => p + 1)} className={DEMO_CLASSNAMES.reload}>
          <RefreshIcon
            className="mr-1 h-em w-em transition-transform duration-700"
            style={{ transform: `rotate(-${key * 360}deg)` }}
          />{' '}
          Reload Demo
        </button>
      </div>
    </div>
  )
}

export default SolidDemo
