window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);
    mostrarUsuario(usuario.usuario)
    cambiarPass(usuario.idusuario)
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
                                    <div class="chat__conversation-board" id="passusu">

                                        ${json.data[0].password}
                        
                                    </div>
                                </td>
                                <td class="p-2">
                                <div class="form-floating">
                                    <input type="password" class="form-control" id="passinput" placeholder="password">
                                    <label for="password">Password</label>
                                </div>
                                </td>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">
                                    <button id="btn-pass" class="btn btn-outline-secondary" style="border-color: white;
                                    color: white; ">Cambiar</button>
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
                                <td class="p-2">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="nombinput" placeholder="Nombre">
                                            <label for="nombinput">Nombre</label>
                                        </div>
                                </td>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">
                                        <button class="btn btn-outline-secondary" type="button"  style="border-color: white;
                                        color: white; ">Cambiar</button>
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
                                <td class="p-2">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="apeinput" placeholder="Apellido">
                                            <label for="apeinput">Apellido</label>
                                        </div>
                                </td>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">
                                        <button class="btn btn-outline-secondary" type="button"  style="border-color: white;
                                        color: white; ">Cambiar</button>
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
                                <td class="p-2">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="correoinput" placeholder="Correo">
                                            <label for="correoinput">Correo</label>
                                        </div>
                                </td>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">
                                        <button class="btn btn-outline-secondary" type="button"  style="border-color: white;
                                        color: white; ">Cambiar</button>
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
                                <td class="p-2">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="urlinput" placeholder="URL Perfil">
                                            <label for="urlinput">URL Perfil</label>
                                        </div>
                                </td>
                                <td class="p-2">
                                    <div class="text-left text-green-300 text-[0.88rem]">
                                        <button class="btn btn-outline-secondary" type="button"  style="border-color: white;
                                        color: white; ">Cambiar</button>
                                        </div>
                                </td>
                            </tr>
                        </tbody>
    `
}

const cambiarPass = async ( idusuario ) => {
    
    
    document.getElementById('btn-pass').addEventListener('click', async (event) => {
        const button = event.currentTarget;
        button.disabled = true;
    
        const passC = document.getElementById('passinput').value;

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_PASS_USUARIO(?,?) }",
        "params": [idusuario, passC]
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
        body: JSON.stringify(body)
    });
    button.disabled = false;
    const json = await respuesta.json();
    const existe_usuario = json?.data[0]?.existe_usuario || 0;
    if(existe_usuario != 0){
        alert('Registro Completado');
    }else{
        alert('Fallo al crear el Colegio');
    }
}
);
}