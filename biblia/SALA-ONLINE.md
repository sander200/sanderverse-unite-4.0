# Sala online — já escrita

Não recries a app. Solo e 2 bots continuam sem rede.

O código da sala está em sala/sala.js. As regras do Firebase estão em sala/rules.json.
Liga Aliados a estas funções: criarSala, juntar, ouvir, pulso, stick, fechar.
Três lugares. A partida online só começa com os dois convidados dentro.
O anfitrião chama pulso cerca de dez vezes por segundo. Os outros chamam stick.
Ao acabar, fechar. O histórico continua no telemóvel.

A config do Firebase não está no repositório. O jogador cola os seis campos do projeto Spark no ecrã de configuração, uma vez.
Authentication anónima tem de estar ligada. Realtime Database na região mais próxima. Cola sala/rules.json nas regras.
