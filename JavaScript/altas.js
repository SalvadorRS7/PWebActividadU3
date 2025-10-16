const form = document.getElementById('formArticulo');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Obtener valores
      const clave = document.getElementById('clave').value.trim();
      const nombre = document.getElementById('nombre').value.trim();
      const descripcion = document.getElementById('descripcion').value.trim();
      const precio = parseFloat(document.getElementById('precio').value);
      const imagen = document.getElementById('imagen').value.trim();

      // Validaciones
      let valido = true;
      document.querySelectorAll('.error').forEach(el => el.textContent = '');

      if (!clave) {
        document.getElementById('errorClave').textContent = 'La clave es obligatoria.';
        valido = false;
      }
      if (!nombre) {
        document.getElementById('errorNombre').textContent = 'El nombre es obligatorio.';
        valido = false;
      }
      if (!descripcion) {
        document.getElementById('errorDes').textContent = 'La descripcion es obligatorio.';
        valido = false;
      }
      if (isNaN(precio) || precio <= 0) {
        document.getElementById('errorPrecio').textContent = 'El precio debe ser mayor a 0.';
        valido = false;
      }
      if (!imagen || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(imagen)) {
        document.getElementById('errorImagen').textContent = 'Debe ser una URL válida de imagen.';
        valido = false;
      }

      if (!valido) return;

      // Crear objeto
      const articulo = { clave, nombre, descripcion, precio, imagen };

      // Guardar en localStorage como JSON
      let articulos = JSON.parse(localStorage.getItem('articulos') || '[]');
      articulos.push(articulo);
      localStorage.setItem('articulos', JSON.stringify(articulos));

      // Si java.js expone la función agregarServicio, notificarle para re-renderizar
      if(typeof window.agregarServicio === 'function'){
        try{
          window.agregarServicio(articulo);
        }catch(e){
          console.warn('No se pudo notificar a agregarServicio:', e);
        }
      }

      alert('Artículo guardado correctamente.');
      form.reset();
    });
