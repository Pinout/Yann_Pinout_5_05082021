//Récupération de l'id pour rediriger vers la page product correspondante
function getUrlProduct(teddies,i,linkProduct) {
   
    // récupération de l'url
    let splitUrl = window.location.pathname.split("/");
    let lastItem = splitUrl.pop();
    // console.log(window.location.pathname.replace(lastItem, 'product.html'))
    let url = window.location.origin + window.location.pathname.replace(lastItem, '../produit.html');

    // // Création d'un objet url
    let urlObj = new URL(url);
    let idTeddies = teddies[i]._id;
    // Ajout du query string id
    urlObj.searchParams.append("id", idTeddies);
    linkProduct.href = urlObj;
}

//Création du bouton de redirection avec le bon url
function createButtonLinkProduct(linkProduct) {
    let buttonBuy = document.createElement("button");
    linkProduct.appendChild(buttonBuy);
    buttonBuy.classList.add("btn", "btn-warning", "block-right");
    buttonBuy.textContent = "Voir plus";
}

function createCardTeddies(teddies) {
    let divParentParent = document.createElement("div");
    const main = document.getElementById("main");
    main.appendChild(divParentParent);
    divParentParent.classList.add("row-cols-1", "row-cols-md-4", "row-cols-lg-5", "d-flex", "flex-wrap", "justify-content-between", "align-items-between");

    for (let i = 0; i < teddies.length; i++) {

        let divParent = document.createElement("div");
        divParentParent.appendChild(divParent);
        divParent.classList.add("card", "col", "m-3", "pt-3");
        divParent.style.backgroundColor="rgb(183 116 138)";

        // Création des élements images et div avec la classe card body, enfants de divParent 
        let imageTeddy = document.createElement("img");
        divParent.appendChild(imageTeddy);
        imageTeddy.classList.add("card-image-top", "photo", "img-fluid");
        imageTeddy.src = teddies[i].imageUrl;

        let divCardBody = document.createElement("div");
        divParent.appendChild(divCardBody);
        divCardBody.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");


        // Création des éléments enfants de divCardBody
        let titleTeddy = document.createElement("h4");
        divCardBody.appendChild(titleTeddy);
        titleTeddy.classList.add("card-title", "title");
        titleTeddy.textContent = teddies[i].name;

        let descriptionTeddy = document.createElement("h6");
        divCardBody.appendChild(descriptionTeddy);
        descriptionTeddy.classList.add("description", "text-justify");
        descriptionTeddy.textContent = teddies[i].description;


        // Div prix + bouton
        let divLinkPrice = document.createElement("div");
        divCardBody.appendChild(divLinkPrice);
        divLinkPrice.classList.add("d-flex", "flex-row", "justify-content-between");

        // Prix
        let priceTeddy = document.createElement("h6");
        divLinkPrice.appendChild(priceTeddy);
        priceTeddy.classList.add("price", "my-2", "font-weight-bold");
        priceTeddy.textContent = teddies[i].price/100 + ' €';

        let linkProduct = document.createElement("a");
        divLinkPrice.appendChild(linkProduct);
        getUrlProduct(teddies,i,linkProduct);
        createButtonLinkProduct(linkProduct);
    }
}


//APPEL API AVEC FETCH
async function getTeddies() {
    try {
        let response = await fetch("https://teddies-api.herokuapp.com/api/teddies");
        if (response.ok) {
            let teddies = await response.json();
            createCardTeddies(teddies);
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}
getTeddies()
