import { ReactNode } from 'react'

interface TabPanelProps {
  className?: string
  children?: ReactNode
  index: any
  value: any
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div hidden={value !== index} {...other}>
      {value === index && children}
    </div>
  )
}
