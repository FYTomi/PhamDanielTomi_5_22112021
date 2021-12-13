    
    //Déclaration de la variable "produitEnregistreDansLocalStorage" dans laquelle on met les keys et les values dans le localStorage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
//JSON.parse c'est pour convertir les données au format JSON ui sont dans le localStorage en objet JS
console.log(produitEnregistreDansLocalStorage);

