window.addEventListener('load', () => {
    const usuarioSesion = sessionStorage.getItem('usuario') || null;
    const usuario = JSON.parse(usuarioSesion);
    mostrarChat(usuario.usuario)
    enviarMensaje(usuario.usuario)
})


const mostrarChat = async ( userName ) => {
    const API_URL = "http://13.59.147.125:8080/api/procedure"
    const body = {
        "procedure": "{ CALL pnj.SP_PNJ_CHAT_MENSAJES() }",
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

        let component = ''

        if (json.data[i].usuario == userName) {
            component = `
                <div class="chat__conversation-board__message-container reversed">
                <div class="chat__conversation-board__message__person">
                    <div class="chat__conversation-board__message__person__avatar"><img src="${json.data[i].url_perfil}" alt="Dennis Mikle" /></div><span class="chat__conversation-board__message__person__nickname">Dennis Mikle</span></div>
                <div class="chat__conversation-board__message__context">
                    <div class="chat__conversation-board__message__bubble"> <span> <a class=" text-decoration-none d-inline-block w-100 text-success text-end" href="#">${json.data[i].usuario}</a> <br>${json.data[i].texto}</span></div>
                </div>
                <div class="chat__conversation-board__message__options"><button class="btn-icon chat__conversation-board__message__option-button option-item emoji-button"><svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></button>
                    <button
                        class="btn-icon chat__conversation-board__message__option-button option-item more-button"><svg class="feather feather-more-horizontal sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            aria-hidden="true"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                </div>
                </div>
            `
        } else {
            component = `
                <div class="chat__conversation-board__message-container">
                <div class="chat__conversation-board__message__person">
                    <div class="chat__conversation-board__message__person__avatar"><img src="${json.data[i].url_perfil}" alt="Monika Figi" /></div><span class="chat__conversation-board__message__person__nickname">Monika Figi</span></div>
                <div class="chat__conversation-board__message__context">
                    <div class="chat__conversation-board__message__bubble"> <span> <a class=" text-decoration-none d-inline-block w-100 text-success text-start" href="#">${json.data[i].usuario}</a> <br> ${json.data[i].texto}</span></div>
                </div>
                <div class="chat__conversation-board__message__options"><button class="btn-icon chat__conversation-board__message__option-button option-item emoji-button"><svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></button>
                    <button
                        class="btn-icon chat__conversation-board__message__option-button option-item more-button"><svg class="feather feather-more-horizontal sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            aria-hidden="true"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                </div>
                </div> 
            `
        }


        document.getElementById('chats-container').innerHTML += component
    }

}



const enviarMensaje = async ( userName ) => {
    document.getElementById('send-message-button').addEventListener('click', async () => {
        
        const message = document.getElementById('box-message').value

        const API_URL = "http://13.59.147.125:8080/api/procedure"
        const body = {
            "procedure": "{ CALL pnj.SP_PNJ_REGISTRO_MENSAJE(?,?) }",
            "params": [message, userName]
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'cors'
            },
            body: JSON.stringify(body)
        })

        const json = await response.json();

        if (json.data.mensaje_enviado != 0) {
            window.location.href = './comunidad.html'
        } else {
            console.log('No envié el mensaje')
        }

        
    })
}
