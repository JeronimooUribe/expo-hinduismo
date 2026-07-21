# -*- coding: utf-8 -*-
"""Genera el PDF de la guia a partir del MISMO contenido que el .docx
(_contenido_guia.json), para que los dos nunca se desincronicen."""

import json
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, PageBreak,
                                HRFlowable, ListFlowable, ListItem)

AZUL = colors.HexColor("#1F3864")
GRIS = colors.HexColor("#595959")
NARANJA = colors.HexColor("#9C4A1A")

d = json.load(open("_contenido_guia.json", encoding="utf-8"))

def st(nombre, **kw):
    base = dict(fontName="Helvetica", fontSize=10.5, leading=15.5, textColor=colors.HexColor("#1a1a1a"))
    base.update(kw)
    return ParagraphStyle(nombre, **base)

S = {
  "rotulo":  st("rotulo", fontName="Helvetica-Bold", fontSize=9, textColor=NARANJA, spaceAfter=4),
  "titulo":  st("titulo", fontName="Helvetica-Bold", fontSize=30, leading=34, textColor=AZUL, spaceAfter=8),
  "sub":     st("sub", fontSize=10.5, textColor=GRIS, spaceAfter=3),
  "h1":      st("h1", fontName="Helvetica-Bold", fontSize=17, leading=21, textColor=AZUL,
                spaceBefore=16, spaceAfter=11),
  "h2":      st("h2", fontName="Helvetica-Bold", fontSize=13, leading=17, textColor=AZUL,
                spaceBefore=15, spaceAfter=7),
  "p":       st("p", alignment=TA_JUSTIFY, spaceAfter=8),
  "italica": st("italica", fontName="Helvetica-Oblique", textColor=GRIS, spaceAfter=10),
  "clave":   st("clave", fontSize=10, leading=14.5, alignment=TA_JUSTIFY,
                leftIndent=10, borderColor=NARANJA, borderWidth=0, spaceAfter=12),
  "link":    st("link", fontSize=9.5, leading=13.5, spaceAfter=5),
  "gracias": st("gracias", fontName="Helvetica-Bold", fontSize=22, textColor=NARANJA,
                alignment=TA_CENTER, spaceBefore=16),
}

def pie(canvas, doc_):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(GRIS)
    canvas.drawCentredString(letter[0] / 2, 1.15 * cm,
                             "Hinduismo · 11-10 · página %d" % doc_.page)
    canvas.restoreState()

f = []
f.append(Paragraph("GUÍA PARA EXPONER", S["rotulo"]))
f.append(Paragraph("Hinduismo", S["titulo"]))
f.append(Paragraph("I.E. INEM José Félix de Restrepo &nbsp;·&nbsp; Grado 11-10 &nbsp;·&nbsp; 21 de julio de 2026", S["sub"]))
f.append(Paragraph("Santiago Bolívar · Samuel Villa · Jerónimo Uribe · Dulce María Gómez · Paulina Gómez · Isabel Madrigal", S["sub"]))
f.append(Spacer(1, 7))
f.append(HRFlowable(width="100%", thickness=1.1, color=NARANJA, spaceAfter=15))

f.append(Paragraph("Cómo usar este documento", S["h2"]))
f.append(Paragraph(
    "Cada escena de la presentación tiene aquí un párrafo. Ese párrafo <b>no es un guion para leer en voz "
    "alta</b>: es una explicación para que entiendas lo que hay en la pantalla y después lo digas con tus "
    "propias palabras. Lee el párrafo de tu escena las veces que necesites hasta que puedas contarlo sin mirarlo.", S["p"]))
f.append(Paragraph(
    "Debajo de cada párrafo hay una línea marcada como <b>Clave</b>. Ahí está lo que no se puede decir mal: "
    "la fecha exacta, el matiz delicado o el error típico que hay que evitar. Si vas corto de tiempo, aprende al menos eso.", S["p"]))
f.append(Paragraph(
    "Al final está la <b>lectura general</b>: un texto que cubre la religión completa. La idea es que los seis "
    "la leamos, para que todos tengamos la misma base y nadie quede en blanco si le preguntan algo de otra escena.", S["p"]))

f.append(PageBreak())
f.append(Paragraph("Una escena, un párrafo", S["h1"]))
for e in d["ESCENAS"]:
    f.append(Paragraph("Escena %s — %s" % (e["n"], e["t"]), S["h2"]))
    f.append(Paragraph(e["p"], S["p"]))
    f.append(Paragraph('<font color="#9C4A1A"><b>Clave:</b></font> ' + e["clave"], S["clave"]))

f.append(Paragraph("Pantalla final — el quiz", S["h2"]))
f.append(Paragraph(
    "Después de la escena 12 viene la pantalla del quiz. Ahí solo hay que invitar al curso a sacar el celular, "
    "escanear el código QR y responder cinco preguntas. Se abre solo en el navegador: no hay que instalar nada "
    "ni tener cuenta de nada. Al terminar, cada uno ve su puntaje y la explicación de cada respuesta.", S["p"]))
f.append(Paragraph(
    '<font color="#9C4A1A"><b>Clave:</b></font> Las respuestas correctas son, en orden: la primera opción, la '
    "segunda, la tercera, la segunda y la tercera. Están difíciles a propósito: dos se ganan entendiendo un "
    "matiz, no memorizando fechas.", S["clave"]))

f.append(PageBreak())
f.append(Paragraph("Lectura general", S["h1"]))
f.append(Paragraph("Esto es para que los seis lo leamos y tengamos la misma base. "
                   "Cubre la religión completa, de principio a fin.", S["italica"]))
for t in d["LECTURA"]:
    f.append(Paragraph(t, S["p"]))

f.append(PageBreak())
f.append(Paragraph("Fuentes", S["h1"]))
f.append(Paragraph("Todos los datos de la presentación salen de estas fuentes. "
                   "Cada enlace lleva directamente a donde se comprueba el dato.", S["italica"]))
items = []
for titulo, url in d["FUENTES"]:
    items.append(ListItem(Paragraph(
        '%s — <font color="#1F3864"><a href="%s">%s</a></font>' % (titulo, url, url), S["link"]),
        leftIndent=14))
f.append(ListFlowable(items, bulletType="bullet", bulletFontSize=7,
                      bulletColor=NARANJA, leftIndent=14))

f.append(Spacer(1, 18))
f.append(Paragraph("La presentación", S["h2"]))
URL = "https://jeronimoouribe.github.io/expo-hinduismo/"
f.append(Paragraph(
    'Se abre desde cualquier celular o computador, sin instalar nada:<br/>'
    '<font color="#1F3864"><b><a href="%s">jeronimoouribe.github.io/expo-hinduismo</a></b></font>' % URL, S["p"]))
f.append(Paragraph("Gracias.", S["gracias"]))

doc = SimpleDocTemplate(
    "Guia para exponer - Hinduismo.pdf", pagesize=letter,
    leftMargin=2.3*cm, rightMargin=2.3*cm, topMargin=2.1*cm, bottomMargin=2.1*cm,
    title="Guía para exponer — Hinduismo · 11-10",
    author="11-10 INEM José Félix de Restrepo")
doc.build(f, onFirstPage=pie, onLaterPages=pie)
print("OK  Guia para exponer - Hinduismo.pdf")
