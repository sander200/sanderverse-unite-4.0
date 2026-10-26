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
La semilla es el match_id. No se manda el clima por la red: cada cliente tira el mismo cronograma.
A los 3:00, 6:00 y 9:00 sale uno de: sol, lluvia pesada, niebla de guerra, tempestad de arena.
No se repite el evento de la tirada anterior.
Sol: sin modificador.
Lluvia pesada: marcha ×0,9 y visión corta.
Niebla de guerra: corta visión, no bloquea.
Tempestad de arena: marcha ×0,85 y visión corta.
Ninguno cierra el mid. Dos match_id distintos no salen iguales.

## Almacenamiento
Guardar en el sandbox privado de la app. No pedir permiso global de disco.
Android: el equivalente a /data/user/0/[paquete]/files.
iOS: Library/Application Support. No usar Documents, porque iCloud lo respalda y la App Store puede rechazar la app.
Al desinstalar, se borra.
Se guarda fecha, modo (solo o 2 bots), depósito, derrotas, duración y resultado. La mejor puntuación es el depósito más alto.
También se guardan ahí el volumen y el match_id de la última sala.

## Sander, vista por yaw
El plano es +X este, +Z norte. La cámara mira desde el sur.
Yaw del stick, 0° = este, 90° = norte.
- 45° a 135°: espalda (se aleja).
- 135° a 225°: perfil, volteo horizontal (oeste).
- 225° a 315°: frente (viene hacia la cámara).
- el resto: perfil, sin volteo (este).
Quieto, se conserva el último yaw. No volver al perfil por defecto.
No estirar un cuadro. Un hueco transparente dentro del cuerpo es un fallo.

## Neutrales
Los monstruos de campo pueden usar piezas CC0 de Kenney, carpeta Sci-fi (https://kenney.nl/assets).
Sander, Polo, Lupe, Topete, Cristian, Babalu y Omega no se sustituyen por esos modelos.
