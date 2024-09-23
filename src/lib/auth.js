//*Script JS que muestra mensaje en rojo indicando que las credenciales ingresadas son incorrectas.
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    const errorMessage = document.getElementById('error-message');

    if (result.error) {
      errorMessage.textContent = result.error;
      errorMessage.style.display = 'block';
    } else if (result.success) {
      window.location.href = '/succesfull';
    }
  });