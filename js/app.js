arreglo=[];
var i=0,j=0;
var iteracion; //sirve para guardar el evento de tiempo y poder pararlo
// Guardamos nuestros botones en Variables globales
var btnAdd = document.getElementById("btnAdd");
var btnOrdenar = document.getElementById("ordenar");
var btnReset = document.getElementById("reset");
var inputNumber = document.getElementById("number");

//Funcion para crear elementos
function createList(el,nameClass,text,content){
  var newItem = document.createElement(el);
      newItem.classList.add(nameClass);
  var textnode = document.createTextNode(String(text));
      newItem.appendChild(textnode);
  document.getElementById(content).appendChild(newItem);
}

function comenzar(){
	//comienza la iteracion con velocidad de 3 decimas de segundo cada iteración
	iteracion=setInterval(burbuja,300);
	//desabilitamos boton
	document.getElementById("number").disabled = true;
}

//funcion que plasma el arreglo para poder ser visualizado
function printArray(){
	//borramos el contenido del div del contenido
  document.getElementById("contenido").innerHTML= "";
	//imprimimos los elementos en forma de div
	for(init=0; init< arreglo.length;init++){
		//Indicamos los parametros de nuestra funcion
    createList("div", "bloque", arreglo[init], "contenido");
	}
}

function burbuja(){
	//recorreremos todos los elementos hasta n-1
	if(i<arreglo.length){
		//recorreremos todos los elementos hasta n-i, tomar en cuenta los ultimos no tiene caso ya que ya estan acomodados.
	    if(j<(arreglo.length-i)){
			//comparamos
			if(arreglo[j]>arreglo[j+1]){
				 //guardamos el numero mayor en el auxiliar
				 aux=arreglo[j];
				 //guardamos el numero menor en el lugar correspondiente
				 arreglo[j]=arreglo[j+1];
				 //asignamos el auxiliar en el lugar correspondiente
				 arreglo[j+1]=aux;
			}
			j++;
		}else{
			j=0;
			i++;
		}
	}else{
	    //aqui se termina el algoritmo por lo cual paramos el setInterval
		clearInterval(iteracion);
    document.getElementById("number").disabled = false;
	}
	printArray()

}

btnAdd.addEventListener("click",function(){
  var number = document.getElementById("number");
  if(number.value !== ""){
    // Agregar un objeto a nuestro array
    arreglo.push(Number(number.value))
    //Indicamos los parametros de nuestra funcion
    createList("div", "bloque", number.value, "contenido");
    //Dejamos nuestro input vacio
    number.value = "";
  }
});

btnOrdenar.addEventListener("click",function(){
  comenzar();
});

btnReset.addEventListener("click",function(){
  //Vaciamos nuestros contenido y Array
  document.getElementById("contenido").innerHTML= "";
  arreglo=[];
  i=0,j=0;
  iteracion = undefined;
});


/**** Adicionales ****/

//Detectanos la tecla Enter
document.getElementById("number").addEventListener("keypress",  function(e){
  if(e.keyCode === 13){
    btnAdd.click();
  }
});

//Restringimos que solo se ingreses números
var isValidate = function(eleToFilter, filterType){
  switch (filterType) {
    case 'numeric':
      $(eleToFilter).numeric({
        allowPlus: false,
        allowMinus: false,
        allowDecSep: false,
        allowThouSep: false,
        allowNumeric: true,
        min: 0
      });
  }
}
isValidate(inputNumber, 'numeric');
