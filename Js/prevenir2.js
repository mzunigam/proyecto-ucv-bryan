window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);

    if(!usuario){
        //window.location.href = './login.html'
        document.getElementById('perfil').style.display = 'none';
    }else{
        document.getElementById('nombreUsuario').textContent =  usuario.usuario;
        document.getElementById('iniciarSesion').style.display = 'none';
    }
})