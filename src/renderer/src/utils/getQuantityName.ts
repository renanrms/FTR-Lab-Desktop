import { quantities } from '@renderer/constants/quantities'

export function getQuantityName(quantity: string, withUnity: boolean = false) {
  if (withUnity) {
    return (
      (quantities[quantity]?.name || quantity) +
      (quantities[quantity]?.defaultUnit.symbol
        ? ` (${quantities[quantity]?.defaultUnit.symbol})`
        : '')
    )
  } else {
    return quantities[quantity]?.name || quantity
  }
}
