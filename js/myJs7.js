var p = [];    //Procesos

var n = 0;

function generar(cantidad) {
	n = cantidad; 
	p = generarArray(cantidad-1);
	$('#procesos').html("<strong>Procesos y su tiempo: </strong>");
	for (var i = 0; i < p.length; i++) {
		$('#procesos').append("P["+i+"] = "+p[i]+", ");
	}
	$('#btnCalcular').show();
}

function calcular() {
	//Ordenamos
	var timeInicial = new Date().getTime(); 
    algoritmoVoraz(p);
    var timeFinal = new Date().getTime();
    var diff1 = (timeFinal - timeInicial)/1000;
    $('#resultadoVorazTime').html("<p>Tiempo transcurrido: "+diff1+" ms</p>");

	var timeInicial = new Date().getTime(); 
    algoritmoFuerzaBruta(p);
    var timeFinal = new Date().getTime();
    var diff2 = (timeFinal - timeInicial)/1000;
    $('#resultadoFuerzaTime').html("<p>Tiempo transcurrido: "+diff2+" ms</p>");

}

function algoritmoFuerzaBruta(array) {
	var results = [];
	//Obtenemos todas las permutaciones posibles
	var results = perm(array);
	var vector = [];

	var time = Infinity;
	for (var i = 0; i < results.length; i++) {
		//Recorremos cada permutacion y calculamos el tiempo
		var arrayTiemposFinales = [];
		var newTime = 0;
		for (var j = 0; j < results[i].length-1; j++) {
			newTime += results[i][j];
			arrayTiemposFinales[j] = newTime;
		}
		newTime = 0;
		for (var j = 0; j < arrayTiemposFinales.length; j++) {
			newTime+=arrayTiemposFinales[j];
		}
		if (newTime<time) {
			time = newTime;
			vector = arrayTiemposFinales;
		}
	}
	var arrayTexto = vector.toString().replace(/,/g, ', ');
	$('#resultadoFuerzaProcesos').html("<strong>Procesos ordenados: </strong> 0, "+arrayTexto);
	$('#resultadoFuerzaProcesosTiempo').html("<strong>Tiempo total: </strong>"+time);
}

function algoritmoVoraz(p) {
	var tiempoFinalVoraz = 0;
	var arrayTiemposFinales = [];
	var pOrdenado = sortWithIndeces(p);
	$('#resultadoVorazProcesos').html("<strong>Procesos ordenados: </strong>");
	for (var i = 0; i < pOrdenado.sortIndices.length; i++) {
		if (i == 0) {
			arrayTiemposFinales[i] = 0;
			$('#resultadoVorazProcesos').append("P["+pOrdenado.sortIndices[i]+"] = 0, ");
		}else{
			tiempoFinalVoraz += pOrdenado[i-1];
			arrayTiemposFinales[i] = tiempoFinalVoraz;
			$('#resultadoVorazProcesos').append("P["+pOrdenado.sortIndices[i]+"] = "+tiempoFinalVoraz+", ");
		}
	}
	var time = 0;
	for (var i = 0; i < arrayTiemposFinales.length; i++) {
		time+=arrayTiemposFinales[i];
	}
	$('#resultadoVorazProcesosTiempo').html("<strong>Tiempo total: </strong>"+time);
}

function generarArray(cant) {
    var array = new Array(cant);
    for(var i=0 ; i<=cant ; i++){
        array[i] = Math.floor(Math.random() * (199));
        while(array[i] == 0){
            array[i] = Math.floor(Math.random() * (199));
        }
    }
    return array;
}

function sortWithIndeces(toSort) {
	for (var i = 0; i < toSort.length; i++) {
	toSort[i] = [toSort[i], i];
	}
	toSort.sort(function(left, right) {
	return left[0] < right[0] ? -1 : 1;
	});
	toSort.sortIndices = [];
	for (var j = 0; j < toSort.length; j++) {
	toSort.sortIndices.push(toSort[j][1]);
	toSort[j] = toSort[j][0];
	}
	return toSort;
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

function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i = i + 1) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if(!rest.length) {
      ret.push([xs[i]])
    } else {
      for(let j = 0; j < rest.length; j = j + 1) {
        ret.push([xs[i]].concat(rest[j]))
      }
    }
  }
  return ret;
}