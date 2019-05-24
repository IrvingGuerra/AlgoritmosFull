var g = [];    //Ganancia de los productos
var p = [];    //Peso de los productos

var wMax = 0;
var n = 0;

function generar(items,pesoMax) {
    wMax = pesoMax;
    n = items;
    g = mergeSortMethodDes(generarGanancia(n));//Generamos la ganacia de cada producto
    p = mergeSortMethodAsc(generarPeso(n));//Se generan los pesos de los productos
    //Ingresamos 0 iniciales
    g[0] = 0; p[0] = 0; 
    console.log(g);
    console.log(p);
    console.log(kapsackFuerzaBruta(g,p,n));
}

function kapsackFuerzaBruta(g,p,max) {
    if (true) {

    }


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