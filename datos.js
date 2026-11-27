/* ==========================================================================
   DATOS DEL SITIO — edita este archivo para actualizar contenido
   No necesitas tocar index.html ni main.js para agregar proyectos.
   ========================================================================== */

/* --- CONTACTO ---
   Deja en blanco ('') lo que no quieras mostrar; solo aparecen los que tengan valor.
   whatsapp: solo números con código de país, sin + ni espacios. Ej.: '50212345678'   */
const CONTACTO = {
    whatsapp: '50255513002',
    email: '',
    linkedin: '',
    github: '',
    mensajeWhatsapp: 'Hola, vi su página y me interesa cotizar un proyecto.'
};

/* --- CERTIFICACIONES ---
   Franja de logos de las marcas que te certifican; se desplaza sola.
   logo: archivo en img/logos/ | alto: tamaño en px (opcional, para agrandar o achicar un logo) | nombre: texto junto al logo (vacío si el logo ya trae el nombre)
   titulo: detalle que aparece al pasar el mouse | enlace: URL de verificación (opcional)
   Certificaciones: Cisco CCNA: Switching, Routing, and Wireless Essentials; Cisco Python Essentials 1;
   Fortinet Certified Associate Cybersecurity; Fortinet NSE 3; FortiGate 7.6 Operator;
   AWS Cloud Practitioner Essentials. */
const CERTIFICACIONES = [
    { logo: 'img/logos/cisco.svg',    alto: 78, nombre: '',         titulo: 'Cisco: CCNA Switching, Routing & Wireless Essentials · Python Essentials 1', enlace: '' },
    { logo: 'img/logos/fortinet.svg', nombre: 'Fortinet', titulo: 'Fortinet: Certified Associate Cybersecurity · NSE 3 · FortiGate 7.6 Operator', enlace: '' },
    { logo: 'img/logos/aws.png',      nombre: '',         titulo: 'AWS Cloud Practitioner Essentials', enlace: '' },
    { logo: 'img/logos/sqlserver.svg', nombre: 'SQL Server', titulo: 'Microsoft SQL Server', enlace: '' },
    { logo: 'img/logos/oracle.svg',    nombre: 'Oracle',    titulo: 'Oracle', enlace: '' }
];

/* --- TECNOLOGÍAS --- agrupadas; agrega o quita las que uses */
const TECNOLOGIAS = [
    { grupo: 'Frontend',            items: ['React', 'JavaScript', 'HTML5', 'CSS3'] },
    { grupo: 'Backend y lenguajes', items: ['Python'] },
    { grupo: 'Nube',                items: ['AWS'] },
    { grupo: 'Redes y seguridad',   items: ['Cisco', 'Fortinet', 'Wi-Fi / AP', 'CCTV'] }
];

/* --- PROYECTOS ---
   Para agregar uno nuevo, copia un bloque { ... } completo y cambia los datos.
   Las capturas van en la carpeta img/proyectos/ (respeta mayúsculas y minúsculas
   del nombre del archivo: Vercel las distingue).
   - imagenes: la primera es la portada de la tarjeta; todas se ven en el visor.
     Cada una lleva src (archivo) y pie (texto que aparece debajo en el visor).
   - tecnologias: etiquetas que se muestran en la tarjeta (puede quedar vacía).
   - color: tono del brillo detrás de las capturas (código hex, opcional).
   - Las capturas de PC se muestran en un marco de navegador y las de celular
     en un marco de teléfono; la página lo detecta sola por la forma de la imagen.
   - enlace: opcional, URL del sitio en vivo (déjalo '' si es un sistema privado).
   - Si la lista queda vacía, la sección muestra un mensaje de "en preparación".   */
const PROYECTOS = [
    {
        titulo: 'Menú Digital con Código QR · Restaurante',
        color: '#f4a340',
        categoria: 'Sitio web · Restaurantes',
        descripcion: 'Menú digital para un restaurante al que los clientes entran escaneando un código QR con la cámara del teléfono, sin instalar nada. Incluye buscador de platillos y categorías.',
        tecnologias: [],
        imagenes: [
            { src: 'img/proyectos/MenuElVeleroWeb.jpg', pie: 'Menú web con buscador y categorías, listo para consultarse desde cualquier teléfono.' },
            { src: 'img/proyectos/MenuElVeleroQR.jpg', pie: 'Material con código QR: el cliente lo escanea y accede al menú al instante.' }
        ],
        enlace: 'https://elvelerogt.com'
    },
    {
        titulo: 'Sistema de Gestión para Sanatorio Médico',
        color: '#2bb3c9',
        categoria: 'Sistema web y aplicación móvil · Salud',
        descripcion: 'Sistema web y aplicación móvil para la gestión integral de un sanatorio. Reúne en un solo lugar la agenda de citas, el registro de pacientes, el equipo médico y el inventario de medicamentos, con acceso seguro según el rol de cada colaborador, ya sea desde la computadora o desde la app en el celular.',
        tecnologias: [],
        imagenes: [
            { src: 'img/proyectos/SistemaSanatorioPC.jpeg', pie: 'Versión web: panel principal con el resumen del día y acceso directo a cada área.' },
            { src: 'img/proyectos/SistemaSanatorioAppTelefonoOscuro.jpg', pie: 'Aplicación móvil en modo oscuro, con todas las áreas del sistema a la mano.' },
            { src: 'img/proyectos/SistemaSanatorioAppTelefonoClaro.jpg', pie: 'La aplicación también en modo claro, para adaptarse a cada usuario.' }
        ],
        enlace: ''
    },
    {
        titulo: 'Invernadero Inteligente',
        color: '#34d399',
        categoria: 'Automatización · Agricultura',
        descripcion: 'Solución de automatización que vigila la humedad de la tierra y abre o cierra el techo del invernadero por sí sola para proteger los cultivos. El estado del invernadero se consulta desde el celular en un panel claro y fácil de entender.',
        tecnologias: [],
        imagenes: [
            { src: 'img/proyectos/SistemaInvernaderoRiego.jpg', pie: 'Estado del suelo y del techo de un vistazo, con actualización automática.' }
        ],
        enlace: ''
    },
    {
        titulo: 'StreamGT · Panel de administración',
        color: '#c45cf2',
        categoria: 'Plataforma web · Streaming',
        descripcion: 'Panel de administración para una plataforma de streaming. Permite gestionar usuarios, planes de suscripción y categorías de contenido desde un solo lugar, con una interfaz moderna e intuitiva pensada para el trabajo diario del equipo.',
        tecnologias: [],
        imagenes: [
            { src: 'img/proyectos/SistemaVideojuegos.jpg', pie: 'Vista general con indicadores y accesos rápidos a la administración.' }
        ],
        enlace: ''
    }
];
