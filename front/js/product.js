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


    }
    )
   
    // selection bouton "ajouter au panier"
    
    const addCart =document.getElementById('addToCart')

    //-------------------------------------addEvent - Ecouter le bouton "ajouter au panier" ------------------------------------
    
    addCart.addEventListener("click", (event) => {
    
        let quantity = document.querySelector('#quantity')
        
        // Ajout d'un nouveau produit 
        let productOptionChoices = {
            _id: idProduit,
            quantity: quantity.value,
            colors: colors.value,
        }

        //fonction pop up à 'lajout d'un article

       const popUpConfirmation = () => {
        let productTitle = document.getElementById('title')
        if (window.confirm(`"${productTitle.innerHTML}" a bien été ajouté au panier, pour consulter le panier appuyer sur  OK `)) {
            window.location.href = "cart.html";
        }
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
        }

        productOptionChoices.quantity = parseInt(productOptionChoices.quantity)

        // Variable qui ajout le montant de produit selectionné au montant des produit dans le local storage

        let addToTotal = productOptionChoices.quantity + savedProductInLocalStorage[index].quantity

        // Si l'utilisateur dépasse 100 articles

        if (addToTotal > 100) {
            console.log('Le panier dépasse 100 artciles')
        }
        //Ajoute la quantité au montant existant
        else {
            productOptionChoices.quantity  += savedProductInLocalStorage[index].quantity
            localStorage.setItem('product', JSON.stringify(savedProductInLocalStorage))
            console.log('Ajout')
        }



    })
