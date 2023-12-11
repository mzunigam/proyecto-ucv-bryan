window.addEventListener('load', () => {
    botonRegistrarColegio ();
});
const botonRegistrarColegio = () => {
    console.log('Me ejecute')
    document.getElementById('btncolegio').addEventListener('click', async (event) => {
        const button = event.currentTarget;
        button.disabled = true;

        const colegio = document.getElementById('changeCole').value;
        const ubicacion = document.getElementById('changeUbi').value;
        const distrito = document.getElementById('changeDis').value;
        const departamento = document.getElementById('changeDep').value;

        const respuesta = await fetch("http://13.59.147.125:8080/api/procedure",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            },
            body: JSON.stringify({
                "procedure" : "{ CALL pnj.SP_PNJ_REGISTRO_COLEGIO(?,?,?,?) }",
                "params" : [colegio,ubicacion,distrito,departamento]
            })
        });
        button.disabled = false;

        const json = await respuesta.json();
        const existe_usuario = json?.data[0]?.existe_usuario || 0;
        if(existe_usuario != 0){
            alert('Registro Completado');
            document.getElementById('changeCole').value = '';
            document.getElementById('changeUbi').value = '';
            document.getElementById('changeDis').value = '';
            document.getElementById('changeDep').value = '';
        }else{
            alert('Fallo al crear el Colegio');
        }
    });
}

const eliminarColegio = async (btn) => {
    const fila1 = btn.parentNode.parentNode;

    const idColegio = parseInt(fila1.cells[0].innerText);

    const API_URL = 'http://13.59.147.125:8080/api/procedure'
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_ELIMINAR_COLEGIO(?) }",
        "params": [idColegio]
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


const showModifyColegio = (btn) => {
    document.getElementById('modifyBoxColegio').classList.remove('d-none');
    
    
    const inputCole = document.getElementById('nombreColegio')
    const inputubi = document.getElementById('ubicacionColegio')
    const inputdis = document.getElementById('distritoColegio')
    const inputdep = document.getElementById('departamentoColegio')

    $('#sendModifyColegio').off('click').on('click', sendModifyCole)

    async function sendModifyCole(){
        const idColegio = parseInt(btn.parentNode.parentNode.cells[0].innerText);
        const colegio = inputCole.value == '' ? btn.parentNode.parentNode.cells[1].innerText     : inputCole.value;
        const ubicacion = inputubi.value == '' ? btn.parentNode.parentNode.cells[2].innerText    : inputubi.value;
        const distrito = inputdis.value == '' ? btn.parentNode.parentNode.cells[3].innerText     : inputdis.value;
        const departamento = inputdep.value == '' ? btn.parentNode.parentNode.cells[4].innerText : inputdep.value;

        const API_URL = 'http://13.59.147.125:8080/api/procedure'
    
        const body = {
                "procedure": "{ CALL pnj.SP_PNJ_CAMBIAR_COLEGIO(?,?,?,?,?) }",
                "params": [idColegio, colegio, ubicacion,distrito,departamento]
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