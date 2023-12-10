window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);
    

    if(!usuario){
        
        
    }else{
        
        identificar(usuario.usuario);
        bloquear(usuario.usuario,usuario.id_tipousuario);
    }
    
})
const identificar = async (userName) => {

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
const bloquear =  (xusuario,tipousuario) => {
    console.log('se ejecuto el bloqueo')
    if (tipousuario == 1) {
        
        
    }else{
        
            window.location.href = './index.html'
        
        }
        
}
