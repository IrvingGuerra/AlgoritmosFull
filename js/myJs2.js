var numero1 = [];
var numero2 = []; 
function generar(cant) {  
	var cantidad = cant;
	numero1 = [];
	for (i=0;i<cantidad;++i) numero1[i]=i;
	numero1 = generarNumerosIntoArray(numero1);
	var arrayTexto = numero1.toString().replace(/,/g, ' ');
	$('#numero1').html('');
	$('#numero1').html("<p>Numero 1: "+arrayTexto+"</p>");
	numero2 = [];
	for (i=0;i<cantidad;++i) numero2[i]=i;
	numero2 = generarNumerosIntoArray(numero2);
	var arrayTexto = numero2.toString().replace(/,/g, ' ');
	$('#numero2').html('');
	$('#numero2').html("<p>Numero 2: "+arrayTexto+"</p>");
	$('#btnMultiplicar').show();

}
function generarNumerosIntoArray(array) {
	var tam = array.length;
	for(var i=0 ; i<tam ; i++){
		array[i] = Math.floor(Math.random() * (10));
	}
	return array;
}
function multiplicar() {
	
	var timeInicial = new Date().getTime();
	var resultadoOrdinario = quitarFirstCeros(multiplica(numero1,numero2));
	var timeFinal = new Date().getTime();
	var diff1 = (timeFinal - timeInicial)/1000;
	var arrayTexto = resultadoOrdinario.toString().replace(/,/g, ' ');
	$('#resultadoOrdinario').html('');
	$('#resultadoOrdinario').html("<p>Resultado Ordinario: "+arrayTexto+"</p>");

	var timeInicial = new Date().getTime();
	var resultadoKaratsuba = quitarFirstCeros(karatSubaClean(numero1.reverse(),numero2.reverse()));
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
	var arrayTexto = resultadoKaratsuba.toString().replace(/,/g, ' ');
	$('#resultadoKaratsuba').html('');
	$('#resultadoKaratsuba').html("<p>Metodo Karatsuba: "+arrayTexto+"</p>");
	$('#resultadoKaratsubaTime').html("<p>Tiempo transcurrido: "+diff1+" ms</p>");
	$('#resultadoOrdinarioTime').html("<p>Tiempo transcurrido: "+diff2+" ms</p>");
	return diff1+","+diff2;

}

function multiplica(numero1, numero2){
	numero1 = numero1.reverse();
	numero2 = numero2.reverse();
	var tam = numero1.length;
	var tamFull = tam*2;
	var num = 0;
	var residuo = 0;
	var division = 0;

	var sumas = new Array (tam);
	for (var i = 0; i < tam; i++) {
		sumas[i] = new Array (tamFull);
		for (var j = 0; j < tamFull; j++) {
			num = numero2[i]*numero1[j];
			if(isNaN(num)) num=0;
			num+=division;
			division = Math.floor(num / 10);
			residuo = num % 10;
			sumas[i][j] =  residuo;
		}
		sumas[i] = shiftArrayToLeft(sumas[i],i);
		sumas[i] = sumas[i] .reverse();
		//console.log(sumas[i]);
	}
	var resultadoFinal = new Array(tamFull);
	num = 0;
	residuo = 0;
	division = 0;
	for (var j = tamFull-1; j >=0 ; j--) {
		for (var i = 0; i < tam; i++) {
			num += sumas[i][j];
		}
		num += division;
		division = Math.floor(num / 10);
		residuo = num % 10;
		resultadoFinal[j] = residuo;
		num = 0
	}
	//console.log("<br>",resultadoFinal);
	return resultadoFinal;
}
function shiftArrayToLeft(arr, places) {
    for (var i = 0; i < places; i++) {
        arr.unshift(arr.pop());
    }
    return arr;
}

function karatSubaClean(n1,n2) {
	var tam = n1.length;
	var tam2 = n2.length;
	//ANTES QUE TODO IGUALAMOS LOS ARRAYS
	if (tam<tam2) {
		n1 = addCerosIzquierda(n1,tam2-tam);
		tam = n1.length;
	}else if(tam2<tam){
		n2 = addCerosIzquierda(n2,tam-tam2);
		tam2 = n2.length;
	}
	//primero haremos potencia de 2 a n1
	var logNatural = Math.log(tam)/Math.log(2);
	if(!Number.isInteger(logNatural)){
		n1 = hacerPotencia(n1,Math.ceil(logNatural));
		n2 = hacerPotencia(n2,Math.ceil(logNatural));
		var tam = Math.pow(2,Math.ceil(logNatural));
	}
	if (tam == 1) {
		return multiplica(n1,n2);
	}
	//Obtenemos x1
	var x1aux = n1.toString()+",";
	var x1String = x1aux.substring(0,(x1aux.length/2)-1);
	var x1 = x1String.split(",");
	//Obtenemos x2
	var x0aux = n1.toString()+",";
	var x0String = x0aux.substring(x1aux.length/2,(x1aux.length)-1);
	var x0 = x0String.split(",");
	//Obtenemos y1
	var y1aux = n2.toString()+",";
	var y1String = y1aux.substring(0,(y1aux.length/2)-1);
	var y1 = y1String.split(",");
	//Obtenemos y2
	var y0aux = n2.toString()+",";
	var y0String = y0aux.substring(y0aux.length/2,(y0aux.length)-1);
	var y0 = y0String.split(",");

	var z2 = karatSubaClean(x1,y1);
	var z0 = karatSubaClean(x0,y0);
	var z1 = restaArrays(restaArrays(karatSubaClean(sumaArrays(x1,x0),sumaArrays(y1,y0)),z2),z0);

	var resultado = sumaArrays(sumaArrays(addCeros(z2,tam),addCeros(z1,tam/2)),z0);
	return resultado;

}

function myKaratSuba(n1,n2) { //Recibe arrays
	var tam = n1.length;
	var tam2 = n2.length;
	//ANTES QUE TODO IGUALAMOS LOS ARRAYS
	if (tam<tam2) {
		n1 = addCerosIzquierda(n1,tam2-tam);
		tam = n1.length;
	}else if(tam2<tam){
		n2 = addCerosIzquierda(n2,tam-tam2);
		tam2 = n2.length;
	}
	//primero haremos potencia de 2 a n1
	var logNatural = Math.log(tam)/Math.log(2);
	if(!Number.isInteger(logNatural)){
		n1 = hacerPotencia(n1,Math.ceil(logNatural));
		n2 = hacerPotencia(n2,Math.ceil(logNatural));
		var tam = Math.pow(2,Math.ceil(logNatural));
	}
	if (tam == 1) {
		return multiplica(n1,n2);
	}
	//Obtenemos x1
	var x1aux = n1.toString()+",";
	var x1String = x1aux.substring(0,(x1aux.length/2)-1);
	var x1 = x1String.split(",");
	//Obtenemos x2
	var x0aux = n1.toString()+",";
	var x0String = x0aux.substring(x1aux.length/2,(x1aux.length)-1);
	var x0 = x0String.split(",");
	//Obtenemos y1
	var y1aux = n2.toString()+",";
	var y1String = y1aux.substring(0,(y1aux.length/2)-1);
	var y1 = y1String.split(",");
	//Obtenemos y2
	var y0aux = n2.toString()+",";
	var y0String = y0aux.substring(y0aux.length/2,(y0aux.length)-1);
	var y0 = y0String.split(",");

	var x1y1 = myKaratSuba(x1,y1);
	var x0y0 = myKaratSuba(x0,y0);

	var x1x0 = sumaArrays(x1,x0);

	var y1y0 = sumaArrays(y1,y0);

	var xy = myKaratSuba(x1x0,y1y0);

	var xyNuevo = restaArrays(xy,x1y1);

	var xyLast = restaArrays(xyNuevo,x0y0);


	var r1 = addCeros(x1y1,tam);
	var r2 = addCeros(xyLast,tam/2);

	var res = sumaArrays(r1,r2);
	var resFinal = sumaArrays(res,x0y0);
	return resFinal;
}

function restaArrays(numero1,numero2) {
	var tam = numero1.length;
	var tam2 = numero2.length;
	//ANTES QUE TODO IGUALAMOS LOS ARRAYS
	if (tam<tam2) {
		numero1 = addCerosIzquierda(numero1,tam2-tam);
		tam = numero1.length;
	}else if(tam2<tam){
		numero2 = addCerosIzquierda(numero2,tam-tam2);
		tam2 = numero2.length;
	}
	var resultadoFinal = new Array(tam);
	var num = 0;
	var grande = 0;
	for (var j = tam-1; j >=0 ; j--) {
		num = parseInt(numero1[j])-parseInt(numero2[j]);
		if (num<0) {
			numero1[j-1] = parseInt(numero1[j-1]) - 1;
			grande = parseInt(numero1[j])+10;
			num = grande - parseInt(numero2[j]);
		}
		resultadoFinal[j] = num;
	}
	return resultadoFinal;
}

function sumaArrays(numero1,numero2) {
	var tam = numero1.length;
	var tam2 = numero2.length;
	//ANTES QUE TODO IGUALAMOS LOS ARRAYS
	if (tam<tam2) {
		numero1 = addCerosIzquierda(numero1,tam2-tam);
		tam = numero1.length;
	}else if(tam2<tam){
		numero2 = addCerosIzquierda(numero2,tam-tam2);
		tam2 = numero2.length;
	}

	var resultadoFinal = new Array(tam+1);
	var num = 0;
	var residuo = 0;
	var division = 0;
	for (var j = tam-1; j >=0 ; j--) {
		num = parseInt(numero1[j])+parseInt(numero2[j])+division;
		if (num>9) {
			residuo = num % 10;
		}else{
			residuo = num;
		}
		resultadoFinal[j+1] = residuo;
		division = Math.floor(num / 10);
	}
	if (division==0) {
		resultadoFinal.reverse();
		resultadoFinal.pop();
		resultadoFinal.reverse();
	}else{
		resultadoFinal[0] = division;
	}
	return resultadoFinal;
}

function addCeros(array,cant){
	for (var i = 0; i < cant; i++) {
		array.push(0);
	}
	return array;
}

function hacerPotencia(array, pot) {
	var tam = array.length;
	var max = Math.pow(2,pot);
	var add = max - tam;
	return addCerosIzquierda(array,add);
}

function addCerosIzquierda(array,cant){
	array.reverse();
	for (var i = 0; i < cant; i++) {
		array.push(0);
	}
	return array.reverse();
}

function quitarFirstCeros(array) {
	var i = 0;
	while(array[i] == 0){
		array.reverse();
		array.pop();
		array.reverse();
	}
	return array;
}

function graficar(argument) {
	generar(64);	
	var times64 = multiplicar().split(",");
	generar(128);	
	var times128 = multiplicar().split(",");
	generar(256);	
	var times256 = multiplicar().split(",");
	generar(512);	
	var times512 = multiplicar().split(",");
	generar(1024);	
	var times1024 = multiplicar().split(",");
	generar(2048);	
	var times2048 = multiplicar().split(",");
	generar(4096);	
	var times4096 = multiplicar().split(",");

	$("#graficas").show();
	new Morris.Line({
	  element: 'graficas',
	  data: [
	  	{ second: '64', value: times64[0] , value2: times64[1]},
	    { second: '128', value: times128[0] , value2: times128[1]},
	    { second: '256', value: times256[0] , value2: times256[1]},
	    { second: '512', value: times512[0] , value2: times512[1]},
	    { second: '1024', value: times1024[0] , value2: times1024[1]},
	    { second: '2048', value: times2048[0] , value2: times2048[1]},
	    { second: '4096', value: times4096[0] , value2: times4096[1]}
	  ],
	  xkey: 'second',
	  ykeys: ['value', 'value2'],
	  labels: ['Karatsuba', 'Ordinario'],
	  parseTime: false,
	  resize: true,
	  lineWidth: 1,
	  lineColors: ['red','blue']
	});

}