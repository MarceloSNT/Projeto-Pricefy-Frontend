const bntAuth = document.getElementById("btn-auth");
const inputEmail = document.getElementById("email");
const labelEmail = document.getElementById("email-label");
const btnEnviar = document.getElementById("btn-enviar");

let login = true;
function changeAuth() {
  if (login) {
    login = !login;

    bntAuth.innerText = "cadastrar";
    inputEmail.style.display = "none";
    labelEmail.style.display = "none";
  } else {
    login = !login;
    bntAuth.innerText = "login";
    inputEmail.style.display = "block";
    labelEmail.style.display = "block";
  }
}

btnEnviar.addEventListener("click", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  if (login) {
    registerUser();
  } else {
    loginUser();
  }
}

const urlUser = "https://projeto-pricefy-backend.onrender.com/pricefy/user/";

function registerUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const payload = {
    dsUsername: username,
    dsEmail: email,
    dsPassword: password,
  };

  fetch(`${urlUser}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Resposta completa:");
      console.table(data);
      changeAuth();
    })
    .catch((error) => console.error("Erro: ", error));
}

function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const payload = {
    dsUsername: username,
    dsPassword: password,
  };

  fetch(`${urlUser}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login sucesso:");
      console.table(data);

      if (data.idUser) {
        localStorage.setItem("idUser", data.idUser);
      }

      if (data.token) {
        localStorage.setItem("Token", data.token);
      }

      window.location.href = "/Home.html";
    })
    .catch((error) => console.error("Erro: ", error));
}
