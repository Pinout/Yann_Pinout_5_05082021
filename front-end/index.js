let container = document.getElementById("container");

const display = teddy => {
    container.innerHTML += `
    <article id="cardsProduct" class="produit">
        <img src=${teddy.imageUrl} alt="photos produits" />
        <div class="bloqueDescription">
            <h2> ${teddy.name}</h2>
            <p>${teddy.price / 100}€</p>
        </div>
        <p>${teddy.description}</p>
        <a href="pages/produit.html?id=${teddy.id}"> En savoir plus</a>
    </article>`
};

fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())  
    .then(function (listeProduct) {
        for (let product of listeProduct) {
            let teddy = new Teddy(product)
            display(teddy);
        }
    })

    .catch(function (err) {
        console.log("fetch Error")
        alert("Veuillez nous excuser, ces produits ne sont pas disponible pour le moment ")
    });