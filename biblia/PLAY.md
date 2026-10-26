# Play Store — AAB, tamaño y sala de 3

El APK instala a mano. La ficha nueva de Google Play solo sube un Android App Bundle (.aab).

## Crear el AAB
En el proyecto Android:

    ./gradlew bundleRelease

Sale en `app/build/outputs/bundle/release/app-release.aab`.

Antes, en el módulo app:

- `minifyEnabled true` y `shrinkResources true` en release. R8 quita código y recursos que nadie llama.
- `ndk.abiFilters` solo `arm64-v8a`. Una ficha nueva ya no necesita 32 bits. No metas x86.
- `resConfigs` de "pt", "es", "en". El AAB parte por idioma, densidad y ABI. No desactives esos splits.
- `versionCode` sube de uno en uno. `versionName` de la prueba cerrada: 0.1.0.
- `applicationId` se elige una vez y no se cambia.
- Firma con una upload key. Activa Play App Signing en la consola. El keystore no entra al repositorio.
- `targetSdk` es el que la consola exija ese mes. No subas con uno viejo.
- Release no lleva `debuggable`.

Medir antes de subir:

    java -jar bundletool.jar build-apks --bundle=app-release.aab --output=out.apks --mode=universal
    java -jar bundletool.jar get-size total --apks=out.apks

El módulo base, ya comprimido, tiene que quedar bajo 200 MB. Los vídeos de `plantel/move` y `plantel/attack` no van dentro del base: van en un asset pack de Play Asset Delivery, fast-follow, y el juego arranca sin ellos.

## Sala online de 3
Solo y Con 2 bots siguen sin red. Si el revisor no puede terminar una partida solo, la ficha se rechaza.

Aliados es otra puerta:

- Tres sitios. El anfitrión ocupa uno.
- Dos códigos de un solo uso, válidos solo en esa sala.
- La partida online no empieza hasta que los dos invitados entran.
- Los tres usan el mismo `match_id`. El clima sale de esa semilla, sin mandar el evento por la red.
- El anfitrión es la autoridad de los 10:00. Al cerrar, cada aparato guarda su historial en el sandbox.
- Sin chat en esta versión. Un código no es contenido de usuario. Si más adelante hay texto libre, hace falta denuncia y bloqueo.
- Edad objetivo 16+. Una ficha para niños no puede abrir salas por invitación.
- Permiso `INTERNET`. No pedir permiso de disco.
- Política de privacidad con URL pública: se envía IP y estado de la partida mientras la sala está abierta. El historial se queda en el aparato.
- En el formulario de seguridad de datos, declarar eso y nada más.

La prueba cerrada tiene que incluir una sala real de dos invitados, no solo bots.
