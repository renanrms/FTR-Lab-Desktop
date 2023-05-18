import { getBatteryIcon } from '../utils/getBatteryIcon'

interface BatteryIconProps {
  level: number
  charging?: boolean
}

export function BatteryIndicator(props: BatteryIconProps) {
  const Icon = getBatteryIcon(props.level, props.charging)
  const color =
    props.level < 20
      ? props.charging
        ? 'var(--md-sys-color-warning)'
        : 'var(--md-sys-color-error)'
      : 'var(--md-sys-color-on-surface-variant)'

  return <Icon sx={{ color }} />
}
