window.addEventListener('load', () => {
    botonRegis();
});
const botonRegis = () => {
    console.log('Me ejecute')
    document.getElementById('btnRegis').addEventListener('click', async (event) => {
        const button = event.currentTarget;
        button.disabled = true;

        const usuario = document.getElementById('inputusuario').value;
        const password = document.getElementById('inputpassword').value;
        const nombre = document.getElementById('inputnombre').value;
        const apellido = document.getElementById('inputapellido').value;
        const correo = document.getElementById('inputcorreo').value;
        const url = document.getElementById('inputurl').value;
        

        const respuesta = await fetch("http://13.59.147.125:8080/api/procedure",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            },
            body: JSON.stringify({
                "procedure" : "{ CALL pnj.SP_PNJ_REGISTRO_USUARIO(?,?,?,?,?,?) }",
                "params" : [usuario,password,nombre,apellido,correo,url]
            })
        });
        button.disabled = false;

        const json = await respuesta.json();
        const existe_usuario = json?.data[0]?.existe_usuario || 0;
        if(existe_usuario != 0){
            alert('Registro Completado');
            window.location.href = './login.html'
        }else{
            alert('Fallo al crear usuario');
        }
    });
}