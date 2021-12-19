    

//On récupére les infos stockées dans le localStorage
let productInLocal = JSON.parse(localStorage.getItem("produit"));
let clientInfoInLocal = JSON.parse(localStorage.getItem("infoClient"));


const ajoutProduitLocalStorage = () => {

  // Ajout dans le tableau de l'objet avec les valeurs choisi par l'utilisateur
  productInLocal.push(productOptionChoices);

  //La transformation en format JSON et l'envoyer dans la key "produit" du localStorage
  localStorage.setItem ("produit", JSON.stringify(productInLocal));
}

//Création du tableau de commande pour le POST pour récupérer l'id de chaque produit de la commande
let products = [] 
console.log(products)
for (let n in productInLocal) {
  let productInStorage = [productInLocal[n]._id]
  products.push(productInStorage)
  }

  //Sélection dans le DOM du conteneur des articles ajoutés
let cartContainer = document.getElementById("cart__items")

//Requête API pour le JSON des produits à afficher les infos de chaque produit
fetch('http://localhost:3000/api/products/')
        .then((res) => res.json())
        .then ((data) => {
            let findProduct = () => {
                return data
            }
    
    //Déclaration de la variable qui contient le résultat de la fonction requête
    
    let foundProduct = findProduct()

// Si le panier est vide : Afficher le panier est vide

if(productInLocal === null || productInLocal == 0 ) {
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
    
    for (k = 0; k < productInLocal.length; k++) {
        console.log("Nombre d'article " +  productInLocal.length);
        
        //Calcul du prix , quantité * nombre de produit
        let quantityProduct = productInLocal[k].quantity;
        let calculPrixProduit = quantityProduct * productInLocal[k].price;

        //On utilise la variable pour incrémenter autant de bloc html que de produit
        structureProduitPanier = structureProduitPanier + `
        <article class="cart__item" data-id="${productInLocal[k]._id}" data-color="${productInLocal[k].colors}">
                <div class="cart__item__img">
                  <img src="${productInLocal[k].image}" alt="${productInLocal[k].altImage}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${productInLocal[k].name}</h2>
                    <p>${productInLocal[k].colors}</p>
                    <p id="price">${productInLocal[k].price + " €"}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityProduct}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
        </article>
        `;
        
        
    } 
        if(k == productInLocal.length){
        
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
      for (let p in productInLocal) {
        
        let price = productInLocal[p].price;
        let objectTotal = parseInt(productInLocal[p].quantity);
        
        sommeQuantite  += objectTotal;
        sommePrix += price;
      }
      totalPrix.innerHTML= sommePrix
      totalQuantite.innerHTML = sommeQuantite
      
    }
    total();

}// fin else

  //addEvent listener pour les boutons supprimer


  // Gestion du bouton supprimer l'article

    // Sélection des boutons supprimer et les stocker dans un tableau
    
    let btn_supprimer = document.querySelectorAll('.deleteItem');
      console.log(btn_supprimer);
      
      for (let d = 0; d < btn_supprimer.length; d++) {
      btn_supprimer[d].addEventListener("click", (event) =>{
        //évite le rechargement de la page
        event.preventDefault();

        //Sélection de l'id du produit qui va être supprimer en cliquant sur le bouton supprimer
        let id_productToDelete = productInLocal[d]._id
        console.log(id_productToDelete);
        console.log("id_productToDelete");

        //Avec la méthode filter je sélectionner les éléments à garder et je supprime l'élément ou le btn suppr a été cliqué
        productInLocal = productInLocal.filter( element=> element._id !== id_productToDelete);
        
        //on envoie la variable dans le localStorage
        //La transformation en format JSON et l'envoyer dans la key "produit" du localStorage
        localStorage.setItem ("produit", JSON.stringify(productInLocal));
       
        // Alerte pour avertir que le produit a été supprimé et rechargement de la page
        alert ("l'article a bien été supprimé")
        window.location.href= "cart.html"
        
        
      })}//Fin addEvent click Bouton supprimer
        

  //Gestion des boutons pour modifier la quantités
    
    //Sélection des champs de valeurs

    let modifyQuantityButton = document.querySelectorAll(".itemQuantity");
    console.log(modifyQuantityButton);
      



    })//fin fetch



  // -------------------------------------- Fin affichage panier ------------------------------------------------------

  


  

            // ------------------ Formulaire à remplir -----------------------------------------

  

    addEventListener('change', (event) => {
      event.stopPropagation();
			  
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
					}}
				if (prenom == '') {
					text.innerHTML = ''
				}}
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
					}}
				if (nom == '') {
					text.innerHTML = ''
				}}
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
          }}

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
				}}

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
            }}
          
            
        // Appels des fonctions dans le formulaire
          prenomValide();
          nomValide();
          adresseValide();
          villeValide();
          emailValide();


       // ------------Passage commande ---------------------------
          
       //Sélection du bouton commander et addeventlsitener
          let envoyerFormulaire = document.getElementById("order")
          envoyerFormulaire.addEventListener("click",(c)=>{
            c.preventDefault();
            
            let contact = {
              prenom: prenomValide(),
              nom: nomValide(),
              adresse: adresseValide(),
              ville: villeValide(),
              email: emailValide(),
            }

            //Stocker l'obet dans le localStorage
            let addClientInfoToLocal = () => {
              savedClientInfoToLocal = [];
              savedClientInfoToLocal.push(contact);
              localStorage.setItem("infoClient", JSON.stringify(clientInfoInLocal))
            }
            //Si une des infos du formulaire n'est pas renseigné, ne pas exécuter le code
            if (
              contact.prenom == undefined || contact.nom == undefined || contact.adresse == undefined ||contact.ville == undefined || contact.email ==undefined )
              {
                return false
              } else {
                if (!clientInfoInLocal) {
                  addClientInfoToLocal();
                }
              }
              // On cherche a envoyer deux objets : contact et le tableau de commande
              let elementsToSend = {products, contact}

            

          })
        }  ) 