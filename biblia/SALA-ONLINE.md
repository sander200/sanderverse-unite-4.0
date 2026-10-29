# Ordem para o AI Studio — Firebase

Não recries a app. Solo e 2 bots continuam sem rede. Não inventes chaves.

Faz estes passos, por esta ordem. Se um passo precisar da conta Google e não conseguires abri-la, para e diz qual ficou por fazer. Não simules uma config.

1. Cria um projeto Firebase no plano Spark, ligado à mesma conta deste app. Nome: sanderverse-unite.
2. Liga Authentication → Anonymous.
3. Cria uma Realtime Database. Região mais próxima do Brasil.
4. Nas regras da base, cola o ficheiro sala/rules.json deste repositório. Não deixes as regras abertas.
5. Copia os seis campos da config do projeto para o ecrã de configuração da app, uma vez. Não os commits no GitHub.
6. Liga o botão Aliados a sala/sala.js: criarSala, juntar, ouvir, pulso, stick, fechar.
7. Três lugares. A partida online só começa com os dois convidados dentro. O anfitrião chama pulso cerca de dez vezes por segundo. Os outros chamam stick. Ao acabar, fechar. O histórico continua no telemóvel.
