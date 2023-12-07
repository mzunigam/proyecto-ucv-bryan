window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);
    console.log(usuario)
    seguridad(usuario.idtipo_usuario)

    if(!usuario){
        window.location.href = './login.html'
        document.getElementById('perfil').style.display = 'none';
    
    }else{
        document.getElementById('nombreUsuario').textContent =  usuario.usuario;
        document.getElementById('iniciarSesion').style.display = 'none';
    }
})