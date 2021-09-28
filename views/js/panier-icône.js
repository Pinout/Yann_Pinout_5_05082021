function displayIcone() {
	let basketContent = JSON.parse(localStorage.getItem("basketContent")) || {};
	if(basketContent.length > 0) {
		document.getElementById("icone").innerHTML = (basketContent.length).toString();
	}
}

displayIcone();