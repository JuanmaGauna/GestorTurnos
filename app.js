let turnos = [];
const turnoForm = document.getElementById('turnoForm');
const listaTurnos = document.getElementById('listaTurnos');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Escuchar el evento de enviar el formulario
turnoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtener valores del formulario
  const dni = document.getElementById('dni').value;
  const nombre = document.getElementById('name').value;
  const apellido = document.getElementById('apellido').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const motivo = document.getElementById('motivo').value;
  const editIndex = document.getElementById('editIndex').value;

  // Validación de campos
  if (dni === '' || nombre === '' || apellido === '' || fecha === '' || hora === '' || motivo === '') {
    alert('Por favor completa todos los campos.');
    return;
  }

  const turnoData = { dni, nombre, apellido, motivo, hora, fecha };

  if (editIndex === "-1") {
    // Crear un turno nuevo
    turnos.push(turnoData);
  } else {
    // Editar el turno existente
    turnos[editIndex] = turnoData;
    document.getElementById('editIndex').value = "-1"; // Reiniciar el índice de edición
    submitBtn.textContent = "Reservar turno";
    cancelBtn.style.display = "none"; // Ocultar el botón de cancelar
  }

  renderTurnos();
  turnoForm.reset();
});

// Función para renderizar los turnos en la lista
function renderTurnos() {
  listaTurnos.innerHTML = ''; // Limpiar la lista de turnos

  turnos.forEach((turno, index) => {
    const turnoItem = document.createElement('li');
    turnoItem.innerHTML = `
      DNI: ${turno.dni} <br>
      Nombre: ${turno.nombre} <br>
      Apellido: ${turno.apellido} <br>
      Fecha: ${turno.fecha} a las ${turno.hora} <br>
      Motivo: ${turno.motivo}
    `;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => editarTurno(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => eliminarTurno(index));

    turnoItem.appendChild(editBtn);
    turnoItem.appendChild(deleteBtn);
    listaTurnos.appendChild(turnoItem);
  });
}

// Función para editar un turno
function editarTurno(index) {
  const turno = turnos[index];

  // Llenar el formulario con los datos del turno seleccionado
  document.getElementById('dni').value = turno.dni;
  document.getElementById('name').value = turno.nombre;
  document.getElementById('apellido').value = turno.apellido;
  document.getElementById('fecha').value = turno.fecha;
  document.getElementById('hora').value = turno.hora;
  document.getElementById('motivo').value = turno.motivo;

  // Guardar el índice del turno que se está editando
  document.getElementById('editIndex').value = index;
  
  // Cambiar el texto del botón para reflejar que estamos en modo edición
  submitBtn.textContent = "Guardar cambios";
  
  // Mostrar el botón de cancelar
  cancelBtn.style.display = "inline-block";
}

// Función para eliminar un turno
function eliminarTurno(index) {
  turnos.splice(index, 1); // Eliminar el turno del array
  renderTurnos(); // Renderizar la lista nuevamente
}

// Función para cancelar la edición
cancelBtn.addEventListener('click', function () {
  turnoForm.reset(); // Limpiar el formulario
  document.getElementById('editIndex').value = "-1"; // Reiniciar el índice de edición
  submitBtn.textContent = "Reservar turno"; // Cambiar el texto del botón
  cancelBtn.style.display = "none"; // Ocultar el botón de cancelar
});
