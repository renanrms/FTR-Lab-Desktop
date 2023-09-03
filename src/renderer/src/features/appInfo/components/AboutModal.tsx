import { Modal } from '@mui/material'

import { appInfo } from '../constants/appInfo'

interface AboutModalProps {
  open: boolean
  onClose: () => void
}

export function AboutModal(props: AboutModalProps) {
  return (
    <Modal
      className="flex justify-center pt-20"
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex flex-col items-center min-w-fit min-h-[400px] w-[50%] h-[70%] p-8 bg-background dark:bg-neutral-25 rounded-xl text-on-background">
        <span className="text-lg">Sobre o FTRLab</span>
        <div className="m-8">
          <div className="mt-12 text-4xl select-none dark:text-primary-80">
            FTRLab
          </div>
          <div className="mt-2 text-xl">
            {appInfo.version}
            <a
              className="underline ml-2"
              rel="noreferrer"
              target="_blank"
              href={`https://github.com/renanrms/FTRLab-desktop/releases/tag/v${appInfo.version}`}
            >
              Novidades
            </a>
          </div>
          <div className="w-[32rem] mt-8 text-justify">
            O FTRLab foi desenvolvido inicialmente como Trabalho de Conclusão de
            Curso de Engenharia Eletrônica e de Computação na Universidade
            Federal do Rio de Janeiro.
          </div>
          <div className="mt-4">
            <a
              className="mt-8 underline"
              rel="noreferrer"
              target="_blank"
              href={`https://github.com/renanrms/FTRLab-desktop`}
            >
              Informações sobre o software
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}
