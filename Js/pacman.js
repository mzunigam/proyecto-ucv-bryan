
window.addEventListener('load', () => {
    ghost();
});

const ghost = async () => {
    
    document.getElementById('comenzar').addEventListener('click', async  (event) => {
        console.log('se ejecuta pacman') 
        const button = event.currentTarget;
        button.disabled = true;
        //------
        /**
 * Script para gestionar el pacman
 */

/**
 * direction:
 *  0-top
 *  1-right
 *  2-bottom
 *  3-left
 */
'use strict'
let position={
    direction:3,
    h:9,
    v:11
}
let score=0;
let speed=500;

// Dibujamos el comecocos
document.querySelectorAll("#board>div")[(position.v*19)+position.h].classList.remove("food");
document.querySelectorAll("#board>div")[(position.v*19)+position.h].classList.add("comecocos");

// detectamos la pulsacion de las teclas de movimiento
window.addEventListener("keyup", e => {
    e.preventDefault();
    if (e.code=="ArrowUp" && canUp()) { // up
        position.direction=0;
    } else if (e.code=="ArrowRight" && canRight()) { // right
        position.direction=1;
    } else if (e.code=="ArrowDown" && canDown()) { // down
        position.direction=2;
    } else if (e.code=="ArrowLeft" && canLeft()) { // left
        position.direction=3;
    }
});

let interval=setInterval(() => {
    // Escondemos el pacman
    document.querySelectorAll("#board>div")[(position.v*19)+position.h].classList.remove("comecocos");

    // Comprovamos si puede seguir moviendose en la misma direccion
    if (position.direction==0 && canUp()) { // up
        position.v=position.v-1;
    } else if (position.direction==1 && canRight()) { // right
        position.h=position.h+1;
        position.h = position.h==19 ? 0 : position.h;
    } else if (position.direction==2 && canDown()) { // down
        position.v=position.v+1;
    } else if (position.direction==3 && canLeft()) { // left
        position.h=position.h-1;
        position.h = position.h==-1 ? 18 : position.h;
    }

    // Movemos el pacman
    const dest=document.querySelectorAll("#board>div")[(position.v*19)+position.h];

    // Comprovamos si hay un cuadro de comida
    if (dest.classList.contains("food")) {
        // Eliminamos el cuadro de comida
        dest.classList.remove("food");
        // Aumentamos la puntuacion
        document.getElementById("score").innerHTML=++score;
        // Si no queda comida, finalizamos el juego
        if (document.querySelectorAll("#board>div.food").length==0) {
            endGame();
        }
    }

    // Si la casilla tiene una vitamina
    if (dest.classList.contains("energizer")) {
        // Eliminamos la vitamina
        dest.classList.remove("energizer");
        // Convertimos los fantasmas en azules
        convertBlue();
    }
    dest.classList.add("comecocos");
}, speed);

/**
 * Funciones que determinan si pacman puede ir hacia arriba, derecha, abajo o izquierda
 * 
 * @return boolean
 */
const canUp = () =>    screenDraw[position.v-1][position.h]==1 || screenDraw[position.v-1][position.h]==9;
const canRight = () => screenDraw[position.v][position.h+1]==1 || screenDraw[position.v][position.h+1]==9 || position.h+1==19;
const canDown = () =>  screenDraw[position.v+1][position.h]==1 || screenDraw[position.v+1][position.h]==9;
const canLeft = () =>  screenDraw[position.v][position.h-1]==1 || screenDraw[position.v][position.h-1]==9 || position.h-1==-1;


        //------
        //------
        /**
 * Script para gestionar los fantasmas
 */

/**
 * direction:
 *  0-top
 *  1-right
 *  2-bottom
 *  3-left
 */
'use strict'
let speedGhost=500;

function ghost(direction, h, v, color, interval) {
    this.direction=direction;
    this.h=h;
    this.v=v;
    this.color=[color];
    this.interval=interval;
    this.addColor=function(color) {
        if (this.color.indexOf(color)==-1) {
            this.color.push(color);
        }
    };
    this.removeColor=function(color) {
        if (this.color.indexOf(color)!=-1) {
            this.color.splice(this.color.indexOf(color), 1);
        }
    };
    this.elementAddColor=function(element) {
        this.color.forEach(c => element.classList.add(c));
    };
    this.elementRemoveColor=function(element) {
        this.color.forEach(c => element.classList.contains(c) ? element.classList.remove(c) : null);
    };
}

let ghosts=[
    new ghost(3, 9, 7, "red"),
    new ghost(0, 8, 9, "pink"),
    new ghost(0, 9, 9, "purple"),
    new ghost(0, 10, 9, "orange"),
];

// dibujamos los fantasmas
ghosts.forEach(g => {
    g.elementAddColor(document.querySelectorAll("#board>div")[(g.v*19)+g.h]);
    g.interval=setInterval(() => {
        // revisamos si hay colision con pacman
        if (checkCollision(g)) {
            return;
        }

        // buscamos la siguiente direccion para el fantasma
        g.direction=newDirection(g);
        g.elementRemoveColor(document.querySelectorAll("#board>div")[(g.v*19)+g.h]);
        if (g.direction==0 && gCanUp(g)) {
            g.v=g.v-1;
        } else if (g.direction==1 && gCanRight(g)) {
            g.h=g.h+1;
            g.h = g.h==19 ? 0 : g.h;
        } else if (g.direction==2 && gCanDown(g)) {
            g.v=g.v+1;
        } else if (g.direction==3 && gCanLeft(g)) {
            g.h=g.h-1;
            g.h = g.h==-1 ? 18 : g.h;
        }
        g.elementAddColor(document.querySelectorAll("#board>div")[(g.v*19)+g.h]);

        // revisamos si hay colision con pacman
        checkCollision(g);
    }, speedGhost);
});

/**
 * function to check if there are any collision 
 * 
 * @param {ghost object} g
 * 
 * @return boolean 
 */
const checkCollision = g => {
    // Si la posicion del fantasma es la misma que la de pacman
    if (g.v==position.v && g.h==position.h) {
        // Revisamos si el fantasma esta en azul para comerlo
        if (document.querySelectorAll("#board>div")[(g.v*19)+g.h].classList.contains("blue")) {
            g.elementRemoveColor(document.querySelectorAll("#board>div")[(g.v*19)+g.h]);
            g.removeColor("blue");
            g.h=9;
            g.v=9;
            g.elementAddColor(document.querySelectorAll("#board>div")[(g.v*19)+g.h]);
            score=score+10;
            document.getElementById("score").innerHTML=score;
        } else {
            endGame();
        }
        return true;
    }
    return false;
}

/**
 * Funciones que determinan si el fantasma puede ir hacia arriba, derecha, abajo o izquierda
 * 
 * @param {ghost object} g
 * 
 * @return boolean
 */
const gCanUp = g => screenDraw[g.v-1][g.h]==1 || screenDraw[g.v-1][g.h]==2;
const gCanRight = g => screenDraw[g.v][g.h+1]==1 || g.h+1==19;
const gCanDown = g => screenDraw[g.v+1][g.h]==1;
const gCanLeft = g => screenDraw[g.v][g.h-1]==1 || g.h-1==-1;

/**
 * Function to get new direction to ghost
 * 
 * @param {ghost object} g
 * 
 * @return integer [0-up|1-right|2-down|3-left]
 */
const newDirection = g => {
    // Creamos un array con los posibles movimientos del fantasma
    const position = [
        g.direction!=2 && gCanUp(g) ? 1 : 0,
        g.direction!=3 && gCanRight(g) ? 1 : 0,
        g.direction!=0 && gCanDown(g) ? 1 : 0,
        g.direction!=1 && gCanLeft(g) ? 1 : 0
    ];
    const sum=position.reduce((a,b) => a+b);

    // Obtenemos un numero aleatorio entre los posibles movimientos
    const random=Math.floor(Math.random() * sum);

    // Devolvemos el siguiente movimiento del fantasma [0-up|1-right|2-down|3-left]
    for (let i=0, pos=-1; i<position.length; i++) {
        pos = position[i]==1 ? pos+1 : pos;
        if (pos==random) {
            return i     
        }  
    }
}

/**
 * Funcion que se ejecuta al finalizar el juego
 */
function endGame() {
    // Detenemos el movimiento de los fantasmas
    ghosts.forEach(g => clearInterval(g.interval));

    // Detenemos el movimiento del pacman
    clearInterval(interval);

    // Ponemos un intervalo en el pacman para que parpadee
    setInterval(() => {
        document.querySelectorAll("#board>div")[(position.v*19)+position.h].classList.toggle("comecocos")
    }, 1000);
}

/**
 * Funcion que se ejecuta cuando nos comemos una vitamina
 * Convierte los fantasmas azules durante 10 segundos
 */
function convertBlue() {
    ghosts.forEach(g => g.addColor("blue"));
    setTimeout(() => {
        ghosts.forEach(g => g.removeColor("blue"));
    }, 10000);
}
        //------
    });
}