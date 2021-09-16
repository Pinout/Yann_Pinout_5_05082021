// Tableau des prix
const arrayPrice = [];
// Tableau d'id de teddies
let products = [];
// Données du formulaire
let contact = {};
var cpt = 0;

class ContactData {
    constructor(name, surname, adress, city, email) {
        this.firstName = name;
        this.lastName = surname;
        this.address = adress;
        this.city = city;
        this.email = email;
    }
}

// Supprime l'élément voulu d'un tableau
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// Structure html
function createBasket(itemTeddy, basketContent) {
    let mainBasket = document.getElementById('basket-content');
    mainBasket.classList.add("my-3");

    let divBasket = document.createElement('div');
    mainBasket.appendChild(divBasket);
    divBasket.classList.add('basketContentToClear');
    divBasket.classList.add("d-flex", "flex-row", "justify-content-between", "my-2", "px-1", "bold");

    // Photos
    let imageTeddy = document.createElement("img");
    imageTeddy.id = cpt.toString();
    imageTeddy.className="imagesPanier";
    imageTeddy.classList.add("card-image-top", "photo");
    document.getElementById("image").appendChild(imageTeddy);
    imageTeddy.src = itemTeddy.imageUrl;

    // Noms
    let nameTeddy = document.createElement('p');
    nameTeddy.id = cpt.toString();
    document.getElementById("nom").appendChild(document.createElement('p')); //Créé un espace en dessous de "Nom"
    document.getElementById("nom").appendChild(nameTeddy); // nameTeddy est l'enfant de nom
    nameTeddy.textContent = itemTeddy.name;

    //Couleurs
    let TeddyColors = document.createElement('p');
    TeddyColors.id = cpt.toString();
    document.getElementById("couleur").appendChild(document.createElement('p'));
    document.getElementById("couleur").appendChild(TeddyColors);
    TeddyColors.textContent = basketContent[i].selectedColors;

    // prix
    let priceTeddy = document.createElement('p');
    priceTeddy.id = cpt.toString();
    document.getElementById("prix").appendChild(document.createElement('p'));
    document.getElementById("prix").appendChild(priceTeddy);
    priceTeddy.textContent = itemTeddy.price/100 + " €";
    priceTeddy.classList.add("price");
    
    // Croix pour supprimer un élément du panier
    deleteOne();

}


// Ajout des prix au tableau des prix
function addItemPrice(itemTeddy) {
    let itemPrice = itemTeddy.price;
    arrayPrice.push(itemPrice);
}

// Ajout des id dans product[]
function addIdProducts(basketContent) {
    products.push(basketContent[i].idTeddy);
}

// Prix total
function totalPriceOrder(arrayPrice) {
    let totalPrice = document.getElementById('total-price');
    let total = 0;
    for (i = 0; i < arrayPrice.length; i++) {
        total = total + arrayPrice[i];
        totalPrice.textContent = "Prix total : " + total/100 + " €";
        //Stockage du prix dans le localStorage pour la page de confirmation
        localStorage.setItem("totalOrder", JSON.stringify(total));
    }
}

// Création panier
async function getBasket() {
    try {
        let response = await fetch("https://teddies-api.herokuapp.com/api/teddies");
        if (response.ok) {
            let teddies = await response.json();
            let basketContent = JSON.parse(localStorage.getItem("basketContent")) || {};

            for (i = 0; i < basketContent.length; i++) {
                let itemTeddy = teddies.find(teddies => teddies['_id'] == basketContent[i].idTeddy); // Cherche dans basketContent
                console.log(itemTeddy);                                                              // le teddy qui a l'id voulu 
                createBasket(itemTeddy, basketContent);
                addItemPrice(itemTeddy);
                addIdProducts(basketContent);
            }
            totalPriceOrder(arrayPrice);

        } else {
            console.error('Réponse du serveur : ', response.status);
        }
    }
    catch (e) {
        console.log(e);
    }
}


// Suppression d'un élément du panier
function deleteOne() {
    let basketContent = JSON.parse(localStorage.getItem("basketContent")) || {};
    let totalOrder = JSON.parse(localStorage.getItem("totalOrder")) || {};
    let buttonSuppr = document.createElement('p');
    buttonSuppr.id = cpt.toString();
    document.getElementById("suppr").appendChild(document.createElement('p'));
    document.getElementById("suppr").appendChild(buttonSuppr);
    buttonSuppr.textContent = "\u2716"; // Création de l'icône croix

    buttonSuppr.addEventListener("click", function() {
        let idButton = parseInt(buttonSuppr.id);

        // Mise à jour des tableaux
        products.remove(idButton);
        basketContent.remove(idButton);
        arrayPrice.remove(idButton);
        //Mise à jour du localStorage
        localStorage.setItem("basketContent", JSON.stringify(basketContent));
        localStorage.setItem("totalOrder", JSON.stringify(totalOrder));

        window.location.assign("../panier.html"); // Recharge la page

        // Supprime les éléments dans le html
        document.getElementById(buttonSuppr.id).remove();
        document.getElementById(buttonSuppr.id).remove();
        document.getElementById(buttonSuppr.id).remove();
        document.getElementById(buttonSuppr.id).remove();
        document.getElementById(buttonSuppr.id).remove();
    })
    cpt ++;
}

function deleteAll() {
    localStorage.clear();
    for (let i=0; i<products.length; i++) {
        products.splice(i,1);
    }
    for (let j=0; j<arrayPrice.length; j++) {
        arrayPrice.splice(j,1);
    }
    console.table(localStorage);
    console.log(products);
    console.log(arrayPrice);
}

// Suppression panier
function deleteBasket() {
    let divButtonClear = document.getElementById('button-clear-basket');
    let buttonClearBasket = document.createElement("button");

    divButtonClear.appendChild(buttonClearBasket);
    buttonClearBasket.classList.add("btn", "btn-warning", "block-right");
    buttonClearBasket.textContent = "Vider mon panier";

    buttonClearBasket.addEventListener('click', function () {
        //localStorage.removeItem('basketContent');
        //localStorage.removeItem('totalOrder');
        localStorage.clear();
        let mainBasket = document.getElementById('basket-content');
        while (mainBasket.firstChild) {
            mainBasket.removeChild(mainBasket.firstChild);
            let totalPrice = document.getElementById('total-price');
            totalPrice.textContent = " 0 €";
        }
        window.location.assign("../panier.html"); // Recharge la page
    })
}

// On stocke l'id de commande dans le localStorage
function getOrderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}

function getForm() {
    let firstname = document.getElementById('firstName').value;
    let lastname = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    contact = new ContactData(firstname, lastname, address, city, email);
}

async function postForm(dataToSend) {
    try {
        let response = await fetch("https://teddies-api.herokuapp.com/api/teddies/order", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: dataToSend,
        });
        if (response.ok) {
            let responseId = await response.json();
            getOrderConfirmationId(responseId);
            window.location.href = "../confirmation.html";
        } 
        else {
            console.error('Réponse du serveur : ', response.status);
        }
    } 
    catch (e) {
        console.log(e);
    }
}


//Validation commande et envoi de contact{} et de product[] à l'API
function confirmationOrder() {
        getForm();
        dataToSend = JSON.stringify({ contact, products });
        console.log(dataToSend);
        postForm(dataToSend);
}

// Validation formulaire
function validationForm() {
    let buttonValidation = document.getElementById('btn-validation');
     buttonValidation.addEventListener('click', function () {
        for (i=0; i<products.length; i++) {
            if (products[i] == null) {
                products.splice(i,1);
            }
        }

        let firstname = document.getElementById('firstName').value;
        let lastname = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;
        if (firstname, lastname, address, city, email != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            confirmationOrder();
            return true;
        } else {
            alert("Saisissez TOUS les champs ou entrez un mail valide");
            return false;
        }
})
}

console.log(localStorage);
console.log(products);
console.log(arrayPrice);

getBasket();
deleteBasket();
validationForm();
