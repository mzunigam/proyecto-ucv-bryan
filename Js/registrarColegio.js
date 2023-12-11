window.addEventListener('load', () => {
    botonRegistrarColegio ();
});
const botonRegistrarColegio = () => {
    console.log('Me ejecute')
    document.getElementById('btncolegio').addEventListener('click', async (event) => {
        const button = event.currentTarget;
        button.disabled = true;

        const nombre = document.getElementById('nombreInput').value;
        const ubicacion = document.getElementById('ubiInput').value;
        const distrito = document.getElementById('distritoInput').value;
        const departamento = document.getElementById('departamentoInput').value;

        const respuesta = await fetch("http://13.59.147.125:8080/api/procedure",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            },
            body: JSON.stringify({
                "procedure" : "{ CALL pnj.SP_PNJ_REGISTRO_COLEGIO(?,?,?,?) }",
                "params" : [nombre,ubicacion,distrito,departamento]
            })
        });
        button.disabled = false;

        const json = await respuesta.json();
        const existe_usuario = json?.data[0]?.existe_usuario || 0;
        if(existe_usuario != 0){
            alert('Registro Completado');
        }else{
            alert('Fallo al crear el Colegio');
        }
    });
}

async function eliminarCole(btn) {

    const API_URL = 'http://13.59.147.125:8080/api/procedure'
    const idCole = parseInt(btn.parentNode.parentNode.cells[0].innerText)

    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_ELIMINAR_COLEGIO(?) }",
        "params": [idCole]
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

    if(json.status){
        alert('Colegio eliminado')
        location.reload()
    } else {
        alert('No se pudo eliminar el colegio porque ya esta siendo usado.')
    }
}


function showModify(btn){
    document.getElementById('modifyBox').classList.remove('d-none')
    
    const fila = btn.parentNode.parentNode;
    const inputCole = document.getElementById('changeCole')
    const inputubi = document.getElementById('changeUbi')
    const inputdis = document.getElementById('changeDis')
    const inputdep = document.getElementById('changeDep')

    $('#sendModify').off('click').on('click', sendModify)

    async function sendModify(){
        const idCole = parseInt(fila.cells[0].innerText)
        const cole = inputCole.value == '' ? fila.cells[1].innerText : inputName.value;
        const ubi = inputubi.value == '' ? fila.cells[2].innerText : inputName.value;
        const dis = inputdis.value == '' ? fila.cells[3].innerText : inputName.value;
        const dep = inputdep.value == '' ? fila.cells[4].innerText : inputName.value;

        const API_URL = 'http://13.59.147.125:8080/api/procedure'
    
        const body = {
                "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_COLEGIO(?,?,?,?,?) }",
                "params": [idCole, cole, ubi, dis, dep]
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

            if(json.status){
                alert('Colegio modificado')
                inputCole.value = ''
                inputubi.value = ''
                inputdis.value = ''
                inputdep.value = ''
                location.reload()
            } else {
                alert('No se pudo modificar el colegio')
            }

        

    }

}