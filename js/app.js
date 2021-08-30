/* 
-Nombre: App.js 
-Version: 0.1
-Funciones: escribir-calcular-mostrar resultados
-Funciones por realizar: calcular-mostrar resultados
-Funciones hechas: escribir
-Descripcion detallada: 
    Programa en js encargado de la escritura
    en pantalla y en calcular el 'input' de la
    de la calculador y retonar una output que
    sera escrito en la seccion de 'result' del
    HTML 'index.html'.
-Diccionario:
    *Del/del = Delete
    *Ops = Operadores (+-*÷)
*/

//Variables preliminares
var input = '';
var output = '';
var ans = '';
var sAns = 'Ans';
var validCharacters = [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
var validOpsMaster = [8, 13];
var ops = [42, 43, 45, 47];

function calculate(str) {
    str = str.replace('÷', '/');
    str = str.replace('x', '*');
    str = str.replace(sAns, ans);
    var j = 0;
    for (var i = 0; i < str.length; i++) {
        if (str[i].toLowerCase() === ".") {
            j++;
        };
        if (ops.includes(parseInt(str[i]))) {
            j = 0;
        }
        if (j > 1) {
            console.log('Error: Existen mas de un punto flotante');
            break;
        }
    }
    if (input == '') {
        console.log('Error: Input vacio');
    } else if (str[0] == '*' || str[0] == '/') {
        console.log('Error: Syntaxis error');
    } else {
        // console.log('input:' + input + '; output:' + output);
        var result = eval(str);
        output = result.toString();
        console.log(output);
        output = outputFix(output);
        ans = output;
        writeOnScreen()
        input = ''
    }
}

// Fix output
function outputFix(str) {
    var j = 0;
    var nextPoint = false;
    for (var i = 0; i < str.length; i++) {
        if (str[i] == '.') {
            nextPoint = true;
        }
        if (nextPoint) {
            if (str[i] == str[i - 1]) {
                if (str[i] == '0') {
                    str = str.slice(0, (i - 1));
                    return str;
                } else {
                    str = str.slice(0, (i + 1));
                    return str;
                }
            }
        }
    }
    return str;
}

// Escribe en la pantalla
function writeOnScreen() {
    //Ver ifica si hay que escribir el cero predeterminado
    if (input == '') {
        document.getElementById("control").innerHTML = '0';
    } else {
        //Escribe el input en el html
        document.getElementById("control").innerHTML = input;
    }
    if (output != '') {
        document.getElementById("result").innerHTML = output;
    } else {
        document.getElementById("result").innerHTML = '0';
    }
}

// Opera las funciones de escritura en el HTML por parte del KeyBoard
window.onload = function() {
    document.onkeypress = writeFromKeyboard;
    document.onkeyup = opsMaster;
}

// Funcion de escritura del teclado
function writeFromKeyboard(evObject) {

    var msg = '';
    code = evObject.which;
    char = ''
    var char = String.fromCharCode(code);

    // "Deleteable"
    // Prueba en la consola para verificar que tecla se toca
    // console.log(char + '<' + code + ' > ');
    // "Deleteable"

    //Verifica si es un caracter valido
    if (validCharacters.includes(code)) {

        if (output != '' && ops.includes(code)) {
            msg = char;
            input += msg;
            writeOnScreen();
        } else {
            console.log('xd')
            msg = char;
            input += msg;
            writeOnScreen();
        }
    }

}

// Funcion de lectura de los operadores (Extension de writeFromKeyboard())
// Se incluyen (Delete y Enter)
function opsMaster(evObject) {
    code = evObject.keyCode;
    switch (code) {
        case 8:
            //Delete
            del();
            writeOnScreen();
            break;
        case 13:
            calculate(input)
            break;
        default:
            break;
    }
}

// Funcion de escritura de la screen
function writeFromScreen(char) {
    op = ['equals', 'ac', 'del'];
    op2 = ['+', '-', '*', '/', 'x', '÷'];
    if (op.includes(char)) {
        switch (char) {
            case 'ac':
                clean();
                break;
            case 'del':
                del();
                writeOnScreen();
            default:
                break;
        }
    } else {
        if (output != '' && op2.includes(char)) {
            input += char;
            writeOnScreen();
        } else {
            input += char;
            writeOnScreen();
        }
    }
}

// Funcion de limpiado (Solo input)
function clean() {
    input = '';
    output = '';
    writeOnScreen();
}

// Funcion de la tecla delete (keybord/btnScreen)
function del() {
    input = input.slice(0, -1)
}

// Se escribe al principio de la pantalla
writeOnScreen();