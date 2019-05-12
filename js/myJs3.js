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
	transformadaRapida(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
}

//http://www.escuelasuperiordeaudio.com.ve/articles/dtffinalA.pdf

function transformadaDiscreta(array) { //Se aplica unicamente la formula Discreta de Fourier
	var muestreoResultadoComplejo = new Array(array.length);
	var muestreoResultado = new Array(array.length);
	var N = array.length;
	var PI = Math.PI;
	var euler = new Array(2); //Real e Imaginario
	var x = 0;
	console.log("Transformada Discreta: ");
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
 		console.log(muestreoResultadoComplejo[i]);
 		console.log(muestreoResultado[i]);
 		$('#resultadoDiscreto').append("<strong style='color:green'>"+muestreoResultadoComplejo[i][0]+"</strong> + "
 									  +"<strong style='color:red'>"+muestreoResultadoComplejo[i][1]+"i</strong> => Modulo: "+muestreoResultado[i]+" <br>");
	}
}


function transformadaRapida(array) {
	
}

function getAleatorio(minimo,maximo){
	return Math.round(Math.random() * (maximo - minimo) + minimo);
}

















