window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuarioq = JSON.parse(usuarioSesion);
    mostrarmiscursos(usuarioq.idusuario);
    ;
})

const mostrarmiscursos = async (iduser) => {

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_MISCURSOS(?) }",
        "params": [iduser]
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
        const chatContainer = document.getElementById('miscursos')
        component = `
        <td class="p-2">
            <div class="text-center">${json.data[i].idusuario_curso}</div>
        </td>
        <td class="p-2">
            <div class="text-left">${json.data[i].nomb_curso}</div>
        </td>
        <td class="p-2">
                <div class="text-left text-green-300 text-[0.88rem]">
                ${json.data[i].descripcion}
                </div>
        </td>
        <td class="p-2">

            <div class="text-center">
            
            <a href="${json.data[i].urlcur}" class="btn btn-success text-white"> INICIAR</a>
            </div>
        </td>
        
                `
        chatContainer.innerHTML += component
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}