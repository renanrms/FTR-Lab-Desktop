import { useState } from 'react'

export function useChartControls() {
  const [showPoints, setShowPoints] = useState(false)
  const [showLines, setShowLines] = useState(true)

  const showPointsHandleClick = () => {
    if (showPoints && !showLines) {
      setShowPoints(!showPoints)
      setShowLines(!showLines)
    } else {
      setShowPoints(!showPoints)
    }
  }

  const showLinesHandleClick = () => {
    if (showLines && !showPoints) {
      setShowLines(!showLines)
      setShowPoints(!showPoints)
    } else {
      setShowLines(!showLines)
    }
  }

  return { showPoints, showLines, showPointsHandleClick, showLinesHandleClick }
}
