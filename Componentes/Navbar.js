class Nav extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style="padding: 0px 20px;">
          <button class="navbar-toggler" type="button" data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1">
            <span class="navbar-toggler-icon"></span>
          </button> 
	            <a class="navbar-brand" href="./index.html"><img src="../Asset/LOGO.png" style="width: 75px; height: 70px;" ></a>
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="./cursos.html">Cursos <span class="sr-only"></span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="./comunidad.html">Comunidad</a>
              </li>
    
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                  aria-expanded="false">Multimedia</a>
                <ul class="dropdown-menu " data-bs-popper="static">
                  <li><a class="dropdown-item" href="./juegos.html">Juegos</a></li>

                </ul>
              </li>
            </ul>
            <ul class="navbar-nav ml-md-auto">
              <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" id="nombreUsuario"
              aria-expanded="false">Usuario</a>
                <ul class="dropdown-menu " data-bs-popper="static">
                  <li><a class="dropdown-item" id="iniciarSesion" href="./login.html">Iniciar Sesion</a></li>
                  <li><a class="dropdown-item" id="perfil" href="./perfil.html" aria-expanded="false">Perfil</a></li>
                  <li><a class="dropdown-item" id="miscursos2" href="./miscursos.html" aria-expanded="false">Mis Cursos</a></li>

                  <li><a class="dropdown-item" id="matricula2" href="./matricula.html" aria-expanded="false">Matricula</a></li>
                  <li><a class="dropdown-item" id="colegio2" href="./colegio.html" aria-expanded="false">Colegio</a></li>
                  <li><a class="dropdown-item" id="supervisor2" href="./supervisor.html" aria-expanded="false">Supervisor</a></li>
                  <li><a class="dropdown-item" id="ciclo2" href="./ciclo.html" aria-expanded="false">Ciclo</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        `;
    }
}

customElements.define('nav-bar', Nav);

const btnLogiin = () => {
    $('body').on('click', '#btnLogin', () => {
        console.log('hola soy el login');
    });
}

window.addEventListener('load', () => {
    btnLogiin();
});