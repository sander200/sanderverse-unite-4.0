# Correção de movimento — aplicar no jogo que já existe

Não recries a app. Não mudes o menu, o HUD nem os personagens. Corrige só isto.

## 1. O verde não é chão
As ilhas de palmeira e qualquer mancha verde de vegetação são muro.
A água também é muro. Só a pedra cinza do carril é andável.
Se o corpo ia entrar no verde, não entres. Desliza ao longo da borda (wall-slide).
Nunca zeres a velocidade inteira: isso é o que trava o personagem.
A cápsula tem raio 0,45 m. O teste é o círculo dos pés, não o centro do sprite.

## 2. A câmara segue o corpo
Pitch 52°, yaw fixo, sem orbitar.
A cada frame a câmara faz lerp até ao personagem (cerca de 0,12 s).
O personagem fica no terço de baixo do ecrã. O olhar aponta 18% para o norte do corpo, para se ver a ameaça e não a nuca da câmara.
Proibido plano aéreo fixo que deixa o herói andar para fora do enquadramento.

## 3. O corpo vira para onde anda
O yaw do modelo segue o vetor do joystick, não a câmara.
- A afastar-se da câmara: mostra as costas.
- Para a esquerda ou direita: mostra o perfil.
- A vir na direção da câmara: mostra a frente.
Se o stick está parado, mantém o último yaw. Não voltes sempre de frente.
A sombra fica no chão, debaixo dos pés, e não roda com o tronco.
