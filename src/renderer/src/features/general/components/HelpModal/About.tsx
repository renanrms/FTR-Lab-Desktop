import { preferredColorScheme } from '@renderer/theme/muiTheme'

import GithubIconDark from '../../assets/github-icon-dark.svg'
import GithubIconLight from '../../assets/github-icon-light.svg'
import { appInfo } from '../../constants/appInfo'

export function About() {
  return (
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
      </div>
    </div>
  )
}
