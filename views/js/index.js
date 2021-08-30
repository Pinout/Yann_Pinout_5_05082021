/*let container = document.getElementById("container");

class Teddy {
    constructor({
        name,
        imageUrl,
        price,
        _id,
        description,
        colors,
        quantity
    }) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.id = _id;
        this.description = description;
        this.colors = colors;
        this.quantity = parseInt(quantity, 10); // transforme chaine de caractère en nombre
    }
};
*/

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
    // Ajout texte au bouton
    buttonBuy.textContent = "Voir";
}

function createCardTeddies(teddies) {
    let divParentParent = document.createElement("div");
    const mainHome = document.getElementById("main");
    mainHome.appendChild(divParentParent);
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
        let titleTeddy = document.createElement("h3");
        divCardBody.appendChild(titleTeddy);
        titleTeddy.classList.add("card-title", "title");
        titleTeddy.textContent = teddies[i].name;

        let descriptionTeddy = document.createElement("p");
        divCardBody.appendChild(descriptionTeddy);
        descriptionTeddy.classList.add("description", "text-justify");
        descriptionTeddy.textContent = teddies[i].description;


        // Div prix + bouton
        let divLinkPrice = document.createElement("div");
        divCardBody.appendChild(divLinkPrice);
        divLinkPrice.classList.add("d-flex", "flex-row", "justify-content-between");

        // Prix
        let priceTeddy = document.createElement("p");
        divLinkPrice.appendChild(priceTeddy);
        priceTeddy.classList.add("price", "my-2", "font-weight-bold");
        priceTeddy.textContent = teddies[i].price + ' $';

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


/*function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(price / 100);
    return price;
}*/
/*function addCards(data) {
    //boucle pour chaque iteration d'un produit
    for (produit of data) {
        //recupère l'élément liste dans le HTML
        const card = document.getElementById("liste");
        //convertit le prix
        const price = convertPrice(produit.price);
        card.innerHTML += `
      <div class="col-sm-12 col-md-6 col-lg-6 pb-3  ">
          <div class="card border bg-light shadow p-3 mb-5 bg-body rounded">
              <div class="card-body">
                  <div class="row">
                      <a href="../produit.html?_id=${produit._id}"><img src="${produit.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${produit.name}"></a>
                      <div class="col-6 col-sm-7 mt-3" >
                          <h5 class="card-title">${produit.name}</h5>
                      </div>
                      <div class="col-6 col-sm-5 text-end mt-3">
                          <h5 class="card-title">${price}</h5>
                      </div>
                  </div>
                  <p class="card-text text-truncate">${produit.description}</p>
                  <a href="../produit.html?_id=${produit._id}" class="btn btn-secondary">Acheter ce produit</a>
              </div>
          </div>
      </div>`;
    }
}*/