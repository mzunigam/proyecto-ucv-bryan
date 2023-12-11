window.addEventListener('load', () => {
    botonRegistrarSupervisor ();
});
const botonRegistrarSupervisor = () => {
    console.log('Me ejecute')
    document.getElementById('btnsupervisor').addEventListener('click', async (event) => {
        const button = event.currentTarget;
        button.disabled = true;

        const nombre = document.getElementById('nombreInput').value;
        const apellido = document.getElementById('apellidoInput').value;

        const respuesta = await fetch("http://13.59.147.125:8080/api/procedure",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            },
            body: JSON.stringify({
                "procedure" : "{ CALL pnj.SP_PNJ_REGISTRO_SUPERVISOR(?,?) }",
                "params" : [nombre,apellido]
            })
        });
        button.disabled = false;

        const json = await respuesta.json();
        const existe_usuario = json?.data[0]?.existe_usuario || 0;
        if(existe_usuario != 0){
            alert('Registro Completado');
            document.getElementById('nombreInput').value = '';
            document.getElementById('apellidoInput').value = '';
            location.reload()
        }else{
            alert('Fallo al crear el Ciclo');
        }
    });
}


const eliminarSupervisor = async (btn) => {
    const fila = btn.parentNode.parentNode;

    const idSupervisor = parseInt(fila.cells[0].innerText);

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_ELIMINAR_SUPERVISOR(?) }",
        "params": [idSupervisor]
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

    if (json.status) {
        alert('Supervisor eliminado');
        location.reload()
    } else {
        alert('Fallo al eliminar el Supervisor');
    }
}

const showModifySupervisor = (btn) => {
    document.getElementById('modifyBoxSupervisor').classList.remove('d-none');

    const inputNombre = document.getElementById('nombreSupervisor')
    const inputApellido = document.getElementById('apellidoSupervisor')

    $('#sendModifySupervisor').off('click').on('click', sendModifySuper)

    async function sendModifySuper (){
        const nombre = inputNombre.value == '' ? btn.parentNode.parentNode.cells[1].innerText : inputNombre.value
        const apellido = inputApellido.value == '' ? btn.parentNode.parentNode.cells[2].innerText : inputApellido.value
        const idSupervisor = parseInt(btn.parentNode.parentNode.cells[0].innerText);

        const API_URL = "http://13.59.147.125:8080/api/procedure"

        const body = {
            "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_SUPERVISOR(?,?,?) }",
            "params": [idSupervisor, nombre, apellido]
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

        if (json.status) {
            alert('Supervisor modificado');
            inputNombre.value = '';
            inputApellido.value = '';
            location.reload()
        } else {
            alert('Fallo al modificar el Supervisor');
        }
    }
}