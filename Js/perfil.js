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
                                    <div class="text-left text-green-300 text-[0.88rem]">
                                        <button id="btn-pass" class="btn btn-outline-secondary" type="button"  style="border-color: white;
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
                                    <div class="text-left text-green-300 text-[0.88rem]">
                                        <button class="btn btn-outline-secondary" type="button"  style="border-color: white;
                                        color: white; ">Cambiar</button>
                                        </div>
                                </td>
                            </tr>
                        </tbody>
    `
}

const cambiarPass = async ( userId ) => {


    const passC = document.getElementById('passC').value; //falta crear el input

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_VISTA_USUARIO(?,?) }",
        "params": [userId, password]
    }

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
        body: JSON.stringify(body)
    });


    if (response == 1){
        alert('Contraseña cambiada correctamente')
    } else {
        alert('Error al cambiar contraseña')
    }

}


document.getElementById('btn-pass').addEventListener('click', () => {
    document.getElementById('btn-pass')
})