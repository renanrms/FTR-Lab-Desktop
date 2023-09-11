import ScreenCaptureHighlighted from '../../assets/screen-capture-highlighted.png'

interface AppInstructionsProps {
  moveToDeviceInstructions: () => void
}

export function AppInstructions(props: AppInstructionsProps) {
  return (
    <>
      <div className="w-full flex justify-center">
        <img
          className="rounded-lg border border-neutral-80 dark:border-neutral-20 w-[850px]"
          src={ScreenCaptureHighlighted}
          alt="Captura de tela com destaques em elementos mais importantes"
        />
      </div>

      <div className="my-6 px-4 w-full flex flex-col gap-4">
        <p>
          Se houver dispositivos encontrados na rede e medições, a tela terá
          estes elementos principais: os dispositivos listados na esquerda e os
          gráficos na área principal da tela. Caso ainda não esteja vendo nenhum
          dispositivo para uso, veja as instruções de{' '}
          <a
            className="underline hover:text-primary-50 hover:dark:text-primary-80"
            onClick={props.moveToDeviceInstructions}
          >
            Configuração do Dispositivo
          </a>
          .
        </p>
        <p>
          Cada dispositivo é mostrado como um card, com o nome e seu número de
          identificação único na parte superior e os sensores incluídos. Há dois
          elementos para interação principais:
          <ul style={{ listStyleType: 'disc' }}>
            <li className="ml-8 mt-1">
              O indicador de status (1), um pequeno círculo que muda de cor de
              acordo com o estado do dispositivo. Passando o mouse sobre ele
              você verá o status (ex: conectado, ocupado, etc).
            </li>
            <li className="ml-8 mt-1">
              O botão <span className="font-medium text-primary">Iniciar</span>{' '}
              (2), que conecta ao dispositivo e inicia as medições.
            </li>
          </ul>
        </p>
        <p>
          Cada gráfico na tela possui um botão{' '}
          <span className="font-medium text-primary">Exportar</span> (3) para
          gravar as medições em um arquivo. As medições serão exportadas com a
          mesma referência de tempo usada no gráfico, ou seja, o momento em que
          o programa foi aberto. Se houverem medidas anteriores, serão
          exportadas com valores de tempo negativo.
        </p>
        <p>
          Na barra superior há o botão{' '}
          <span className="font-medium text-primary">Apagar Medidas</span> (4)
          casa deseje limpar os dados. Recomendamos apagar dados antes iniciar
          uma tomada, caso contrário todos os dados anteriormente recebidos do
          sensor serão salvos no arquivo. Além disso há o botão de{' '}
          <span className="font-medium text-primary">Ajuda</span> (5).
        </p>
      </div>
    </>
  )
}
