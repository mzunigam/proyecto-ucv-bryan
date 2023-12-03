window.addEventListener('load', () => {
    sessionStorage.removeItem('usuario');
    botonLogin();
});


const botonLogin = () => {
    console.log('Me ejecute')
    document.getElementById('btnLogin').addEventListener('click', async (event) => {
        const button = event.currentTarget;
        button.disabled = true;
        const email = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        const respuesta = await fetch("http://13.59.147.125:8080/api/procedure", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            },
            body: JSON.stringify({
                "procedure": "{ CALL pnj.SP_PNJ_LOGIN_USUARIO(?,?) }",
                "params": [email, password]
            })
        });

        button.disabled = false;

        const json = await respuesta.json();
        const existe_usuario = json?.data[0]?.existe_usuario || 0;
        if (existe_usuario != 0) {
            sessionStorage.setItem('usuario', JSON.stringify(json.data[0]))
            console.log(json.data[0])
            alert('Sesion Iniciada');
            window.location.href = './index.html'
        } else {
            alert('Error al Ingresar');
        }
    });
}