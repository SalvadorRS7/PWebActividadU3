// Lista de servicios (mínimo 10)
const servicios = [
  { nombre: 'Desarrollo de Aplicaciones Web', descripcion: 'Creación de sitios y aplicaciones web responsivas usando buenas prácticas.', precio: 1200, foto: "https://tse2.mm.bing.net/th/id/OIP.qRhZsrwItDcuSxSbviRy9AHaDt?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { nombre: 'Mantenimiento de Sistemas', descripcion: 'Soporte, actualización y optimización de sistemas existentes.', precio: 800, foto: "https://pandorafms.com/blog/wp-content/uploads/2018/05/mantenimiento-informatico-pfms-blog.webp" },
  { nombre: 'Administración de Bases de Datos', descripcion: 'Diseño, optimización y respaldo de bases de datos SQL/NoSQL.', precio: 950, foto: "https://www.robotsops.com/wp-content/uploads/2024/12/sre-2.png" },
  { nombre: 'Auditoría de Seguridad', descripcion: 'Revisión de seguridad, pruebas de penetración y recomendaciones.', precio: 1500, foto: "https://www.mencargc.es/wp-content/uploads/2023/10/auditoria-seguridad-jpg.webp" },
  { nombre: 'Automatización de Procesos', descripcion: 'Bots y scripts para automatizar tareas y mejorar la productividad.', precio: 700, foto: "https://th.bing.com/th/id/R.5e5fafa3a199afe3be77e2cd8299f7a8?rik=yH4eQgBM%2baYx9Q&pid=ImgRaw&r=0" },
  { nombre: 'Consultoría TI', descripcion: 'Asesoría en selección de tecnologías, arquitectura y mejores prácticas.', precio: 1100, foto: "https://tse3.mm.bing.net/th/id/OIP.xJ6NixYoAQo3-tk3klIKfQHaEf?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
  { nombre: 'Implementación de DevOps', descripcion: 'Pipelines CI/CD, contenedores y despliegues automatizados.', precio: 1300, foto: "https://www.pragma.com.co/hs-fs/hubfs/academia/Lecciones/grafica_devops_con_herramientas.jpg?width=765&name=grafica_devops_con_herramientas.jpg" },
  { nombre: 'Desarrollo de API REST', descripcion: 'APIs limpias, versionadas y bien documentadas.', precio: 900, foto: "https://bambu-mobile.com/wp-content/uploads/2023/04/ventajas-API-REST-bambu-mobile.png" },
  { nombre: 'Análisis de Datos', descripcion: 'Limpieza, análisis y visualización de datos para la toma de decisiones.', precio: 1400, foto: "https://th.bing.com/th/id/R.8a48138886d11f742e8024acd7aba841?rik=01rwHmZzcr0iwQ&pid=ImgRaw&r=0" },
  { nombre: 'Cursos y Capacitaciones', descripcion: 'Formación personalizada en desarrollo, bases y prácticas DevOps.', precio: 600, foto: "https://guiadoestudante.abril.com.br/wp-content/uploads/sites/4/2021/04/Curso-online.jpg?quality=70&strip=all&resize=360" },
  // Opcional: más servicios
  { nombre: 'Integración de Sistemas', descripcion: 'Conectar aplicaciones y servicios mediante APIs y middleware.', precio: 1050, foto: "https://tse3.mm.bing.net/th/id/OIP.9AGrfU1CiPihsEdmyDv_KwHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" }
];

// Generador de imágenes placeholder (SVG data URL) con texto
function placeholderImage(text, width = 800, height = 450){
  const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'><rect width='100%' height='100%' fill='#e7f0ff'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#0b3a66' font-family='Arial, Helvetica, sans-serif' font-size='24'>${text}</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

// Normaliza un objeto 'articulo' que puede venir de localStorage
function normalizeArticulo(a){
  if(!a || typeof a !== 'object') return null;
  return {
    nombre: a.nombre || a.clave || a.titulo || '',
    descripcion: a.descripcion || a.descrip || a.descripcionCorta || '',
    precio: Number(a.precio || a.price || 0) || 0,
    foto: a.imagen || a.foto || a.image || null
  };
}

// Cargar artículos guardados en localStorage (clave: 'articulos')
function loadArticulosFromStorage(){
  try{
    const stored = JSON.parse(localStorage.getItem('articulos') || '[]');
    if(Array.isArray(stored) && stored.length){
      for(const art of stored){
        const normalized = normalizeArticulo(art);
        if(normalized) servicios.push(normalized);
      }
    }
  }catch(e){
    console.warn('Error leyendo localStorage articulos:', e);
  }
}

// Renderizar servicios usando createElement y appendChild
function renderServicios(list){
  const container = document.getElementById('services');
  if(!container){
    console.error('No se encontró el contenedor #services');
    return;
  }

  // Limpiar contenedor
  container.innerHTML = '';

  for(let i = 0; i < list.length; i++){
    const s = list[i];

    // Card
    const card = document.createElement('article');
    card.className = 'service-card';

    // Imagen
    const img = document.createElement('img');
    img.className = 'service-image';
    img.alt = s.nombre;
    img.src = s.foto || placeholderImage(s.nombre);
    card.appendChild(img);

    // Título
    const h3 = document.createElement('h3');
    h3.className = 'service-title';
    h3.textContent = s.nombre;
    card.appendChild(h3);

    // Descripción
    const p = document.createElement('p');
    p.className = 'service-desc';
    p.textContent = s.descripcion;
    card.appendChild(p);

    // Precio
    const price = document.createElement('div');
    price.className = 'service-price';
    const precioNum = Number(s.precio) || 0;
    price.textContent = `Precio: $${precioNum}`;

    // Condicional: si precio > 1000, añadir clase para resaltar
    if(precioNum > 1000){
      price.classList.add('expensive');
      // Añadir nota adicional
      const note = document.createElement('small');
      note.style.display = 'block';
      note.style.marginTop = '0.25rem';
      note.textContent = 'Servicio premium - cotización personalizada disponible.';
      card.appendChild(price);
      card.appendChild(note);
    } else {
      card.appendChild(price);
    }

    // Usar appendChild para agregar al contenedor
    container.appendChild(card);
  }
}

// Ejecutar cuando el DOM esté listo
// Hacer carga desde storage antes de renderizar
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', ()=>{ loadArticulosFromStorage(); renderServicios(servicios); });
} else {
  loadArticulosFromStorage(); renderServicios(servicios);
}

// Función pública para agregar un servicio (usada por forms/altas.js)
window.agregarServicio = function(servicio){
  const normalized = normalizeArticulo(servicio);
  if(!normalized) return;
  servicios.push(normalized);
  // Re-renderizar
  renderServicios(servicios);
  // actualizar referencia pública
  window._servicios = servicios;
};

// Exportar para pruebas (opcional en entorno local)
window._servicios = servicios;
