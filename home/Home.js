function menu() {
  const menuToggle = document.getElementById("menu");
  menuToggle.style.display =
    menuToggle.style.display === "none" ? "block" : "none";
}
//=================================================================================
//MODAL
const newProduct = document
  .getElementById("btn-new-product")
  .addEventListener("click", () => {
    modalProductNew.show();
  });

const newMarket = document
  .getElementById("btn-new-market")
  .addEventListener("click", () => {
    modalMarketNew.show();
  });

document.addEventListener("click", (e) => {
  const button = e.target.closest(".btn-new-price");

  if (button) {
    const productId = button.dataset.id;

    console.log("Produto clicado:", productId);

    modalPriceNew.show();
  }
});

const modalProduct = document.getElementById("modalProduct");
const modalMarket = document.getElementById("modalMarket");
const modalPrice = document.getElementById("modalPrice");

const modalProductNew = new bootstrap.Modal(modalProduct);
const modalPriceNew = new bootstrap.Modal(modalPrice);
const modalMarketNew = new bootstrap.Modal(modalMarket);
//=================================================================================

//URL's
const urlProduct =
  "https://projeto-pricefy-backend.onrender.com/pricefy/product/";
const urlMarket =
  "https://projeto-pricefy-backend.onrender.com/pricefy/market/";
const urlPrice = "https://projeto-pricefy-backend.onrender.com/pricefy/price/";
//=================================================================================

//LOCAL STORAGE - Token AND idUser
const idUser = localStorage.getItem("idUser");
const token = localStorage.getItem("Token");

//LOGOUT
function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "../index.html";
}
//===============================================================================

//PRODUCTS

//CREATE PRODUCT
function createProduct() {
  const nameInput = document.getElementById("nameProduct").value;

  const payload = { dsName: nameInput };

  fetch(`${urlProduct}create/${idUser}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(
      (data) => console.log("Sucesso: ", data),
      modalProductNew.hide(),
      allproduct(),
    )
    .catch((error) => console.log("Erro: ", error));
}

const btnModelSaveProduct = document
  .getElementById("btn-save-modal-product")
  .addEventListener("click", createProduct);

//LISTING ALL PRODUCTS
const listaContent = document.getElementById("lista-content");

function allproduct() {
  fetch(`${urlProduct}listAll/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sucesso");
      const products = Array.isArray(data)
        ? data
        : data.content || data.data || [];
      renderProducts(products);
    })
    .catch((error) => console.error("Erro: ", error));
}

function renderProducts(products) {
  listaContent.innerHTML = "";

  if (!products || products.length === 0) {
    listaContent.innerHTML = `<h1 style="text-align="center;">Você não possui nenhum produto cadastrado!</h1>`;
    return;
  }
  const btnPDF = document.createElement("button");
  products.forEach((product) => {
    const div = document.createElement("div");

    div.classList.add("product-item");

    div.innerHTML = `
        <strong>${product.dsName}</strong>
        <span><button class="btn-new-price" data-id="${product.idProduct}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
  <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
</svg>
</button>
        <button class="btn-delete-product" data-id="${product.idProduct}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg>
</button>
</span>
    `;
    listaContent.appendChild(div);
  });
  btnPDF.textContent = `Baixar PDF`;
  btnPDF.id = "pdf-download";

  listaContent.appendChild(btnPDF);
  btnPDF.addEventListener("click", pdfGenerate);
}

//DELETE PRODUCT
function deleteProduct(idProduct) {
  fetch(`${urlProduct}delete/${idProduct}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => {
      console.log("Deletado com sucesso!");
      allproduct();
    })
    .catch((error) => console.error("Erro:", error));
}

listaContent.addEventListener("click", (event) => {
  const button = event.target.closest(".btn-delete-product");

  if (button) {
    const idProduct = button.dataset.id;

    console.log("IdProduct: ", idProduct);

    deleteProduct(idProduct);
  }
});

//DELETE ALL PRODUCTS
function deleteAllProduct() {
  fetch(`${urlProduct}deleteAll/${idUser}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => {
      console.log("Deletado com sucesso!");
      allproduct();
    })
    .catch((error) => console.error("Erro:", error));
}

//===============================================================================

//MARKET

//CREATE MARKET
function createMarket() {
  const name = document.getElementById("nameMarket").value;

  const payload = {
    dsName: name,
  };

  fetch(`${urlMarket}create/${idUser}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sucesso: ", data);
      modalMarketNew.hide();
      allMarket(data);
    })
    .catch((error) => console.log("Erro: ", error));
}

const btnModelSaveMarket = document
  .getElementById("btn-save-modal-market")
  .addEventListener("click", createMarket);

//LISTING ALL MARKET
const selectMarket = document.getElementById("selectMarket");

function allMarket() {
  fetch(`${urlMarket}listAll/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sucesso");
      const markets = Array.isArray(data)
        ? data
        : data.content || data.data || [];
      renderMarket(markets);
    })
    .catch((error) => console.error("Erro: ", error));
}

const btnSavePrice = document.getElementById("btn-save-modal-price");

function renderMarket(markets) {
  selectMarket.innerHTML = "";

  if (!markets || markets.length === 0) {
    selectMarket.innerHTML =
      '<option value="">Nenhum mercado cadastrado</option>';
    btnSavePrice.disabled = true;
    btnSavePrice.style.display = "none";
    return;
  }

  markets.forEach((market) => {
    const option = document.createElement("option");
    option.value = market.idMarket;
    option.textContent = market.dsName;

    selectMarket.appendChild(option);
  });
}

//===============================================================================

//PRICE

//CREATE PRICE

let product = null;
document.addEventListener("click", (e) => {
  const button = e.target.closest(".btn-new-price");

  if (!button) return;

  product = Number(button.dataset.id);

  console.log("Produto selecionado:", product);

  modalPriceNew.show();
});

const avisoPriceModal = document.getElementById("modal-aviso-price");

function createPrice() {
  const market = selectMarket.value;
  const valor = Number(document.getElementById("vlProduct").value);

  const payload = {
    vlProduto: valor,
    market: market,
    product: product,
  };

  fetch(`${urlPrice}create/${idUser}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sucesso: ", data);
      avisoPriceModal.innerText = "Preço cadastrado com sucesso";
      avisoPriceModal.style.fontWeight = "bold";
      avisoPriceModal.style.color = "var(--VerdeEconomia)";
      document.getElementById("vlProduct").value = "";
      setTimeout(() => {
        avisoPriceModal.innerText = "";
        avisoPriceModal.style.color = "";
        avisoPriceModal.style.fontWeight = "";
      }, 3000);
    })
    .catch((error) => {
      console.log("Erro: ", error);
      avisoPriceModal.innerText = "Erro ao cadastrar preço";
      avisoPriceModal.style.color = "red";
    });
}

btnSavePrice.addEventListener("click", createPrice);

//PDF LIST GENERATE
function pdfGenerate() {
  fetch(`${urlPrice}pdf`, {
    method: "GET",
    headers: {
      "Content-Type": "application/pdf",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Pricefy-Lista.pdf";
      link.click();

      URL.revokeObjectURL(url);
    })
    .catch((error) => console.error("Erro: ", error));
}

//===============================================================================

document.addEventListener("DOMContentLoaded", function () {
  allproduct();
  allMarket();

  const btnLogout = document.getElementById("logout");
  btnLogout.addEventListener("click", logout);
});
