    // Récupérer paramètres des URL via searchParams
    //window.location.href pour récupérer l'URL de la page
    //get pour récupérer l'id de la page

    let idProduit = new URL (window.location.href).searchParams.get('id')

    //Requête API pour le JSON des produits à afficher et s'assurer que l'ID du produit récupéré correspond à la variable idProduit
    
    fetch('http://localhost:3000/api/products/'+idProduit)
        .then((res) => res.json())
        .then ((data) => {
            console.log(data)
            let findProduct = () => {
                return data
            }
        
    //Déclaration de la variable qui contient le résultat de la fonction requête
    
    let foundProduct = findProduct()
    
    //Déclaration d'une variable qui a pour fonction de sélectionner les éléments du DOM à modifier
        //1 - Selection dans le DOM
        //2 - Insertion des variables des détails du produit dans le DOM selectionné
    
    let selectDomElements = () => {
    /* 1 */ let productName = document.getElementsByTagName ('title')
    /* 2 */ productName[0].innerHTML = foundProduct.name
    
        let image = document.querySelector('.item__img')
        image.innerHTML = `<img src="${foundProduct.imageUrl}" alt="${foundProduct.altTxt}">`
        
        let productTitle = document.getElementById('title')
        productTitle.innerHTML = foundProduct.name
    
        let productPrice = document.getElementById('price')
        productPrice.innerHTML = foundProduct.price
    
        let productDescription = document.getElementById('description')
        productDescription.innerHTML = foundProduct.description
    
        let colors = document.getElementById('colors')
        for (let c in foundProduct.colors) {
            colors.insertAdjacentHTML  ('beforeend', `<option value="${foundProduct.colors[c]}">${foundProduct.colors[c]}</option>`
                )
            }
        }
  
        selectDomElements() 
    
    
// Sélection quantité dans le DOM
let quantite = document.getElementById("quantity")

// ---------------------------------------------------------- Local storage --------------------------------------------------------//


// addEvent listener pour le bouton Ajouter au panier

const envoyerPanier = document.getElementById("addToCart");
envoyerPanier.addEventListener("click", ()=> {
 
//Conversion de la chaîne de caractère en valeur de la quantité et du prix
let quantiteProduit = parseInt(quantite.value);
let prixProduit = quantiteProduit * foundProduct.price

    // --------------------- Stocker la récupération des valeurs du formulaire dans le Local storage --------------------------------

// Fonction ajouter un produit dans le local Storage

const ajoutProduitLocalStorage = () => {

    // Ajout dans le tableau de l'objet avec les valeurs choisi par l'utilisateur
    productInLocal.push(productOptionChoices);
    
    // ETAPE 1 = récupérer ce qui est dans le localStorage  
    //La transformation en format JSON et l'envoyer dans la key "produit" au localStorage
    localStorage.setItem ("produit", JSON.stringify(productInLocal));
}

// Fonction pop up quand le client ajoute un article

const popupConfirmation = ()  => {
    
    if(window.confirm(`Le(s) produit(s) "${foundProduct.name}" a/ont bien été ajouté(s) au panier, pour consulter le panier OK, Pour Consulter nos autres articles ANNULER`)){
        window.location.href ="cart.html";
    }
    else {
        window.location.href ="index.html"    
}
}
// Récupération des données dans le formulaire 
        
let productOptionChoices = {
    name: foundProduct.name,
    _id: idProduit,
    quantity: quantiteProduit,
    colors: colors.value,
    image: foundProduct.imageUrl,
    altImage: foundProduct.altTxt,
    price: prixProduit,
}

//Déclaration de la variable "productInLocal" dans laquelle on récupérer les keys et les values dans le localStorage
let productInLocal = JSON.parse(localStorage.getItem("produit"));

if (productOptionChoices.quantity == "" || productOptionChoices.colors == "" || productOptionChoices.quantity > 100) {
    alert ("Veuillez selectionner une couleur et/ou un nombre d'article")
} else {
    //S'il y a déjà des produits enregistré dans le localStorage
    if(productInLocal){
        
    let productExistInCart = false
            for (let f in productInLocal) {
            //Si le produit selectionné a une couleur ET un id identique
            if ((productOptionChoices.colors == productInLocal[f].colors) && (productOptionChoices._id == productInLocal[f]._id)) {
                productExistInCart = true
                
                //On additione la quantité du produit choisit avec la quantité du produit récupéré du localStorage
                
                productInLocal[f].quantity += parseInt(productOptionChoices.quantity);
                productInLocal[f].price += productOptionChoices.price;
                //Renvoi au localStorage
                localStorage.setItem ("produit", JSON.stringify(productInLocal));
                //console.log("Addition")
                ;
            }
            
        } // Fin for
            
     if (!productExistInCart){
        ajoutProduitLocalStorage();
     }       
    
    console.log("ok");
    popupConfirmation();
} else {
    //S'il n'y a pas de produit d'enregistré dans le localStorage
    productInLocal = [];
    ajoutProduitLocalStorage();
    console.log(productInLocal);
    popupConfirmation();
    
        }}
    }) //fin addEvent
}); //fin then data