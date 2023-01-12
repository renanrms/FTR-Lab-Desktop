import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined'
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import IconButton from '@mui/material/IconButton'

export function Header() {
  return (
    <div className="col-span-2 h-12 bg-primary-50 flex shrink-0 items-center justify-between">
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
    </div>
  )
}
