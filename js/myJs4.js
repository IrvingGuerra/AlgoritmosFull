var arrayGenerado = [];

//Array para el metodo divide y venceras
var array1 = []; 
//Array para el metodo dinamico
var array2 = [];
var costos = []; //Especial para disminuir tiempo

function generar(cant) { 
	var cantidad = cant;
	arrayGenerado = [];
	for (i=0;i<cantidad;++i) arrayGenerado[i]=i;
	arrayGenerado = generarNumerosIntoArray(arrayGenerado);
	var arrayTexto = arrayGenerado.toString().replace(/,/g, ', ');
	$('#arrayGenerado').html('');
	$('#arrayGenerado').html("<p>Array generado: "+arrayTexto+"</p>");
	$('#btnMultiplicar').show();
} 

function generarNumerosIntoArray(array) {
	var tmp, current, top = array.length;
	if(top) while(--top) {
	    current = Math.floor(Math.random() * (top + 1));
	    tmp = array[current];
	    array[current] = array[top];
	    array[top] = tmp;
	}
	return array;
}

function multiplicar() {
	var timeInicial = new Date().getTime(); 
	$('#resultadoDiscreto').append("<strong>Discreta</strong><br>");
	multiplicarDivideYVenceras(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff1 = (timeFinal - timeInicial)/1000;
	var timeInicial = new Date().getTime();
	multiplicarDinamica(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
}


//multiplicarDivideYVenceras([30,1,40,10,25]);



function multiplicarDivideYVenceras(array) {
	array1 = array;
	var costo = mul2(0,array1.length-1);
	console.log("El costo fue: "+costo);
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
	console.log("El costo fue: "+costo);
	console.log(costos);
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
