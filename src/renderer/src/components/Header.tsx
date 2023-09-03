// import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined'
import { useState } from 'react'

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
// import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined'
// import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import IconButton from '@mui/material/IconButton'

import { AboutModal } from '@renderer/features/appInfo/components/AboutModal'

interface HeaderProps {
  clearMeasurements: () => Promise<void>
}

export function Header(props: HeaderProps) {
  const [aboutDialogIsOpen, setAboutDialogIsOpen] = useState(false)

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
        <IconButton
          style={{ color: 'var(--md-ref-palette-primary100)' }}
          onClick={props.clearMeasurements}
        >
          <DeleteOutlinedIcon />
        </IconButton>
        <IconButton
          style={{ color: 'var(--md-ref-palette-primary100)' }}
          onClick={() => {
            setAboutDialogIsOpen(!aboutDialogIsOpen)
          }}
        >
          <MoreVertOutlinedIcon />
        </IconButton>
      </div>
      <AboutModal
        open={aboutDialogIsOpen}
        onClose={() => {
          setAboutDialogIsOpen(false)
        }}
      />
    </header>
  )
}
