class Product {
    constructor(idTeddy, selectedColors) {
        this.idTeddy = idTeddy;
        this.selectedColors = selectedColors;
    }
}

//On récupère un teddy en fonction de son id
function getTeddy(teddies, idTeddy) {
    let choosenTeddy = teddies.find(teddies => teddies['_id'] == idTeddy);
    console.log(choosenTeddy);
    createCardTeddy(choosenTeddy, idTeddy);
}

function getIdUrl(teddies) {
    let urlSearch = new URLSearchParams(window.location.search);
    console.log(urlSearch);
    let idTeddy = urlSearch.get('id');
    console.log(idTeddy);
    getTeddy(teddies, idTeddy);
}


//Création de la card du teddy
function createCardTeddy(choosenTeddy, idTeddy) {
    let divParentParent = document.createElement("div");
    const mainProduct = document.getElementById("main");
    mainProduct.appendChild(divParentParent);
    divParentParent.classList.add("row", "mx-auto", "my-3", "w-75");

    let divParent = document.createElement("div");
    divParentParent.appendChild(divParent);
    divParent.classList.add("card", "col", "m-auto", "p-5");
    divParent.style.backgroundColor="rgb(183 116 138)";

    let imageTeddy = document.createElement("img");
    imageTeddy.className="imageProduit";
    divParent.appendChild(imageTeddy);
    imageTeddy.classList.add("card-image-top", "photo", "img-fluid", "imgProduct");
    imageTeddy.src = choosenTeddy.imageUrl;

    let divCardBody = document.createElement("div");
    divParent.appendChild(divCardBody);
    divCardBody.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");


    // Création des éléments enfants de la div CardBody
    let titleTeddy = document.createElement("h3");
    divCardBody.appendChild(titleTeddy);
    titleTeddy.classList.add("card-title", "title-product");
    titleTeddy.textContent = choosenTeddy.name;

    let descriptionTeddy = document.createElement("h4");
    divCardBody.appendChild(descriptionTeddy);
    descriptionTeddy.classList.add("description-product", "text-justify");
    descriptionTeddy.textContent = choosenTeddy.description;

    chooseColor(divCardBody, choosenTeddy);

    // Div englobant prix et bouton
    let divLinkPrice = document.createElement("div");
    divCardBody.appendChild(divLinkPrice);
    divLinkPrice.classList.add("d-flex", "flex-md-row", "flex-column", "justify-content-between");

    // Prix
    let priceTeddy = document.createElement("h4");
    divLinkPrice.appendChild(priceTeddy);
    priceTeddy.classList.add("price-product", "font-weight-bold");
    priceTeddy.textContent = choosenTeddy.price/100 + ' €';

    let linkProduct = document.createElement("a");
    divLinkPrice.appendChild(linkProduct);
    // Bouton "Ajouter au panier"
    let buttonBuy = document.createElement("button");
    buttonBuy.onclick = function() { alert("Ajouté au panier"); }; // Message d'ajout au panier de l'élément
    linkProduct.appendChild(buttonBuy);
    buttonBuy.classList.add("btn", "btn-warning", "block-right");
    buttonBuy.textContent = "Ajouter au panier";
    console.log(idTeddy);
    getTeddyColor(buttonBuy, idTeddy);   
}

// Sélection de la couleur
function chooseColor(divCardBody, choosenTeddy) {
    let ChoiceColor = document.createElement("p");
    divCardBody.appendChild(ChoiceColor);
    ChoiceColor.classList.add("text-left", "my-3");
    ChoiceColor.textContent = "Choisissez une couleur :";

    let choiceColor = document.createElement("select");
    divCardBody.appendChild(choiceColor);
    choiceColor.classList.add("form-control", "mb-5");
    choiceColor.id = "list";
    choiceColor.style.backgroundColor="#ffeaab";

    numberColors = choosenTeddy.colors;
    for (let i = 0; i < numberColors.length; i++) {
        let optionColor = document.createElement("option");
        choiceColor.appendChild(optionColor);
        optionColor.textContent = choosenTeddy.colors[i];
        optionColor.style.backgroundColor="#ffeaab";
    }
}


function getTeddyColor(buttonBuy, idTeddy) {
    buttonBuy.addEventListener('click', function () {
        let basketContent = JSON.parse(localStorage.getItem("basketContent"));
        let selectedColors = document.getElementById('list').value;
        if (basketContent === null) {
            basketContent = [];
        }
        let product = new Product(idTeddy, selectedColors);
        basketContent.push(product);
        localStorage.setItem("basketContent", JSON.stringify(basketContent));
    })
}

// Requête
async function getTeddies() {
    try {
        let response = await fetch("https://teddies-api.herokuapp.com/api/teddies");
        if (response.ok) {
            let teddies = await response.json();
            console.log(teddies);
            getIdUrl(teddies);
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}

getTeddies();
console.table(localStorage);
