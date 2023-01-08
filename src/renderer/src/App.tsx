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
      <div className="w-screen h-screen bg-background flex flex-col">
        <Header></Header>
        <div className="w-full h-full flex">
          <Sidebar></Sidebar>
          <ChartsArea></ChartsArea>
        </div>
      </div>
    </ThemeProvider>
  )
}
