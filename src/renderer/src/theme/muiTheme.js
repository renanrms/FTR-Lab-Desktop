import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: getComputedStyle(document.body).getPropertyValue(
        '--md-sys-color-primary',
      ),
    },
    secondary: {
      main: getComputedStyle(document.body).getPropertyValue(
        '--md-sys-color-secondary',
      ),
    },
    background: {
      default: getComputedStyle(document.body).getPropertyValue(
        '--md-sys-color-background',
      ),
    },
  },
})

export default theme
