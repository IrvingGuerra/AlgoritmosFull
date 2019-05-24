var g = [];    //Ganancia de los productos
var p = [];    //Peso de los productos

var wMax = 0;
var n = 0;

function generar(items,pesoMax) { 
    wMax = pesoMax;
    n = items;
    g = mergeSortMethodDes(generarGanancia(n));//Generamos la ganancia de cada producto
    p = mergeSortMethodAsc(generarPeso(n));//Se generan los pesos de los productos
    //Ingresamos 0 iniciales
    g[0] = 0; p[0] = 0; 
    var arrayTextoG = g.toString().replace(/,/g, ', ');
    var arrayTextoP = p.toString().replace(/,/g, ', ');
    $('#ganancias').html("Gananancias= "+arrayTextoG);
    $('#pesos').html("Pesos= "+arrayTextoP);
    $('#btnCalcular').show();

    //console.log(kapsackFuerzaBruta(g,p,n));
}

function calcular() {
    
    var timeInicial = new Date().getTime(); 
    var rDinamico = kapsackDinamico(g,p,wMax);
    $('#resultadoDinamico').html("<strong>Dinamico: </strong><br>"+
        "Ganancia de: " + rDinamico[0] +", con los objetos de pesos: " + rDinamico[1].toString().replace(/,/g, ', ')
        );
    var timeFinal = new Date().getTime();
    var diff1 = (timeFinal - timeInicial)/1000;
    $('#resultadoDinamicoTime').html("<p>Tiempo transcurrido: "+diff1+" ms</p>");


    if (n<=18) {
        var timeInicial = new Date().getTime(); 
        var rFuerza = kapsackFuerzaBruta(g,p,wMax);
        $('#resultadoFuerza').html("<strong>Fuerza Bruta: </strong><br>"+
            "Ganancia de: " + rFuerza[0] +", con el array en: " + rFuerza[1]
            );
        var timeFinal = new Date().getTime();
        var diff2 = (timeFinal - timeInicial)/1000;
        $('#resultadoFuerzaTime').html("<p>Tiempo transcurrido: "+diff2+" ms</p>");
    } 
}

//console.log(kapsackDinamico([0,2,3,0.1],[0,10,2,0.5],8));

function kapsackFuerzaBruta(g,p,max) {
    //Tenemos que recorrer todos las posibles soluciones con 2^n
    //donde n, es la cantidad de objetos
    var n = g.length-1;
    var g = g.splice(1,n+1);
    var p = p.splice(1,n+1);

    var resultPesos = new Array(Math.pow(2,n)).fill(0);
    var resultGanancias = new Array(Math.pow(2,n)).fill(0);

    for (var i = 0; i < Math.pow(2,n); i++) {
        var binario = i.toString(2);
        binario = addCeros(binario,binario.length,n);
        var array = binario.split("");
        for (var j = 0; j < array.length; j++) {
            resultPesos[i] += p[j]*array[j];
            resultGanancias[i] += g[j]*array[j];
        }
    }
    //Ya llenos, escojemos al ganador mientras su peso este bien
    var ok = false;
    while(ok == false){
        maximo = 0;
        indice = 0;
        for(var i = 0; i < Math.pow(2,n) ; i++){
            if(maximo < resultGanancias[i]){
                maximo = resultGanancias[i];
                indice = i;
            }
        }
        if (resultPesos[indice]<=max) {
            ok = true;
        }else{
            //Ponemos el valor a 0 y volvemos a buscar
            resultGanancias[indice] = 0;
        }
    }
    return [maximo, addCeros(indice.toString(2),indice.toString(2).length,n)]
}
function kapsackDinamico(g,p,max) {
    //Creamos nuestra tabla
    var tabla = new Array(p.length);
    //Llenamos solamente fila y columna
    for (var i = 0; i < g.length; i++) {
        tabla[i] = new Array(max+1)
        tabla[i][0] = 0;
    }
    for (var i = 0; i < max+1; i++) {
        tabla[0][i] = 0;
    }
    for (var i = 1; i < p.length; i++) { //i representa la cantidad de objetos
        for (var j = 1; j <= max; j++) {
            if (p[i] <= j) { 
                //Si el peso del objeto en la posicion i, es menor a j (peso de mochila)
                var nuevoValor = tabla[parseInt(i)-1][j - p[i]] + g[i];
                var valorAnterior = tabla[parseInt(i)-1][j];
                if (nuevoValor>=valorAnterior) {
                    tabla[i][j] = tabla[parseInt(i)-1][j - p[i]] + g[i];
                }else{
                    tabla[i][j] = valorAnterior;
                }
                
            }else{
                //Se le asigna el resultado superior
                tabla[i][j] = tabla[parseInt(i)-1][j];
            }
        }   
    }
    var x = [];     //Vector solucion 
    var j = max;
    for (var i = p.length-1; i > 0; i--) {
        if (tabla[i][j] != tabla[parseInt(i)-1][j]) {
            x.push(p[i]);
            j = j - p[i];
        }else{

        }
    }
    return[tabla[p.length-1][max], x]
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
        { second: '18', value: times18[0] , value2: times18[1]}
      ],
      xkey: 'second',
      ykeys: ['value', 'value2'],
      labels: ['Dinamico', 'Fuerza Bruta'],
      parseTime: false,
      resize: true,
      lineWidth: 1,
      lineColors: ['red','blue']
    });
}

function justDoAlgorithm() {
    var timeInicial = new Date().getTime(); 
    kapsackDinamico(g,p,wMax);
    var timeFinal = new Date().getTime();
    var diff1 = (timeFinal - timeInicial)/1000;
    var timeInicial = new Date().getTime();
    kapsackFuerzaBruta(g,p,wMax);
    var timeFinal = new Date().getTime();
    var diff2 = (timeFinal - timeInicial)/1000;
    return diff1+","+diff2;
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