document.addEventListener("DOMContentLoaded", () => { // Se añade el listener para DOMContentLoaded
    const form = document.getElementById('formArticulo');

    // 💡 Nueva Lógica: Limpia el mensaje de error cuando el usuario empieza a escribir
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            // Encuentra el div de error asociado al input
            // Nota: Esto asume que el ID del error siempre será 'error' + ID del input con la primera letra mayúscula
            const errorId = 'error' + this.id.charAt(0).toUpperCase() + this.id.slice(1);
            const errorDiv = document.getElementById(errorId);
            if (errorDiv) {
                errorDiv.textContent = '';
            }
        });
    });

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
        if (!imagen ||!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(imagen)) {
            document.getElementById('errorImagen').textContent = 'Debe ser una URL válida de imagen.';
            valido = false;
        }

        if (!valido) return;

        // Crear objeto
        const articulo = { clave, nombre, descripcion, precio, imagen };

        // Guardar en localStorage usando las funciones solicitadas
        let articulos = [];
        try {
            // localStorage.getItem() y JSON.parse()
            const stored = localStorage.getItem('articulos');
            articulos = JSON.parse(stored || '[]'); 
        } catch (e) {
            console.error("Error al leer o parsear localStorage:", e);
            // Si hay un error, se inicializa como array vacío (ya está arriba, pero por seguridad)
            articulos = []; 
        }
        
        articulos.push(articulo);
        
        try {
            // localStorage.setItem() y JSON.stringify()
            localStorage.setItem('articulos', JSON.stringify(articulos));
        } catch (e) {
            console.error("Error al guardar en localStorage:", e);
            alert('Error al guardar los datos en el navegador.');
            return;
        }


        // Si java.js expone la función agregarServicio, notificarle para re-renderizar
        if(typeof window.agregarServicio === 'function'){
            try{
                window.agregarServicio(articulo);
            }catch(e){
                console.warn('No se pudo notificar a agregarServicio (java.js no está cargado o no expuso la función):', e);
            }
        }

        Swal.fire({
        icon: 'success',
        title: 'Artículo guardado correctamente',
        showConfirmButton: false,
        timer: 1500
        });
        form.reset();
    });
}); // Cierre del addEventListener("DOMContentLoaded")