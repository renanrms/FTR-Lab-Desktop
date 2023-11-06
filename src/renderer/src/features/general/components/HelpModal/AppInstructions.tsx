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
          identificação único na parte superior e os sensores incluídos. O{' '}
          <span className="font-medium text-primary">indicador de status</span>{' '}
          (1) muda de cor de acordo com o estado do dispositivo. Passando o
          mouse sobre ele você verá o status (ex: conectado, ocupado, etc). O
          botão <span className="font-medium text-primary">Iniciar</span> (2),
          que conecta ao dispositivo e inicia as medições.
        </p>
        <p>
          Cada gráfico na tela possui um botão{' '}
          <span className="font-medium text-primary">Exportar</span> (3) para
          gravar as medições em um arquivo. Os valores de tempo sempre tem como
          referência o momento em que o software foi aberto, tanto no gráfico
          como no arquivo. Se houverem medidas anteriores, serão exportadas com
          valores de tempo negativo.
        </p>
        <p>
          Você pode controlar os dados que deseja salvar/exportar utilizando o
          controle da{' '}
          <span className="font-medium text-primary">Janela de tempo</span> (4)
          ou o botão{' '}
          <span className="font-medium text-primary">Apagar Medidas</span> (5).
        </p>
      </div>
    </>
  )
}
