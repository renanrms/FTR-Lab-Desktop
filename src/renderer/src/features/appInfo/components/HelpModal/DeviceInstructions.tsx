export function DeviceInstructions() {
  return (
    <div className="my-6 px-4 w-full flex flex-col gap-4">
      <p className="py-4 px-8 bg-tertiary-95 dark:bg-tertiary-20 rounded-xl">
        Pré-requisito: ter acesso a uma rede WiFi no local, em que o computador
        e o dispositivo possam se conectar. É possível utilizar com o computador
        conectado por cabo, se for a mesma rede, porém isso dependerá de
        configurações da rede local.
      </p>
      <p>
        Caso o dispositivo FTRLab ainda não esteja configurado ou não esteja
        aparecendo no software, você poderá seguir este passo a passo para
        configurá-lo.
      </p>
      <ol
        className="w-full flex flex-col gap-2"
        style={{ listStyleType: 'decimal' }}
      >
        <li className="ml-8 mt-1">
          Pressione o botão de Reiniciar e aguarde o LED começar a piscar.
        </li>
        <li className="ml-8 mt-1">
          Se o LED piscar lentamente (0,5 segundo ON, seguido de 0,5 segundo
          OFF), está no modo de configuração pois não conhece nenhuma rede WiFi
          do local. Utilize o Aplicativo de celular ESP TOUCH para configurar.
          Você deverá conectar seu celular na rede desejada, abrir o aplicativo,
          digitar a senha da rede e apertar o botão para configurar.
        </li>
        <li className="ml-8 mt-1">
          Se o LED piscar rapidamente (Fica ON, passa pelo estado OFF por um
          curto intervalo de tempo), está sincronizando seu relógio, o que
          demora no máximo 90 segundos, mas tipicamente menos de 10 segundos.
          Aguarde.
        </li>
        <li className="ml-8 mt-1">
          Se o LED ficar ON de forma constante, está funcionando conectado à
          rede configurada. Conecte o computador à mesma rede. Verifique se
          existem redes WiFi de gerações diferentes com o mesmo nome (como WiFi
          2.4GHz e 5GHz). Nestes casos os dois sistemas podem não conseguir se
          comunicar.
        </li>
        <li className="ml-8 mt-1">
          Se o LED ficar ON de forma constante, mas você deseja configurar uma
          nova rede, mantenha o botão de configuração pressionado e pressione o
          botão de reiniciar, enquanto isso. Pare de segurar o botão de
          configuração quando dispositivo entrar no modo de configuração. Tendo
          feito isso você pode seguir novamente do passo 2 em diante.
        </li>
      </ol>
    </div>
  )
}
