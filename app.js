document.getElementById('turnoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('name').value;
    const hora = document.getElementById('hora').value;
  
    if (nombre === '' || hora === '') {
      alert('Por favor completa todos los campos.');
      return;
    }
  
    // Crear un nuevo elemento de turno
    const nuevoTurno = document.createElement('li');
    nuevoTurno.textContent = `Turno de ${nombre} a las ${hora}`;
    
    // Agregar el nuevo turno a la lista
    document.getElementById('listaTurnos').appendChild(nuevoTurno);
  
    // Limpiar el formulario
    document.getElementById('turnoForm').reset();
  });
  