window.addEventListener('load', () => {
    botonRegistrarCiclo();
});
const botonRegistrarCiclo = () => {
    console.log('Me ejecute')
    document.getElementById('btnciclo').addEventListener('click', async (event) => {
        const button = event.currentTarget;
        button.disabled = true;

        const ciclo = document.getElementById('cicloInput').value;
        const fechaini = document.getElementById('fechainiInput').value;
        const fechafin = document.getElementById('fechafinInput').value;

        if (fechaini >= fechafin) {
            alert('La fecha de inicio no puede ser mayor o igual a la fecha de fin');
            button.disabled = false;
        } else {
            const respuesta = await fetch("http://13.59.147.125:8080/api/procedure",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'cors'
                },
                body: JSON.stringify({
                    "procedure" : "{ CALL pnj.SP_PNJ_REGISTRO_CICLO(?,?,?) }",
                    "params" : [ciclo,fechaini,fechafin]
                })
            });
            button.disabled = false;
    
            const json = await respuesta.json();
            const existe_usuario = json?.data[0]?.existe_usuario || 0;
            if(existe_usuario != 0){
                alert('Registro Completado');
                document.getElementById('cicloInput').value = '';
                document.getElementById('fechainiInput').value = '';
                document.getElementById('fechafinInput').value = '';
                location.reload()
            }else{
                alert('Fallo al crear el Ciclo');
            }

        }

    });
}


async function eliminarCiclo(btn) {

    const API_URL = 'http://13.59.147.125:8080/api/procedure'
    const idCurso = parseInt(btn.parentNode.parentNode.cells[0].innerText)

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

    if(json.status){
        alert('Ciclo eliminado')
        location.reload()
    } else {
        alert('No se pudo eliminar el ciclo porque ya hay estudiantes dentro.')
    }
}


function showModify(btn){
    document.getElementById('modifyBox').classList.remove('d-none')
    
    const fila = btn.parentNode.parentNode;
    const inputName = document.getElementById('changeName')
    const inputInitDate = document.getElementById('changeInitDate')
    const inputEndDate = document.getElementById('changeEndDate')
    inputInitDate.min = new Date().toISOString().split("T")[0]
    inputEndDate.min = new Date().toISOString().split("T")[0]

    $('#sendModify').off('click').on('click', sendModify)

    async function sendModify(){
        const idCiclo = parseInt(fila.cells[0].innerText)
        const nombre = inputName.value == '' ? fila.cells[3].innerText : inputName.value;
        const initDate = inputInitDate.value == '' ? fila.cells[1].innerText : inputInitDate.value;
        const endDate = inputEndDate.value == '' ? fila.cells[2].innerText : inputEndDate.value;

        if  (initDate >= endDate) {
            alert('La fecha de inicio no puede ser mayor o igual a la fecha de fin');
        } else {
            const API_URL = 'http://13.59.147.125:8080/api/procedure'
    
            const body = {
                "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_CICLO(?,?,?,?) }",
                "params": [idCiclo, nombre, initDate, endDate]
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
                alert('Ciclo modificado')
                inputName.value = ''
                inputInitDate.value = ''
                inputEndDate.value = ''
                location.reload()
            } else {
                alert('No se pudo modificar el ciclo')
            }

        }

    }

}