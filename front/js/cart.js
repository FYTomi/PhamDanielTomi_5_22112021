    

//On récupére les infos stockées dans le localStorage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
    

//Sélection dans le DOM du conteneur des articles ajoutés
let cartContainer = document.getElementById("cart__items")

// Si le panier est vide : Afficher le panier est vide

if(produitEnregistreDansLocalStorage === null) {
    console.log("le panier est vide");
} else {
    console.log("le panier possède des articles")
}