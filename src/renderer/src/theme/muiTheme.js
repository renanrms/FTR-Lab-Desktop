import { createTheme } from '@mui/material/styles'

function getPreferredColorScheme() {
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    } else {
      return 'light'
    }
  }
  return 'light'
}

const theme = createTheme({
  palette: {
    mode: getPreferredColorScheme(),
    primary: {
      main: '#006c51',
    },
    secondary: {
      main: '#4c6359',
    },
    background: {
      default: '#fbfdf9',
    },
  },
})

export default theme
