var arrayGenerado = [];

function generar(cant) { 
	var cantidad = cant;
	arrayGenerado = [];
	for (i=0;i<cantidad;++i) arrayGenerado[i]=getAleatorio(-100,100)/100;
	var arrayTexto = arrayGenerado.toString().replace(/,/g, ', ');
	$('#arrayGenerado').html('');
	$('#arrayGenerado').html("<p>Array generado: "+arrayTexto+"</p>");
	$('#btnCalcularTransformadas').show();
} 

function calcularTransformadas() {
	var timeInicial = new Date().getTime(); 
	$('#resultadoDiscreto').append("<strong>Discreta</strong><br>");
	transformadaDiscreta(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff1 = (timeFinal - timeInicial)/1000;
	var timeInicial = new Date().getTime();
	$('#resultadoRapido').append("<strong>Rapida</strong><br>");
	transformadaRapida(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
	$('#resultadoDiscretoTime').html("<p>Tiempo transcurrido: "+diff1+" ms</p>");
	$('#resultadoRapidoTime').html("<p>Tiempo transcurrido: "+diff2+" ms</p>");
}

//http://www.escuelasuperiordeaudio.com.ve/articles/dtffinalA.pdf

function transformadaDiscreta(array) { //Se aplica unicamente la formula Discreta de Fourier
	var muestreoResultadoComplejo = new Array(array.length);
	var muestreoResultado = new Array(array.length);
	var N = array.length;
	var PI = Math.PI;
	var euler = new Array(2); //Real e Imaginario
	var x = 0;
	//console.log("Transformada Discreta: ");
	for (var i = 0; i < array.length; i++) {
		//El muestreoResultadoComplejo quedara en Real e Imaginario
 		muestreoResultadoComplejo[i] = new Array(2);
 		muestreoResultadoComplejo[i][0] = 0;
 		muestreoResultadoComplejo[i][1] = 0;
 		for (var j = 0; j < array.length; j++) {
 			x = -1*(2*PI*i*j) / N;
			euler[0] = Math.cos(x); //REAL
			euler[1] = Math.sin(x); //IMAGINARIO
 			muestreoResultadoComplejo[i][0] += parseFloat(array[j]*euler[0]); //REAL
 			muestreoResultadoComplejo[i][1] += parseFloat(array[j]*euler[1]); //IMAGINARIO
 		}
 		muestreoResultado[i] = Math.sqrt(Math.pow(muestreoResultadoComplejo[i][0],2)+Math.pow(muestreoResultadoComplejo[i][1],2));
 		//console.log(muestreoResultadoComplejo[i]);
 		//console.log(muestreoResultado[i]);
 		$('#resultadoDiscreto').append("<strong style='color:green'>"+muestreoResultadoComplejo[i][0]+"</strong> + "
 									  +"<strong style='color:red'>"+muestreoResultadoComplejo[i][1]+"i</strong> => Modulo: "+muestreoResultado[i]+" <br>");
	}
}


function transformadaRapida(array) {
	//Acomodamos el array
	array = acomodar(array);
	//Declaramos variables
	var w = new Array(array.length);
	var N = array.length;
	var PI = Math.PI;
	var euler = new Array(2); //Real e Imaginario

	//Hacemos la formula
	x = -1*(2*PI) / N;
	euler[0] = Math.cos(x); //REAL
	euler[1] = Math.sin(x); //IMAGINARIO con la i

	//Comenzamos a llenar los valores de w
	for (var i = 0; i < N; i++) {
		w[i] = new Array(2);
		if (i==0) { //Primera posicion
			w[i][0] = 1; //REAL
 			w[i][1] = 0; //IMAGINARIO
		}else{
			w[i][0] = Math.pow(euler[0],i);
			w[i][1] = Math.pow(euler[1],i);
		}
	}

	//Declaramos nuevas variables
	var n = 1;
	var a = N/2;

	var temp1 = new Array(N);
	var temp2 = new Array(N);
	var muestreoResultado = new Array(N);

	var arrayR = new Array(N);

	for (var i = 0; i < N; i++) {
		arrayR[i] = new Array(2);
		arrayR[i][0] = 0;
		arrayR[i][1] = 0;
	}

	for (var i = 0; i < (Math.log(N)/Math.log(2)); i++) { //Entramos la cantidad de mariposas
		for (var j = 0; j < N; j++) { //Aqui es donde resuelve la transformada de 2 puntos
			if (!(j & n)) {
				temp1[j] = new Array(2);
				temp2[j] = new Array(2);
				arrayR[j] = new Array(2);

				temp1[j][0] = array[j]; //Posicion real unicamente
				temp1[j][1] = 0;

				temp2[j][0] = w[(j*a) % (n*a)][0] * array[j+n];
				temp2[j][1] = w[(j*a) % (n*a)][1] * array[j+n];

				arrayR[j][0] = parseFloat(temp1[j][0]) + parseFloat(temp2[j][0]);
				arrayR[j][1] = parseFloat(temp1[j][1]) + parseFloat(temp2[j][1]);

				arrayR[j+n][0] = parseFloat(temp1[j][0]) - parseFloat(temp2[j][0]);
				arrayR[j+n][1] = parseFloat(temp1[j][1]) - parseFloat(temp2[j][1]);

			}
			
		}
		n *= 2;
		a = a/2;
	}

	arrayR = acomodar(arrayR);

	for (var i = 0; i < N; i++) {

		muestreoResultado[i] = Math.sqrt(Math.pow(arrayR[i][0],2)+Math.pow(arrayR[i][1],2));
					
		$('#resultadoRapido').append("<strong style='color:green'>"+arrayR[i][0]+"</strong> + "
 		+"<strong style='color:red'>"+arrayR[i][1]+"i</strong> => Modulo: "+muestreoResultado[i]+" <br>");
		
	}
	

}


function acomodar(array) {
	var longitudBinario = Math.log(array.length)/Math.log(2);
	var arrayFinal = new Array(array.length);
	var newBinary = '';
	for (var i = 0; i < array.length; i++) {
		newBinary = (i).toString(2);
		newBinary = addCeros(newBinary,newBinary.length,longitudBinario);
		//Ahora, invertimos nuestro binario, y ese valor sera el que se ingresara en el arreglo
		newBinary = newBinary.split(""); 
		newBinary = newBinary.reverse(); 
		newBinary = newBinary.join("");
		var posicion = parseInt(newBinary, 2);
		arrayFinal[i] = array[posicion];
	}
	return arrayFinal;
}

function addCeros(cadena,tamI,tamF) {
	var tam = tamF-tamI;
	cadena = cadena.split(""); 
	cadena = cadena.reverse(); 
	cadena = cadena.join("");
	for (var i = 0; i < tam; i++) {
		cadena+="0";
	}
	cadena = cadena.split(""); 
	cadena = cadena.reverse(); 
	cadena = cadena.join("");
	return cadena;
}

function getAleatorio(minimo,maximo){
	return Math.round(Math.random() * (maximo - minimo) + minimo);
}



function graficar() {
	generar(128);	
	var times128 = justDoAlgorithm().split(",");
	generar(256);	
	var times256 = justDoAlgorithm().split(",");
	generar(512);	
	var times512 = justDoAlgorithm().split(",");
	generar(1024);	
	var times1024 = justDoAlgorithm().split(",");
	generar(2048);	
	var times2048 = justDoAlgorithm().split(",");
	generar(4096);	
	var times4096 = justDoAlgorithm().split(",");
	generar(8192);	
	var times8192 = justDoAlgorithm().split(",");
	generar(16384);	
	var times16384 = justDoAlgorithm().split(",");

	$("#graficas").show();
	new Morris.Line({
	  element: 'graficas',
	  data: [
	    { second: '128', value: times128[0] , value2: times128[1]},
	    { second: '256', value: times256[0] , value2: times256[1]},
	    { second: '512', value: times512[0] , value2: times512[1]},
	    { second: '1024', value: times1024[0] , value2: times1024[1]},
	    { second: '2048', value: times2048[0] , value2: times2048[1]},
	    { second: '4096', value: times4096[0] , value2: times4096[1]},
	    { second: '8192', value: times8192[0] , value2: times8192[1]},
	    { second: '16384', value: times16384[0] , value2: times16384[1]}
	  ],
	  xkey: 'second',
	  ykeys: ['value', 'value2'],
	  labels: ['Discreta', 'Rapida'],
	  parseTime: false,
	  resize: true,
	  lineWidth: 1,
	  lineColors: ['red','blue']
	});
}


function justDoAlgorithm() {
	var timeInicial = new Date().getTime(); 
	transformadaDiscreta(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff1 = (timeFinal - timeInicial)/1000;
	var timeInicial = new Date().getTime();
	transformadaRapida(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
	return diff1+","+diff2;
}










