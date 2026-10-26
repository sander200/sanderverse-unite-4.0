# Sala, marcador, revive, misiones y clima

Aplicar sobre el juego que ya existe. No recrees la app. No cambies la planta ni los metros.

## Sander, al moverse
No estires un solo cuadro. Al caminar cambia de vista: frente, perfil o espalda, según el yaw del stick.
Prohibido un hueco transparente dentro del cuerpo. El corte de alfa 0,15 se hace una vez, en la hoja fuente, no en cada frame del paso.
El contorno #0e1626 se queda. La sombra no se despega de los pies.

## Sala, antes de Entrar en la Arena
Quita el volumen de la partida.
Arriba de esa sala, una franja de configuración:
- General, Música, Efectos. Los tres sliders viven aquí y se guardan.
- Solo. Al elegirlo, entra solo.
- Con 2 bots. Al elegirlo, entra con dos bots.
- Aliados en línea. Se ve, está apagado, dice "en breve". Ahí crecerán las opciones futuras. No lo actives.

## Marcador
Junto al depósito, cuenta las derrotas de cada equipo.
Una derrota no termina la partida.

## Revive
Sin límite de vidas.
El revive se corta, y la partida cierra, solo si:
- el reloj llega a 10:00, o
- cae un nexo, o
- un equipo llega a 80 de depósito. Esa victoria ya es irreversible.

## Misión
Una misión activa por equipo. Mazo:
1. Depositar 5 fragmentos.
2. Pisar el foso mientras Omega está vivo.
3. Usar el santuario propio.
4. Aguantar 45 s sin caer.
Al cumplirla, el portador recibe 2 fragmentos para depositar. No se suman puntos sueltos al marcador.
Caduca a los 90 s y sale otra.

## Clima
A los 3:00, tormenta en el lateral oeste: marcha ×0,9 y visión corta.
A los 6:00, neblina en el foso: corta visión, no bloquea.
A los 9:00, crecida en el lateral este durante 45 s. Ese carril se cierra.
El mid nunca se inunda.

## Neutrales
Los monstruos de campo pueden usar piezas CC0 de Kenney, carpeta Sci-fi (https://kenney.nl/assets).
Sander, Polo, Lupe, Topete, Cristian, Babalu y Omega no se sustituyen por esos modelos.
