//variables funcion startGame
const section_seleccion_ataque = document.getElementById("seleccion_ataque")
const boton_reiniciar = document.getElementById("boton_reiniciar")
const seleccionar_personaje = document.getElementById("seleccionar_personaje")
const boton_piedra = document.getElementById("ataque_piedra")
const boton_papel = document.getElementById("ataque_papel")
const boton_tijera = document.getElementById("ataque_tijera")
//variables funcion seleccionPersonaje
const mensaje_final = document.getElementById("mensaje_final")
const section_seleccion_personaje = document.getElementById("seleccion_personaje")
// const chewaca_input = document.getElementById("Chewaca")
// const han_solo_input = document.getElementById("Han Solo")
// const bobba_fett_input = document.getElementById("Bobba Fett")
// const captain_rex_input = document.getElementById("Captain Rex")
// const ig_11_input = document.getElementById("IG-11")
// const the_mandalorian_input = document.getElementById("The Mandalorian")
const nombre_personaje = document.getElementById("nombre_personaje")
const titulo = document.getElementById("title")
//variables funcion mensaje_output
const mensajes = document.getElementById("mensajes")
//vairables funcion elegir_ganador
const vida_jugador = document.getElementById("vida_personaje")
const vida_palpatine = document.getElementById("vida_palpatine")
//variables mensaje_output_final
const parrafo_final = document.createElement("p")

const tarjetas_personajes = document.getElementById("tarjetas_personajes")

let personajes = []
let ataque_jugador = ""
let ataque_enemigo = ""
let veredicto = ""
let contador_vida_jugador = 5
let contador_vida_palpatine = 5
let opcion_personaje = ""

class personaje {
    constructor(nombre,foto){
        this.nombre = nombre
        this.foto = foto
    }
}

let chewaca = new personaje("Chewaca", "/assets/images.png")

let han_solo = new personaje("Han Solo", "/assets/images.png")

let bobba_fett = new personaje("Bobba Fett", "/assets/images.png")

let capitan_rex = new personaje("Capitán-Rex", "/assets/images.png")

let ig_11 = new personaje("IG-11", "/assets/images.png")

let din_djarin = new personaje("Din-Djarin", "/assets/images.png")

personajes.push(chewaca,han_solo,bobba_fett,capitan_rex,ig_11,din_djarin)


function startGame(){
    section_seleccion_ataque.style.display = "none"
    boton_reiniciar.style.display = "none"
    seleccionar_personaje.addEventListener("click", seleccionPersonaje)
    boton_piedra.addEventListener("click", ataque_piedra)
    boton_papel.addEventListener("click", ataque_papel)
    boton_tijera.addEventListener("click", ataque_tijera)
    boton_reiniciar.addEventListener("click", restart_game) 

       personajes.forEach((personaje) => {
        opcion_personaje = `
        <section class="personaje">
            <input type="radio" name =${personaje.nombre} id=${personaje.nombre}>
            <label for=${personaje.nombre}>
            <p>${personaje.nombre}</p>
            <img src=${personaje.foto} alt="">
            </label>
        </section>
        `
        tarjetas_personajes.innerHTML += opcion_personaje 
    })
}

function seleccionPersonaje(){
    mensaje_final.style.display = "none"
    section_seleccion_ataque.style.display = "flex"
    section_seleccion_personaje.style.display = "none"
    titulo.style.display = "none"

    const chewaca_input = document.getElementById("Chewaca")
    let han_solo_input = document.getElementById("Han")
    let bobba_fett_input = document.getElementById("Bobba")
    let captitan_rex_input = document.getElementById("Capitán-Rex")
    let ig_11_input = document.getElementById("IG-11")
    let din_djarin_input = document.getElementById("Din-Djarin")

     if (chewaca_input.checked){
        nombre_personaje.innerHTML = chewaca.nombre
    } else if (han_solo_input.checked){
        nombre_personaje.innerHTML = han_solo.nombre
    } else if (bobba_fett_input.checked){
        nombre_personaje.innerHTML = bobba_fett.nombre
    } else if (captitan_rex_input.checked){
        nombre_personaje.innerHTML = capitan_rex.nombre
    } else if (ig_11_input.checked){
        nombre_personaje.innerHTML = ig_11.nombre
    } else if (din_djarin_input.checked){
        nombre_personaje.innerHTML = din_djarin.nombre
    } else {
        alert("Debes seleccionar un personaje para iniciar el juego!")
        location.reload()
    }   
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max - min + 1) + min)
}

function genera_ataque_enemigo(){
    let x = aleatorio(1, 3)
    if(x == 1){
        ataque_enemigo = "✊🏻"
    } else if(x == 2){
        ataque_enemigo = "✋🏻"
    } else {
        ataque_enemigo = "✌🏻"
    }
    elegir_ganador()
}

function ataque_piedra(){
    ataque_jugador = "✊🏻"
    genera_ataque_enemigo() 
}

function ataque_papel(){
    ataque_jugador = "✋🏻"
    genera_ataque_enemigo() 
}

function ataque_tijera(){
    ataque_jugador = "✌🏻"
    genera_ataque_enemigo() 
}

function restart_game(){
    location.reload()
}
function mensaje_output(){
    let parrafo = document.createElement("p")
    mensajes.appendChild(parrafo)
    parrafo.innerHTML = ataque_jugador + " " + ataque_enemigo + " " + veredicto
}

function elegir_ganador(){
    if(ataque_enemigo == ataque_jugador){
        veredicto = "EMPATE"
        mensaje_output()
    } else if ((ataque_jugador == "✊🏻" && ataque_enemigo == "✌🏻") ||
    (ataque_jugador == "✌🏻" && ataque_enemigo == "✋🏻") || 
    (ataque_jugador == "✋🏻" && ataque_enemigo == "✊🏻")) {
        veredicto = "GANASTE"
        mensaje_output()
        contador_vida_palpatine = contador_vida_palpatine - 1
        vida_palpatine.innerHTML = contador_vida_palpatine
    } else {
        veredicto = "PERDISTE"
        mensaje_output()
        contador_vida_jugador = contador_vida_jugador - 1
        vida_jugador.innerHTML = contador_vida_jugador
    }
    revisar_vidas()
}

function revisar_vidas(){
    if(contador_vida_jugador == 0){
        mensaje_output_final("derrota")
    } else if(contador_vida_palpatine == 0){
        mensaje_output_final("victoria")
    }
}

function mensaje_output_final(estado){
    boton_reiniciar.style.display = "block"
    if(estado == "derrota"){
        mensaje_final.style.display = "block"
        mensaje_final.appendChild(parrafo_final)
        parrafo_final.innerHTML = "¡DERROTA!"
    } else if (estado == "victoria"){
        mensaje_final.style.display = "block"
        mensaje_final.appendChild(parrafo_final)
        parrafo_final.innerHTML = "¡VICTORIA!"
    }
    boton_piedra.disabled = true
    boton_papel.disabled = true
    boton_tijera.disabled = true
}
window.addEventListener("load", startGame)



    
