// Récupérer paramètres des URL via searchParams
    //window.location.href pour récupérer l'URL de la page
    //get pour récupérer l'id de la page
let idProduit = new URL (window.location.href).searchParams.get('id')