# Exposición Hinduismo — 11-10, INEM José Félix de Restrepo

**Día:** 21 de julio de 2026
**Integrantes:** Santiago Bolívar · Samuel Villa · Jerónimo Uribe · Dulce María Gómez · Paulina Gómez · Isabel Madrigal

---

## Cómo se presenta el día de la exposición

1. Copia **toda esta carpeta** a una memoria USB o al PC del salón (tiene que ir completa,
   con la carpeta `img` adentro).
2. Doble clic en **`ARRANCAR EXPO.bat`**.
3. Se abre una ventana negra y, detrás, el navegador con la presentación.
   **No cierres la ventana negra**: es la que mantiene todo encendido.
4. Presiona **F11** para pantalla completa.
5. Avanzar: **flecha abajo**. Volver: **flecha arriba**.
   También sirven la barra espaciadora, la rueda del mouse y los puntos de la derecha.

> No necesita internet. Las imágenes ya están descargadas dentro de `img`.

## El quiz

La ventana negra imprime dos direcciones. La segunda es la del quiz, con la IP del portátil,
por ejemplo `http://192.168.78.135:5177/salon.html#quiz`.
El **código QR de la última diapositiva se genera solo con esa dirección** cada vez que arrancas.

Los compañeros escanean el QR con la cámara del celular y responden. Ven su puntaje y la
explicación de cada pregunta al final.

**Requisito único:** los celulares tienen que estar en el **mismo WiFi** que el portátil.
Si el WiFi del colegio aísla los dispositivos entre sí, usa el respaldo en línea (abajo)
o comparte datos desde tu celular y conecta el portátil a esa red.

### Si quieres recibir los puntajes por WhatsApp
En `index.html`, busca la línea `var WA = "";` (está cerca del final, dentro del script).
Pon el número en formato internacional sin el `+`, así:

```js
var WA = "573001234567";
```

Guarda, y vuelve a correr `ARRANCAR EXPO.bat`. Al terminar el quiz aparece un botón que
abre WhatsApp con el puntaje ya escrito.

## Respaldo en línea

https://claude.ai/code/artifact/136936ec-fbfa-4654-b687-0379cec3a3bc

Es la misma presentación con las imágenes incrustadas en el archivo. **Ojo:** ese enlace
está asociado a la cuenta de Claude de Jerónimo. Sirve para ensayar desde otro computador,
pero **no sirve como QR para el salón** si los compañeros no pueden abrirlo.

---

## Qué hay en cada diapositiva

| # | Escena | Expone |
|---|--------|--------|
| 01 | Portada | Santiago Bolívar |
| 02 | ¿De qué hablamos? Cifras de hoy | Santiago Bolívar |
| 03 | Raíces: valle del Indo y los Vedas | Samuel Villa |
| 04 | Upanishads: Brahman, atman, samsara, karma, moksha | Samuel Villa |
| 05 | Épicas: Mahabharata, Bhagavad Gita, Ramayana | Dulce María Gómez |
| 06 | Práctica viva: Trimurti, puja, Holi, Diwali | Dulce María Gómez |
| 07 | **Derechos humanos 1:** casta y dignidad | Paulina Gómez |
| 08 | **Derechos humanos 2:** libertad religiosa y mujeres | Paulina Gómez |
| 09 | **Justicia social 1:** ahimsa, Gandhi, Martin Luther King | Isabel Madrigal |
| 10 | **Justicia social 2:** los datos de hoy | Isabel Madrigal |
| 11 | Hinduismo hoy: Kumbh 2025, Ayodhya 2024, ONU | Jerónimo Uribe |
| 12 | Nuestra postura: por qué seguimos a Jesús | Jerónimo Uribe |
| — | Quiz con código QR | todos |

Doce diapositivas, dos por persona, más la pantalla del quiz al final.
Cada escena lleva su propia animación y su cintillo de fuentes abajo.

---

## Archivos

| Archivo | Para qué |
|---|---|
| `ARRANCAR EXPO.bat` | Lo único que hay que abrir el día de la exposición |
| `index.html` | La presentación (el original que se edita) |
| `salon.html` | Se genera solo al arrancar, con el QR de la IP del momento |
| `img/` | Las 22 imágenes reales, ya descargadas |
| `creditos_imagenes.json` | Licencia y crédito de cada imagen |
| `dist/expo.html` | Versión de un solo archivo, para publicar en línea |
| `_arrancar_expo.py` | El motor del `.bat` |
| `_construir_web.py` | Genera `dist/expo.html` |
| `_descargar_imagenes.py` | Vuelve a bajar las imágenes si se pierden |

## Sobre las fuentes

Todo dato de la presentación tiene su fuente citada al pie de la propia diapositiva,
con el nombre del documento y la dirección donde se comprueba. Las principales:

- Pew Research Center, *How the Global Religious Landscape Changed From 2010 to 2020* (2025)
- Constitución de India, artículos 15, 17 y 25 — constitutionofindia.net
- ONU, Declaración Universal de Derechos Humanos, artículos 1, 2 y 18
- NCRB, *Crime in India 2023*, vía documento oficial del Parlamento de India (sansad.in)
- Encyclopædia Britannica (Hinduism, Indus civilization, Upanishad, Mahabharata, Ramayana)
- Stanford King Institute, viaje de Martin Luther King a India (1959)
- Biblia Reina-Valera Antigua (1909), en dominio público

Las 22 imágenes vienen de Wikimedia Commons, todas de dominio público o con licencia
Creative Commons / GODL-India. El detalle está en `creditos_imagenes.json`.
