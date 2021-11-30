// Récupérer paramètres des URL via searchParams
    //window.location.href pour récupérer l'URL de la page
    //get pour récupérer l'id de la page

let idProduit = new URL (window.location.href).searchParams.get('id')

//Requête API pour le JSON des produits à afficher et s'assurer que l'ID du produit récupéré correspond à la variable idProduit

fetch('http://localhost:3000/api/products')
  .then(function(res) {
      if (res.ok) {
          return res.json();
      }
    })
    .then (function(data) {
        let findProduct = function() {
            return data.find(function(object) {object._id === idProduit})
        }
    })