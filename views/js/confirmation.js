async function displayBasket(){
    try {
            let response = await fetch("https://teddies-api.herokuapp.com/api/teddies");
            if (response.ok) {
                let teddies = await response.json();
                let basketContent = JSON.parse(localStorage.getItem("basketContent")) || {};
                for (i = 0; i < basketContent.length; i++) {
                    let itemTeddy = teddies.find(teddies => teddies['_id'] == basketContent[i].idTeddy);

                    // Photo
                    let basket = document.getElementById("basket");
                    let div = document.createElement("div");
                    div.className="divConfirmation";
                    basket.appendChild(div);

                    let imageTeddy = document.createElement("img");
                    imageTeddy.className="imagesPanier";
                    imageTeddy.classList.add("card-image-top", "photo");
                    div.appendChild(imageTeddy);
                    imageTeddy.src = itemTeddy.imageUrl;

                    // Nom et couleur
                    let nameColor = document.createElement("p");
                    div.appendChild(nameColor);
                    nameColor.innerHTML = "" + itemTeddy.name + "  (" + basketContent[i].selectedColors + ")";

                    console.log(itemTeddy.name); 
                    console.log(basketContent[i].selectedColors);
                }
            } else {
                console.error('Réponse du serveur : ', response.status);
            }
        }catch (e) {
            console.log(e);
        }
}

function addConfirmationOrder() {
    const confirmationId = localStorage.getItem("orderConfirmationId");
    const messageConfirmation = document.getElementById("orderId");
    messageConfirmation.innerHTML = "Commande n° " + confirmationId;  

    const totalPrice = localStorage.getItem("totalOrder");
    const confirmationPrice = document.getElementById("total-price");
    confirmationPrice.innerHTML = "Prix total : " + totalPrice/100 + " €";
}


// Vider panier, effacer prix et id de commande
function resetOrder() {
    buttonHome = document.getElementById('btn-confirmation');
    buttonHome.addEventListener('click', function () {
        //localStorage.removeItem("orderConfirmationId");
        //localStorage.removeItem('basketContent');
        //localStorage.removeItem('totalOrder');
        localStorage.clear()
        window.location.href = "../index.html";
    })
}



console.table(localStorage);

////////////////////////////////////APPEL DES FONCTIONS/////////////////////////////////////////////////
addConfirmationOrder()
resetOrder()
displayBasket()
