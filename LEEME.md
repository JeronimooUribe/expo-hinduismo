# Exposición Hinduismo — 11-10, INEM José Félix de Restrepo

**Día:** 21 de julio de 2026
**Integrantes:** Santiago Bolívar · Juan José Villa · Jerónimo Uribe · Dulce María Gómez · Paulina Gómez · Isabel Madrigal

---

## El enlace (esto es todo lo que necesitas)

# https://jeronimoouribe.github.io/expo-hinduismo/

Se abre desde **cualquier celular o computador**, sin instalar nada y sin cuenta de nada.
Con eso basta para exponer: no hace falta llevar computador.

- **Avanzar:** flecha abajo, barra espaciadora, o deslizar hacia arriba en el celular.
- **Volver:** flecha arriba.
- **Pantalla completa:** F11 en computador. En el celular, el botón de pantalla completa del navegador.
- Los puntos del lado derecho llevan directo a cualquier diapositiva.

> Guárdalo en los favoritos del celular la noche anterior. Y ábrelo una vez antes de exponer,
> para que las imágenes queden en caché.

## El quiz

La pantalla 12 tiene un **código QR**. Tus compañeros lo escanean con la cámara del celular,
se les abre el quiz y responden las 5 preguntas. Al final cada uno ve su puntaje y la explicación
de cada respuesta.

El QR lleva a `https://jeronimoouribe.github.io/expo-hinduismo/#quiz` — la misma página, sin login
y sin cuenta. Cualquiera puede abrirlo.

## La guía para exponer

En esta carpeta están **`Guia para exponer - Hinduismo.pdf`** y el mismo archivo en `.docx`.
Trae:

- **Un párrafo por escena.** No es un guion para leer: es para entenderlo y después decirlo con
  tus propias palabras.
- **Una línea «Clave»** en cada escena con el dato que no se puede decir mal (la fecha exacta,
  el matiz delicado, el error típico).
- **Una lectura general al final** que cubre la religión completa, para que los seis tengan la
  misma base.
- **Todas las fuentes con su enlace.**

---

## Las 13 pantallas

| # | Escena |
|---|--------|
| 01 | Portada |
| 02 | ¿Qué es el hinduismo? |
| 03 | Cómo empezó todo |
| 04 | Cinco palabras explican casi todo |
| 05 | Dos historias gigantes |
| 06 | Cómo se ve en la calle |
| 07 | **Derechos humanos 1:** las castas |
| 08 | **Derechos humanos 2:** libertad de creer |
| 09 | **Justicia social 1:** una idea que dio la vuelta al mundo |
| 10 | **Justicia social 2:** lo que todavía falta |
| 11 | Está pasando ahora |
| 12 | Quiz con código QR |
| 13 | Fuentes y gracias |

Once escenas de contenido, más el quiz y las fuentes.
Cada escena tiene su propia animación y su fuente citada al pie.

## Los resultados del quiz

# jeronimoouribe.github.io/expo-hinduismo/resultados.html

Ábrelo en el celular durante la exposición. Muestra **quién respondió y cuánto sacó**,
ordenado de mayor a menor, con el total, el promedio y cuántos sacaron 5/5.
Se actualiza solo cada 8 segundos.

El quiz le pide el nombre a cada compañero antes de empezar, y al terminar manda
el resultado a un buzón gratuito (ntfy.sh) que no necesita cuenta ni contraseña.
**Los resultados se borran a las 12 horas**, así que míralos el mismo día.

Si alguien responde dos veces, se queda su mejor intento.

---

## Respaldo, por si acaso

Si por algo falla internet el día de la exposición:

1. Copia toda esta carpeta a una memoria USB.
2. Doble clic en **`ARRANCAR EXPO.bat`** en el computador del salón.
3. Funciona sin internet, con las imágenes ya descargadas, y regenera el QR apuntando
   a la red local del salón.

## Archivos

| Archivo | Para qué |
|---|---|
| `index.html` | La presentación. Es lo que se publica en el enlace de arriba |
| `img/` | Las 20 imágenes reales, ya descargadas |
| `resultados.html` | La página donde ves quién respondió el quiz |
| `Guia para exponer - Hinduismo.pdf` / `.docx` | La guía para estudiar |
| `ARRANCAR EXPO.bat` | Respaldo sin internet |
| `creditos_imagenes.json` | Licencia y crédito de cada imagen |
| `_generar_guia.js` / `_generar_pdf.py` | Regeneran la guía si se cambia el texto |
| `_descargar_imagenes.py` | Vuelve a bajar las imágenes si se pierden |
| `_construir_web.py` | Genera `dist/expo.html`, todo en un solo archivo |

## Publicar un cambio

La página está en GitHub Pages. Después de editar `index.html`:

```
git commit -am "lo que cambiaste"
git push
```

En 1 o 2 minutos queda en vivo. Si quieres borrar la página después de la exposición,
elimina el repositorio `expo-hinduismo` desde github.com.

## Fuentes

Cada dato tiene su fuente citada al pie de la propia diapositiva, y la escena 13 las lista
todas con su dirección. Las principales:

- Pew Research Center — cifras de población hindú (2025)
- Constitución de India, artículos 15, 17 y 25 — constitutionofindia.net
- ONU, Declaración Universal de Derechos Humanos, artículos 1, 2 y 18 — un.org
- NCRB *Crime in India 2023*, vía el Parlamento de India — sansad.in
- Encyclopædia Britannica — britannica.com
- Stanford King Institute — viaje de Martin Luther King a India, 1959

Las 20 imágenes vienen de Wikimedia Commons, de dominio público o con licencia libre.
El detalle está en `creditos_imagenes.json`.
