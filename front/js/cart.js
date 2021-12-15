    

//On récupére les infos stockées dans le localStorage
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("produit"));
    

//Sélection dans le DOM du conteneur des articles ajoutés
let cartContainer = document.getElementById("cart__items")

//Requête API pour le JSON des produits à afficher les infos de chaque produit
fetch('http://localhost:3000/api/products/')
        .then((res) => res.json())
        .then ((data) => {
            console.log(data)
            let findProduct = () => {
                return data
            }
    
    //Déclaration de la variable qui contient le résultat de la fonction requête
    
    let foundProduct = findProduct()

// Si le panier est vide : Afficher le panier est vide

if(produitEnregistreDansLocalStorage === null) {
    console.log("le panier est vide");
    const panierVide = `<div class= "container-panier-vide">
                            <h2> Le panier est vide </h2>
                        </div)
                        `;
    cartContainer.innerHTML = panierVide;
} 
//Si le panier n'est pas vide, il faut afficher les produits qui sont DANS le localStorage
else {
    console.log("le panier possède des articles")
    let structureProduitPanier = [];
    console.log(structureProduitPanier);
    
    for (k = 0; k < produitEnregistreDansLocalStorage.length; k++) {
        console.log("Nombre d'article " +  produitEnregistreDansLocalStorage.length);
        
        //Calcul du prix , quantité * nombre de produit
        let quantityProduct = produitEnregistreDansLocalStorage[k].quantity;
        let calculPrixProduit = quantityProduct * produitEnregistreDansLocalStorage[k].price;

        structureProduitPanier = structureProduitPanier + `
        <article class="cart__item" data-id="${foundProduct[k].name}" data-color="${produitEnregistreDansLocalStorage[k]}">
                <div class="cart__item__img">
                  <img src="${produitEnregistreDansLocalStorage[k].image}" alt="${produitEnregistreDansLocalStorage[k].altImage}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produitEnregistreDansLocalStorage[k].name}</h2>
                    <p>${produitEnregistreDansLocalStorage[k].colors}</p>
                    <p>${calculPrixProduit + " €"}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitEnregistreDansLocalStorage[k].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
        </article>
        `;
    }
        if(k == produitEnregistreDansLocalStorage.length){
        
            //injection html dans la page panier
        cartContainer.innerHTML= structureProduitPanier;
    }
}// fin else
        })//fin fetch

  // -------------------------------------- Fin affichage panier ------------------------------------------------------

  // Gestion du bouton supprimer l'article

    // Sélection des boutons supprimer

    let deleteButton = document.getElementsByClassName("deleteItem")
    console.log(deleteButton);

    for (let d = 0; d < deleteButton.length; d++) {
      deleteButton[d].addEventListener("click", (event) =>{
        event.preventDefault();

        // sélection de l'id produit qui sera supprimé en cliquant sur le bouton
        let selectionIdASupprimer = produitEnregistreDansLocalStorage[d]._id;
      })
  }