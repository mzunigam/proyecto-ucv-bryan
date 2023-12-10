window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);
    

    if(!usuario){
        //window.location.href = './login.html'
        document.getElementById('perfil').style.display = 'none';
        document.getElementById('miscursos2').style.display = 'none';
        document.getElementById('matricula2').style.display = 'none';
        document.getElementById('colegio2').style.display = 'none';
        document.getElementById('supervisor2').style.display = 'none';
        document.getElementById('ciclo2').style.display = 'none';
        
    }else{
        document.getElementById('nombreUsuario').textContent =  usuario.usuario;
        document.getElementById('iniciarSesion').style.display = 'none';
        mostrarUsuario(usuario.usuario);
        mostrar(usuario.usuario,usuario.id_tipousuario);
    }
    
})
const mostrarUsuario = async (userName) => {

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_VISTA_USUARIO(?) }",
        "params": [userName]
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
        body: JSON.stringify(body)
    });

    const json = await response.json();

}
const mostrar =  (xusuario,tipousuario) => {
    console.log('me ejecute')
    if (tipousuario == 1) {
        
        
    }else{
        if (tipousuario == 2) {
        document.getElementById('matricula2').style.display = 'none';
        document.getElementById('colegio2').style.display = 'none';
        document.getElementById('supervisor2').style.display = 'none';
        document.getElementById('ciclo2').style.display = 'none'
        
        }
        }
        
}

