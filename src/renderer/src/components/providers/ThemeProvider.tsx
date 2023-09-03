import React from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { theme } from '@renderer/theme/muiTheme'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider(props: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </MuiThemeProvider>
  )
}
