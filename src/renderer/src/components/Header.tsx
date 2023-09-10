// import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined'
import { useState } from 'react'

// import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined'
// import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'

import { HelpModal } from '@renderer/features/appInfo/components/HelpModal'

interface HeaderProps {
  clearMeasurements: () => Promise<void>
}

export function Header(props: HeaderProps) {
  const [helpDialogIsOpen, setHelpDialogIsOpen] = useState(false)

  return (
    <header
      className="h-12 col-span-2 bg-primary-50 flex items-center justify-between"
      style={{
        gridArea: 'header',
      }}
    >
      <div className="mx-4 h-10 flex items-center justify-center">
        {/* <IconButton style={{ color: 'var(--md-ref-palette-primary100)' }}>
          <DeviceHubOutlinedIcon />
        </IconButton> */}
      </div>
      <div className="mx-4 h-10 flex items-center justify-center">
        {/* <IconButton style={{ color: 'var(--md-ref-palette-primary100)' }}>
          <AddchartOutlinedIcon />
        </IconButton> */}
        {/* <IconButton style={{ color: 'var(--md-ref-palette-primary100)' }}>
          <DownloadOutlinedIcon />
        </IconButton> */}
        <Button
          className="mr-8 px-6 rounded-full capitalize text-white bg-white/20 hover:bg-white/30"
          onClick={props.clearMeasurements}
        >
          Apagar medidas
        </Button>
        <IconButton
          className="text-white"
          onClick={() => {
            setHelpDialogIsOpen(!helpDialogIsOpen)
          }}
        >
          <HelpRoundedIcon />
        </IconButton>
      </div>
      <HelpModal
        open={helpDialogIsOpen}
        onClose={() => {
          setHelpDialogIsOpen(false)
        }}
      />
    </header>
  )
}
