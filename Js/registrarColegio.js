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