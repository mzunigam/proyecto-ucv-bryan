window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);
    console.log(usuario)

    if(!usuario){
        window.location.href = './login.html'
    }else{
        document.getElementById('nombreUsuario').textContent =  usuario.usuario;
        document.getElementById('iniciarSesion').style.display = 'none';
    }
})