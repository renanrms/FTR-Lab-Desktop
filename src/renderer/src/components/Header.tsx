import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import IconButton from '@mui/material/IconButton'

export function Header() {
  return (
    <header
      className="h-12 col-span-2 bg-primary-50 flex items-center justify-between"
      style={{
        gridArea: 'header',
      }}
    >
      <div className="mx-4 h-10 flex items-center justify-center">
        <IconButton style={{ color: 'var(--md-ref-palette-primary100)' }}>
          <DeviceHubOutlinedIcon></DeviceHubOutlinedIcon>
        </IconButton>
      </div>
      <div className="mx-4 h-10 flex items-center justify-center">
        <IconButton style={{ color: 'var(--md-ref-palette-primary100)' }}>
          <AddchartOutlinedIcon></AddchartOutlinedIcon>
        </IconButton>
        <IconButton style={{ color: 'var(--md-ref-palette-primary100)' }}>
          <DownloadOutlinedIcon></DownloadOutlinedIcon>
        </IconButton>
        <IconButton style={{ color: 'var(--md-ref-palette-primary100)' }}>
          <DeleteOutlinedIcon></DeleteOutlinedIcon>
        </IconButton>
      </div>
    </header>
  )
}
