var cantidadSolicitada = 0;

var arrayGenerado = [];

//Array para el metodo divide y venceras
var array1 = []; 
//Array para el metodo dinamico
var array2 = [];
var costos = []; //Especial para disminuir tiempo

function generar(cant) { 
	cantidadSolicitada = cant;
	arrayGenerado = generarNumerosIntoArray(cant);
	var arrayTexto = arrayGenerado.toString().replace(/,/g, ', ');
	$('#arrayGenerado').html('');
	$('#arrayGenerado').html("<p>Array generado: "+arrayTexto+"</p>");
	$('#btnMultiplicar').show();
} 

function generarNumerosIntoArray(cant) {
	var array = new Array(cant);
	for(var i=0 ; i<cant ; i++){
		array[i] = Math.floor(Math.random() * (99));
		while(array[i] == 0){
			array[i] = Math.floor(Math.random() * (99));
		}
	}
	return array;
}

function multiplicar() {


	if (cantidadSolicitada <= 20) {
		var timeInicial = new Date().getTime(); 
		$('#resultadoDivideVenceras').html("<strong>Divide y venceras: </strong>"+
				multiplicarDivideYVenceras(arrayGenerado)
			+ "<br>");
		var timeFinal = new Date().getTime();
		var diff1 = (timeFinal - timeInicial)/1000;
		$('#resultadoDivideVencerasTime').html("<p>Tiempo transcurrido: "+diff1+" ms</p>");
	}


	var timeInicial = new Date().getTime(); 
	$('#resultadoDinamico').html("<strong>Dinamico: </strong>"+
			multiplicarDinamica(arrayGenerado)
		+ "<br>");
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
	$('#resultadoDinamicoTime').html("<p>Tiempo transcurrido: "+diff2+" ms</p>");
}


//multiplicarDivideYVenceras([30,1,40,10,25]);



function multiplicarDivideYVenceras(array) {
	array1 = array;
	var costo = mul2(0,array1.length-1);
	return costo;
}
function mul2(inicio, fin) {
	if(fin-inicio < 2){ //Es una sola matriz
		return 0;
	}else if (fin-inicio == 2) { //Caso base, solo son 2 matrices
		return array1[inicio]*array1[inicio+1]*array1[inicio+2];
	}else{ //Empieza el ciclo
		var min = Infinity;
		for (var i = inicio+1; i <= fin-1; i++) {
			var c1 = mul2(inicio,i);
			var c2 = mul2(i,fin);
			var c3 = array1[inicio] * array1[i] * array1[fin];
			if (c1+c2+c3 < min) {
				min = c1+c2+c3;
			}
		}
		return min;
	}
}

//multiplicarDinamica([30,1,40,10,25]);

function multiplicarDinamica(array) {
	array2 = array;
	costos = new Array(array2.length).fill(-1).map(() => new Array(array2.length).fill(-1));
	var costo = mul2D(0,array2.length-1);
	//console.log(costos);
	return costo;
}
function mul2D(inicio, fin) {
	if(fin-inicio < 2){ //Es una sola matriz
		return costos[inicio][fin] = 0;
	}else if (fin-inicio == 2) { //Caso base, solo son 2 matrices
		if (costos[inicio][fin] == -1) {
			costos[inicio][fin] = array2[inicio]*array2[inicio+1]*array2[inicio+2];
		}
		return costos[inicio][fin];
	}else{ //Empieza el ciclo
		var min = Infinity;
		if (costos[inicio][fin]==-1) {
			for (var i = inicio+1; i <= fin-1; i++) {
				var c1 = mul2D(inicio,i);
				var c2 = mul2D(i,fin);
				var c3 = array2[inicio] * array2[i] * array2[fin];
				if (c1+c2+c3 < min) {
					min = c1+c2+c3;
					costos[inicio][fin] = min;
				}
			}
		}else{
			return costos[inicio][fin];
		}
		return min;
	}
}

function graficar() {
	generar(4);	
	var times4 = justDoAlgorithm().split(",");
	generar(6);	
	var times6 = justDoAlgorithm().split(",");
	generar(8);	
	var times8 = justDoAlgorithm().split(",");
	generar(10);	
	var times10 = justDoAlgorithm().split(",");
	generar(12);	
	var times12 = justDoAlgorithm().split(",");
	generar(14);	
	var times14 = justDoAlgorithm().split(",");
	generar(16);	
	var times16 = justDoAlgorithm().split(",");
	generar(18);	
	var times18 = justDoAlgorithm().split(",");
	generar(19);	
	var times19 = justDoAlgorithm().split(",");
	generar(20);	
	var times20 = justDoAlgorithm().split(",");
	generar(21);	
	var times21 = justDoAlgorithm().split(",");
	generar(22);	
	var times22 = justDoAlgorithm().split(",");

	$("#graficas").show();
	new Morris.Line({
	  element: 'graficas',
	  data: [
	    { second: '4', value: times4[0] , value2: times4[1]},
	    { second: '6', value: times6[0] , value2: times6[1]},
	    { second: '8', value: times8[0] , value2: times8[1]},
	    { second: '10', value: times10[0] , value2: times10[1]},
	    { second: '12', value: times12[0] , value2: times12[1]},
	    { second: '14', value: times14[0] , value2: times14[1]},
	    { second: '16', value: times16[0] , value2: times16[1]},
	    { second: '18', value: times18[0] , value2: times18[1]},
	    { second: '19', value: times19[0] , value2: times19[1]},
	    { second: '20', value: times20[0] , value2: times20[1]},
	    { second: '21', value: times21[0] , value2: times21[1]},
	    { second: '22', value: times22[0] , value2: times22[1]}
	  ],
	  xkey: 'second',
	  ykeys: ['value', 'value2'],
	  labels: ['Divide y Venceras', 'Dinamica'],
	  parseTime: false,
	  resize: true,
	  lineWidth: 1,
	  lineColors: ['red','blue']
	});
}


function justDoAlgorithm() {
	var timeInicial = new Date().getTime(); 
	multiplicarDivideYVenceras(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff1 = (timeFinal - timeInicial)/1000;
	var timeInicial = new Date().getTime();
	multiplicarDinamica(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
	return diff1+","+diff2;
}


