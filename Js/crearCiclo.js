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
            location.reload()
        }else{
            alert('Fallo al crear el Ciclo');
        }
        
    });
}