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

  const [showExpandedY, setShowExpandedY] = useState(false)
  const [ShowFromOriginY, setShowFromOriginY] = useState(true)

  const showExpandedYHandleClick = () => {
    setShowExpandedY(!showExpandedY)
    setShowFromOriginY(!ShowFromOriginY)
  }

  const ShowFromOriginYHandleClick = () => {
    setShowFromOriginY(!ShowFromOriginY)
    setShowExpandedY(!showExpandedY)
  }

  return {
    showPoints,
    showLines,
    showPointsHandleClick,
    showLinesHandleClick,
    showExpandedY,
    ShowFromOriginY,
    showExpandedYHandleClick,
    ShowFromOriginYHandleClick,
  }
}
