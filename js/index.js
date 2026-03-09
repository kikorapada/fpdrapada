function acceptCookies(){

localStorage.setItem("cookiesAccepted","true");

document.getElementById("cookieBanner").style.display="none";

}

function declineCookies(){

document.getElementById("cookieBanner").style.display="none";

}

window.onload=function(){

if(localStorage.getItem("cookiesAccepted")){

document.getElementById("cookieBanner").style.display="none";

}

}