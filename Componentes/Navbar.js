class Navbar extends  HTMLElement{
    connectedCallback(){
        //language=HTML
        this.innerHTML = `
            <div class="row" style="
    position: sticky;
    top: 0;
    z-index: 999;">
                <div class="col-md-12">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="padding: 0px 20px;">
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <a class="navbar-brand" href="#"><img src="/Asset/LOGO.png" style="width: 75px; height: 70px;"></a>
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="nav-link" href="/Cursos/cursos.html">Cursos <span class="sr-only"></span></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Comunidad</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Ranking</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                       aria-expanded="false">Multimedia</a>
                                    <ul class="dropdown-menu " data-bs-popper="static">
                                        <li><a class="dropdown-item" href="#">Juegos</a></li>
                                        <li><a class="dropdown-item" href="#">Videos</a></li>
                                        <li><a class="dropdown-item" href="#">Album</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul class="navbar-nav ml-md-auto">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                       aria-expanded="false">Usuario</a>
                                    <ul class="dropdown-menu " data-bs-popper="static" btnLogin>
                                        <li><a class="dropdown-item" href="login.html">Iniciar Sesion</a></li>
                                        <li><a class="dropdown-item" href="#">Mis Cursos</a></li>
                                        <li><a class="dropdown-item" href="#">Mis Notas</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        `;
    }
}

customElements.define('navbar-component', Navbar);

const btnLogiin = () => {
    $('body').on('click', '#btnLogin', () => {
        console.log('hola soy el login');
    });
}

window.addEventListener('load', () => {
    btnLogiin();
});