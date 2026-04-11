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

  window.location.href = "auth/Auth.html";
}
//===============================================================================

const urlMarket =
  "https://projeto-pricefy-backend.onrender.com/pricefy/market/";
//===============================================================================

//LOCAL STORAGE - Token AND idUser
const idUser = localStorage.getItem("idUser");
const token = localStorage.getItem("Token");
//===============================================================================

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

const sectionMarket = document.getElementById("lista-mercado");

function renderMarket(markets) {
  sectionMarket.innerHTML = "";

  if (!markets || markets.length === 0) {
    sectionMarket.innerHTML = "<h1>Nenhum mercado cadastrado</h1>";
    return;
  }

  markets.forEach((market) => {
    const div = document.createElement("div");
    div.classList.add("mercado-item");

    div.innerHTML = `
    <input id="input-edit-name-${market.idMarket}" placeholder="${market.dsName}" disabled></input><span>
    <button class="btn-edit-market" data-id="${market.idMarket}">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
</button>
    <button class="btn-delete-market" data-id="${market.idMarket}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg>
</button>
 <button class="btn-save-edit" data-id="${market.idMarket}">
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>
</svg>
</button>
</span>`;

    sectionMarket.appendChild(div);
  });

  sectionMarket.addEventListener("click", (event) => {
    const button = event.target.closest(".btn-edit-market");

    if (button) {
      const idMarket = button.dataset.id;
      const container = button.closest(".mercado-item");
      const input = container.querySelector("input");

      const btnSave = container.querySelector(".btn-save-edit");

      btnSave.style.display = "block";
      input.disabled = false;
      input.focus();
      input.select();

      container.appendChild(btnSave);

      btnSave.addEventListener("click", function () {
        const payload = { dsName: input.value };
        fetch(`${urlMarket}edit/${idMarket}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            btnSave.style.display = "none";
            allMarket();
          })
          .catch((error) => console.error("Erro: ", error));
      });
    }
  });
}

//DELETE MARKET
function deleteMarket(idMarket) {
  fetch(`${urlMarket}delete/${idMarket}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(() => {
      console.log("Deletado com sucesso!");
      allMarket();
    })
    .catch((error) => console.error("Erro:", error));
}

sectionMarket.addEventListener("click", (event) => {
  const button = event.target.closest(".btn-delete-market");

  if (button) {
    const idMarket = button.dataset.id;

    console.log("idMarket: ", idMarket);

    deleteMarket(idMarket);
  }
});

document.addEventListener("DOMContentLoaded", allMarket);
