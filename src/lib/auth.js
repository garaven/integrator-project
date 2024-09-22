//*Función JavaScript para poder mostrar mensaje en letras rojas indicando que las credenciales ingresadas son incorrectas. *//
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
  
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: formData,
    });
  
    const result = await response.json();
    const errorMessageElement = document.getElementById('error-message');
  
    if (response.ok) {
      window.location.href = '/succesfull';
    } else {
      errorMessageElement.textContent = result.error;
      errorMessageElement.style.display = 'block';
    }
  });