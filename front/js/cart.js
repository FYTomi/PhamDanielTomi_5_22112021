    

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
      let totalPrix = document.getElementById("totalPrice")
      let sommeQuantite = 0;
      let sommePrix = 0;
      //Sélection des blocs contenant le prix des articles de la liste

      let priceBloc = document.getElementById("price");
      for (let p in produitEnregistreDansLocalStorage) {
        
        let price = produitEnregistreDansLocalStorage[p].price;
        let objectTotal = parseInt(produitEnregistreDansLocalStorage[p].quantity);
        let priceWithAddedQuantity = price * objectTotal
        
        sommeQuantite  += objectTotal;
        sommePrix += priceWithAddedQuantity;
      }
      totalPrice.innerHTML= sommePrix
      totalQuantite.innerHTML = sommeQuantite
      
    }
    total();

}// fin else
        })//fin fetch

/*         // ----MONTANT TOTAL DU PANIER
          //Déclaration de la variable pour y mettre les prix qui sont dans le panier

          let totalPrice = [];

          //Aller chercher les prix dans le panier
          for (let m = 0; m < produitEnregistreDansLocalStorage.length; m++){
            let prixProduitDansPanier = produitEnregistreDansLocalStorage[m].price
            //Mettre les prix du panier dans la variable totalPrice
            totalPrice.push(prixProduitDansPanier)

            
          }
          //Additioner les prix qu'il y a dans le tableau totalPrice avec la métode reduce
          let reducer = (accumulator, currentValue) => accumulator + currentValue
          const prixTotal = totalPrice.reduce(reducer,0);
          console.log("Prix total " + prixTotal);

          
      
          //Injection html du prix total

          let totalPrixHtml = document.getElementById("totalPrice");
          totalPrixHtml.innerHTML = prixTotal 

        // ---- QUANTITE TOTAL DU PANIER
          //Déclaration de la variable pour y mettre les quantités qui sont dans le panier

          let totalPanier = [];

          //Aller chercher les quantités dans le panier 
          let quantitySection = document.getElementsByClassName("itemQuantity")
          for (let q = 0; q < quantitySection.length; q++){
            let produitTotal = quantitySection[q].value
            totalPanier.push(produitTotal)
          }

          //Additioner les quantités qu'il y a dans le tableau totalPanier avec la métode reduce
          reducer = (accumulator, currentValue) => accumulator + currentValue
          const quantiteTotal = totalPanier.reduce(reducer,0);
          console.log("Quantité total " + quantiteTotal);

          
      
          //Injection html de la quantité total

          let totalProduitHtml = document.getElementById("totalQuantity");
          totalProduitHtml.innerHTML = quantiteTotal */

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
					text.style.color = 'lightgreen'
					return prenom
        // Si le prénom ne correspond pas aux critères, message d'erreur
				} else {
					if (prenom.match(number)) {
						text.innerHTML = 'Les chiffres ne sont pas tolérés'
						text.style.color = 'red'
					} else {
						text.innerHTML = 'Merci de rentrer un prénom valide'
						text.style.color = 'red'
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
					text.style.color = 'lightgreen'
					return nom
        // Si le nom ne correspond pas aux critères, message d'erreur
				} else {
					if (nom.match(number)) {
						text.innerHTML = 'Les chiffres ne sont pas tolérés'
						text.style.color = 'red'
					} else {
						text.innerHTML = 'Merci de rentrer un nom valide'
						text.style.color = 'red'
					}
				}
				if (nom == '') {
					text.innerHTML = ''
				}
        	}
        // -------------------- Adresse -------------------------- 

        function adresseValide() {
          let adresse = document.getElementById('address').value
          let text = document.getElementById('addressErrorMsg')
          // Prends en compte les caractère spéciaux
          let pattern = /^[a-zA-Z\-1-9 ]+$/
            
          //Si l'adresse correspond aux critères imposés, on renvoie le résultat
          if (adresse.match(pattern)) {
            text.innerHTML = 'Adresse est valide'
            text.style.color = 'lightgreen'
            return adresse
          // Si l'adresse ne correspond pas aux critères, message d'erreur
          } else {
            text.innerHTML = "L'adresse n'est pas valide"
						text.style.color = 'red'
          }
          if (adresse == '') {
            text.innerHTML = ''
          }
            }

        // -------------------- Ville -------------------------- 
        function villeValide() {
        let ville = document.getElementById('city').value
				let text = document.getElementById('cityErrorMsg')
				// Prends en compte les caractère spéciaux
				let pattern =
					/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
        //Si la ville correspond aux critères imposés, on renvoie le résultat
				if (ville.match(pattern)) {
					text.innerHTML = 'La ville est valide'
					text.style.color = 'lightgreen'
					return ville
        // Si la ville ne correspond pas aux critères, message d'erreur
				} else {
				    text.innerHTML = 'Merci de rentrer un nom de ville valide'
						text.style.color = 'red'
					}
				if (ville == '') {
					text.innerHTML = ''
				}
      }

        // -------------------- Email -------------------------- 

        function emailValide() {
          let email = document.getElementById('email').value
          let text = document.getElementById('emailErrorMsg')
          // Prends en compte les caractère spéciaux
          let pattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          
          //Si l'email correspond aux critères imposés, on renvoie le résultat
          if (email.match(pattern)) {
            text.innerHTML = 'le email est valide'
            text.style.color = 'lightgreen'
            return email
          // Si l'email ne correspond pas aux critères, message d'erreur
          } else {
              text.innerHTML = "L'email n'est pas valide"
              text.style.color = 'red'
            } 
            if (email == '') {
              text.innerHTML = ''
            }
          }
          
            
        // Appels des fonctions dans le formulaire
          prenomValide();
          nomValide();
          adresseValide();
          villeValide();
          emailValide();


       // ------------Passage commande ---------------------------

        } 
    ) 