var gameData = { 
    partes: 0,
    partesPorClick: 1,
    costePartesPC: 10,
    costeEquipos: 100,
    costeCafe: 1000,
    costeDeberes: 10000,
    cafes: 0,
    cafesPC: 1,
    contador: false,
    dame: 200,
    incremento: 0,
    incafemento: 0,
    multcafes: 100,
    


}




function update(id,content){
    document.getElementById(id).innerHTML = content;
}

function darParte() {
    gameData.partes += gameData.partesPorClick
    update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
}

function comprar(){
    if (gameData.partes >= gameData.costePartesPC) {
        gameData.partes -= gameData.costePartesPC
        gameData.partesPorClick += 0.1
        gameData.costePartesPC *= 1.5
        
        update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
        update("mejoraClick", "Mejorar la Vigilancia (Coste " + format(gameData.costePartesPC, "scientific") + ") Partes. Actualmente Nivel: " + format(gameData.partesPorClick, "scientific"))
    } 
}
document.getElementById("cafe").style.display = 'none'
document.getElementById("deberes").style.display = 'none'
document.getElementById("micafe").style.display = 'none'
document.getElementById("cafesConfiscados").style.display='none'


function equipos(){
   
    if (gameData.partes >= gameData.costeEquipos){
        gameData.partes -= gameData.costeEquipos
        gameData.incremento += 0.01
        gameData.costeEquipos *= 1.1
        if (gameData.costeEquipos >= "300") {
            document.getElementById("cafe").style.display = 'inline'
            document.getElementById("micafe").style.display = 'inline'
            document.getElementById("cafesConfiscados").style.display = 'inline'
        }
        update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
        update("veyon", "Mejorar los equipos y ponerles Veyon (+1 P/s). Coste: (" + gameData.costeEquipos.toFixed(2) + ") Partes")
    }
}


function miCafe(){
    gameData.cafes += gameData.cafesPC
    gameData.partes += gameData.partesPorClick
    update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
    update("cafesConfiscados", gameData.cafes.toFixed(2) + " cafés" )
}

function cafe(){
    if (gameData.partes >= gameData.costeCafe){
        gameData.partes -= gameData.costeEquipos
        gameData.incremento += 0.04
        gameData.costeCafe *= 1.2
        update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
        update("cafe", "Prohibir los cafés en clase (4 P/s)(" + gameData.costeCafe.toFixed(2)+ ")")
    }
}


function deberes(){
    if (gameData.partes > gameData.costeDeberes){
        gameData.partes -= gameData.costeDeberes
        gameData.incremento += 0.25
        gameData.costeDeberes * 2
        update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
        update("deberes", "Manda deberes (25 P/s)(" + gameData.costeDeberes.toFixed(2) + ")")

        if (gameData.costeDeberes > 5000 && gameData.contador == false) {
            document.getElementById("expansion").style.display = 'inline'
            gameData.contador = true
        }
    }
}
document.getElementById("dame").style.display = 'none'

var loop = window.setInterval(function() {
    gameData.partes += gameData.incremento
    if (gameData.partes > 10000){
        document.getElementById("deberes").style.display = 'inline'
    }
    if (gameData.cafes > 100 ){
        document.getElementById("dame").style.display = 'inline'
    }
    update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
    gameData.cafes += gameData.incafemento
    update("cafesConfiscados", gameData.cafes.toFixed(2)+ "cafés")

    if(gameData.partes >= 1000){
        news = ["Los alumnos se empiezan a quejar de los partes",
        "Recibes el record Guiness por número de partes.",
        "Te apetece un café.",
        "La cafetería está cerrada.",
        "Los cafés de los alumnos tienen buena pinta..."]
       
    }
}, 10)

function destruccion(){
    document.getElementById("esconder").style.display = 'none'
    document.getElementById("jovensito").style.display = 'inline'
    document.body.style.backgroundImage = "url('https://thumbs.gfycat.com/ComfortableRemoteArizonaalligatorlizard-size_restricted.gif') no-repeat cover"
    setTimeout(() => document.body.style.backgroundImage = "url('https://justfindit.se/magazine/wp-content/uploads/2014/11/universe-collapse.jpg') no-repeat cover" ,4000) 
}
document.getElementById("expansion").style.display = 'none'
document.getElementById("tienda").style.display = "none"


function format(number, type) {
	let exponent = Math.floor(Math.log10(number))
	let mantissa = number / Math.pow(10, exponent)
	if (exponent < 3) return number.toFixed(1)
	if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
	if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

function tab(tab) {
    document.getElementById("principal").style.display = "none"
    document.getElementById("tienda").style.display = "none"
    document.getElementById(tab).style.display = "inline-block"
}




var news = ["Has empezado a dar clases y notas que los alumnos están usando el móvil.",
"Por ahora no te queda más remedio que ir poniendo partes.",
"Un alumno te ha mirado mal.",
"Ha sonado la sirena. Es muy molesta.",
"El mundo está revuelto.."]

//logo
const logo = "<img src='https://veyon.io/img/veyon-logo.png' width='25px' style='margin:0 8px'/>";
let tickerText = "";

var loop2 = window.setInterval(function() {
    if (gameData.cafes > 1000 && gameData.partes > 1000000){
        destruccion()
    }
}, 1000)

//lee las noticais
for(let i=0; i<news.length; i++){
    tickerText+=news[i];
    //mete el logo
    if(i!=news.length-1){
      tickerText+=logo;
    }
  }

document.querySelector("#scroll").innerHTML = tickerText;

function expansion() {
    if (gameData.partes >= 100000){
        gameData.partes - 100000
        document.getElementById("expansion").style.display = 'none'
        document.getElementById("beber").style.display = 'inline'
    }
}
document.getElementById("beber").style.display = 'none'

function beber(){
    if (gameData.cafes >= gameData.multcafes){
        gameData.cafes -= gameData.multcafes
        gameData.multcafes*=1.1
        gameData.incremento *= 1.1
        update("cafesConfiscados", gameData.cafes.toFixed(2) + " cafés")
        update("beber", "Bebe café, aumentando por 10% la cantidad de partes (" + gameData.multcafes.toFixed(2)+")")
    }
}




function dame(){
    if (gameData.cafes >= gameData.dame){
        gameData.cafes -= gameData.dame
        gameData.dame *=1.5
        update("dame", "Pide a tus alumnos café (+10 Cafés por Segundo) (" + gameData.multcafes.toFixed(2)+")")
    }
}