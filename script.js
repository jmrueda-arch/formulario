// ==========================================
// 🚨 PASO SUMAMENTE IMPORTANTE:
// Copia el enlace largo que te dio Google Apps Script en el Paso 3
// y reemplaza este texto entre las comillas simples:
// ==========================================
const scriptURL = 'https://script.google.com/macros/s/AKfycbwgfWPR9jr4HdcNiDrp1jGCpw8Wj5LnkMN2turLWZKtYGglDMJAbsZJgJIjT-uHvEVq/exec'; 

// Referencias a los elementos HTML
const form = document.getElementById('registroForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Escuchamos el evento cuando el usuario da clic en "Registrar"
form.addEventListener('submit', e => {
    // Evita que la página se recargue bruscamente
    e.preventDefault(); 

    // Ocultar mensajes anteriores si los hubiera
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    // Cambiar la vista del botón a "Cargando..."
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Recolectar la información que metió el usuario en el formulario
    let requestBody = new FormData(form);

    // Enviar la petición 'POST' a la URL secreta de tu Apps Script
    fetch(scriptURL, { method: 'POST', body: requestBody })
        .then(response => response.json())
        .then(response => {
            // El proceso terminó, restauramos el botón
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            if (response.result === 'success') {
                // Mostrar alerta de éxito
                successMessage.classList.remove('hidden');
                // Vaciar las cajas de texto
                form.reset(); 
            } else {
                // En caso de que haya respondido con un error interno
                errorMessage.classList.remove('hidden');
                console.error('Error desde el servidor:', response.error);
            }
        })
        .catch(error => {
            // Error de conexión a internet o la URL estaba mal configurada
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            errorMessage.classList.remove('hidden');
            console.error('Error de red/fetch:', error.message);
        });
});
