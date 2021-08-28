let params = (new URL(document.location)).searchParams;

//STOCK L ID 
const id = params.get("id");

//EMPLACEMENT HTML
let container = document.getElementById("container");

// FONCTION ENVOIE LOCAL STORAGE
const addLocalStorage = panier => {
  localStorage.setItem('panier', JSON.stringify(panier));
};

// INCLUS HTML
const display = teddy => {
  container.innerHTML +=`
    <div class="appareil" id="cardsProduct">
      <img src=${teddy.imageUrl} alt="">
      <div class="description">
        <p class="nom">${teddy.name}</p>
        <span class="appareil-description">
          ${teddy.description}
        </span>
        <select class="options" id ="option">
          <option>Choix options</option>
        </select>
        <p class="prix"> Prix Unitaire: ${teddy.price/ 100}€</p>
        <select class="quantite" id="quantity">           
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>         
        <a href ="panier.html"><button type ="submit" id="panier" value="submit"> Ajouter au panier</button></a>
      </div>
    </div>
  `;
  // CHOIX OPTIONS
  for (let colors of teddy.colors){
    document.getElementById('option').innerHTML+=
    `<option value="1">${colors}</option>`
  }
  // ECOUTE EVENEMENT AU CLICK + FNCT addProductBasket
  document.getElementById('panier').addEventListener('click', function () {
    addProductBasket(teddy)
  });
};

//FONCTION AJOUTER PANIER 
const addProductBasket = teddy=> {
  teddy.quantity = parseInt(document.getElementById('quantity').value);

  //RECUPERE PANIER//memo : let variable=(condition)? "valeursi vrai": "valeur si faux"
  let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

  //BOUCLE FOR PARCOUR LIGNE PANIER
  let teddyExistIndex = false;
  for (let i = 0; i < panier.length; i++) {
    let product = panier[i];
    //CONDITION CI PRODUIT EXISTE
    if (product.id === teddy.id) {
      teddyExistIndex = i;
    }
  };
  // Caméra existe dans le panier
  if (false !== teddyExistIndex) {
    panier[teddyExistIndex].quantity = parseInt(panier[teddyExistIndex].quantity) + teddy.quantity;
  } else {
    panier.push(teddy);
  };
  addLocalStorage(panier)
};

// APPELLE API AVEC FETCH
fetch("http://localhost:3000/api/teddied/" + id)
  .then(response => response.json())
  .then(function (product) {
    let teddy = new Teddy(product)
    display(teddy);
  })
  // SI PROBLEME API
  .catch(function(err){
  console.log("fetch Error")
});