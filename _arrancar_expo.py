# -*- coding: utf-8 -*-
"""
Arranca la exposicion en el salon.

1. Averigua la IP del portatil en el WiFi del salon.
2. Genera el QR apuntando a ESA IP, para que los celulares de los companeros
   abran el quiz sin necesidad de internet ni de cuenta de nada.
3. Levanta el servidor y abre la presentacion en el navegador.

Se corre con doble clic en "ARRANCAR EXPO.bat".
"""
import http.server
import os
import re
import socket
import socketserver
import threading
import webbrowser

PUERTO = 5177
RAIZ = os.path.dirname(os.path.abspath(__file__))
os.chdir(RAIZ)


def ip_lan():
    """IP del portatil en la red local. No envia nada: solo consulta la ruta."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))
        return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        s.close()


def qr_svg(url):
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


def preparar(url_quiz):
    """Escribe salon.html: la misma presentacion con el QR apuntando a esta IP."""
    html = open("index.html", encoding="utf-8").read()
    html = re.sub(
        r'(<div id="qr-destino"[^>]*>)</div>',
        lambda m: m.group(1) + qr_svg(url_quiz) + "</div>",
        html, count=1)
    html = html.replace(
        "var urlQuiz = location.origin + location.pathname + '#quiz';",
        "var urlQuiz = %r;" % url_quiz)
    with open("salon.html", "w", encoding="utf-8") as f:
        f.write(html)


class Silencioso(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def main():
    ip = ip_lan()
    url_quiz = "http://%s:%d/salon.html#quiz" % (ip, PUERTO)
    url_expo = "http://localhost:%d/salon.html" % PUERTO
    preparar(url_quiz)

    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.ThreadingTCPServer(("0.0.0.0", PUERTO), Silencioso)
    threading.Thread(target=srv.serve_forever, daemon=True).start()

    print("")
    print("  ===============================================================")
    print("   EXPOSICION HINDUISMO - 11-10 - lista")
    print("  ===============================================================")
    print("")
    print("   Presentacion (esta pantalla):   %s" % url_expo)
    print("   Quiz (celulares del salon):     %s" % url_quiz)
    print("")
    print("   Los companeros escanean el QR de la ultima diapositiva.")
    print("   Tienen que estar en el MISMO WiFi que este portatil.")
    print("")
    print("   Avanzar: flecha abajo   |   Volver: flecha arriba")
    print("   Pantalla completa: F11")
    print("")
    print("   Para cerrar todo: cierra esta ventana negra.")
    print("  ===============================================================")
    print("")

    webbrowser.open(url_expo)
    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
