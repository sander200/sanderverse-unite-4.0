# Play Store — AAB, no solo APK

La ficha nueva de Google Play no acepta un APK como paquete de subida. El archivo es un Android App Bundle (.aab). El APK sirve para instalar a mano en un teléfono. El AAB es el que entra en la consola.

## Cuando se pague la consola
1. Crear la app en Play Console. El applicationId queda fijo para siempre. No cambiarlo después.
2. Activar Play App Signing. El keystore de subida se guarda fuera del repositorio.
3. Subir el AAB a una prueba cerrada, no a producción, el primer mes.
4. Completar ficha, clasificación de contenido y política de privacidad. El juego guarda historial y mejor puntuación en el almacenamiento privado del aparato.

## Cómo sale el AAB
En el proyecto Android, no en esta biblia:

    ./gradlew bundleRelease

El archivo queda en app/build/outputs/bundle/release/. versionCode sube de uno en uno. versionName puede ser 0.1.0 en la prueba cerrada.

No hace falta pedir permiso global de disco. El save ya va al sandbox de la app.

## Golpes de referencia
Cada personaje tiene un ataque de 6 segundos en plantel/attack/.
Sander golpe, Polo tajo, Lupe arco, Topete filo, Cristian estocada, Babalu disparo, Omega zarpazo.
No regenerar el modelo. Usar ese clip como el golpe.
