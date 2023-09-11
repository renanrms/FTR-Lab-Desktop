import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Modal, Tabs } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'

import { TabPanel } from '@renderer/components/ui/TabPanel'
import { preferredColorScheme } from '@renderer/theme/muiTheme'

import { About } from './About'
import { AppInstructions } from './AppInstructions'
import { DeviceInstructions } from './DeviceInstructions'

interface HelpModalProps {
  open: boolean
  onClose: () => void
}

export function HelpModal(props: HelpModalProps) {
  const [value, setValue] = useState('about')

  return (
    <Modal
      className="flex justify-center pt-20"
      open={props.open}
      onClose={props.onClose}
      slotProps={{
        backdrop: {
          style: {
            backdropFilter: 'blur(1px)',
            backgroundColor:
              preferredColorScheme === 'dark' ? '#6665' : '#0005',
          },
        },
      }}
    >
      <div className="relative flex flex-col items-center h-fit min-h-[420px] max-h-[95%] w-[95%] max-w-[850px] bg-background dark:bg-neutral-10 rounded-lg text-on-background ">
        <Box
          className="flex justify-center w-full"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tabs
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
          >
            <Tab
              label="Sobre"
              value="about"
              sx={{ fontSize: '1rem', textTransform: 'none' }}
            />
            <Tab
              label="Instruções de Uso"
              value="instructions"
              sx={{ fontSize: '1rem', textTransform: 'none' }}
            />
            <Tab
              label="Configuração do Dispositivo"
              value="configuration"
              sx={{ fontSize: '1rem', textTransform: 'none' }}
            />
          </Tabs>
        </Box>

        <IconButton
          className="top-1.5 right-1.5"
          sx={{ position: 'absolute' }}
          onClick={props.onClose}
        >
          <CloseIcon sx={{ fontSize: '20px' }} />
        </IconButton>

        <TabPanel
          className="p-4 overflow-y-auto h-[420px] w-full"
          value={value}
          index="about"
        >
          <About />
        </TabPanel>

        <TabPanel
          className="p-4 overflow-y-auto w-full h-full"
          value={value}
          index="instructions"
        >
          <AppInstructions
            moveToDeviceInstructions={() => {
              setValue('configuration')
            }}
          />
        </TabPanel>

        <TabPanel
          className="p-4 overflow-y-auto w-full"
          value={value}
          index="configuration"
        >
          <DeviceInstructions />
        </TabPanel>
      </div>
    </Modal>
  )
}
