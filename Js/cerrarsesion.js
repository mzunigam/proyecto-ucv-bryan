window.addEventListener('load', () => {
    cerrarsesion();
});

const cerrarsesion = () => {
    console.log('Me ejecute')
    document.getElementById('cerrarsesion').addEventListener('click', async (event) => {
        
        sessionStorage.clear();
        
    });
  }