# -*- coding: utf-8 -*-
"""
Construye la version publicable (un solo archivo, sin dependencias externas).

- Incrusta las 22 imagenes como data URI, porque el hosting de artifacts
  bloquea cualquier peticion a otro dominio (CSP estricta).
- Quita <!doctype>, <html>, <head> y <body>: el publicador los pone.
- Inyecta el SVG del codigo QR si se le pasa una URL.

Uso:
    python _construir_web.py                      -> dist/expo.html sin QR
    python _construir_web.py https://.../abc      -> dist/expo.html con QR a esa URL + '#quiz'
"""
import base64, os, re, sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
os.chdir(RAIZ)

def data_uri(nombre):
    with open(os.path.join("img", nombre), "rb") as f:
        return "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("ascii")

def qr_svg(url):
    """QR en SVG puro, sin dependencias en el navegador."""
    import qrcode
    q = qrcode.QRCode(border=1, error_correction=qrcode.constants.ERROR_CORRECT_M)
    q.add_data(url)
    q.make(fit=True)
    m = q.get_matrix()
    n = len(m)
    rects = []
    for y, fila in enumerate(m):
        x = 0
        while x < n:
            if fila[x]:
                x0 = x
                while x < n and fila[x]:
                    x += 1
                rects.append('<rect x="%d" y="%d" width="%d" height="1"/>' % (x0, y, x - x0))
            else:
                x += 1
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 %d %d" '
            'width="100%%" height="100%%" shape-rendering="crispEdges" '
            'role="img" aria-label="Codigo QR para abrir el quiz">'
            '<rect width="%d" height="%d" fill="#f4ece1"/>'
            '<g fill="#0a0705">%s</g></svg>') % (n, n, n, n, "".join(rects))

html = open("index.html", encoding="utf-8").read()

# 1 · incrustar imagenes
usadas = set(re.findall(r"img/([A-Za-z0-9_.-]+\.jpg)", html))
for nombre in sorted(usadas):
    html = html.replace("img/" + nombre, data_uri(nombre))
print("imagenes incrustadas: %d" % len(usadas))

# 2 · inyectar el QR
if len(sys.argv) > 1:
    url_quiz = sys.argv[1].rstrip("/") + "#quiz"
    html = html.replace(
        '<div id="qr-destino" style="aspect-ratio:1;display:grid;place-items:center"></div>',
        '<div id="qr-destino" style="aspect-ratio:1;display:grid;place-items:center">'
        + qr_svg(url_quiz) + '</div>')
    # la URL de respaldo bajo el QR deja de ser la local
    html = html.replace(
        "var urlQuiz = location.origin + location.pathname + '#quiz';",
        "var urlQuiz = %r;" % url_quiz)
    print("QR generado hacia: %s" % url_quiz)
else:
    print("sin QR (no se paso URL)")

# 3 · quitar el envoltorio que pone el publicador
titulo = re.search(r"<title>(.*?)</title>", html, re.S).group(1)
estilo = re.search(r"<style>.*?</style>", html, re.S).group(0)
cuerpo = re.search(r"<body>(.*)</body>", html, re.S).group(1)
salida = "<title>%s</title>\n%s\n%s" % (titulo, estilo, cuerpo)

os.makedirs("dist", exist_ok=True)
with open("dist/expo.html", "w", encoding="utf-8") as f:
    f.write(salida)
print("dist/expo.html  -> %.2f MB" % (len(salida.encode("utf-8")) / 1048576))
