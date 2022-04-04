var gameData = { 
    partes: 0,
    partesPorClick: 1,
    costePartesPC: 10,
    costeEquipos: 100,
    costeCafe: 1000,
    costeDeberes: 10000,
    incremento: 0,
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

function equipos(){
   
    if (gameData.partes >= gameData.costeEquipos){
        gameData.partes -= gameData.costeEquipos
        gameData.incremento += 1
        gameData.costeEquipos *= 1.1
        if (gameData.costeEquipos >= "300") {
            document.getElementById("cafe").style.display = 'inline'
        }
        update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
        update("veyon", "Mejorar los equipos y ponerles Veyon (+1 P/s). Coste: (" + format(gameData.costeEquipos, "scientific") + ") Partes")
    }
}

function cafe(){
    if (gameData.partes >= gameData.costeCafe){
        gameData.partes -= gameData.costeEquipos
        gameData.incremento += 4
        gameData.costeCafe *= 1.2
        update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
        update("cafe", "Prohibir los cafés en clase (4 P/s)(" + format(gameData.costeCafe, scientific)+ ")")
    }
}

function deberes(){
    if (gameData.partes > gameData.costeDeberes){
        gameData.partes -= gameData.costeDeberes
        gameData.incremento += 25
        gameData.costeDeberes * 2
        update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
        update("deberes", "Manda deberes (25 P/s)(" + format(gameData.costeDeberes, scientific)+ ")")
    }
}


var loop = window.setInterval(function() {
    gameData.partes += gameData.incremento
    update("partesRecibidos", gameData.partes.toFixed(2) + " Partes")
}, 1000)


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

