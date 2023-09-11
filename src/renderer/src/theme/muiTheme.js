import { createTheme } from '@mui/material/styles'

import { getPreferredColorScheme } from './getPreferredColorScheme'

export const preferredColorScheme = getPreferredColorScheme()

export const theme = createTheme({
  palette: {
    mode: preferredColorScheme,
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
