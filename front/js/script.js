// Variable fonction pour afficher les infos produit de la page d'accueil

let displayProductInfo = function(data) {
    let itemInfo = document.getElementById("items")
    for (let i in data) {
        items.innerHTML += 
        <a href="./product.html?id=${data[i]._id}">
            <article>
              <img src="${data[i].imageUrl}" alt="${data[i].altTxt}"/>
              <h3 class="productName">${data[i].name} </h3>
              <p class="productDescription">${data[i].description}</p>
            </article>
          </a>
        
    }
}