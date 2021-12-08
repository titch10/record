
//const socket =io()
//const path=require('path')
//const root=path.join(__dirname,'../public')

var click = false
var moving_mouse=false
var x_position =0
var y_position =0
var previous_position=null
var color = 'white'
var texto
var contador=0
const users=document.getElementById('users')
const width = window.innerWidth
const height = window.innerHeight
var aux=true;

function habilitar() {
     contador++;
     texto = document.getElementById("num-int");
     if(contador<6)
     {
        document.getElementById("name"+contador).style.display ='';  
        texto.placeholder = contador
     }else{
        texto.placeholder = "Llegaste al limite"
     }
   
}
function habilitarEliminar() {
    var boton = document.getElementById("boton1");
       if(boton.disabled==true)
       {
        boton.disabled = false;   
       }else{
           boton.disabled= true;
       }
  
}
function mostrar() {
    if (aux) {
        document.getElementById('cambio').style.background = "#333"
        aux = false
    }
    else {
        document.getElementById('cambio').style.background = "#eee"
        aux = true
    }

}
 function retraso(){
    
    document.getElementById("div1").style.display ='';
}
//setTimeout(function(){
    //var parrafo = document.getElementById("parrafo");
   
    //var textod = texto[contador]
    
   // parrafo.innerHTML = textod
   // contador++
//}, 1000 * 10);
   


$(function (){
    var audio =$('audio');

    function cargarCanciones(){
        $.ajax({
            url:'/canciones'
        }).done(function(canciones){
            var lista= $('.lista-canciones');
            lista.empty();
            canciones.forEach(function (cancion) {
                var nuevoElemento = $('<li class="cancion">'+cancion.nombre+'</li>')
                nuevoElemento
                .on('click',cancion,play)
                .appendTo(lista);
            })
        }).fail(function(){
            alert('no pudo cargar canciones');
        })
    }
        
      function play(evento){
          audio[0].pause();
          audio.attr('src','/canciones/'+evento.data.nombre);
          audio[0].play();
      }
    cargarCanciones();
 });
/*
function prueba(){
    var value1=document.getElementById("locacion").value;
    var r1=document.getElementById("optionsRadios1");
    var r2=document.getElementById("optionsRadios2");
    var r3=document.getElementById("optionsRadios3");
    
    var c1=document.forms["myform"]["chbx1"].checked;
    var c2=document.forms["myform"]["chbx2"].checked;
    var c3=document.forms["myform"]["chbx3"].checked;
    var c4=document.forms["myform"]["chbx4"].checked;

    
    if(c1==false && c2==false && c3==false && c4==false){
        var aux1="0000";
    }else if(c1==false && c2==false && c3==false && c4==true){
        var aux1="0001";
    }else if(c1==false && c2==false && c3==true && c4==false){
        var aux1="0010";
    }else if(c1==false && c2==false && c3==true && c4==true){
        var aux1="0011";
    }else if(c1==false && c2==true && c3==false && c4==false){
        var aux1="0100";
    }else if(c1==false && c2==true && c3==false && c4==true){
        var aux1="0101";
    }else if(c1==false && c2==true && c3==true && c4==false){
        var aux1="0110";
    }else if(c1==false && c2==true && c3==true && c4==true){
        var aux1="0111";
    }else if(c1==true && c2==false && c3==false && c4==false){
        var aux1="1000";
    }else if(c1==true && c2==false && c3==false && c4==true){
        var aux1="1001";
    }else if(c1==true && c2==false && c3==true && c4==false){
        var aux1="1010";
    }else if(c1==true && c2==false && c3==true && c4==true){
        var aux1="1011";
    }else if(c1==true && c2==true && c3==false && c4==false){
        var aux1="1100";
    }else if(c1==true && c2==true && c3==false && c4==true){
        var aux1="1101";
    }else if(c1==true && c2==true && c3==true && c4==false){
        var aux1="1110";
    }else if(c1==true && c2==true && c3==true && c4==true){
        var aux1="1111";
    }else
    {
        var aux1="no se"
    }

    if(r1.checked==true)
    {
        alert("primera opcion")
    }else if(r2.checked==true){
        alert("segunda opcion")
    }else if(r3.checked==true){
        alert("tercera opcion")
    }else{
        alert('ha ocurrido un error');
    }


    
}*/


