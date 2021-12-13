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
//commentaire 
    //let  addToCartButton = document.getElementById('addToCart')
//addToCartButton.setAttribute('data-productID', foundProduct._id)
    selectDomElements() 


    })
   


    // -----------------------------------------------------------IMPORTANT Fonction ajoutant un article -------------------------------------------------
    
    let addProduct = () => {
    
        let quantity = document.getElementById('quantity')
        
        // Ajout d'un nouveau produit 
        let productOptionChoices = {
            _id: idProduit,
            quantity: quantity.value,
            colors: colors.value,
        }

    //-------------------------------------Local storage---------------------------------------------------------------------

        // Variable qui récuprère le produit dans le local storage
        let savedProductInLocalStorage = JSON.parse(localStorage.getItem('product'))
        
        // Ajoute le produit au local storage

        let saveProductToLocalStorage = () => {
        savedProductInLocalStorage.push(productOptionChoices)
        localStorage.setItem('product', JSON.stringify(savedProductInLocalStorage))
    }

        // Modifie le produit dans le local storage

        let modififyProductLocalStorage = (index) => {
            savedProductInLocalStorage[index].quantity = parseInt(savedProductInLocalStorage[index].quantity)
        

        productOptionChoices.quantity = parseInt(productOptionChoices.quantity)

        // Variable qui ajout le montant de produit selectionné au montant des produit dans le local storage

        let addToTotal = productOptionChoices.quantity + savedProductInLocalStorage[index].quantity

        // Si l'utilisateur dépasse 100 articles

        if (addToTotal > 100) {
            console.log('Le panier dépasse 100 articles')
            reachedProductLimit()
        }
        //Ajoute la quantité au montant existant
        else {
            productOptionChoices.quantity  += savedProductInLocalStorage[index].quantity
            localStorage.setItem('product', JSON.stringify(savedProductInLocalStorage))
            console.log('Ajout')
        }
    }

    //fonctions qui affiche un message selon ce que l'utilisateur effectue à l'ajout d'un article
        
        //Selection de l'élément pour afficher le popup/message
        
        let notification = document.getElementsByClassName('item__content__addButton')
       
        //fonction avec un délai pour faire disparaître la notification

        let deleteNotif = () => {
            let deleteNotif = document.getElementById('notification')
            setTimeout(function () {
                deleteNotif.remove()
            }, 2000)
            }
        
            let notifAjout = () => {
            notification.insertAdjacentHTML(
                'afterend',
                `<p id ="notification" style="text-align: center; font-weight: bold;"><br>L'article a été ajouté !</p>`
            )
            deleteNotif()
        }
        
        //Si le nombre d'article dépasse 100
        
        let reachedProductLimit = () => {
        notification.insertAdjacentHTML(
            'afterend',
                `<p id ="notification" style="text-align: center; font-weight: bold;"><br>Votre panier dépasse 100 artciles !</p>`
            )
            deleteNotif()
        }
        // Si l'utilisateur ne renseigne certaines informations concernant l'article
        
        let errorMessage = () => {
        if (productOptionChoices.colors == '') {
            notification.insertAdjacentHTML(
                'afterend',
                `<p id ="notification" style="text-align: center; font-weight: bold;"><br>Veuillez choisir une couleur !</p>`
            )
            deleteNotif()
        }
        if (productOptionChoices.quantity <= 0) {
            notification.insertAdjacentHTML(
                'afterend',
                `<p id ="notification" style="text-align: center; font-weight: bold;"><br>Veuillez choisir une quantité !</p>`
            )
            deleteNotif()
        }

        //Si l'utilisateur ne renseigne pas un des des deux éléments (couleurs OU quantité)

        if (
            productOptionChoices.colors == '' || productOptionChoices.quantity <= 0 || productOptionChoices.quantity > 100
        ){
            errorMessage()
            console.log ('Impossible de poursuivre les achats')
        }
        else {
            // Si il n'y a pas de produit dans le local storage
            // Création d'un array pour y ajouter le produit
            if (!savedProductInLocalStorage) {
                savedProductInLocalStorage = []
                //Ajout du produit dans l'array
                saveProductToLocalStorage()
                console.log('Premier produit  ajouté')
            }
            //déclaration de la variable index dans le local storage qui a la même couleur et ID que l'utilisateur a séléctionné
            else {
                let index = savedProductInLocalStorage.findIndex(
                    (p) => p.colors === productOptionChoices.colors && p._id === productOptionChoices._id
                )
            //Si le produit existe déjà alors appel de la fonction "modififyProductLocalStorage"
            if (index !== -1) {
                modififyProductLocalStorage(index)
            }
            // Ajout le produit dans le cas contraire
            else {
                saveProductToLocalStorage()
                console.log('Produit ajouté')
            }
            }
        }
        }
        


        
    }

    //-------------------------------------addEvent - Ecouter le bouton "ajouter au panier" ------------------------------------
    
    // selection bouton "ajouter au panier"
    let addCart = document.getElementById('addToCart')
    addCart.addEventListener("click", (event) => { 
        addProduct()
    })