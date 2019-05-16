var arrayGenerado = [];
function generar(cant) {
	var cantidad = cant;
	arrayGenerado = [];
	for (i=0;i<cantidad;++i) arrayGenerado[i]=i;
	arrayGenerado = generarNumerosIntoArray(arrayGenerado);
	var arrayTexto = arrayGenerado.toString().replace(/,/g, ', ');
	$('#arrayGenerado').html('');
	$('#arrayGenerado').html("<p>Array generado: "+arrayTexto+"</p>");
	$('#btnOrdenar').show();
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
function ordenar() {
	var timeInicial = new Date().getTime();
	var arrayBubbleSort = bubbleSortMethod(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff1 = (timeFinal - timeInicial)/1000;
	var arrayTexto = arrayBubbleSort.toString().replace(/,/g, ', ');
	$('#arrayOrdenadoBubble').html('');
	$('#arrayOrdenadoBubble').html("<p>Metodo Burbuja: "+arrayTexto+"</p>");
	$('#arrayOrdenadoBubbleTime').html("<p>Tiempo transcurrido: "+diff1+" ms</p>");
	var timeInicial = new Date().getTime();
	var arrayMergeSort = mergeSortMethod(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
	var arrayTexto = arrayMergeSort.toString().replace(/,/g, ', ');
	$('#arrayOrdenadoMerge').html('');
	$('#arrayOrdenadoMerge').html("<p>Metodo Merge: "+arrayTexto+"</p>");
	$('#arrayOrdenadoMergeTime').html("<p>Tiempo transcurrido: "+diff2+" ms</p>");
	return diff1+","+diff2;
}
function bubbleSortMethod(array) {
	const tam = array.length;
	var value = 0;
	var aux = 0;
	for (var i=0 ; i<tam; i++) {
		for (var j=0 ; j<tam; j++) {
			if (array[j] > array[j+1]) {
				//[ array[j],array[j+1] ] = [ array[j+1],array[j] ];	
				aux = array[j];
				array[j] = array[j+1];
				array[j+1] = aux;
			}
			value++;
		}
	}
	return array;
}
function mergeSortMethod(array) {

	if (array.length < 2) {
    	return array;
  	}
  	const middle = parseInt(array.length / 2) | 0;
  	const left = array.slice(0, middle);
  	const right = array.slice(middle);

  	const merge = (left, right) => {
	    const result = [];
	    let il = ir = 0;

	    while (il < left.length && ir < right.length) {
	      result.push( (left[il] < right[ir]) ? left[il++] : right[ir++] );
	    }

	    return [...result, ...left.slice(il), ...right.slice(ir)];
	}

	return merge(mergeSortMethod(left), mergeSortMethod(right));
}
function graficar() {
	generar(100);	
	var times100 = justOrdenar().split(",");
	generar(1000);	
	var times1000 = justOrdenar().split(",");
	generar(10000);	
	var times10000 = justOrdenar().split(",");
	generar(20000);	
	var times20000 = justOrdenar().split(",");
	generar(30000);	
	var times30000 = justOrdenar().split(",");
	generar(40000);	
	var times40000 = justOrdenar().split(",");
	generar(50000);	
	var times50000 = justOrdenar().split(",");
	generar(60000);	
	var times60000 = justOrdenar().split(",");
	generar(70000);	
	var times70000 = justOrdenar().split(",");
	generar(80000);	
	var times80000 = justOrdenar().split(",");
	generar(90000);	
	var times90000 = justOrdenar().split(",");
	generar(100000);	
	var times100000 = justOrdenar().split(",");
	$("#graficas").show();
	new Morris.Line({
	  element: 'graficas',
	  data: [
	    { second: '100', value: times100[0] , value2: times100[1]},
	    { second: '1000', value: times1000[0] , value2: times1000[1]},
	    { second: '10000', value: times10000[0] , value2: times10000[1]},
	    { second: '20000', value: times20000[0] , value2: times20000[1]},
	    { second: '30000', value: times30000[0] , value2: times30000[1]},
	    { second: '40000', value: times40000[0] , value2: times40000[1]},
	    { second: '50000', value: times50000[0] , value2: times50000[1]},
	    { second: '60000', value: times60000[0] , value2: times60000[1]},
	    { second: '70000', value: times70000[0] , value2: times70000[1]},
	    { second: '80000', value: times80000[0] , value2: times80000[1]},
	    { second: '90000', value: times90000[0] , value2: times90000[1]},
	    { second: '100000', value: times100000[0] , value2: times100000[1]}
	  ],
	  xkey: 'second',
	  ykeys: ['value', 'value2'],
	  labels: ['Burbuja', 'Merge'],
	  parseTime: false,
	  resize: true,
	  lineWidth: 1,
	  lineColors: ['red','blue']
	});
}
function justOrdenar() {
	var timeInicial = new Date().getTime();
	var arrayBubbleSort = bubbleSortMethod(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff1 = (timeFinal - timeInicial)/1000;
	var timeInicial = new Date().getTime();
	var arrayMergeSort = mergeSortMethod(arrayGenerado);
	var timeFinal = new Date().getTime();
	var diff2 = (timeFinal - timeInicial)/1000;
	return diff1+","+diff2;
}
