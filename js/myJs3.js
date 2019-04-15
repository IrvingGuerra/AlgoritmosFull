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
	}
	graficarPuntos(muestreoResultado);
}

function graficarPuntos(array) {
	var mycanvas = document.getElementById("tranformadaDiscreta");
	var contexto = mycanvas.getContext("2d");
	var X = mycanvas.width;
	var Y = mycanvas.height;
	for (var i = 0; i < array.length*20; i = i+20) {
		contexto.beginPath();	
		contexto.arc(i,array[i],2,0,(Math.PI/180)*360,true);
		contexto.strokeStyle = "red";
		contexto.fill();
		contexto.lineWidth = 1;
		contexto.stroke();
	}

}


function getAleatorio(minimo,maximo){
	return Math.round(Math.random() * (maximo - minimo) + minimo);
}

//graficaOriginal();

function graficaOriginal() {
	var mycanvas = document.getElementById("funcionOriginal");
	var contexto = mycanvas.getContext("2d");
	var cw = mycanvas.width;
	var ch = mycanvas.height;
	var cx = cw / 2;
  	var cy = ch / 2;
  	var rad = Math.PI / 180;
  	var w = cw;
	var h = 200;
	var amplitud = h / 2;
	var frecuencia = 1/100;
	var faseInicial = Math.PI/2;
	
	//Dibujamos los ejes
	contexto.moveTo(0,0);
	contexto.lineTo(0,ch);
	contexto.moveTo(0,cy);
	contexto.lineTo(cw,cy);
	contexto.lineWidth = 4;
	contexto.strokeStyle = "black";
	contexto.stroke();

	//Dibujando
	contexto.beginPath();
	contexto.moveTo(0, ch);
	for (var x = 0; x < w; x++) {
		y = Math.sin(x * frecuencia + faseInicial) * amplitud + amplitud;
		contexto.lineTo(x, y + cy/2);
	}
	contexto.lineTo(w, ch);
	contexto.lineTo(0, ch);
	contexto.stroke();
}

