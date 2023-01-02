import './styles/global.css'

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/muiTheme'
import CssBaseline from '@mui/material/CssBaseline'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen">
        <Header></Header>
        <Sidebar></Sidebar>
      </div>
    </ThemeProvider>
  )
}
