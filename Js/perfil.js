window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);
    mostrarUsuario(usuario.usuario);
    cambiarPass(usuario.idusuario);
    cambiarnombre(usuario.idusuario);
    cambiarapellido(usuario.idusuario);
    cambiarcorreo(usuario.idusuario);
    cambiarurl(usuario.idusuario);
})


const mostrarUsuario = async ( userName ) => {

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

    document.getElementById('perfil-container').innerHTML = `
                        <tbody class="divide-y divide-[#2f2c3d] text-white">
                            <tr>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">Password
                                        </div>
                                </td>
                                <td class="p-2">
                                    <div class="chat__conversation-board" >

                                        ${json.data[0].password}
                        
                                    </div>
                                </td>
                                
                            <tr>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">Nombre
                                        </div>
                                </td>
                                <td class="p-2">
                                    <div class="chat__conversation-board" id="nombreusu">

                                        ${json.data[0].nombre}
                        
                                    </div>
                                </td>
                                
                            </tr>
                            <tr>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">Apellido
                                        </div>
                                </td>
                                <td class="p-2">
                                    <div class="chat__conversation-board" id="apeusu">

                                        ${json.data[0].apellido}
                        
                                    </div>
                                </td>
                                
                            </tr>
                            <tr>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">Correo
                                        </div>
                                </td>
                                <td class="p-2">
                                    <div class="chat__conversation-board" id="correousu">

                                        ${json.data[0].correo}
                        
                                    </div>
                                </td>
                                
                            </tr>
                            <tr>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">Url Perfil
                                        </div>
                                </td>
                                <td class="p-2">
                                    <div class="chat__conversation-board__message__person__avatar" id="urlusu">
                                        <img src="${json.data[0].url_perfil}" alt="Dennis Mikle" class="rounded-circle" style="width='40px'; /*! heigth='40px' */width: 60px;height: 60px;"/>
                                    </div>
                                </td>
                                
                            </tr>
                        </tbody>
    `
}

    const cambiarPass = async ( idusuario ) => {
        console.log(idusuario)
        document.getElementById('btnPass').addEventListener('click', async (event) => {
        const button = event.currentTarget;
        button.disabled = true;
        
        const passC = document.getElementById('passinput').value;
    

        const API_URL2 = "http://13.59.147.125:8080/api/procedure"
        const body1 = {
            "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_PASS_USUARIO(?,?) }",
            "params": [idusuario,passC]
        }
    
        const respuesta = await fetch(API_URL2, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            },
            body: JSON.stringify(body1)
        });    

    button.disabled = false;
    const json = await respuesta.json();
    const existe_usuario = json?.data[0]?.existe_usuario || 0;
    if(existe_usuario != 0){
        alert('Registro Completado');
        location.reload(true);
    }else{
        alert('Fallo en el registro');
    }
}
);
}
const cambiarnombre = async ( idusuario ) => {
    document.getElementById('btnNomb').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    
    const nombC = document.getElementById('nombreinput').value;


    const API_URL2 = "http://13.59.147.125:8080/api/procedure"
    const body1 = {
        "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_NOMBRE_USUARIO(?,?) }",
        "params": [idusuario,nombC]
    }

    const respuesta = await fetch(API_URL2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
        body: JSON.stringify(body1)
    });    

button.disabled = false;
const json = await respuesta.json();
const existe_usuario = json?.data[0]?.existe_usuario || 0;
if(existe_usuario != 0){
    alert('Registro Completado');
    location.reload(true);
}else{
    alert('Fallo en el registro');
}
}
);
}
const cambiarapellido = async ( idusuario ) => {
    document.getElementById('btnape').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    
    const apeC = document.getElementById('apeinput').value;


    const API_URL2 = "http://13.59.147.125:8080/api/procedure"
    const body1 = {
        "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_APELLIDO_USUARIO(?,?) }",
        "params": [idusuario,apeC]
    }

    const respuesta = await fetch(API_URL2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
        body: JSON.stringify(body1)
    });    

button.disabled = false;
const json = await respuesta.json();
const existe_usuario = json?.data[0]?.existe_usuario || 0;
if(existe_usuario != 0){
    alert('Registro Completado');
    location.reload(true);
}else{
    alert('Fallo en el registro');
}
}
);
}
const cambiarcorreo = async ( idusuario ) => {
    document.getElementById('btncorreo').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    
    const correoC = document.getElementById('correoinput').value;


    const API_URL2 = "http://13.59.147.125:8080/api/procedure"
    const body1 = {
        "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_CORREO_USUARIO(?,?) }",
        "params": [idusuario,correoC]
    }

    const respuesta = await fetch(API_URL2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
        body: JSON.stringify(body1)
    });    

button.disabled = false;
const json = await respuesta.json();
const existe_usuario = json?.data[0]?.existe_usuario || 0;
if(existe_usuario != 0){
    alert('Registro Completado');
    location.reload(true);
}else{
    alert('Fallo en el registro');
}
}
);
}

const cambiarurl = async ( idusuario ) => {
    document.getElementById('btnurl').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    
    const urlC = document.getElementById('urlinput').value;


    const API_URL2 = "http://13.59.147.125:8080/api/procedure"
    const body1 = {
        "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_URL_USUARIO(?,?) }",
        "params": [idusuario,urlC]
    }

    const respuesta = await fetch(API_URL2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
        body: JSON.stringify(body1)
    });    

button.disabled = false;
const json = await respuesta.json();
const existe_usuario = json?.data[0]?.existe_usuario || 0;
if(existe_usuario != 0){
    alert('Registro Completado');
    location.reload(true);
}else{
    alert('Fallo en el registro');
}
}
);
}