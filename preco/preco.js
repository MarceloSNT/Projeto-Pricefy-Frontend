function menu() {
  const menuToggle = document.getElementById("menu");
  menuToggle.style.display =
    menuToggle.style.display === "none" ? "block" : "none";
}

//LOGOUT
const btnLogout = document.getElementById("logout");
btnLogout.addEventListener("click", logout);

function logout() {
  localStorage.clear;

  window.location.href = "../index.html";
}
//===============================================================================

const urlPrice = "https://projeto-pricefy-backend.onrender.com/pricefy/price/";
//===============================================================================

//LOCAL STORAGE - Token AND idUser
const idUser = localStorage.getItem("idUser");
const token = localStorage.getItem("Token");
//===============================================================================

function allprice() {
  fetch(`${urlPrice}listPrices/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sucesso");
      const prices = Array.isArray(data)
        ? data
        : data.content || data.data || [];
      renderprice(prices);
    })
    .catch((error) => console.error("Erro: ", error));
}

//DELETE price
function deleteprice(idPrice) {
  fetch(`${urlPrice}delete/${idPrice}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => {
      console.log("Deletado com sucesso!");
      allprice();
    })
    .catch((error) => console.error("Erro:", error));
}

const sectionPrice = document.getElementById("lista-preco");

function renderprice(prices) {
  sectionPrice.innerHTML = "";

  if (!prices || prices.length === 0) {
    listaContent.innerHTML = `<h1 style="text-align="center;">Você não possui nenhum preço cadastrado!</h1>`;
    return;
  }

  prices.forEach((price) => {
    const div = document.createElement("div");

    div.classList.add("price-item");

    div.innerHTML = `
    <p>${price.product} <br>R$${price.vlProduct} <br>${price.market}</p>
    <span>
    <button class="btn-delete-price" data-id="${price.idPrice}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg>
</button>
</span>
    `;
    sectionPrice.appendChild(div);
  });
}

sectionPrice.addEventListener("click", (event) => {
  const button = event.target.closest(".btn-delete-price");

  if (button) {
    const idPrice = button.dataset.id;

    console.log("idPrice: ", idPrice);

    deleteprice(idPrice);
  }
});

document.addEventListener("DOMContentLoaded", allprice);
