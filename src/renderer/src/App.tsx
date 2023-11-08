import './styles/global.css'

import { useState } from 'react'

import { Header } from './components/Header'
import { ReactQueryProvider } from './components/providers/ReactQueryProvider'
import { ThemeProvider } from './components/providers/ThemeProvider'
import { Sidebar } from './components/Sidebar'
import { useDevices } from './features/devices/hooks/useDevices'
import { ChartsArea } from './features/measurements/components/ChartsArea'
import { useMeasurements } from './features/measurements/hooks/useMeasurements'

export function App() {
  const [timeRange, setTimeRange] = useState<number>(45)
  const devices = useDevices()
  const { sensorMeasurements, clearMeasurements } = useMeasurements(timeRange)

  return (
    <ReactQueryProvider>
      <ThemeProvider>
        <div
          className="w-screen h-screen bg-background"
          style={{
            display: 'grid',
            gridTemplateAreas: '"header header" "aside main"',
            gridTemplateRows: '48px auto',
          }}
        >
          <Header clearMeasurements={clearMeasurements}></Header>
          <Sidebar
            devices={devices}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          ></Sidebar>
          <ChartsArea
            devices={devices}
            sensorMeasurements={sensorMeasurements}
            timeRange={timeRange}
          ></ChartsArea>
        </div>
      </ThemeProvider>
    </ReactQueryProvider>
  )
}
