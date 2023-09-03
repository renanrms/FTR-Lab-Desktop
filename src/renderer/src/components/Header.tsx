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
          variant="outlined"
          className="mr-8"
          onClick={props.clearMeasurements}
          sx={{
            color: 'white',
            marginRight: '32px',
            paddingX: '1.5rem',
            // backgroundColor:
            // preferredColorScheme === 'dark' ? '#6665' : '#0005',
            borderRadius: '2rem',
            backgroundColor: '#fff3',
            ':hover': {
              backgroundColor: '#fff5',
            },
            textTransform: 'capitalize',
          }}
        >
          Apagar medidas
        </Button>
        <IconButton
          style={{ color: 'var(--md-ref-palette-primary100)' }}
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
