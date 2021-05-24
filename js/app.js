var validCharacters = [8, 13, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
var num = 18.7

// Opera la funcion
window.onload = function() {
    document.onkeypress = mostrarInformacionCaracter;
}

// Funcion de escritura
function mostrarInformacionCaracter(evObject) {

    var msg = '';
    var char = String.fromCharCode(evObject.which);

    // "Deleteable"
    // Prueba en la consola para verificar que tecla se toca
    console.log(char + ' <' + evObject.which + '>');
    // "Deleteable"

    //Verifica si es un caracter valido
    if (validCharacters.includes(evObject.which)) {
        msg = char;

        control.innerHTML += msg;
    }

}