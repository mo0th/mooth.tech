import cx from '~/utils/cx'
import { ComponentType, useEffect, useState } from 'react'
import { RefreshIcon } from '../icons'
import { COMMON_CLASSNAMES, DEMO_CLASSNAMES } from './utils'

interface ReactDemoProps {
  component: ComponentType
  init?: 'lazy' | 'mount' | 'always'
}

const ReactDemo: React.FC<ReactDemoProps> = ({ component: Component, init = 'mount' }) => {
  const [started, setStarted] = useState(init === 'always')
  const [key, setKey] = useState<number>(0)

  const initOnMount = init === 'mount'
  useEffect(() => {
    if (initOnMount) setStarted(true)
  }, [initOnMount])

  return (
    <div className={cx('demo-wrapper', COMMON_CLASSNAMES.codeAndDemoRoot)}>
      {started ? (
        <>
          <Component key={key} />
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
        </>
      ) : null}

      {!started ? (
        <>
          <div className="no-js-hidden h-20 bg-drac-purple/50 p-4 md:px-6">
            <button
              onClick={() => setStarted(true)}
              className="focus-ring block h-full w-full rounded bg-drac-base text-drac-pink transition hocus:text-drac-purple"
            >
              Start Demo
            </button>
          </div>
          <noscript>
            <div className="grid h-full w-full place-items-center">
              Enable JavaScript to see this demo
            </div>
          </noscript>
        </>
      ) : null}
    </div>
  )
}

export default ReactDemo
