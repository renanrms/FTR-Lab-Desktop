# Changelog

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/spec/v2.0.0.html).

## [0.8.1] - 2023-10-03

### Alterado

- Melhoria nas instruções de configuração do dispositivo, mostrando os possíveis padrões de piscar do LED para facilitar identificação.

### Corrigido

- Corrigido problema de build no Windows.

## [0.8.0] - 2023-09-10

### Adicionado

- Modal de Ajuda.
- Informações sobre o App e link para as novidades da versão instalada.
- Instruções de uso do programa.
- Instruções de configuração do dispositivo.

### Alterado

- Nome do App adicionado no título da janela.
- Dispositivos são exibidos em ordem.
- Botões da interface foram tornados mais explícitos e compreensíveis.
- Cards de apresentação dos dispositivo foram reformulados.
- Melhora estilos no modo dark.

## [0.7.0] - 2023-09-01

### Adicionado

- Botões de ajuste vertical do gráfico.
- Movimentação da janela de tempo do gráfico, exibindo apenas as medições mais recentes.
- Adicionou-se este CHANGELOG.

### Corrigido

- Correção de falha na segmentação das mensagens do dispositivo.
- Correção de bug: algumas vezes o app abria sem a informação dos dispositivos armazenados.

### Alterado

- Melhoria no arranjo e dimensionamento dos gráficos na tela.
- Melhoria na atualização e na exibição da disponibilidade do dispositivo.
- Mudança no formato das mensagens de medições recebidas do dispositivo para otimizar tamanho das mensagens, de acordo com versão 0.4.0 da lib.
- Redução no tempo para aparecerem os dispositivos e medições na tela.

## [0.6.0] - 2023-07-27

### Corrigido

- Ordena medições exibidas no gráfico, evitando que sejam ligadas em ordem incorreta quando o renderer as recebe fora de ordem.

### Alterado

- Torna o tempo das medições relativo também no arquivo de exportação das medições.

## [0.5.0] - 2023-07-23

### Adicionado

- Botão de exportação de dados em formato CSV.
- Botões para controlar exibição de pontos e linhas no gráfico.
- Sinalização quando dispositivo conectado não conseguiu sincronizar seu relógio.
- Nomes e unidades das grandezas passaram a ser exibidos em tela.

### Alterado

- Melhoria na aparência do gráfico.
- Banco de dados alterado: Indexed DB no processo renderer foi abandonado e os dados de medições passaram também para o banco de dados SQLite.
- Medida de tempo mostrada ao usuário passou a ser uma medida relativa ao momento de abertura do programa.

## [0.4.0] - 2023-07-14

### Adicionado

- Persistência dos dispositivos em um banco de dados SQLite no processo main.
- Gráfico para dispositivos desconectados e indisponíveis passaram a ser exibidos.
- Dispositivos com tempo de inatividade maior que um limiar passaram a ser atualizados para o estado de indisponível.

## [0.3.0] - 2023-07-09

### Alterado

- Melhora movimentação da janela de medições do gráfico exibido.
- Adapta formato dos dados esperados na apresentação do dispositivo para versão inicial da Lib sendo desenvolvida.

## [0.2.0] - 2023-05-22

### Adicionado

- Funcionalidade de apagar as medições armazenadas.
- Carregamento inicial das medições armazenadas quando o software é aberto.

## [0.1.0] - 2023-05-18

### Adicionado

- Versão inicial do software desktop FTRLab.
- Exibição e tratamento dos dispositivos: busca, conexão, desconexão, exibição dos estados para o usuário.
- Recepção e apresentação das medições em tempo real.
