let stompCliente = null;
let personaImagen = "https://i.pinimg.com/1200x/33/78/52/3378521b7b071584bc42780350e5ab23.jpg"
    window.addEventListener('load', async () => {
        const usuarioSesion = sessionStorage.getItem('usuario') || null;
        const {usuario : username, url_perfil} = JSON.parse(usuarioSesion);
        personaImagen = url_perfil || personaImagen
        await mostrarChat(username);
        await enviarMensaje(username)
        conectarWS(username);
    })

const onConnectSocket = (username) => {
    stompCliente.subscribe('/topic/message/cnj/comunidad', (mensaje) => {
        mostrarMensaje(mensaje.body,username);
    });
};

const onWebSocketClose = () => {
    if (stompCliente !== null) {
        stompCliente.deactivate();
    }
};

const conectarWS = (username) => {
    onWebSocketClose();
    stompCliente = new StompJs.Client({
        "webSocketFactory": () => new WebSocket('ws:13.59.147.125:8080/websocket')
    });
    stompCliente.onConnect = () => onConnectSocket(username);
    stompCliente.onWebSocketClose = onWebSocketClose;
    stompCliente.activate();
};

const mostrarMensaje = (mensaje,username) => {
    const {user, project, topic, content, date} = JSON.parse(mensaje);
    const {message, imagen} = JSON.parse(content);
    const chatContainer = document.getElementById('chats-container')
    let html = "";
    if(user === username){
        html = `
        <div class="chat__conversation-board__message-container reversed">
        <div class="chat__conversation-board__message__person">
            <div class="chat__conversation-board__message__person__avatar"><img src="${imagen}" alt="Dennis Mikle" /></div><span class="chat__conversation-board__message__person__nickname">Dennis Mikle</span></div>
        <div class="chat__conversation-board__message__context">
            <div class="chat__conversation-board__message__bubble"> <span> <a class=" text-decoration-none d-inline-block w-100 text-success text-end" href="#">${user}</a> <br>${message}</span></div>
        </div>
        <div class="chat__conversation-board__message__options"><button class="btn-icon chat__conversation-board__message__option-button option-item emoji-button"><svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg></button>
            <button
                class="btn-icon chat__conversation-board__message__option-button option-item more-button"><svg class="feather feather-more-horizontal sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg></button>
        </div>
    </div>
        `
    }else {
        html = `
        <div class="chat__conversation-board__message-container">
        <div class="chat__conversation-board__message__person">
            <div class="chat__conversation-board__message__person__avatar"><img src="${imagen}" alt="Monika Figi" /></div><span class="chat__conversation-board__message__person__nickname">Monika Figi</span></div>
        <div class="chat__conversation-board__message__context">
            <div class="chat__conversation-board__message__bubble"> <span> <a class=" text-decoration-none d-inline-block w-100 text-success text-start" href="#">${user}</a> <br> ${message}</span></div>
        </div>
        <div class="chat__conversation-board__message__options"><button class="btn-icon chat__conversation-board__message__option-button option-item emoji-button"><svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg></button>
            <button
                class="btn-icon chat__conversation-board__message__option-button option-item more-button"><svg class="feather feather-more-horizontal sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg></button>
        </div>
    </div> 
        `
    }
    chatContainer.innerHTML += html
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

const mostrarChat = async (userName) => {
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
        const chatContainer = document.getElementById('chats-container')

        if (json.data[i].usuario == userName) {
            component = `
                <div class="chat__conversation-board__message-container reversed">
                <div class="chat__conversation-board__message__person">
                    <div class="chat__conversation-board__message__person__avatar"><img src="${json.data[i].url_perfil}" alt="Dennis Mikle" /></div><span class="chat__conversation-board__message__person__nickname">Dennis Mikle</span></div>
                <div class="chat__conversation-board__message__context">
                    <div class="chat__conversation-board__message__bubble"> <span> <a class=" text-decoration-none d-inline-block w-100 text-success text-end" href="#">${json.data[i].usuario}</a> <br>${json.data[i].texto}</span></div>
                </div>
                <div class="chat__conversation-board__message__options">
                <span class="text-white"> <a class="text-white text-decoration-none " >${json.data[i].hora.substring(0,5)}</a> <br>${json.data[i].fecha}</span>
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
                <div class="chat__conversation-board__message__options">
                <span class="text-white"> <a class="text-white text-decoration-none" >${json.data[i].hora.substring(0,5)}</a> <br>${json.data[i].fecha}</span>
                </div>
                </div> 
            `
        }
        chatContainer.innerHTML += component
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }


}


const enviarMensaje = async (userName) => {
    document.getElementById('send-message-button').addEventListener('click', async () => {
        const messageContainer = document.getElementById('box-message')
        const message = messageContainer.value
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
            console.log('Envié el mensaje')
            messageContainer.value = ''
            stompCliente.publish({
                destination: '/app/websocket/cnj/comunidad',
                body: JSON.stringify({
                    user: userName,
                    content: JSON.stringify({
                        message: message,
                        imagen: personaImagen
                    })
                })
            });
        } else {
            console.log('No envié el mensaje')
        }
    })
}