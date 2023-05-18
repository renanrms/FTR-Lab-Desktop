import { Boundaries } from '@shared/types/Measurement'

export function mergeBoundaries(
  range1?: Boundaries,
  range2?: Boundaries,
): Boundaries {
  const aux1 = range1 || { min: Infinity, max: -Infinity }
  const aux2 = range2 || { min: Infinity, max: -Infinity }

  if (aux1.min < aux2.min && aux1.max > aux2.max) return aux1
  if (aux2.min < aux1.min && aux2.max > aux1.max) return aux2
  else
    return {
      min: Math.min(aux2.min, aux1.min),
      max: Math.max(aux2.max, aux1.max),
    }
}
