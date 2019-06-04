var g = [];    //Ganancia de los productos
var p = [];    //Peso de los productos
var u = [];    //Ganancia unitaria

var wMax = 0; 
var n = 0;

function generar(items,pesoMax) { 
    wMax = pesoMax;
    n = items;
    g = mergeSortMethodDes(generarGanancia(n-1));//Generamos la ganancia de cada producto
    p = mergeSortMethodAsc(generarPeso(n-1));//Se generan los pesos de los productos
    //Sacamos precios unitarios.
    for (var i = 0; i < n; i++) {
        u[i] = parseFloat((g[i] / p[i]).toFixed(2));
    }

    var arrayTextoG = g.toString().replace(/,/g, ', ');
    var arrayTextoP = p.toString().replace(/,/g, ', ');
    var arrayTextoU = u.toString().replace(/,/g, ', ');

    $('#ganancias').html("Gananancias= "+arrayTextoG);
    $('#pesos').html("Pesos= "+arrayTextoP);
    $('#gananciasU').html("Gananancias Unitarias= "+arrayTextoU);

    //Las ganancias unitarias ya estan ordenadas
    $('#btnCalcular').show();
    //console.log(kapsackFuerzaBruta(g,p,n));
}

function calcular() {
    var timeInicial = new Date().getTime(); 
    algoritmoVoraz(p);
    var timeFinal = new Date().getTime();
    var diff1 = (timeFinal - timeInicial)/1000;
    $('#resultadoVorazTime').html("<p>Tiempo transcurrido: "+diff1+" ms</p>");
    if (n<=10) {
        var timeInicial = new Date().getTime(); 
        algoritmoFuerzaBruta(p);
        var timeFinal = new Date().getTime();
        var diff2 = (timeFinal - timeInicial)/1000;
        $('#resultadoFuerzaTime').html("<p>Tiempo transcurrido: "+diff2+" ms</p>");
    }
}


function algoritmoVoraz(){
    //Recorremos las ganancias multiplicando por unidad verificando si entra en la mochila
    var GananciaTotal = 0;
    var PesoAcumulado = 0;
    var elegidos = new Array(n).fill(0);
    var STOP = false;
    for (var i = 0; i < n; i++) {
        if (STOP == false) {
            for (var j = 0; j < p[i]; j++) {
                GananciaTotal+=u[i]*1;
                PesoAcumulado++;
                elegidos[i] = j+1;
                if (PesoAcumulado>wMax) {
                    //Significa que ya se paso
                    PesoAcumulado--;
                    GananciaTotal-=u[i]*1;
                    elegidos[i]--;
                    STOP = true;
                    break;
                }
            }
        }else{
            break;
        }
    }

    var arrayTextoElegidos = elegidos.toString().replace(/,/g, ', ');

    $('#resultadoVoraz').html("<strong style='color:red'>Voraz</strong><br><br>");
    $("#resultadoVoraz").append("<strong>Ganancia: "+GananciaTotal+", eligiendo: "+arrayTextoElegidos+"</strong>");
}

function algoritmoFuerzaBruta() {
    var array = new Array(n);
    for (i=0;i<n;++i) array[i]=i;

    //Realizamos las permutaciones
    var results = perm(array);

    var GananciaTotalFinal = 0;
    var GananciaTotal = 0;
    var PesoAcumulado = 0;
    var elegidos = [];
    var elegidosFinales = [];
    
    for (var k = 0; k < results.length; k++) {
        //Recorremos cada permutacion y calculamos el tiempo
        //result contiene los indices que usaremos para los pesos y ganancias unitarias, en ese orden
        //Recorremos el orden
        for (var i = 0; i < results[k].length; i++) {
            //Recorremos el peso total de cada orden
            for (var j = 0; j < p[results[k][i]]; j++) {
                GananciaTotal+=u[results[k][i]]*1;
                PesoAcumulado++;
                elegidos[i] = j+1;
                if (PesoAcumulado>wMax) {
                    //Significa que ya se paso
                    PesoAcumulado--;
                    GananciaTotal-=u[results[k][i]]*1;
                    elegidos[i]--;
                    break;
                }

            }
        }
        if (GananciaTotal > GananciaTotalFinal) {
            GananciaTotalFinal = GananciaTotal;
            elegidosFinales = elegidos;
        }
        GananciaTotal = 0;
        PesoAcumulado = 0;
        elegidos = [];
    }

    var arrayTextoElegidos = elegidosFinales.toString().replace(/,/g, ', ');

    $('#resultadoFuerza').html("<strong style='color:red'>Fuerza Bruta</strong><br><br>");
    $("#resultadoFuerza").append("<strong>Ganancia: "+GananciaTotalFinal+", eligiendo: "+arrayTextoElegidos+"</strong>");

}

function generarPeso(cant) {
    var max = parseInt(wMax)+1;
    var array = new Array(cant);
    for(var i=0 ; i<=cant ; i++){
        array[i] = Math.floor(Math.random() * (max));
        while(array[i] == 0){
            array[i] = Math.floor(Math.random() * (max));
        }
    }
    return array;
}
function generarGanancia(cant) {
    var array = new Array(cant);
    for(var i=0 ; i<=cant ; i++){
        array[i] = Math.floor(Math.random() * (99));
        while(array[i] == 0){
            array[i] = Math.floor(Math.random() * (99));
        }
    }
    return array;
}
function mergeSortMethodAsc(array) {
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
    return merge(mergeSortMethodAsc(left), mergeSortMethodAsc(right));
}
function mergeSortMethodDes(array) {
    return mergeSortMethodAsc(array).reverse();
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

function graficar() {
    generar(4); 
    var times4 = justDoAlgorithm().split(",");
    generar(6); 
    var times6 = justDoAlgorithm().split(",");
    generar(8); 
    var times8 = justDoAlgorithm().split(",");
    generar(10);    
    var times10 = justDoAlgorithm().split(",");  

    $("#graficas").show();
    new Morris.Line({
      element: 'graficas',
      data: [
        { second: '4', value: times4[0] , value2: times4[1]},
        { second: '6', value: times6[0] , value2: times6[1]},
        { second: '8', value: times8[0] , value2: times8[1]},
        { second: '10', value: times10[0] , value2: times10[1]}
      ],
      xkey: 'second',
      ykeys: ['value', 'value2'],
      labels: ['Voraz', 'Fuerza Bruta'],
      parseTime: false,
      resize: true,
      lineWidth: 1,
      lineColors: ['red','blue']
    });
}

function justDoAlgorithm() {
    var timeInicial = new Date().getTime(); 
    algoritmoVoraz(p);
    var timeFinal = new Date().getTime();
    var diff1 = (timeFinal - timeInicial)/1000;
    var timeInicial = new Date().getTime();
    algoritmoFuerzaBruta(p);
    var timeFinal = new Date().getTime();
    var diff2 = (timeFinal - timeInicial)/1000;
    return diff1+","+diff2;
}