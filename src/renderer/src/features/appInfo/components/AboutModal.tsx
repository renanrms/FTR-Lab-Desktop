import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Modal, Tabs } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'

import GithubIconDark from '@renderer/assets/github-icon-dark.svg'
import GithubIconLight from '@renderer/assets/github-icon-light.svg'
import { TabPanel } from '@renderer/components/ui/TabPanel'
import { preferredColorScheme } from '@renderer/theme/muiTheme'

import { appInfo } from '../constants/appInfo'

interface AboutModalProps {
  open: boolean
  onClose: () => void
}

export function AboutModal(props: AboutModalProps) {
  const [value, setValue] = useState('about')

  return (
    <Modal
      className="flex justify-center pt-20"
      open={props.open}
      onClose={props.onClose}
    >
      <div className="relative flex flex-col items-center min-w-fit min-h-[420px] w-[700px] h-fit bg-background dark:bg-neutral-20 rounded-lg text-on-background">
        <Box
          className="flex justify-center w-full mb-4"
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
          </Tabs>
        </Box>
        <IconButton
          className="top-1.5 right-1.5"
          sx={{ position: 'absolute' }}
          onClick={props.onClose}
        >
          <CloseIcon sx={{ fontSize: '20px' }} />
        </IconButton>
        <TabPanel className="m-8" value={value} index="about">
          <div className="text-4xl font-medium select-none text-primary-50 dark:text-primary-80">
            FTRLab
          </div>
          <div className="mt-1 text-lg">
            {appInfo.version}
            <a
              className="underline ml-2 hover:text-primary-50 hover:dark:text-primary-80"
              rel="noreferrer"
              target="_blank"
              href={`https://github.com/renanrms/FTRLab-desktop/releases/tag/v${appInfo.version}`}
            >
              Novidades
            </a>
          </div>
          <div className="w-[32rem] mt-8">
            O FTRLab foi desenvolvido como Trabalho de Conclusão de Curso de
            Engenharia Eletrônica e de Computação na Universidade Federal do Rio
            de Janeiro.
          </div>
          <div className="mt-8 flex items-center">
            {preferredColorScheme === 'dark' ? (
              <img
                className="inline"
                width={22}
                src={GithubIconDark}
                alt="Github dark icon"
              />
            ) : (
              <img
                className="inline"
                width={22}
                src={GithubIconLight}
                alt="Github light icon"
              />
            )}
            <span className="ml-2">
              Favorite-nos no{' '}
              <a
                className="underline hover:text-primary-50 hover:dark:text-primary-80"
                rel="noreferrer"
                target="_blank"
                href={`https://github.com/renanrms/FTRLab-desktop`}
              >
                Github
              </a>
            </span>
          </div>
        </TabPanel>
        <TabPanel value={value} index="instructions">
          Instruções de uso
        </TabPanel>
      </div>
    </Modal>
  )
}
