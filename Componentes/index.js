window.addEventListener('load', () => {
    console.log('Hello World!');
    events();
});


const events = () => {
    document.querySelector(".logear").addEventListener('click', () => {
        consultarLogin().then( r => {
            if(r.status){
                if(r.data.length > 0){
                    const existe_usuario = r.data[0].existe_usuario;
                    if(existe_usuario){
                        alert("Bienvenido");
                    } else {
                        alert("Usuario o contraseña incorrectos");
                    }
                }
            } else {
                alert("Error");
            }
        });
    });
}



const consultarLogin = async () => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    console.log(username);
    console.log(password);
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_LOGIN_USUARIO(?,?)}",
        "params": [username, password]
    }

    const response = await fetch('http://13.59.147.125:8080/api/procedure', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
};





