# -*- coding: utf-8 -*-
"""Descarga y optimiza las imagenes reales (Wikimedia Commons) de la expo."""
import json, os, urllib.request, io
from PIL import Image

UA = {"User-Agent": "ExpoHinduismoInem/1.0 (proyecto escolar; uribesscompany@gmail.com)"}
OUT = "img"

# clave -> (url directa, ancho_max, archivo_commons, licencia, autor/credito)
IMGS = {
 "portada":      ("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Tower_of_Meenakshi_amman_temple.jpg/1920px-Tower_of_Meenakshi_amman_temple.jpg", 1800, "Tower of Meenakshi amman temple.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
 "mapa":         ("https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Countries_by_percentage_of_adherents_to_Hinduism.svg/1920px-Countries_by_percentage_of_adherents_to_Hinduism.svg.png", 1600, "Countries by percentage of adherents to Hinduism.svg", "CC BY-SA 4.0", "Wikimedia Commons"),
 "mohenjodaro":  ("https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Great_Bath%2C_Mohenjo-daro_20160806_JYN-02.jpg/1920px-Great_Bath%2C_Mohenjo-daro_20160806_JYN-02.jpg", 1500, "Great Bath, Mohenjo-daro 20160806 JYN-02.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
 "sello":        ("https://upload.wikimedia.org/wikipedia/commons/2/2f/Shiva_Pashupati.jpg", 1000, "Shiva Pashupati.jpg", "Dominio publico", "Wikimedia Commons"),
 "rigveda":      ("https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/1500-1200_BCE%2C_Rigveda_manuscript_page_sample_iii%2C_Sanskrit%2C_Devanagari.jpg/1920px-1500-1200_BCE%2C_Rigveda_manuscript_page_sample_iii%2C_Sanskrit%2C_Devanagari.jpg", 1400, "Rigveda manuscript page sample iii", "CC BY-SA 4.0", "Ms Sarah Welch"),
 "upanishad":    ("https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Katha_Upanishad%2C_Sanskrit%2C_Grantha_script%2C_Whish_Manuscript_Collection_acquired_1836_CE.jpg/1920px-Katha_Upanishad%2C_Sanskrit%2C_Grantha_script%2C_Whish_Manuscript_Collection_acquired_1836_CE.jpg", 1400, "Katha Upanishad, Whish Manuscript Collection", "CC BY-SA 4.0", "Wikimedia Commons"),
 "gita":         ("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Krishna_Arjuna_Gita.jpg/1920px-Krishna_Arjuna_Gita.jpg", 1500, "Krishna Arjuna Gita.jpg", "Dominio publico", "c. 1830"),
 "ramayana":     ("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Battle_at_Lanka%2C_Ramayana%2C_Udaipur%2C_1649-53.jpg/1920px-Battle_at_Lanka%2C_Ramayana%2C_Udaipur%2C_1649-53.jpg", 1500, "Battle at Lanka, Ramayana, Udaipur, 1649-53.jpg", "Dominio publico", "Udaipur, 1649-53"),
 "trimurti":     ("https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Trimurti_elephanta.jpg/1920px-Trimurti_elephanta.jpg", 1400, "Trimurti elephanta.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
 "nataraja":     ("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Shiva_as_the_Lord_of_Dance_LACMA_edit.jpg/1920px-Shiva_as_the_Lord_of_Dance_LACMA_edit.jpg", 1200, "Shiva as the Lord of Dance LACMA edit.jpg", "Dominio publico", "LACMA, c. 950-1000"),
 "aarti":        ("https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Evening_ganga_aarti_at_varanasi_ghat_UP.jpg/1920px-Evening_ganga_aarti_at_varanasi_ghat_UP.jpg", 1600, "Evening ganga aarti at varanasi ghat UP.jpg", "CC BY-SA 4.0", "Rahul Singh"),
 "holi":         ("https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lathmar_Holi_2022_in_Nandgaon%2C_Uttar_Pradesh.jpg/1920px-Lathmar_Holi_2022_in_Nandgaon%2C_Uttar_Pradesh.jpg", 1500, "Lathmar Holi 2022 in Nandgaon, Uttar Pradesh.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
 "diwali":       ("https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/A_woman_lightening_Diyas_during_Diwali.jpg/1920px-A_woman_lightening_Diyas_during_Diwali.jpg", 1500, "A woman lightening Diyas during Diwali.jpg", "CC BY-SA 4.0", "Wikimedia Commons"),
 "ambedkar":     ("https://upload.wikimedia.org/wikipedia/commons/8/8a/Dr._Ambedkar_1.jpg", 1000, "Dr. Ambedkar 1.jpg", "Dominio publico", "Wikimedia Commons"),
 "constitucion": ("https://upload.wikimedia.org/wikipedia/commons/0/0b/Preamble_of_Constitution_of_India.jpg", 1400, "Preamble of Constitution of India.jpg", "CC BY-SA 4.0", "Constitucion de India, 1949"),
 "rammohanroy":  ("https://upload.wikimedia.org/wikipedia/commons/6/6e/Portrait_of_Raja_Ram_Mohun_Roy%2C_1833.jpg", 1100, "Portrait of Raja Ram Mohun Roy, 1833.jpg", "Dominio publico", "1833"),
 "vivekananda":  ("https://upload.wikimedia.org/wikipedia/commons/4/47/Swami_Vivekananda_1893_Chicago_image_Harrison.jpg", 1100, "Swami Vivekananda 1893 Chicago image Harrison.jpg", "Dominio publico", "Chicago, 1893"),
 "gandhi":       ("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Gandhi_at_Dandi%2C_5_April_1930.jpg/1920px-Gandhi_at_Dandi%2C_5_April_1930.jpg", 1500, "Gandhi at Dandi, 5 April 1930.jpg", "Dominio publico", "Dandi, 5 abril 1930"),
 "protesta":     ("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Protest_manual_scavening.JPG/1920px-Protest_manual_scavening.JPG", 1500, "Protest manual scavening.JPG", "CC BY-SA 3.0", "Wikimedia Commons"),
 "kumbh2025":    ("https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Crowd_in_maha_kumbh_mela.jpg/1920px-Crowd_in_maha_kumbh_mela.jpg", 1700, "Crowd in maha kumbh mela.jpg", "CC BY-SA 4.0", "Maha Kumbh 2025, Prayagraj"),
 "rammandir":    ("https://upload.wikimedia.org/wikipedia/commons/d/df/Ayodhya_Ram_Mandir_Inauguration_Day_Picture.jpg", 1600, "Ayodhya Ram Mandir Inauguration Day Picture.jpg", "GODL-India", "22 enero 2024"),
 "yoga":         ("https://upload.wikimedia.org/wikipedia/commons/c/c5/The_Naval_Contingent_at_the_2015_International_Yoga_Day_celebration_at_Rajpath_led_by_the_Prime_Minister.jpg", 1600, "International Yoga Day 2015, Rajpath", "GODL-India", "21 junio 2015"),
 "om":           ("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Om_symbol.svg/1920px-Om_symbol.svg.png", 700, "Om symbol.svg", "Dominio publico", "Wikimedia Commons"),
}

os.makedirs(OUT, exist_ok=True)
creditos = {}
total = 0
for key, (url, w, fname, lic, autor) in IMGS.items():
    dest = os.path.join(OUT, key + ".jpg")
    try:
        raw = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=90).read()
        im = Image.open(io.BytesIO(raw))
        if im.mode in ("RGBA", "LA", "P"):
            bg = Image.new("RGB", im.size, (14, 10, 8))
            im = im.convert("RGBA")
            bg.paste(im, mask=im.split()[-1])
            im = bg
        else:
            im = im.convert("RGB")
        if im.width > w:
            im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        im.save(dest, "JPEG", quality=76, optimize=True, progressive=True)
        kb = os.path.getsize(dest) // 1024
        total += kb
        print("OK  %-14s %5d KB  %dx%d" % (key, kb, im.width, im.height))
    except Exception as e:
        print("ERR %-14s %s" % (key, e))
        continue
    creditos[key] = {"archivo": fname, "licencia": lic, "credito": autor,
                     "fuente": "Wikimedia Commons"}
json.dump(creditos, open("creditos_imagenes.json", "w", encoding="utf-8"),
          ensure_ascii=False, indent=1)
print("TOTAL %d KB / %d imagenes" % (total, len(creditos)))
