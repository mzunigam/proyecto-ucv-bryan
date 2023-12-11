window.addEventListener('load', () => {
    cerrarsesion();
});

const cerrarsesion = () => {
    console.log('Me ejecute')
    document.getElementById('cerrar').addEventListener('click', async (event) => {
        
        sessionStorage.clear();
        
    });
  }