/* Genera "Guia para exponer - Hinduismo.docx"
   Un parrafo por escena, escrito para entender e interiorizar (no para leer en voz alta),
   mas una lectura general al final y las fuentes con sus enlaces. */

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  ExternalHyperlink, BorderStyle, PageBreak, LevelFormat, Footer, PageNumber
} = require("docx");
const fs = require("fs");

const AZUL = "1F3864";
const GRIS = "595959";
const NARANJA = "9C4A1A";

/* --------- helpers --------- */
const H1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const H2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const P  = (t, o = {}) => new Paragraph({
  spacing: { after: 160, line: 300 },
  alignment: o.just === false ? AlignmentType.LEFT : AlignmentType.JUSTIFIED,
  children: [new TextRun({ text: t, size: o.size || 22, color: o.color, italics: o.italics })]
});
const NOTA = (t) => new Paragraph({
  spacing: { after: 200, line: 280 },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: NARANJA, space: 10 } },
  indent: { left: 200 },
  children: [new TextRun({ text: t, size: 20, color: GRIS, italics: true })]
});
const CLAVE = (etiqueta, texto) => new Paragraph({
  spacing: { after: 140, line: 290 },
  children: [
    new TextRun({ text: etiqueta + "  ", bold: true, size: 22, color: NARANJA }),
    new TextRun({ text: texto, size: 22 })
  ]
});
const LINK = (texto, url) => new Paragraph({
  spacing: { after: 90 },
  numbering: { reference: "vinetas", level: 0 },
  children: [
    new TextRun({ text: texto + " — ", size: 21 }),
    new ExternalHyperlink({ children: [new TextRun({ text: url, style: "Hyperlink", size: 21 })], link: url })
  ]
});

/* ============================================================
   UNA ESCENA = UN PARRAFO PARA INTERIORIZAR
   ============================================================ */
const ESCENAS = [
  {
    n: "01", t: "Portada",
    p: "Esta es la presentación del grupo y del tema. Lo único que hay que dejar claro de entrada es el " +
       "recorrido: vamos a contar el hinduismo en orden, desde que empezó hasta hoy. Sirve decir que no " +
       "vamos a hablar de una religión antigua y muerta, sino de la religión organizada más antigua que " +
       "sigue viva, y que tiene hoy casi 1.200 millones de seguidores. El recorrido va del año 2600 antes " +
       "de Cristo hasta cosas que pasaron el año pasado.",
    clave: "Arranca diciendo: «vamos a contar esta religión en orden, desde el principio hasta hoy»."
  },
  {
    n: "02", t: "¿Qué es el hinduismo?",
    p: "Lo más importante de esta diapositiva es una idea que rompe el molde: el hinduismo no funciona como " +
       "el cristianismo o el islam. No tuvo un fundador que la empezara un día, no tiene un libro único y " +
       "obligatorio, y no tiene una autoridad central que diga qué es lo correcto. Es más bien un conjunto " +
       "enorme de tradiciones que fueron creciendo juntas en India durante miles de años. Por eso adentro " +
       "caben personas que creen en un solo Dios, otras que creen en muchos, y otras que ven lo divino en " +
       "todo lo que existe. Los números que acompañan: casi 1.200 millones de personas, la cuarta religión " +
       "más grande del planeta, y el 95% de ellos vive en India. Y un detalle que sorprende: la palabra " +
       "«hindú» se la pusieron desde afuera, por el río Indo; ellos llaman a su tradición sanatana dharma.",
    clave: "Si alguien pregunta «¿en qué creen los hindúes?», la respuesta honesta es: depende, porque no son un solo grupo."
  },
  {
    n: "03", t: "Cómo empezó todo",
    p: "Aquí se cuenta el origen en tres tiempos. Primero, hacia el año 2600 antes de Cristo, existieron " +
       "ciudades enormes junto al río Indo —Mohenjo-daro y Harappa— que ya tenían alcantarillado y baños " +
       "públicos; ese es el suelo cultural donde después crece todo. Segundo, hacia el 1500 antes de Cristo " +
       "aparecen los Vedas: cuatro colecciones de himnos en sánscrito. Lo llamativo es que nadie los " +
       "escribió durante siglos: se transmitían de memoria, de maestro a alumno. Tercero, la religión de " +
       "esa época consistía en ofrecer sacrificios al fuego; todavía no existían los templos ni las " +
       "estatuas de dioses que hoy asociamos con el hinduismo.",
    clave: "El punto delicado es el sello con la figura sentada. Hay que decir que ALGUNOS investigadores " +
           "creen que podría ser una forma temprana de Shiva, pero que NO está demostrado, porque la " +
           "escritura del valle del Indo nunca se ha logrado descifrar. Reconocer lo que no se sabe suma, no resta."
  },
  {
    n: "04", t: "Cinco palabras explican casi todo",
    p: "Esta es la diapositiva más importante de toda la exposición, porque sin estas cinco palabras nada " +
       "de lo demás se entiende. Vienen de unos textos llamados Upanishads, de hace unos 2.800 años, donde " +
       "la pregunta cambia: ya no es «¿a qué dios le ofrezco un sacrificio?», sino «¿quién soy yo en " +
       "realidad?». Brahman es la realidad de fondo, lo que sostiene todo lo que existe. Atman es tu yo " +
       "verdadero, el de adentro, que no es ni tu cuerpo ni tu personalidad. Samsara es la rueda: naces, " +
       "mueres y vuelves a nacer, una y otra vez. Karma es la ley de que todo lo que haces tiene " +
       "consecuencias, y esas consecuencias deciden cómo vuelves a nacer. Y moksha es salirse de esa rueda " +
       "para siempre: esa, y no otra, es la meta final del hinduismo.",
    clave: "Ojo con un error muy común: moksha NO es renacer en una casta mejor. Eso sería seguir dentro de " +
           "la rueda. Moksha es salir de la rueda del todo."
  },
  {
    n: "05", t: "Dos historias gigantes",
    p: "Entre el año 400 antes de Cristo y el 400 después de Cristo se componen dos relatos enormes que " +
       "funcionan como el «Señor de los Anillos» del hinduismo, pero que además enseñan cómo hay que vivir. " +
       "El primero es el Mahabharata, y adentro tiene la Bhagavad Gita: el guerrero Arjuna se paraliza " +
       "antes de una batalla porque enfrente están sus propios primos, y el dios Krishna, que va manejando " +
       "su carro, le responde. Esa conversación es hoy el texto hindú más leído del mundo. El segundo es el " +
       "Ramayana: al príncipe Rama lo destierran, le secuestran a su esposa Sita y él la rescata; se cuenta " +
       "como ejemplo de lealtad y de cumplir la palabra dada. De estas historias sale la palabra dharma, " +
       "que significa lo correcto que a cada quien le toca hacer según quién es y dónde está.",
    clave: "Dato para dimensionar: el Mahabharata tiene unos 100.000 versos, unas diez veces la Ilíada y la Odisea juntas."
  },
  {
    n: "06", t: "Cómo se ve en la calle",
    p: "Esta parte es la que uno vería si viajara a India hoy, y conviene decirlo así: no es pasado, es " +
       "presente. Aparecen tres dioses principales, que juntos se llaman Trimurti: Brahma crea, Vishnu " +
       "cuida y conserva, y Shiva destruye para que algo nuevo pueda empezar. La práctica cotidiana se " +
       "llama puja, y consiste en ofrecer flores, luz y comida, sea en un templo o en un altar de la casa. " +
       "Y están las dos fiestas más conocidas: Holi, la fiesta de los colores, donde la gente se lanza " +
       "polvos de colores y por un día las diferencias sociales se suspenden; y Diwali, la fiesta de las " +
       "luces, donde se encienden miles de lamparitas para celebrar el regreso de Rama.",
    clave: "Aquí sirve conectar hacia atrás: Diwali celebra al mismo Rama del Ramayana de la escena anterior."
  },
  {
    n: "07", t: "Derechos humanos (1 de 2): las castas",
    p: "Aquí llega el choque más duro entre esta tradición y los derechos humanos, y hay que contarlo " +
       "completo. El sistema de castas significa que uno nace dentro de un grupo social y no lo puede " +
       "cambiar nunca: brahmanes (sacerdotes), kshatriyas (reyes y guerreros), vaishyas (comerciantes y " +
       "campesinos) y shudras (los que sirven a los demás). Y por fuera de esos cuatro quedaban los " +
       "llamados «intocables», que hoy se llaman dalits: el sistema no los ponía abajo, los dejaba afuera. " +
       "Eso contradice directamente el artículo 1 de la Declaración Universal de Derechos Humanos, que " +
       "dice que todos los seres humanos nacen libres e iguales en dignidad y derechos. Pero la respuesta " +
       "vino desde adentro: B. R. Ambedkar, que nació dalit, terminó dirigiendo la escritura de la " +
       "Constitución de India, cuyo artículo 17 abolió la intocabilidad y la convirtió en delito. Esa " +
       "Constitución está en vigor desde el 26 de enero de 1950.",
    clave: "Cuidado con la fecha: la Constitución se APROBÓ el 26 de noviembre de 1949, pero entró EN VIGOR " +
           "el 26 de enero de 1950. Es justo lo que pregunta el quiz."
  },
  {
    n: "08", t: "Derechos humanos (2 de 2): libertad de creer",
    p: "El segundo choque tiene que ver con la libertad religiosa. Existía una costumbre llamada sati: " +
       "cuando un hombre moría, quemaban a su viuda en la misma hoguera. Un reformador hindú, Ram Mohan " +
       "Roy, hizo campaña contra eso hasta que se prohibió por ley el 4 de diciembre de 1829; conviene " +
       "subrayar que la reforma la empujó un hindú, no vino solo desde afuera. Hoy la Constitución de India, " +
       "en su artículo 25, garantiza libertad de conciencia y derecho a profesar, practicar y difundir la " +
       "propia religión. Pero ahí no alcanza del todo: el artículo 18 de la Declaración Universal incluye " +
       "además el derecho a cambiar de religión, y varios estados de India han aprobado leyes que ponen " +
       "trabas para convertirse a otra fe. Del lado positivo, en 1893 el monje Vivekananda presentó el " +
       "hinduismo en un congreso mundial de religiones en Chicago y pidió tolerancia, diciendo estar " +
       "orgulloso de pertenecer a una religión que enseñó al mundo a aceptar a las demás.",
    clave: "Cierra con la aclaración justa: ni el sati ni las castas «son el hinduismo». Son costumbres " +
           "históricas que otros hindúes combatieron y que hoy la ley castiga. Juzgar a 1.200 millones de " +
           "personas por eso sería como juzgar a todo el cristianismo solo por la Inquisición."
  },
  {
    n: "09", t: "Justicia social (1 de 2): lo que esta religión aportó",
    p: "Esta diapositiva cuenta una cadena de tres eslabones que termina lejísimos de donde empezó. " +
       "El primer eslabón es ahimsa, una palabra antigua del hinduismo que significa no hacerle daño a " +
       "ningún ser vivo. El segundo es Gandhi, que a comienzos del siglo XX convierte ese principio " +
       "religioso en un método político concreto: pelear sin violencia, lo que él llamó satyagraha; en " +
       "1930 camina 385 kilómetros hasta el mar y recoge un puñado de sal para romper una ley británica. " +
       "El tercero es Martin Luther King, que en 1959 viaja a India específicamente a estudiar ese método " +
       "y después lo usa contra la segregación racial en Estados Unidos; al llegar dijo que a otros países " +
       "iba como turista, pero que a India venía como peregrino.",
    clave: "No exageres: el hinduismo no es «una religión pacifista» (dentro del Mahabharata hay una guerra " +
           "entera). Lo que se afirma es más preciso: de esa tradición salió un principio que un hombre " +
           "convirtió en herramienta política, y esa herramienta funcionó al otro lado del mundo."
  },
  {
    n: "10", t: "Justicia social (2 de 2): la deuda que sigue abierta",
    p: "Después de contar lo bueno hay que contar lo que falta, y con datos del propio gobierno de India, " +
       "no de activistas. Aunque la ley prohibió la discriminación por casta desde 1950, en 2023 se " +
       "registraron 57.789 denuncias por delitos contra personas de castas bajas en un solo año, y hay " +
       "unos 307.355 casos represados en los juzgados esperando sentencia. Es decir: una ley fuerte con la " +
       "justicia congestionada protege menos de lo que promete en el papel. Del lado de las soluciones, " +
       "India reserva cupos en universidades, empleos públicos y escaños del Congreso para los grupos que " +
       "fueron excluidos históricamente. Y hay un matiz que conviene decir: la casta no es solo un asunto " +
       "religioso, también es una estructura social, tanto que existen dalits cristianos y musulmanes a " +
       "quienes la discriminación también alcanza.",
    clave: "La frase que resume la diapositiva: prohibir algo por ley no lo borra de la sociedad."
  },
  {
    n: "11", t: "Está pasando ahora",
    p: "Tres hechos recientes que demuestran que esto no es historia antigua. En 2025, más de 660 millones " +
       "de personas asistieron al Kumbh Mela en India durante 45 días: es la reunión humana más grande " +
       "registrada en la historia, y la gente va a bañarse en el río porque cree que eso limpia. En 2024 se " +
       "inauguró un gran templo dedicado a Rama en la ciudad de Ayodhya, en un terreno que hindúes y " +
       "musulmanes se disputaron durante décadas y que la Corte Suprema de India resolvió en 2019. Y en " +
       "2014 la ONU declaró el 21 de junio como Día Internacional del Yoga: una práctica nacida dentro del " +
       "hinduismo convertida en una fecha del calendario mundial.",
    clave: "Sobre los 660 millones: es la cifra oficial del gobierno indio y algunos periodistas la han " +
           "cuestionado. Decirlo da credibilidad."
  },
  {
    n: "12", t: "Lo que creemos nosotros",
    p: "Aquí se marca un cambio explícito de tono, y hay que decirlo en voz alta: «hasta aquí fue la " +
       "exposición; esto que sigue es lo que creemos nosotros». Se presentan cinco versículos, cada uno " +
       "con una razón corta. Juan 14:6, donde Jesús no dice que enseña un camino sino que Él es el camino. " +
       "1 Timoteo 2:5, que habla de un solo mediador entre Dios y los hombres. Hechos 4:12, que dice que no " +
       "hay otro nombre por el cual podamos ser salvos. Efesios 2:8-9, que marca la diferencia de fondo con " +
       "el karma: la salvación no se acumula con obras, se recibe como un regalo. Y Hebreos 9:27, que dice " +
       "que está establecido que los hombres mueran una sola vez y después venga el juicio, lo cual " +
       "contrasta directamente con el samsara de la escena 04. Se cierra diciendo que discutimos ideas, " +
       "nunca personas.",
    clave: "El contraste más potente es el de Efesios y Hebreos contra karma y samsara, porque conecta " +
           "directamente con la escena 04. Si conectas eso, la exposición cierra redonda."
  }
];

/* ============================================================
   LECTURA GENERAL (para que los 6 tengan la misma base)
   ============================================================ */
const LECTURA = [
  "El hinduismo es la religión organizada más antigua que sigue viva, y tiene hoy cerca de 1.200 millones " +
  "de seguidores, lo que la convierte en la cuarta más grande del planeta. El 95% de ellos vive en India. " +
  "Lo primero que hay que entender es que no funciona como las religiones a las que estamos acostumbrados: " +
  "no tuvo un fundador que la empezara un día concreto, no tiene un libro único y obligatorio, y no existe " +
  "una autoridad central que decida qué es lo correcto. Es un conjunto muy amplio de tradiciones que " +
  "crecieron juntas durante miles de años. Por eso adentro caben personas que creen en un solo Dios, otras " +
  "en muchos, y otras que ven lo divino en todo lo que existe. Incluso el nombre viene de afuera: «hindú» " +
  "era como llamaban desde otros países a la gente que vivía al otro lado del río Indo. Ellos llaman a su " +
  "tradición sanatana dharma.",

  "Su historia empieza hacia el año 2600 antes de Cristo, cuando existieron ciudades enormes junto al río " +
  "Indo, como Mohenjo-daro y Harappa, que ya tenían alcantarillado y baños públicos. Hacia el 1500 antes " +
  "de Cristo aparecen los Vedas, cuatro colecciones de himnos en sánscrito que durante siglos nadie " +
  "escribió: se transmitían de memoria. En esa época la religión consistía en ofrecer sacrificios al " +
  "fuego, y todavía no existían los templos ni las estatuas de dioses. El cambio grande llega hacia el " +
  "año 800 antes de Cristo con unos textos llamados Upanishads, donde la pregunta deja de ser «¿a qué " +
  "dios le ofrezco?» y pasa a ser «¿quién soy yo?».",

  "De ahí salen las cinco palabras que sostienen todo el edificio. Brahman es la realidad de fondo, lo que " +
  "sostiene cuanto existe. Atman es el yo verdadero de cada persona, el de adentro, que no es ni el cuerpo " +
  "ni la personalidad. Samsara es la rueda de nacer, morir y volver a nacer una y otra vez. Karma es la " +
  "ley según la cual todo acto tiene consecuencias, y esas consecuencias deciden cómo se vuelve a nacer. " +
  "Y moksha es la liberación definitiva de esa rueda, que es la meta final. Es importante no confundirse: " +
  "moksha no significa renacer en una posición mejor, porque eso sería seguir atrapado; significa salir " +
  "del ciclo por completo.",

  "Entre el año 400 antes de Cristo y el 400 después de Cristo se componen dos relatos gigantescos que " +
  "enseñan cómo vivir. El Mahabharata, que contiene la Bhagavad Gita, donde el guerrero Arjuna se paraliza " +
  "antes de una batalla contra sus propios parientes y el dios Krishna le responde; esa conversación es " +
  "hoy el texto hindú más leído del mundo. Y el Ramayana, donde el príncipe Rama es desterrado, le " +
  "secuestran a su esposa Sita y él la rescata. De estas historias viene la palabra dharma: el deber " +
  "correcto que a cada quien le toca según quién es y dónde está. También aparece la bhakti, la devoción " +
  "personal a una deidad, que hasta hoy es la forma más común de vivir esta religión.",

  "A partir del año 300 después de Cristo aparece la cara visible del hinduismo actual: los templos, las " +
  "imágenes y las fiestas. Tres dioses principales forman la Trimurti: Brahma crea, Vishnu conserva y " +
  "Shiva destruye para que algo nuevo empiece. La práctica diaria se llama puja y consiste en ofrecer " +
  "flores, luz y comida. Y están las grandes fiestas: Holi, la de los colores, y Diwali, la de las luces. " +
  "Esta capa no es pasado: sigue funcionando exactamente igual hoy.",

  "El punto más difícil es el sistema de castas: uno nace dentro de un grupo social y no lo puede cambiar. " +
  "Están los brahmanes o sacerdotes, los kshatriyas o guerreros, los vaishyas o comerciantes y los shudras " +
  "o sirvientes; y por fuera de los cuatro quedaban los llamados «intocables», hoy dalits. Eso contradice " +
  "el artículo 1 de la Declaración Universal de Derechos Humanos. La respuesta, sin embargo, vino desde " +
  "adentro: B. R. Ambedkar, nacido dalit, dirigió la escritura de la Constitución de India, cuyo artículo " +
  "17 abolió la intocabilidad. Esa Constitución entró en vigor el 26 de enero de 1950. Algo parecido pasó " +
  "con el sati, la costumbre de quemar a la viuda junto a su esposo muerto: el reformador hindú Ram Mohan " +
  "Roy hizo campaña hasta que se prohibió el 4 de diciembre de 1829.",

  "Del lado positivo, de esta tradición salió ahimsa, el principio de no hacer daño a ningún ser vivo. " +
  "Gandhi lo convirtió en un método político —resistir sin violencia— y Martin Luther King viajó a India " +
  "en 1959 a estudiarlo antes de usarlo contra la segregación racial en Estados Unidos. Pero la deuda " +
  "sigue abierta: en 2023 se registraron 57.789 denuncias por delitos contra personas de castas bajas en " +
  "India, y hay más de 300.000 casos represados en los juzgados. Prohibir algo por ley no lo borra de la " +
  "sociedad.",

  "Hoy sigue siendo una fuerza enorme. En 2025 más de 660 millones de personas asistieron al Kumbh Mela, " +
  "la reunión humana más grande de la historia. En 2024 se inauguró un gran templo a Rama en Ayodhya, tras " +
  "una disputa de décadas que la Corte Suprema de India resolvió en 2019. Y desde 2014 la ONU celebra cada " +
  "21 de junio el Día Internacional del Yoga, una práctica nacida dentro del hinduismo."
];

const FUENTES = [
  ["Pew Research Center — población hindú en el mundo (2025)", "https://www.pewresearch.org/religion/2025/06/09/hindu-population-change/"],
  ["Encyclopædia Britannica — hinduismo", "https://www.britannica.com/topic/Hinduism"],
  ["Encyclopædia Britannica — civilización del valle del Indo", "https://www.britannica.com/topic/Indus-civilization"],
  ["Encyclopædia Britannica — Upanishads", "https://www.britannica.com/topic/Upanishad"],
  ["Encyclopædia Britannica — Mahabharata", "https://www.britannica.com/topic/Mahabharata"],
  ["Encyclopædia Britannica — Ramayana", "https://www.britannica.com/topic/Ramayana"],
  ["ONU — Declaración Universal de Derechos Humanos (arts. 1, 2 y 18)", "https://www.un.org/es/about-us/universal-declaration-of-human-rights"],
  ["Constitución de India — artículo 17, abolición de la intocabilidad", "https://www.constitutionofindia.net/articles/article-17-abolition-of-untouchability/"],
  ["Parlamento de India — datos del NCRB «Crime in India 2023»", "https://sansad.in/getFile/annex/267/AU3650_3LM9tI.pdf"],
  ["Stanford King Institute — viaje de Martin Luther King a India (1959)", "https://kinginstitute.stanford.edu/india-trip"],
  ["DD News (medio público de India) — cierre del Maha Kumbh 2025", "https://ddnews.gov.in/en/mahakumbh-2025-concludes-attracting-over-660-million-visitors/"],
  ["Britannica — Ram Mandir, Ayodhya", "https://www.britannica.com/topic/Ram-Mandir-Ayodhya"],
  ["Belur Math — discursos de Vivekananda en Chicago, 1893", "https://belurmath.org/swami-vivekananda-speeches-at-the-parliament-of-religions-chicago-1893/"],
  ["USCIRF — leyes estatales anti-conversión en India", "https://www.uscirf.gov/"],
  ["Biblia Reina-Valera Antigua (1909), dominio público", "https://www.biblegateway.com/versions/Reina-Valera-Antigua-RVA-Biblia/"],
  ["Wikimedia Commons — origen y licencia de las 22 imágenes", "https://commons.wikimedia.org/"]
];

/* ============================================================
   ARMADO DEL DOCUMENTO
   ============================================================ */
const hijos = [];

hijos.push(new Paragraph({
  spacing: { after: 60 },
  children: [new TextRun({ text: "GUÍA PARA EXPONER", bold: true, size: 20, color: NARANJA })]
}));
hijos.push(new Paragraph({
  spacing: { after: 80 },
  children: [new TextRun({ text: "Hinduismo", bold: true, size: 56, color: AZUL })]
}));
hijos.push(new Paragraph({
  spacing: { after: 40 },
  children: [new TextRun({ text: "I.E. INEM José Félix de Restrepo · Grado 11-10 · 21 de julio de 2026", size: 22, color: GRIS })]
}));
hijos.push(new Paragraph({
  spacing: { after: 300 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: NARANJA, space: 8 } },
  children: [new TextRun({
    text: "Santiago Bolívar · Samuel Villa · Jerónimo Uribe · Dulce María Gómez · Paulina Gómez · Isabel Madrigal",
    size: 21, color: GRIS })]
}));

hijos.push(H2("Cómo usar este documento"));
hijos.push(P("Cada escena de la presentación tiene aquí un párrafo. Ese párrafo no es un guion para leer en " +
  "voz alta: es una explicación para que entiendas lo que hay en la pantalla y después lo digas con tus " +
  "propias palabras. Lee el párrafo de tu escena las veces que necesites hasta que puedas contarlo sin " +
  "mirarlo."));
hijos.push(P("Debajo de cada párrafo hay una línea marcada como «Clave». Ahí está lo que no se puede decir " +
  "mal: la fecha exacta, el matiz delicado o el error típico que hay que evitar. Si vas corto de tiempo, " +
  "aprende al menos eso."));
hijos.push(P("Al final está la lectura general: un texto que cubre la religión completa. La idea es que los " +
  "seis la leamos, para que todos tengamos la misma base y nadie quede en blanco si le preguntan algo de " +
  "otra escena."));

hijos.push(new Paragraph({ children: [new PageBreak()] }));
hijos.push(H1("Una escena, un párrafo"));

ESCENAS.forEach((e, i) => {
  hijos.push(H2("Escena " + e.n + " — " + e.t));
  hijos.push(P(e.p));
  hijos.push(CLAVE("Clave:", e.clave));
  if (i < ESCENAS.length - 1) hijos.push(new Paragraph({ spacing: { after: 60 }, children: [] }));
});

hijos.push(new Paragraph({ children: [new PageBreak()] }));
hijos.push(H1("El quiz y sus respuestas"));
hijos.push(P("Después de la escena 12 viene la pantalla del quiz. Ahí solo hay que invitar al curso a sacar " +
  "el celular, escanear el código QR y responder cinco preguntas. Se abre solo en el navegador, no hay que " +
  "instalar nada ni tener cuenta de nada. Al terminar, cada uno ve su puntaje y la explicación de cada " +
  "respuesta. Las cinco preguntas salen de las escenas 02, 03, 04, 07, 08 y 09."));

hijos.push(H2("Las 5 respuestas correctas"));
const RESPUESTAS = [
  ["1. ¿De dónde viene realmente la palabra «hindú»?",
   "Del nombre del río Sindhu (Indo): así llamaba la gente de fuera a quienes vivían al otro lado del río."],
  ["2. ¿Qué es exactamente moksha?",
   "Salir para siempre del ciclo de nacer, morir y volver a nacer."],
  ["3. ¿Qué artículo abolió la intocabilidad y desde cuándo está en vigor?",
   "El artículo 17, en vigor desde el 26 de enero de 1950."],
  ["4. Sobre el sello del valle del Indo con la figura sentada",
   "Algunos investigadores lo relacionan con formas tempranas de Shiva, pero no está demostrado."],
  ["5. ¿Cuál de los cuatro hechos ocurrió primero?",
   "La prohibición legal del sati en Bengala, el 4 de diciembre de 1829."]
];
RESPUESTAS.forEach(([preg, resp]) => {
  hijos.push(new Paragraph({
    spacing: { before: 140, after: 40 },
    children: [new TextRun({ text: preg, bold: true, size: 22 })]
  }));
  hijos.push(new Paragraph({
    spacing: { after: 60 }, indent: { left: 240 },
    children: [
      new TextRun({ text: "Respuesta: ", bold: true, size: 22, color: NARANJA }),
      new TextRun({ text: resp, size: 22 })
    ]
  }));
});
hijos.push(new Paragraph({ spacing: { before: 180 }, children: [] }));
hijos.push(CLAVE("Clave:", "Las que más se fallan son la 4 y la 5: la 4 se gana admitiendo lo que NO está " +
  "probado, y la 5 es de orden cronológico. Cada quien ve la explicación en su celular apenas contesta."));

hijos.push(new Paragraph({ children: [new PageBreak()] }));
hijos.push(H1("Lectura general"));
hijos.push(P("Esto es para que los seis lo leamos y tengamos la misma base. Cubre la religión completa, de " +
  "principio a fin.", { italics: true, color: GRIS }));
LECTURA.forEach(t => hijos.push(P(t)));

hijos.push(new Paragraph({ children: [new PageBreak()] }));
hijos.push(H1("Fuentes"));
hijos.push(P("Todos los datos de la presentación salen de estas fuentes. Cada enlace lleva directamente a " +
  "donde se comprueba el dato.", { italics: true, color: GRIS }));
FUENTES.forEach(([t, u]) => hijos.push(LINK(t, u)));

hijos.push(new Paragraph({ spacing: { before: 320, after: 100 }, children: [] }));
hijos.push(new Paragraph({
  spacing: { after: 100 },
  children: [new TextRun({ text: "La presentación", bold: true, size: 24, color: AZUL })]
}));
hijos.push(new Paragraph({
  spacing: { after: 300 },
  children: [
    new TextRun({ text: "Se abre desde cualquier celular o computador, sin instalar nada:  ", size: 22 }),
    new ExternalHyperlink({
      children: [new TextRun({ text: "jeronimoouribe.github.io/expo-hinduismo", style: "Hyperlink", size: 22, bold: true })],
      link: "https://jeronimoouribe.github.io/expo-hinduismo/"
    })
  ]
}));
hijos.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200 },
  children: [new TextRun({ text: "Gracias.", size: 40, color: NARANJA, bold: true })]
}));

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 34, bold: true, font: "Arial", color: AZUL },
        paragraph: { spacing: { before: 280, after: 220 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: AZUL },
        paragraph: { spacing: { before: 300, after: 140 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [{
      reference: "vinetas",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 460, hanging: 260 } } } }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1300, right: 1300, bottom: 1300, left: 1300 }
      }
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Hinduismo · 11-10 · página ", size: 18, color: GRIS }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRIS })
          ]
        })]
      })
    },
    children: hijos
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("Guia para exponer - Hinduismo.docx", buf);
  console.log("OK  Guia para exponer - Hinduismo.docx  (" + Math.round(buf.length / 1024) + " KB)");
});

/* Vuelca el mismo contenido a JSON para que el generador de PDF no lo duplique. */
fs.writeFileSync("_contenido_guia.json", JSON.stringify({ ESCENAS, LECTURA, FUENTES }, null, 1), "utf8");
console.log("OK  _contenido_guia.json");
