import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { ChartsArea } from './features/chart/components/ChartsArea'
import { useDevices } from './features/devices/hooks/useDevices'
import theme from './theme/muiTheme'

import './styles/global.css'

const queryClient = new QueryClient()

export function App() {
  const devices = useDevices()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          className="w-screen h-screen bg-background"
          style={{
            display: 'grid',
            gridTemplateAreas: '"header header" "aside main"',
            gridTemplateRows: '48px auto',
          }}
        >
          <Header></Header>
          <Sidebar devices={devices}></Sidebar>
          <ChartsArea></ChartsArea>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
