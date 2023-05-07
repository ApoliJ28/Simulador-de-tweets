//Variables
const listaTweets = document.getElementById('lista-tweets');

//Event Listener

eventListeners();

function eventListeners(){
    //Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);
    //Borrar tweets
    listaTweets.addEventListener('click',borrarTweet);
    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo)
}

//Funciones

//Añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    //leer el valor del text area
    const tweet = document.getElementById('tweet').value;

    //Crear boton de eleminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //Añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //Añade el tweet
    listaTweets.appendChild(li);
    //Añadir a local storage
    agregarTweetLocalStorage(tweet);
}

//Elimina el tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove()
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

//Mostrar datos de LocalStorage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetLocalStorage();

    tweets.forEach( function(tweet){
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);
    });
}

//Agrega el tweet a local storage
function agregarTweetLocalStorage(tweet){

    let tweets;
    tweets = obtenerTweetLocalStorage();
    
    //Añadir el nuevo tweet
    tweets.push(tweet); //Agrega el tweet al final del arreglo

    //Convertir de String a arreglo para local storage
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

//Comprobar que hay elementos en local storage, retorna un arreglo
function obtenerTweetLocalStorage(){
    let tweets;
    //Revisamos los valores de local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Eliminar tweet de local Storage
function borrarTweetLocalStorage(tweet){
    let tweets,tweetBorrar;

    tweetBorrar = tweet.substring(0, tweet.length - 1); //Para eliminar la "X"

    tweets = obtenerTweetLocalStorage();

    tweets.forEach(function(tweet, index){ //Te da el indice del arreglo
        if(!tweetSinEspacios(tweet.split('\n')).indexOf(tweetBorrar)){ //Para que borre todos los tweets aunque tenga espacios
            tweets.splice(index, 1); //Elimina solo un tweet y el que queremos
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Funcion retorna tweet sin espacios, para comparar
function tweetSinEspacios(tweetArray){
    let tweetSinEspacios='';
    tweetArray.forEach(function(tweet){
        tweetSinEspacios = tweetSinEspacios + tweet;
    });
    return tweetSinEspacios;
}