class Nav extends HTMLElement {
    constructor() {
        super();
        
    }
    connectedCallback() {
        this.innerHTML = `
        <nav  class="navbar navbar-expand-lg navbar-light bg-light" style="padding: 0px 20px;font-size: 18px;">
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="true" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse collapse show" id="navbarsExample01" >
        <ul class="navbar-nav me-auto mb-2">
          <li class="nav-item" style="display: flex;align-items: center;">
            <a class="nav-link active " aria-current="page" href="./index.html"><img src="../Asset/LOGO.png" style="width: 75px; height: 70px;"></a>
          </li>
          <li class="nav-item" style="display: flex;align-items: center;">
            <a class="nav-link active" aria-current="page" href="./cursos.html">Curso</a>
          </li>
          <li class="nav-item" style="display: flex;align-items: center;">
            <a class="nav-link active" aria-current="page" href="./comunidad.html">Comunidad</a>
          </li>
          <li class="nav-item dropdown" style="display: flex;align-items: center;">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-bs-toggle="dropdown" aria-expanded="false">Multimedia</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown01">
              <li><a class="dropdown-item" href="./juegos.html">Juegos</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown" style="display: flex;align-items: center;">
            <a class="nav-link dropdown-toggle" href="#" id="nombreUsuario" data-bs-toggle="dropdown" aria-expanded="false">Usuario</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown01">
              <li><a class="dropdown-item" id="iniciarSesion" href="./login.html">Iniciar Sesion</a></li>
              <li><a class="dropdown-item" id="perfil" href="./perfil.html" aria-expanded="false">Perfil</a></li>
              <li><a class="dropdown-item" id="miscursos2" href="./miscursos.html" aria-expanded="false">Mis Cursos</a></li>
              <li><a class="dropdown-item" id="matricula2" href="./matricula.html" aria-expanded="false">Matricula</a></li>
              <li><a class="dropdown-item" id="colegio2" href="./colegio.html" aria-expanded="false">Colegio</a></li>
              <li><a class="dropdown-item" id="supervisor2" href="./supervisor.html" aria-expanded="false">Supervisor</a></li>
              <li><a class="dropdown-item" id="ciclo2" href="./ciclo.html" aria-expanded="false">Ciclo</a></li>
              <li><a class="dropdown-item" id="cerrarsesion" href="./index.html" aria-expanded="false" type="button">Cerrar Sesion</a></li>
            </ul>
          </li>
        </ul>
        <script src="../Js/cerrarsesion.js"></script>
      </div>
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
