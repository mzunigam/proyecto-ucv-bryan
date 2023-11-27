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
              <li class="nav-item">
                <a class="nav-link" href="#">Ranking</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                  aria-expanded="false">Multimedia</a>
                <ul class="dropdown-menu " data-bs-popper="static">
                  <li><a class="dropdown-item" href="./juegos.html">Juegos</a></li>
                  <li><a class="dropdown-item" href="#">Videos</a></li>
                  <li><a class="dropdown-item" href="#">Album</a></li>
                </ul>
              </li>
            </ul>
            <ul class="navbar-nav ml-md-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Usuario</a>
                <ul class="dropdown-menu " data-bs-popper="static">
                  <li><a class="dropdown-item" href="./login.html">Iniciar Sesion</a></li>
                  <li><a class="dropdown-item" href="./miscursos.html">Mis Cursos</a></li>
                  <li><a class="dropdown-item" href="#">Mis Notas</a></li>
                  <li><a class="dropdown-item" href="./matricula.html">Matricula</a></li>
                  <li><a class="dropdown-item" href="./colegio.html">Colegio</a></li>
                  <li><a class="dropdown-item" href="./supervisor.html">Supervisor</a></li>
                  <li><a class="dropdown-item" href="./ciclo.html">Ciclo</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        `;
    }
}

customElements.define('nav-bar', Nav);