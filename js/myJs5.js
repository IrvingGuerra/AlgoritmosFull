 var R = [];
 var L = [];

function generar(cant){
	R = makeString(cant);
	L = makeString(parseInt(cant)+1);
	var arrayTextoR = R.toString().replace(/,/g, ', ');
	var arrayTextoL = L.toString().replace(/,/g, ', ');
	$('#stringR').html("R= "+arrayTextoR);
	$('#stringL').html("L= "+arrayTextoL);
	$('#btnCalcular').show();
}

function calcular() {
	var timeInicial = new Date().getTime(); 
	$('#resultadoDivideVenceras').html("<strong>Divide y venceras: </strong>"+
			SM(R,L).toString().replace(/,/g, ', ')
		+ "<br>");
	var timeFinal = new Date().getTime();
	var diff1 = (timeFinal - timeInicial)/1000;
	$('#resultadoDivideVencerasTime').html("<p>Tiempo transcurrido: "+diff1+" ms</p>");
	var timeInicial = new Date().getTime(); 
	$('#resultadoDinamico').html("<strong>Dinamico: </strong>"+
			SMDinamica(R,L).toString().replace(/,/g, ', ')
		+ "<br>");
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
	$('#resultadoDinamicoTime').html("<p>Tiempo transcurrido: "+diff2+" ms</p>");

}

function makeString(length) {
	var result           = [];
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result[i] = characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function SM(array1, array2) {
    var res = []
    for (var i = 0; i < array1.length; i++) {
        res.push(subsec(array1.slice(i), array2));
    }
    var max = '';
    var cantidad = 0;
    for (var i = 0; i < res.length; i++) {
        if (cantidad < res[i].length) {
            cantidad = res[i].length;
            max = res[i].split('');
        }
    }
    return max;
}

function subsec (array1, array2) {
    var res = '';
    var i = 0;
    while (i < array1.length && array2.length > 0) {
        var j = array2.indexOf(array1[i]);
        if (j != -1) {
            res += array1[i];
            res += subsec(array1.slice(i + 1), array2.slice(j + 1));
            break;
        }
        i++;
    }
    return res;
}
//console.log(SM(["K","C","J","C","K","T","O","D","B","V"],["C","Y","D","L","C","J","V","P","V","W"]));

//console.log(SMDinamica(["K","C","J","C","K","T","O","D","B","V"],["C","Y","D","L","C","J","V","P","V","W"]));

function SMDinamica(array1, array2) {
	//Tabla que nos ayuda a hacer mas rapidas las consultas
    var tabla = Array(array2.length + 1).fill(Array(array1.length + 1));
    //Llenamos de ceros la primera fila y columna
    for (var col = 0; col <= array1.length; col++) {
        tabla[0][col] = 0;
    }
    for (var row = 0; row <= array2.length; row++) {
        tabla[row][0] = 0;
    }
    //Se hacen las comparaciones
    for (var row = 1; row <= array2.length; row += 1) {
        for (var col = 1; col <= array1.length; col += 1) {
            if (array1[col - 1] === array2[row - 1]) {
                tabla[row][col] = tabla[row - 1][col - 1] + 1;
            } else {
                tabla[row][col] = Math.max(
                    tabla[row - 1][col],
                    tabla[row][col - 1],
                );
            }
        }
    }
    //Caso donde no existe subcadena
    console.log(tabla);
    if (!tabla[array2.length][array1.length]) {
        return [''];
    }
    var result = [];
    var col = array1.length;
    var row = array2.length;
    while (col > 0 || row > 0) {
        if (array1[col - 1] === array2[row - 1]) {
            // Diagonal
            result.unshift(array1[col - 1]);
            col--;
            row--;
            if (col < 0 || row < 0) break; 
        } else if (tabla[row][col] === tabla[row][col - 1]) {
            // MIzquierda
            col--;
            if (col < 0) break; 
        } else {
            // Move up.
            row--;
            if (row < 0) break; 
        }
    }
    return result;
}


function graficar() {
	generar(100);	
	var times100 = justDoAlgorithm().split(",");
	generar(1000);	
	var times1000 = justDoAlgorithm().split(",");
	generar(2000);	
	var times2000 = justDoAlgorithm().split(",");
	generar(3000);	
	var times3000 = justDoAlgorithm().split(",");
	generar(4000);	
	var times4000 = justDoAlgorithm().split(",");
	generar(5000);	
	var times5000 = justDoAlgorithm().split(",");
	generar(6000);	
	var times6000 = justDoAlgorithm().split(",");
	generar(7000);	
	var times7000 = justDoAlgorithm().split(",");
	generar(8000);	
	var times8000 = justDoAlgorithm().split(",");
	generar(9000);	
	var times9000 = justDoAlgorithm().split(",");
	generar(10000);	
	var times10000 = justDoAlgorithm().split(",");
	$("#graficas").show();
	new Morris.Line({
	  element: 'graficas',
	  data: [
	    { second: '100', value: times100[0] , value2: times100[1]},
	    { second: '1000', value: times1000[0] , value2: times1000[1]},
	    { second: '2000', value: times2000[0] , value2: times2000[1]},
	    { second: '3000', value: times3000[0] , value2: times3000[1]},
	    { second: '4000', value: times4000[0] , value2: times4000[1]},
	    { second: '5000', value: times5000[0] , value2: times5000[1]},
	    { second: '6000', value: times6000[0] , value2: times6000[1]},
	    { second: '7000', value: times7000[0] , value2: times7000[1]},
	    { second: '8000', value: times8000[0] , value2: times8000[1]},
	    { second: '9000', value: times9000[0] , value2: times9000[1]},
	    { second: '10000', value: times10000[0] , value2: times10000[1]}
	  ],
	  xkey: 'second',
	  ykeys: ['value', 'value2'],
	  labels: ['Divide y venceras', 'Dinamico'],
	  parseTime: false,
	  resize: true,
	  lineWidth: 1,
	  lineColors: ['red','blue']
	});
}
function justDoAlgorithm() {
	var timeInicial = new Date().getTime();
	SM(R,L);
	var timeFinal = new Date().getTime();
	var diff1 = (timeFinal - timeInicial)/1000;
	var timeInicial = new Date().getTime();
	SMDinamica(R,L);
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
	return diff1+","+diff2;
}
