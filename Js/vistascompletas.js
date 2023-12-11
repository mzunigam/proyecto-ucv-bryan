window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);
    mostrarciclo();
    mostrarcolegio();
    mostrarsupervisor();
    mostrarcursos();
    matricularCurso();
})


const mostrarciclo = async () => {

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_VISTA_CICLO() }",
        "params": []
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
    for (let i = 0; i < json.data.length; i++) {
        const chatContainer = document.getElementById('ciclovista')
        component = ` 


                        <tr>
                            <td class="p-2">
                                <div class="text-left col-12">
                                ${json.data[i].idciclo}
                                </div>
                            </td>
                            <td class="p-2">
                                <div class="text-left col-12">
                                ${json.data[i].ciclo} 
                                </div>
                            </td>
                            <td class="p-2">
                                <button id="btnModify" class="btn btn-outline-secondary" style="margin-bottom: 10px;border-color: white;
                                color: white; ">Modificar</button>
                            </td>
                            <td class="p-2">
                                <button onclick="eliminarCiclo(this)" id="btnDelete" class="btn btn-outline-secondary" style="margin-bottom: 10px;border-color: white;
                                color: white; ">Eliminar</button>
                            </td>
                        </tr>
                        `
        chatContainer.innerHTML += component
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

const mostrarcolegio = async () => {

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_VISTA_COLEGIO() }",
        "params": []
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
    for (let i = 0; i < json.data.length; i++) {
        const chatContainer = document.getElementById('colegiovista')
        component = `
                                    <div class="text-left">
                                    ${json.data[i].idcolegio}  -  ${json.data[i].colegio}  
                                    </div>         
    `
        chatContainer.innerHTML += component
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

const mostrarsupervisor = async () => {

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_VISTA_SUPERVISOR() }",
        "params": []
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
    for (let i = 0; i < json.data.length; i++) {
        const chatContainer = document.getElementById('supervisorvista')
        component = `
                                    <div class="text-left">
                                    ${json.data[i].idsupervisor}  -  ${json.data[i].nombre}  
                                    </div>         
    `
        chatContainer.innerHTML += component
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

const mostrarcursos = async () => {

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_VISTA_CURSO() }",
        "params": []
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
    for (let i = 0; i < json.data.length; i++) {
        const chatContainer = document.getElementById('cur')
        component = `
            <tr>
                <td class="p-2">
                    <div  class="text-center">${json.data[i].idcurso}</div>
                </td>
                <td class="p-2">
                    <div class="text-left">${json.data[i].nomb_curso}</div>
                </td>
                <td class="p-2">
                    <div class="text-left text-green-300 text-[0.88rem]">${json.data[i].descripcion}</div>
                </td>
                <td class="p-2">
                    <div class="text-left">${json.data[i].ciclo}<br>
                    Inicio: ${json.data[i].fecha_inicio}<br>Fin: ${json.data[i].fecha_fin}
                    </div>
                        <button onclick="registroUsuarioCurso(this)" id="enviar" class="btn btn-outline-secondary" type="button" style="border-color: white;
                        color: white;">Registrarme</button>
                </td>
            </tr>         
                `
        chatContainer.innerHTML += component
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}



async function registroUsuarioCurso(btn) {
    const fila = btn.parentNode.parentNode;

    const idcurso = fila.cells[0].innerText;
    const idusuario = JSON.parse(sessionStorage.getItem('usuario')).idusuario;

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_REGISTRO_USU_CURSO(?,?) }",
        "params": [idusuario, idcurso]
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

    const existe_usucurso = json?.data[0]?.existe_usucurso || 0;
    if (existe_usucurso == 0) {
        alert('Registro Completado');
    } else {
        alert('Ya te encuentras Registrado');
    }
}


async function eliminarCiclo(btn) {

    const API_URL = 'http://13.59.147.125:8080/api/procedure'
    const idCurso = parseInt(btn.parentNode.parentNode.cells[0].innerText)
    console.log(idCurso)
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_ELIMINAR_CICLO(?) }",
        "params": [idCurso]
    }
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
        body: JSON.stringify(body)
    })

    const json = await response.json()

    if(json.data[0].confirm_delete == 1){
        alert('Ciclo eliminado')
        location.reload()
    } else {
        alert('No se pudo eliminar el ciclo porque ya hay estudiantes dentro.')
    }

}
