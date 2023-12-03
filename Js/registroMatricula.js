window.addEventListener('load', () => {
    botonRegistrarMatricula ();
});
const botonRegistrarMatricula = () => {
    console.log('Me ejecute')
    document.getElementById('btnmatricula').addEventListener('click', async (event) => {
        const button = event.currentTarget;
        button.disabled = true;

        const Wnombre = document.getElementById('nombreInput').value;
        const Wdescripcion = document.getElementById('descripcionInput').value;
        const Widciclo = document.getElementById('idcicloInput').value;
        const Widcolegio = document.getElementById('idcolegioInput').value;
        const Widsupervisor = document.getElementById('idsupervisorInput').value;

        const respuesta = await fetch("http://13.59.147.125:8080/api/procedure",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            },
            body: JSON.stringify({
                "procedure" : "{ CALL pnj.SP_PNJ_REGISTRO_CURSO(?,?,?,?,?) }",
                "params" : [Wnombre,Wdescripcion,Widciclo,Widcolegio,Widsupervisor]
            })
        });
        button.disabled = false;

        const json = await respuesta.json();
        const existe_usuario = json?.data[0]?.existe_usuario || 0;
        if(existe_usuario != 0){
            alert('Registro Completado');
        }else{
            alert('Fallo al crear el Curso');
        }
    });
}