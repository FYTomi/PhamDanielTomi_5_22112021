// Récupérer paramètres des URL via searchParams
    //window.location.href pour récupérer l'URL de la page
    //get pour récupérer l'id de la page

let idProduit = new URL (window.location.href).searchParams.get('id')

//Requête API pour le JSON des produits à afficher et s'assurer que l'ID du produit récupéré correspond à la variable idProduit

fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then ((data) => {
        let findProduct = () => {
            return data.find((object) => object._id === idProduit)
        }
    
//Déclaration de la variable qui contient le résultat de la fonction requête

let foundProduct = findProduct()

//Déclaration d'une variable qui a pour fonction de sélectionner les éléments du DOM à modifier
    //1 - Selection dans le DOM
    //2 - Insertion des variables des détails du produit dans le DOM selectionné

let selectDomElements = () => {
    let productName = document.getElementsByTagName ('title')
    productName[0].innerHTML = foundProduct.name

    let image = document.querySelector('.item__img')
    image.innerHTML = `<img src="${foundProduct.imageUrl}" alt="${foundProduct.altTxt}">`
    
    let productTitle = document.getElementById('title')
    productTitle.innerHTML = foundProduct.name

    let productPrice = document.getElementById('price')
    productPrice.innerHTML = foundProduct.price

    let productDescription = document.getElementById('description')
    productDescription.innerHTML = foundProduct.description

    let productColors = document.getElementById('colors')
    for (let c in foundProduct.colors) {
        colors.insertAdjacentHTML  ('beforeend', `<option value="${foundProduct.colors[c]}">${foundProduct.colors[c]}</option>`
            )
        }
    }

    selectDomElements()
    }
    )