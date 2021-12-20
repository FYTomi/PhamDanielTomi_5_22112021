
// Requête API pour le JSON des produits à afficher

fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then ((data) => { 
        
        // Variable fonction pour afficher les infos produit de la page d'accueil

    let displayProductInfo = () => {
        let items = document.getElementById("items")
        for (let i in data) {
            items.innerHTML += `
            <a href="./product.html?id=${data[i]._id}">
                <article>
                  <img src="${data[i].imageUrl}" alt="${data[i].altTxt}"/>
                  <h3 class="productName">${data[i].name} </h3>
                  <p class="productDescription">${data[i].description}</p>
                </article>
              </a> `
            
        }
    }
    displayProductInfo()
    console.log(data)
    console.log("ok")
})
    .catch((err) => {
        console.log ("Impossible d'afficher les articles");
    }
    )