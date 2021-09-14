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
        localStorage.removeItem("orderConfirmationId");
        localStorage.removeItem('basketContent');
        localStorage.removeItem('totalOrder');
        window.location.href = "../index.html";
    })
}


////////////////////////////////////APPEL DES FONCTIONS/////////////////////////////////////////////////
addConfirmationOrder()
resetOrder()