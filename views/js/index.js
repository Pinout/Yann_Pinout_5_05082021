let container = document.getElementById("container");

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
const display = teddy => {
    container.innerHTML += `
    <article id="cardsProduct" class="produit">
        <img src=${teddy.imageUrl} alt="photos produits" />
        <div class="bloqueDescription">
            <h2> ${teddy.name}</h2>
            <p>${teddy.price / 100}€</p>
        </div>
        <p>${teddy.description}</p>
        <a href="produit.html?id=${teddy.id}"> En savoir plus</a>
    </article>`
};

//APPEL API AVEC FETCH
fetch("https://teddies-api.herokuapp.com/api/teddies")
    .then(response => response.json())  
    .then(function (listeProduct) {
        // boucle for prend un produit de la liste 
        for (let product of listeProduct) {
            let teddy = new Teddy(product)
            display(teddy);
        }
    })
    //SI PROBLEME API
    .catch(function (err) {
        console.log("fetch Error")
        alert("Veuillez nous exuser les produits ne sont pas disponibles pour le moment ")
    });

function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(price / 100);
    return price;
}
function addCards(data) {
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
}