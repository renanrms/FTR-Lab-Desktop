import './styles/global.css'

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/muiTheme'
import CssBaseline from '@mui/material/CssBaseline'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { ChartsArea } from './features/chart/components/ChartsArea'

export function App() {
  return (
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
        <Sidebar></Sidebar>
        <ChartsArea></ChartsArea>
      </div>
    </ThemeProvider>
  )
}
