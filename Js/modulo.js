window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);
    mostrarmodulo()
})


const mostrarmodulo = async () => {

    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_VISTA_MODULO() }",
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
        const chatContainer = document.getElementById('modulos')
        
        component = ` 
        
                    <main class="d-flex align-items-center  justify-content-center modal-content p-4 rounded-4 shadow "
                                        style="background-image: url(../Asset/fondotabla.png); min-width: 400px; margin-bottom: 20px;">
                        <div class="col-md-12">
                                    <h3 class="text-center text-primary text-white">
                                    ${json.data[i].modulo} <i class="fa-solid fa-square-check"></i>
                                    </h3>
                                <div>
                                    <p class="text-center text-white">
                                    ${json.data[i].descripcion}  
                                    </p>
                                </div>
                                <div class="col-md-12 mb-2 mt-2">
                                    <a href="${json.data[i].url}" class="btn btn-success"> INICIAR</a>
                                </div>
                        </div>
                    </main>     
    `
    
        chatContainer.innerHTML += component
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}