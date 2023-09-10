import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton, Modal, Tabs } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'

import GithubIconDark from '@renderer/assets/github-icon-dark.svg'
import GithubIconLight from '@renderer/assets/github-icon-light.svg'
import { TabPanel } from '@renderer/components/ui/TabPanel'
import { preferredColorScheme } from '@renderer/theme/muiTheme'

import ScreenCaptureHighlighted from '../assets/screen-capture-highlighted.png'
import { appInfo } from '../constants/appInfo'

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
      <div className="relative flex flex-col items-center h-fit min-h-[420px] max-h-[95%] w-fit min-w-[800px] max-w-[1000px] bg-background dark:bg-neutral-10 rounded-lg text-on-background ">
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
          <div className="flex items-center justify-center w-full h-full">
            <div>
              <div className="text-4xl font-medium select-none text-primary-50 dark:text-primary-70">
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
                Engenharia Eletrônica e de Computação na Universidade Federal do
                Rio de Janeiro.
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
            </div>
          </div>
        </TabPanel>
        <TabPanel
          className="p-4 overflow-y-auto w-full h-full"
          value={value}
          index="instructions"
        >
          <div className="w-full flex justify-center">
            <img
              className="rounded-lg border w-[900px]"
              src={ScreenCaptureHighlighted}
              alt="Captura de tela com destaques em elementos mais importantes"
            />
          </div>

          <div className="my-6 px-4 w-full flex flex-col gap-4">
            <p>
              Se houver dispositivos encontrados na rede e medições, a tela terá
              estes elementos principais: os dispositivos listados na esquerda e
              os gráficos na área principal da tela. Caso ainda não esteja vendo
              nenhum dispositivo para uso, veja as{' '}
              <span className="font-medium">instruções do dispositivo</span>.
            </p>
            <p>
              Cada dispositivo é mostrado como um card, com o nome e seu número
              de identificação único na parte superior e os sensores incluídos.
              Há dois elementos para interação principais:
              <ul style={{ listStyleType: 'disc' }}>
                <li className="ml-8 mt-1">
                  O indicador de status (1), um pequeno círculo que muda de cor
                  de acordo com o estado do dispositivo. Passando o mouse sobre
                  ele você verá o status (ex: conectado, ocupado, etc).
                </li>
                <li className="ml-8 mt-1">
                  O botão{' '}
                  <span className="font-medium text-primary">Iniciar</span> (2),
                  que conecta ao dispositivo e inicia as medições.
                </li>
              </ul>
            </p>
            <p>
              Cada gráfico na tela possui um botão{' '}
              <span className="font-medium text-primary">Exportar</span> (3)
              para gravar as medições em um arquivo. As medições serão
              exportadas com a mesma referência de tempo usada no gráfico, ou
              seja, o momento em que o programa foi aberto. Se houverem medidas
              anteriores, serão exportadas com valores de tempo negativo.
            </p>
            <p>
              Na barra superior há o botão{' '}
              <span className="font-medium text-primary">Apagar Medidas</span>{' '}
              (4) casa deseje limpar os dados. Recomendamos apagar dados antes
              iniciar uma tomada, caso contrário todos os dados anteriormente
              recebidos do sensor serão salvos no arquivo. Além disso há o botão
              de <span className="font-medium text-primary">Ajuda</span> (5).
            </p>
          </div>
        </TabPanel>
      </div>
    </Modal>
  )
}
