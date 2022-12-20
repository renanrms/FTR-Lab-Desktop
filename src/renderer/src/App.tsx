import './styles/global.css'

import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/muiTheme'
import CssBaseline from '@mui/material/CssBaseline'
import { Header } from './components/Header'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="w-screen h-screen bg-background">
        <Header></Header>
      </div>
    </ThemeProvider>
  )
}
