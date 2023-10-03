import { useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'

interface LedProps {
  tOn?: number
  tOff?: number
  startOn?: boolean
}

export function Led(props: LedProps) {
  const [on, setOn] = useState(!!props.startOn)

  useEffect(() => {
    let timeout: any
    if (on) {
      if (props.tOn) {
        timeout = setTimeout(() => {
          setOn(false)
        }, props.tOn)
      }
    } else {
      if (props.tOff) {
        timeout = setTimeout(() => {
          setOn(true)
        }, props.tOff)
      }
    }
    return () => clearTimeout(timeout)
  }, [on, props.tOn, props.tOff])

  return (
    <div
      className={twMerge(
        'inline-block w-4 h-4 mx-1 rounded-full bg-surface-variant',
        on && 'bg-primary-70',
      )}
    ></div>
  )
}
