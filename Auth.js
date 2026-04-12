const bntAuth = document.getElementById("btn-auth");
const authLegend = document.getElementById("auth-legend");
const inputEmail = document.getElementById("email");
const labelEmail = document.getElementById("email-label");
const btnEnviar = document.getElementById("btn-enviar");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const smallAviso = document.getElementById("small-password");

const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/;

function validatePassword(password) {
  return regexPassword.test(password);
}
smallAviso.style.marginTop = "10px";

const btnEyePassword = document.getElementById("password");

//========================================================================================================

function eyePassword() {
  btnEyePassword.type =
    document.getElementById("password").type == "password"
      ? "text"
      : "password";
}

let login = true;

function changeAuth() {
  if (login) {
    login = !login;

    usernameInput.value = "";
    passwordInput.value = "";
    emailInput.value = "";
    smallAviso.innerHTML = "";
    authLegend.innerText = "Não possui cadastro? ";
    bntAuth.innerText = "Cadastrar";
    inputEmail.style.display = "none";
    labelEmail.style.display = "none";
  } else {
    login = !login;

    usernameInput.value = "";
    passwordInput.value = "";
    emailInput.value = "";
    smallAviso.innerHTML = "";
    authLegend.innerText = "Já é cadastrado? ";
    bntAuth.innerText = "Login";
    inputEmail.style.display = "block";
    labelEmail.style.display = "block";
  }
}

passwordInput.addEventListener("input", function () {
  const password = this.value;

  if (smallAviso) {
    if (password.length === 0) {
      smallAviso.innerHTML = "";
    } else if (validatePassword(password)) {
      smallAviso.innerHTML = "Senha válida";
      smallAviso.style.color = "var(--AzulEscuro)";
      smallAviso.style.fontWeight = "bold";
    } else {
      smallAviso.innerHTML = `<br>
        Deve conter:<br> - 8 ou mais characteres<br>
        - 1 minúscula (a-z)<br> - 1 maiúscula (A-Z)<br>
        - 1 número (0-9) <br> - 1 especial (@$!%*?.&)
      `;
      smallAviso.style.color = "#ff4757";
    }
  }
});

btnEnviar.addEventListener("click", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (password && !validatePassword(password)) {
    passwordInput.focus();
    passwordInput.select();
    return;
  }

  if (!username || !password) {
    return;
  }

  if (login) {
    if (!email) {
      return;
    }
    registerUser(username, email, password);
  } else {
    loginUser(username, password);
  }
}

const urlUser = "https://projeto-pricefy-backend.onrender.com/pricefy/user/";

function registerUser(username, email, password) {
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
    .then((response) => {
      if (!response.ok) throw new Error(`Erro ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log("✅ Cadastro OK:", data);
      changeAuth();
    })
    .catch((error) => {
      console.error("❌ Erro:", error);
    });
}

function loginUser(username, password) {
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
    .then((response) => {
      if (response.status == 403) {
        smallAviso.innerText = "Usuário ou senha incorretos!";
        smallAviso.style.color = "var(--Vermelho)";
        smallAviso.style.fontWeight = "bold";
      }
      if (!response.ok) throw new Error(`Erro ${response.status}`);
      return response.json();
    })
    .then((data) => {
      console.log("✅ Login OK:", data);

      if (data.idUser) localStorage.setItem("idUser", data.idUser);
      if (data.token) localStorage.setItem("Token", data.token);

      window.location.href = "../home/Home.html";
    })
    .catch((error) => {
      console.error("❌ Erro:", error);
    });
}
