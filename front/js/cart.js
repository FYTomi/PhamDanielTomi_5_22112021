    

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

        //On utilise la variable pour incrémenter autant de bloc html que de produit
        structureProduitPanier = structureProduitPanier + `
        <article class="cart__item" data-id="${foundProduct[k].name}" data-color="${produitEnregistreDansLocalStorage[k]}">
                <div class="cart__item__img">
                  <img src="${produitEnregistreDansLocalStorage[k].image}" alt="${produitEnregistreDansLocalStorage[k].altImage}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produitEnregistreDansLocalStorage[k].name}</h2>
                    <p>${produitEnregistreDansLocalStorage[k].colors}</p>
                    <p id="price">${calculPrixProduit + " €"}</p>
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

    //Affichage quantité total et prix total

      //Sélection des éléments dans le DOM pour afficher la quantité/prix total
    let total = () => {
      let totalQuantite = document.getElementById("totalQuantity");
      let totalPrice = document.getElementById("totalPrice");
      let sommeQuantite = 0;
      let sommePrix = 0;
      //Sélection des blocs contenant le prix des articles de la liste

      let priceBloc = document.getElementById("price");
      for (let p in produitEnregistreDansLocalStorage) {
        
        let price = produitEnregistreDansLocalStorage[p].price;
        let objectTotal = produitEnregistreDansLocalStorage[p].quantity;
 
        sommePrix += price;
        sommeQuantite  += objectTotal;
      }
      totalQuantite.innerHTML = sommeQuantite
      totalPrice.innerHTML = sommePrix
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

            // ------------------ Formulaire à remplir -----------------------------------------

  

    addEventListener('change', () => {
			  
      // --------------------Prénom --------------------------
      function prenomValide() {
				let prenom = document.getElementById('firstName').value
				let text = document.getElementById('firstNameErrorMsg')
				// Prends en compte les caractère spéciaux
				let pattern =
					/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
				let number = /^[a-zA-Z\-1-9]+$/
        //Si le prénom correspond aux critères imposés, on renvoie le résultat
				if (prenom.match(pattern)) {
					text.innerHTML = 'le prénom est valide'
					text.style.color = '#00ff00'
					return prenom
        // Si le prénom ne correspond pas aux critères, message d'erreur
				} else {
					if (prenom.match(number)) {
						text.innerHTML = 'Les chiffres ne sont pas tolérés'
						text.style.color = '#fbbcbc'
					} else {
						text.innerHTML = 'Merci de rentrer un prénom valide'
						text.style.color = '#fbbcbc'
					}
				}
				if (prenom == '') {
					text.innerHTML = ''
				}
        	}
      // --------------------Nom -------------------------- 
      function nomValide() {
				let nom = document.getElementById('lastName').value
				let text = document.getElementById('lastNameErrorMsg')
				// Prends en compte les caractère spéciaux
				let pattern =
					/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
				let number = /^[a-zA-Z\-1-9]+$/
        //Si le nom correspond aux critères imposés, on renvoie le résultat
				if (nom.match(pattern)) {
					text.innerHTML = 'le nom est valide'
					text.style.color = '#00ff00'
					return nom
        // Si le nom ne correspond pas aux critères, message d'erreur
				} else {
					if (nom.match(number)) {
						text.innerHTML = 'Les chiffres ne sont pas tolérés'
						text.style.color = '#fbbcbc'
					} else {
						text.innerHTML = 'Merci de rentrer un nom valide'
						text.style.color = '#fbbcbc'
					}
				}
				if (nom == '') {
					text.innerHTML = ''
				}
        	}
        // -------------------- Adresse -------------------------- 
        // Appels des fonctions dans le formulaires
          prenomValide();
          nomValide();
        } 
    ) 