import { useState } from 'react'

import { Modal, Tabs } from '@mui/material'
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
      <div className="flex flex-col items-center min-w-fit min-h-[400px] w-[700px] h-[70%] pt-4 pb-8 px-8 bg-background dark:bg-neutral-20 rounded-xl text-on-background">
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
            <Tab label="Sobre" value="about" />
            <Tab label="Instruções de uso" value="instructions" />
          </Tabs>
        </Box>
        <TabPanel className="m-8" value={value} index="about">
          <div className="text-4xl select-none text-primary-50 dark:text-primary-80">
            FTRLab
          </div>
          <div className="mt-2 text-xl">
            {appInfo.version}
            <a
              className="underline ml-2 hover:text-tertiary-50 hover:dark:text-tertiary-80"
              rel="noreferrer"
              target="_blank"
              href={`https://github.com/renanrms/FTRLab-desktop/releases/tag/v${appInfo.version}`}
            >
              Novidades
            </a>
          </div>
          <div className="w-[32rem] mt-8 text-justify">
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
                className="underline hover:text-tertiary-50 hover:dark:text-tertiary-80"
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
