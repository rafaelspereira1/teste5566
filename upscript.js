function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

function setCookie(name, value) {
  const expires = "Fri, 31 Dec 9999 23:59:59 GMT";
  document.cookie = `${name}=${value};expires=${expires};path=/`;
}

function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
}

function cookieExists(name) {
  return getCookie(name) !== null;
}

const button = document.querySelector('[id^="buttonForm"]');
const textSpan = document.querySelector('[id^="buttonForm-span"]');
button?.addEventListener("click", function (event) {
  button.disabled = true;
  textSpan.setAttribute("data-disabled", "true");
  button.style.cursor = "progress";
  const target = event.target;
  const form = target.parentElement?.parentElement;
  const redirectURL = "https://a.alissoncasagrande.com.br/rd200k";
  const inputs = form?.querySelectorAll("input");
  const name = form?.querySelector(".warning-name");
  const email = form?.querySelector(".warning-email");
  const whatsApp = form?.querySelector(".warning-whatsApp");
  const msgError = form?.querySelector(".msg-error");
  const msgSuccess = form?.querySelector(".msg-success");

  const values = {
    name: "",
    email: "",
    whatsApp: "",
  };

  inputs?.forEach((input) => {
    const name = input.name;
    const value = input.value;
    if (name) {
      values[name] = value;
    }
  });

  if (!values.email || !values.whatsApp) {
    if (name !== null) {
      if (!values.name) {
        name.style.display = "block";
        name.style.color = "#ff6969";
      } else {
        name.style.display = "none";
      }
    }

    if (!values.email) {
      email.style.display = "block";
      email.style.color = "#ff6969";
    } else {
      email.style.display = "none";
    }

    if (!values.whatsApp) {
      whatsApp.style.display = "block";
      whatsApp.style.color = "#ff6969";
    } else {
      whatsApp.style.display = "none";
    }

    button.disabled = false;
    button.style.cursor = "pointer";

    return;
  }

  if (name !== null) {
    name.style.display = "none";
  }
  email.style.display = "none";
  whatsApp.style.display = "none";

  const leadRef = getCookie("leadRef");

  if (leadRef) {
    const funnelId = document.querySelector("#funnelId")?.textContent;
    const pageId = document.querySelector("#pageId")?.textContent;

    let valueName;
    if (values.name) {
      valueName = values.name;
    } else {
      valueName = null;
    }

    const payloadData = {
      leadRef: leadRef,
      name: valueName,
      email: values.email,
      telephone: values.whatsApp,
      pageId: pageId,
      funnelId: funnelId,
    };

    fetch(`https://api.upfunnels.com/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((errorData) => {
            if (errorData?.error?.includes("duplicate")) {
              msgError.innerText = "Formulário já foi enviado.";
              msgError.style.display = "block";
              msgSuccess.style.display = "none";
              button.disabled = false;
              button.style.cursor = "pointer";
            } else {
              msgError.style.display = "block";
              msgSuccess.style.display = "none";
              button.disabled = false;
              button.style.cursor = "pointer";
            }
          });
        } else {
          msgError.style.display = "none";

          if (redirectURL) {
            msgSuccess.textContent =
              "Formulário enviado com sucesso. Você será redirecionado em instantes";
            msgSuccess.style.display = "block";

            setTimeout(() => {
              window.location.href = redirectURL;
              msgSuccess.style.display = "block";
              button.disabled = false;
              button.style.cursor = "pointer";
            }, 3000);
          } else {
            msgSuccess.style.display = "block";
            button.disabled = false;
            button.style.cursor = "pointer";
          }
        }
      })
      .catch((error) => {
        msgError.style.display = "block";
        msgSuccess.style.display = "none";
        button.disabled = false;
        button.style.cursor = "pointer";
        console.log(error);
      });
  } else {
    msgError.style.display = "block";
    msgSuccess.style.display = "none";
    button.disabled = false;
    button.style.cursor = "pointer";
  }
});

textSpan?.addEventListener("click", function (event) {
  if (textSpan.getAttribute("data-disabled") === "true" || button.disabled) {
    return;
  }

  button.disabled = true;
  textSpan.setAttribute("data-disabled", "true");
  button.style.cursor = "progress";
  const target = event.target;
  const form = target.parentElement?.parentElement?.parentElement;
  const redirectURL = "https://a.alissoncasagrande.com.br/rd200k";
  const inputs = form?.querySelectorAll("input");
  const name = form?.querySelector(".warning-name");
  const email = form?.querySelector(".warning-email");
  const whatsApp = form?.querySelector(".warning-whatsApp");
  const msgError = form?.querySelector(".msg-error");
  const msgSuccess = form?.querySelector(".msg-success");

  const values = {
    name: "",
    email: "",
    whatsApp: "",
  };

  inputs?.forEach((input) => {
    const name = input.name;
    const value = input.value;
    if (name) {
      values[name] = value;
    }
  });

  if (!values.email || !values.whatsApp) {
    if (name !== null) {
      if (!values.name) {
        name.style.display = "block";
        name.style.color = "#ff6969";
      } else {
        name.style.display = "none";
      }
    }

    if (!values.email) {
      email.style.display = "block";
      email.style.color = "#ff6969";
    } else {
      email.style.display = "none";
    }

    if (!values.whatsApp) {
      whatsApp.style.display = "block";
      whatsApp.style.color = "#ff6969";
    } else {
      whatsApp.style.display = "none";
    }

    button.disabled = false;
    button.style.cursor = "pointer";

    return;
  }

  if (name !== null) {
    name.style.display = "none";
  }
  email.style.display = "none";
  whatsApp.style.display = "none";

  const leadRef = getCookie("leadRef");

  if (leadRef) {
    const funnelId = document.querySelector("#funnelId")?.textContent;
    const pageId = document.querySelector("#pageId")?.textContent;

    let valueName;
    if (values.name) {
      valueName = values.name;
    } else {
      valueName = null;
    }

    const payloadData = {
      leadRef: leadRef,
      name: valueName,
      email: values.email,
      telephone: values.whatsApp,
      pageId: pageId,
      funnelId: funnelId,
    };

    fetch(`https://api.upfunnels.com/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((errorData) => {
            if (errorData?.error?.includes("duplicate")) {
              msgError.innerText = "Formulário já foi enviado.";
              msgError.style.display = "block";
              msgSuccess.style.display = "none";
              button.disabled = false;
              button.style.cursor = "pointer";
            } else {
              msgError.style.display = "block";
              msgSuccess.style.display = "none";
              button.disabled = false;
              button.style.cursor = "pointer";
            }
          });
        } else {
          msgError.style.display = "none";

          if (redirectURL) {
            msgSuccess.textContent =
              "Formulário enviado com sucesso. Você será redirecionado em instantes";
            msgSuccess.style.display = "block";

            setTimeout(() => {
              window.location.href = redirectURL;
              msgSuccess.style.display = "block";
              button.disabled = false;
              button.style.cursor = "pointer";
            }, 3000);
          } else {
            msgSuccess.style.display = "block";
            button.disabled = false;
            button.style.cursor = "pointer";
          }
        }
      })
      .catch((error) => {
        msgError.style.display = "block";
        msgSuccess.style.display = "none";
        button.disabled = false;
        button.style.cursor = "pointer";
      });
  } else {
    msgError.style.display = "block";
    msgSuccess.style.display = "none";
    button.disabled = false;
    button.style.cursor = "pointer";
  }
});

window.onload = function () {
  const form = document.querySelector("form");

  if (form) {
    const name = document.querySelector(".warning-name");
    const email = document.querySelector(".warning-email");
    const whatsApp = document.querySelector(".warning-whatsApp");
    const msgError = document.querySelector(".msg-error");
    const msgSuccess = document.querySelector(".msg-success");

    name.style.display = "none";
    email.style.display = "none";
    whatsApp.style.display = "none";
    msgError.style.display = "none";
    msgSuccess.style.display = "none";
  }

  if (!cookieExists("leadRef")) {
    const randomString = generateRandomString(64);
    setCookie("leadRef", randomString);
  }
};

const maskList = [
  { code: "+247 ####" },
  { code: "+290 ####" },
  { code: "+290 ####" },
  { code: "+683 ####" },
  { code: "+690 ####" },
  { code: "+500 #####" },
  { code: "+676 #####" },
  { code: "+677 #####" },
  { code: "+678 #####" },
  { code: "+688 2####" },
  { code: "+49 ### ###" },
  { code: "+682 ## ###" },
  { code: "+686 ## ###" },
  { code: "+688 90####" },
  { code: "+95 ### ###" },
  { code: "+298 ### ###" },
  { code: "+376 ### ###" },
  { code: "+387 ## ####" },
  { code: "+508 ## ####" },
  { code: "+597 ### ###" },
  { code: "+672 1## ###" },
  { code: "+672 3## ###" },
  { code: "+681 ## ####" },
  { code: "+685 ## ####" },
  { code: "+687 ## ####" },
  { code: "+850 ### ###" },
  { code: "+230 ### ####" },
  { code: "+239 ## #####" },
  { code: "+245 # ######" },
  { code: "+246 ### ####" },
  { code: "+263 # ######" },
  { code: "+269 ## #####" },
  { code: "+297 ### ####" },
  { code: "+299 ## ## ##" },
  { code: "+354 ### ####" },
  { code: "+372 ### ####" },
  { code: "+387 ## #####" },
  { code: "+49 ### ## ##" },
  { code: "+501 ### ####" },
  { code: "+507 ### ####" },
  { code: "+592 ### ####" },
  { code: "+597 ### ####" },
  { code: "+599 ### ####" },
  { code: "+599 ### ####" },
  { code: "+599 ### ####" },
  { code: "+60 # ### ###" },
  { code: "+62 ## ### ##" },
  { code: "+65 #### ####" },
  { code: "+670 ### ####" },
  { code: "+673 ### ####" },
  { code: "+674 ### ####" },
  { code: "+677 ### ####" },
  { code: "+678 ## #####" },
  { code: "+679 ## #####" },
  { code: "+680 ### ####" },
  { code: "+689 ## ## ##" },
  { code: "+691 ### ####" },
  { code: "+692 ### ####" },
  { code: "+95 # ### ###" },
  { code: "+960 ### ####" },
  { code: "+220 ### ## ##" },
  { code: "+232 ## ######" },
  { code: "+234 ## ### ##" },
  { code: "+237 #### ####" },
  { code: "+238 ### ## ##" },
  { code: "+248 # ### ###" },
  { code: "+252 # ### ###" },
  { code: "+252 # ### ###" },
  { code: "+265 1 ### ###" },
  { code: "+291 # ### ###" },
  { code: "+350 ### #####" },
  { code: "+356 #### ####" },
  { code: "+372 #### ####" },
  { code: "+373 #### ####" },
  { code: "+47 ### ## ###" },
  { code: "+49 ### ## ###" },
  { code: "+504 #### ####" },
  { code: "+505 #### ####" },
  { code: "+506 #### ####" },
  { code: "+52 ## ## ####" },
  { code: "+53 # ### ####" },
  { code: "+599 9### ####" },
  { code: "+60 ## ### ###" },
  { code: "+62 ## ### ###" },
  { code: "+64 ## ### ###" },
  { code: "+66 ## ### ###" },
  { code: "+670 77# #####" },
  { code: "+670 78# #####" },
  { code: "+850 #### ####" },
  { code: "+852 #### ####" },
  { code: "+853 #### ####" },
  { code: "+886 #### ####" },
  { code: "+95 ## ### ###" },
  { code: "+961 # ### ###" },
  { code: "+965 #### ####" },
  { code: "+967 # ### ###" },
  { code: "+973 #### ####" },
  { code: "+974 #### ####" },
  { code: "+975 # ### ###" },
  { code: "+1 ### ### ####" },
  { code: "+1 242 ### ####" },
  { code: "+1 246 ### ####" },
  { code: "+1 264 ### ####" },
  { code: "+1 268 ### ####" },
  { code: "+1 284 ### ####" },
  { code: "+1 340 ### ####" },
  { code: "+1 345 ### ####" },
  { code: "+1 441 ### ####" },
  { code: "+1 473 ### ####" },
  { code: "+1 649 ### ####" },
  { code: "+1 664 ### ####" },
  { code: "+1 670 ### ####" },
  { code: "+1 671 ### ####" },
  { code: "+1 684 ### ####" },
  { code: "+1 721 ### ####" },
  { code: "+1 758 ### ####" },
  { code: "+1 767 ### ####" },
  { code: "+1 784 ### ####" },
  { code: "+1 809 ### ####" },
  { code: "+1 829 ### ####" },
  { code: "+1 849 ### ####" },
  { code: "+1 868 ### ####" },
  { code: "+1 869 ### ####" },
  { code: "+1 876 ### ####" },
  { code: "+216 ## ### ###" },
  { code: "+218 ## ### ###" },
  { code: "+222 ## ## ####" },
  { code: "+223 ## ## ####" },
  { code: "+224 ## ### ###" },
  { code: "+225 ## ### ###" },
  { code: "+226 ## ## ####" },
  { code: "+227 ## ## ####" },
  { code: "+228 ## ### ###" },
  { code: "+229 ## ## ####" },
  { code: "+231 ## ### ###" },
  { code: "+234 ## ### ###" },
  { code: "+236 ## ## ####" },
  { code: "+241 # ## ## ##" },
  { code: "+252 ## ### ###" },
  { code: "+254 ### ######" },
  { code: "+257 ## ## ####" },
  { code: "+258 ## ### ###" },
  { code: "+262 ##### ####" },
  { code: "+262 ##### ####" },
  { code: "+266 # ### ####" },
  { code: "+267 ## ### ###" },
  { code: "+268 ## ## ####" },
  { code: "+27 ## ### ####" },
  { code: "+31 ## ### ####" },
  { code: "+32 ### ### ###" },
  { code: "+33 ### ### ###" },
  { code: "+34 ### ### ###" },
  { code: "+357 ## ### ###" },
  { code: "+36 ### ### ###" },
  { code: "+370 ### ## ###" },
  { code: "+371 ## ### ###" },
  { code: "+374 ## ### ###" },
  { code: "+377 ## ### ###" },
  { code: "+382 ## ### ###" },
  { code: "+385 ## ### ###" },
  { code: "+386 ## ### ###" },
  { code: "+389 ## ### ###" },
  { code: "+39 6 698 #####" },
  { code: "+40 ## ### ####" },
  { code: "+41 ## ### ####" },
  { code: "+45 ## ## ## ##" },
  { code: "+46 ## ### ####" },
  { code: "+48 ### ### ###" },
  { code: "+49 ### ## ####" },
  { code: "+502 # ### ####" },
  { code: "+503 ## ## ####" },
  { code: "+509 ## ## ####" },
  { code: "+51 ### ### ###" },
  { code: "+56 # #### ####" },
  { code: "+591 # ### ####" },
  { code: "+593 # ### ####" },
  { code: "+594 ##### ####" },
  { code: "+60 ## ### ####" },
  { code: "+60 ### ### ###" },
  { code: "+61 # #### ####" },
  { code: "+62 ## ### ####" },
  { code: "+62 8## ### ###" },
  { code: "+64 ### ### ###" },
  { code: "+66 ## ### ####" },
  { code: "+675 ### ## ###" },
  { code: "+81 ### ### ###" },
  { code: "+82 ## ### ####" },
  { code: "+84 ## #### ###" },
  { code: "+850 ## ### ###" },
  { code: "+855 ## ### ###" },
  { code: "+856 ## ### ###" },
  { code: "+880 ## ### ###" },
  { code: "+93 ## ### ####" },
  { code: "+94 ## ### ####" },
  { code: "+961 ## ### ###" },
  { code: "+966 # ### ####" },
  { code: "+967 ## ### ###" },
  { code: "+968 ## ### ###" },
  { code: "+971 # ### ####" },
  { code: "+972 # ### ####" },
  { code: "+975 17 ### ###" },
  { code: "+976 ## ## ####" },
  { code: "+977 ## ### ###" },
  { code: "+993 # ### ####" },
  { code: "+20 ### ### ####" },
  { code: "+211 ## ### ####" },
  { code: "+212 ## #### ###" },
  { code: "+213 ## ### ####" },
  { code: "+218 21 ### ####" },
  { code: "+221 ## ### ####" },
  { code: "+233 ### ### ###" },
  { code: "+235 ## ## ## ##" },
  { code: "+240 ## ### ####" },
  { code: "+242 ## ### ####" },
  { code: "+243 ### ### ###" },
  { code: "+244 ### ### ###" },
  { code: "+249 ## ### ####" },
  { code: "+250 ### ### ###" },
  { code: "+251 ## ### ####" },
  { code: "+253 ## ## ## ##" },
  { code: "+255 ## ### ####" },
  { code: "+256 ### ### ###" },
  { code: "+260 ## ### ####" },
  { code: "+261 ## ## #####" },
  { code: "+264 ## ### ####" },
  { code: "+265 # #### ####" },
  { code: "+30 ### ### ####" },
  { code: "+351 ## ### ####" },
  { code: "+352 ### ### ###" },
  { code: "+353 ### ### ###" },
  { code: "+355 ### ### ###" },
  { code: "+359 ### ### ###" },
  { code: "+377 ### ### ###" },
  { code: "+378 #### ######" },
  { code: "+381 ## ### ####" },
  { code: "+39 ### #### ###" },
  { code: "+420 ### ### ###" },
  { code: "+421 ### ### ###" },
  { code: "+43 ### ### ####" },
  { code: "+44 ## #### ####" },
  { code: "+49 ### ### ####" },
  { code: "+52 ### ### ####" },
  { code: "+54 ### ### ####" },
  { code: "+55 ## ##### ####" },
  { code: "+55 ## 7### ####" },
  { code: "+57 ### ### ####" },
  { code: "+58 ### ### ####" },
  { code: "+590 ### ### ###" },
  { code: "+593 ## ### ####" },
  { code: "+595 ### ### ###" },
  { code: "+598 # ### ## ##" },
  { code: "+62 8## ### ####" },
  { code: "+63 ### ### ####" },
  { code: "+64 ### ### ####" },
  { code: "+7 ### ### ## ##" },
  { code: "+7 6## ### ## ##" },
  { code: "+7 7## ### ## ##" },
  { code: "+81 ## #### ####" },
  { code: "+84 ### #### ###" },
  { code: "+86 ### #### ###" },
  { code: "+886 # #### ####" },
  { code: "+90 ### ### ####" },
  { code: "+91 #### ### ###" },
  { code: "+92 ### ### ####" },
  { code: "+962 # #### ####" },
  { code: "+963 ## #### ###" },
  { code: "+966 5 #### ####" },
  { code: "+967 ### ### ###" },
  { code: "+970 ## ### ####" },
  { code: "+971 5# ### ####" },
  { code: "+972 5# ### ####" },
  { code: "+98 ### ### ####" },
  { code: "+992 ## ### ####" },
  { code: "+995 ### ### ###" },
  { code: "+996 ### ### ###" },
  { code: "+998 ## ### ####" },
  { code: "+234 ### ### ####" },
  { code: "+234 ### ### ####" },
  { code: "+375 ## ### ## ##" },
  { code: "+380 ## ### ## ##" },
  { code: "+423 ### ### ####" },
  { code: "+49 #### ### ####" },
  { code: "+55 ## 9#### ####" },
  { code: "+596 ### ## ## ##" },
  { code: "+850 ### #### ###" },
  { code: "+850 191 ### ####" },
  { code: "+856 20## ### ###" },
  { code: "+86 ### #### ####" },
  { code: "+964 ### ### ####" },
  { code: "+994 ## ### ## ##" },
  { code: "+358 ### ### ## ##" },
  { code: "+62 8## ### ## ###" },
  { code: "+86 ## ##### #####" },
  { code: "+850 #### #############" },
];
const countryList = [
  {
    pais: "Afeganistão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Afghanistan.svg/23px-Flag_of_Afghanistan.svg.png",
    ddi: 93,
    continente: "Ásia",
  },
  {
    pais: "África do Sul",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/23px-Flag_of_South_Africa.svg.png",
    ddi: 27,
    continente: "África",
  },
  {
    pais: "Albânia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/21px-Flag_of_Albania.svg.png",
    ddi: 355,
    continente: "Europa",
  },
  {
    pais: "Alemanha",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/23px-Flag_of_Germany.svg.png",
    ddi: 49,
    continente: "Europa",
  },
  {
    pais: "Andorra",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Andorra.svg/22px-Flag_of_Andorra.svg.png",
    ddi: 376,
    continente: "Europa",
  },
  {
    pais: "Angola",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/23px-Flag_of_Angola.svg.png",
    ddi: 244,
    continente: "África",
  },
  {
    pais: "Anguilla",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Anguilla.svg/23px-Flag_of_Anguilla.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Antígua e Barbuda",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Antigua_and_Barbuda.svg/23px-Flag_of_Antigua_and_Barbuda.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Antilhas Holandesas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_Netherlands_Antilles_%281986%E2%80%932010%29.svg/23px-Flag_of_the_Netherlands_Antilles_%281986%E2%80%932010%29.svg.png",
    ddi: 599,
    continente: "América Central",
  },
  {
    pais: "Arábia Saudita",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/23px-Flag_of_Saudi_Arabia.svg.png",
    ddi: 966,
    continente: "Ásia",
  },
  {
    pais: "Argélia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/23px-Flag_of_Algeria.svg.png",
    ddi: 213,
    continente: "África",
  },
  {
    pais: "Argentina",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/23px-Flag_of_Argentina.svg.png",
    ddi: 54,
    continente: "América do Sul",
  },
  {
    pais: "Armênia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Armenia.svg/23px-Flag_of_Armenia.svg.png",
    ddi: 374,
    continente: "Ásia",
  },
  {
    pais: "Aruba",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Aruba.svg/23px-Flag_of_Aruba.svg.png",
    ddi: 297,
    continente: "América Central",
  },
  {
    pais: "Ascensão",
    img: "Ascensão",
    ddi: 247,
    continente: "África",
  },
  {
    pais: "Austrália",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/23px-Flag_of_Australia.svg.png",
    ddi: 61,
    continente: "Oceania",
  },
  {
    pais: "Áustria",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/23px-Flag_of_Austria.svg.png",
    ddi: 43,
    continente: "Europa",
  },
  {
    pais: "Azerbaijão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/23px-Flag_of_Azerbaijan.svg.png",
    ddi: 994,
    continente: "Ásia",
  },
  {
    pais: "Bahamas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/77/Bahamas_Flag.svg/23px-Bahamas_Flag.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Bangladesh",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/23px-Flag_of_Bangladesh.svg.png",
    ddi: 880,
    continente: "Ásia",
  },
  {
    pais: "Barbados",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Flag_of_Barbados.svg/23px-Flag_of_Barbados.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Bahrein",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/23px-Flag_of_Bahrain.svg.png",
    ddi: 973,
    continente: "Ásia",
  },
  {
    pais: "Bélgica",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Belgium_%28civil%29.svg/23px-Flag_of_Belgium_%28civil%29.svg.png",
    ddi: 32,
    continente: "Europa",
  },
  {
    pais: "Belize",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flag_of_Belize.svg/23px-Flag_of_Belize.svg.png",
    ddi: 501,
    continente: "América Central",
  },
  {
    pais: "Benim",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Benin.svg/23px-Flag_of_Benin.svg.png",
    ddi: 229,
    continente: "África",
  },
  {
    pais: "Bermudas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Bermuda.svg/23px-Flag_of_Bermuda.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Bielorrússia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/85/Flag_of_Belarus.svg/23px-Flag_of_Belarus.svg.png",
    ddi: 375,
    continente: "Europa",
  },
  {
    pais: "Bolívia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/22px-Flag_of_Bolivia.svg.png",
    ddi: 591,
    continente: "América do Sul",
  },
  {
    pais: "Bósnia e Herzegovina",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flag_of_Bosnia_and_Herzegovina.svg/23px-Flag_of_Bosnia_and_Herzegovina.svg.png",
    ddi: 387,
    continente: "Europa",
  },
  {
    pais: "Botswana",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_Botswana.svg/23px-Flag_of_Botswana.svg.png",
    ddi: 267,
    continente: "África",
  },
  {
    pais: "Brasil",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png",
    ddi: 55,
    continente: "América do Sul",
  },
  {
    pais: "Brunei",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Brunei.svg/23px-Flag_of_Brunei.svg.png",
    ddi: 673,
    continente: "Ásia",
  },
  {
    pais: "Bulgária",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Bulgaria.svg/23px-Flag_of_Bulgaria.svg.png",
    ddi: 359,
    continente: "Europa",
  },
  {
    pais: "Burkina Faso",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Burkina_Faso.svg/23px-Flag_of_Burkina_Faso.svg.png",
    ddi: 226,
    continente: "África",
  },
  {
    pais: "Burundi",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/5/50/Flag_of_Burundi.svg/23px-Flag_of_Burundi.svg.png",
    ddi: 257,
    continente: "África",
  },
  {
    pais: "Butão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/91/Flag_of_Bhutan.svg/23px-Flag_of_Bhutan.svg.png",
    ddi: 975,
    continente: "Ásia",
  },
  {
    pais: "Cabo Verde",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Cape_Verde.svg/23px-Flag_of_Cape_Verde.svg.png",
    ddi: 238,
    continente: "África",
  },
  {
    pais: "Camarões",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/23px-Flag_of_Cameroon.svg.png",
    ddi: 237,
    continente: "África",
  },
  {
    pais: "Camboja",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/23px-Flag_of_Cambodia.svg.png",
    ddi: 855,
    continente: "Ásia",
  },
  {
    pais: "Canadá",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/23px-Flag_of_Canada_%28Pantone%29.svg.png",
    ddi: 1,
    continente: "América do Norte",
  },
  {
    pais: "Cazaquistão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kazakhstan.svg/23px-Flag_of_Kazakhstan.svg.png",
    ddi: 7,
    continente: "Ásia",
  },
  {
    pais: "Chade",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Flag_of_Chad.svg/23px-Flag_of_Chad.svg.png",
    ddi: 235,
    continente: "África",
  },
  {
    pais: "Chile",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/23px-Flag_of_Chile.svg.png",
    ddi: 56,
    continente: "América do Sul",
  },
  {
    pais: "República Popular da China",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/23px-Flag_of_the_People%27s_Republic_of_China.svg.png",
    ddi: 86,
    continente: "Ásia",
  },
  {
    pais: "Chipre",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Cyprus.svg/23px-Flag_of_Cyprus.svg.png",
    ddi: 357,
    continente: "Europa",
  },
  {
    pais: "Colômbia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/23px-Flag_of_Colombia.svg.png",
    ddi: 57,
    continente: "América do Sul",
  },
  {
    pais: "Comores",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/94/Flag_of_the_Comoros.svg/23px-Flag_of_the_Comoros.svg.png",
    ddi: 269,
    continente: "África",
  },
  {
    pais: "CongoBrazzaville",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_the_Republic_of_the_Congo.svg/23px-Flag_of_the_Republic_of_the_Congo.svg.png",
    ddi: 242,
    continente: "África",
  },
  {
    pais: "CongoKinshasa",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/20px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png",
    ddi: 243,
    continente: "África",
  },
  {
    pais: "Coreia do Norte",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/5/51/Flag_of_North_Korea.svg/23px-Flag_of_North_Korea.svg.png",
    ddi: 850,
    continente: "Ásia",
  },
  {
    pais: "Coreia do Sul",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/23px-Flag_of_South_Korea.svg.png",
    ddi: 82,
    continente: "Ásia",
  },
  {
    pais: "Costa do Marfim",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_C%C3%B4te_d%27Ivoire.svg/23px-Flag_of_C%C3%B4te_d%27Ivoire.svg.png",
    ddi: 225,
    continente: "África",
  },
  {
    pais: "Costa Rica",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Costa_Rica.svg/23px-Flag_of_Costa_Rica.svg.png",
    ddi: 506,
    continente: "América Central",
  },
  {
    pais: "Croácia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/23px-Flag_of_Croatia.svg.png",
    ddi: 385,
    continente: "Europa",
  },
  {
    pais: "Cuba",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Flag_of_Cuba.svg/23px-Flag_of_Cuba.svg.png",
    ddi: 53,
    continente: "América Central",
  },
  {
    pais: "Dinamarca",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/20px-Flag_of_Denmark.svg.png",
    ddi: 45,
    continente: "Europa",
  },
  {
    pais: "Djibuti",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_Djibouti.svg/23px-Flag_of_Djibouti.svg.png",
    ddi: 253,
    continente: "África",
  },
  {
    pais: "Dominica",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Flag_of_Dominica.svg/23px-Flag_of_Dominica.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Egipto",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/23px-Flag_of_Egypt.svg.png",
    ddi: 20,
    continente: "África/Ásia",
  },
  {
    pais: "El Salvador",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/34/Flag_of_El_Salvador.svg/23px-Flag_of_El_Salvador.svg.png",
    ddi: 503,
    continente: "América Central",
  },
  {
    pais: "Emirados Árabes Unidos",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/23px-Flag_of_the_United_Arab_Emirates.svg.png",
    ddi: 971,
    continente: "Ásia",
  },
  {
    pais: "Equador",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Flag_of_Ecuador.svg/23px-Flag_of_Ecuador.svg.png",
    ddi: 593,
    continente: "América do Sul",
  },
  {
    pais: "Eritreia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/29/Flag_of_Eritrea.svg/23px-Flag_of_Eritrea.svg.png",
    ddi: 291,
    continente: "África",
  },
  {
    pais: "Eslováquia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Slovakia.svg/23px-Flag_of_Slovakia.svg.png",
    ddi: 421,
    continente: "Europa",
  },
  {
    pais: "Eslovénia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Flag_of_Slovenia.svg/23px-Flag_of_Slovenia.svg.png",
    ddi: 386,
    continente: "Europa",
  },
  {
    pais: "Espanha",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/23px-Flag_of_Spain.svg.png",
    ddi: 34,
    continente: "Europa",
  },
  {
    pais: "Estados Unidos",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/23px-Flag_of_the_United_States.svg.png",
    ddi: 1,
    continente: "América do Norte",
  },
  {
    pais: "Estónia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flag_of_Estonia.svg/23px-Flag_of_Estonia.svg.png",
    ddi: 372,
    continente: "Europa",
  },
  {
    pais: "Etiópia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_Ethiopia.svg/23px-Flag_of_Ethiopia.svg.png",
    ddi: 251,
    continente: "África",
  },
  {
    pais: "Fiji",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Fiji.svg/23px-Flag_of_Fiji.svg.png",
    ddi: 679,
    continente: "Oceania",
  },
  {
    pais: "Filipinas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_the_Philippines.svg/23px-Flag_of_the_Philippines.svg.png",
    ddi: 63,
    continente: "Ásia",
  },
  {
    pais: "Finlândia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/23px-Flag_of_Finland.svg.png",
    ddi: 358,
    continente: "Europa",
  },
  {
    pais: "França",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/23px-Flag_of_France.svg.png",
    ddi: 33,
    continente: "Europa",
  },
  {
    pais: "Gabão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/04/Flag_of_Gabon.svg/20px-Flag_of_Gabon.svg.png",
    ddi: 241,
    continente: "África",
  },
  {
    pais: "Gâmbia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_The_Gambia.svg/23px-Flag_of_The_Gambia.svg.png",
    ddi: 220,
    continente: "África",
  },
  {
    pais: "Gana",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/23px-Flag_of_Ghana.svg.png",
    ddi: 233,
    continente: "África",
  },
  {
    pais: "Geórgia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/23px-Flag_of_Georgia.svg.png",
    ddi: 995,
    continente: "Ásia",
  },
  {
    pais: "Gibraltar",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/02/Flag_of_Gibraltar.svg/23px-Flag_of_Gibraltar.svg.png",
    ddi: 350,
    continente: "Europa",
  },
  {
    pais: "Granada",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Grenada.svg/23px-Flag_of_Grenada.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Grécia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/23px-Flag_of_Greece.svg.png",
    ddi: 30,
    continente: "Europa",
  },
  {
    pais: "Groenlândia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_Greenland.svg/23px-Flag_of_Greenland.svg.png",
    ddi: 299,
    continente: "América do Norte",
  },
  {
    pais: "Guadalupe",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/23px-Flag_of_France.svg.png",
    ddi: 590,
    continente: "América Central",
  },
  {
    pais: "Guam",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/07/Flag_of_Guam.svg/23px-Flag_of_Guam.svg.png",
    ddi: 1,
    continente: "Oceania",
  },
  {
    pais: "Guatemala",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Flag_of_Guatemala.svg/23px-Flag_of_Guatemala.svg.png",
    ddi: 502,
    continente: "América Central",
  },
  {
    pais: "Guiana",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/99/Flag_of_Guyana.svg/23px-Flag_of_Guyana.svg.png",
    ddi: 592,
    continente: "América do Sul",
  },
  {
    pais: "Guiana Francesa",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/29/Flag_of_French_Guiana.svg/23px-Flag_of_French_Guiana.svg.png",
    ddi: 594,
    continente: "América do Sul",
  },
  {
    pais: "Guiné",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Flag_of_Guinea.svg/23px-Flag_of_Guinea.svg.png",
    ddi: 224,
    continente: "África",
  },
  {
    pais: "GuinéBissau",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Guinea-Bissau.svg/23px-Flag_of_Guinea-Bissau.svg.png",
    ddi: 245,
    continente: "África",
  },
  {
    pais: "Guiné Equatorial",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Equatorial_Guinea.svg/23px-Flag_of_Equatorial_Guinea.svg.png",
    ddi: 240,
    continente: "África",
  },
  {
    pais: "Haiti",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Haiti.svg/23px-Flag_of_Haiti.svg.png",
    ddi: 509,
    continente: "América Central",
  },
  {
    pais: "Honduras",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Honduras_%282008_Olympics%29.svg/23px-Flag_of_Honduras_%282008_Olympics%29.svg.png",
    ddi: 504,
    continente: "América Central",
  },
  {
    pais: "Hong Kong",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Flag_of_Hong_Kong.svg/23px-Flag_of_Hong_Kong.svg.png",
    ddi: 852,
    continente: "Ásia",
  },
  {
    pais: "Hungria",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/23px-Flag_of_Hungary.svg.png",
    ddi: 36,
    continente: "Europa",
  },
  {
    pais: "Iêmen",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Yemen.svg/23px-Flag_of_Yemen.svg.png",
    ddi: 967,
    continente: "Ásia",
  },
  {
    pais: "Ilhas Cayman",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_the_Cayman_Islands.svg/23px-Flag_of_the_Cayman_Islands.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Ilha Christmas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/67/Flag_of_Christmas_Island.svg/23px-Flag_of_Christmas_Island.svg.png",
    ddi: 672,
    continente: "Oceania",
  },
  {
    pais: "Ilhas Cocos",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_the_Cocos_%28Keeling%29_Islands.svg/23px-Flag_of_the_Cocos_%28Keeling%29_Islands.svg.png",
    ddi: 672,
    continente: "Oceania",
  },
  {
    pais: "Ilhas Cook",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/35/Flag_of_the_Cook_Islands.svg/23px-Flag_of_the_Cook_Islands.svg.png",
    ddi: 682,
    continente: "Oceania",
  },
  {
    pais: "Ilhas Féroe",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Flag_of_the_Faroe_Islands.svg/21px-Flag_of_the_Faroe_Islands.svg.png",
    ddi: 298,
    continente: "Europa",
  },
  {
    pais: "Ilha Heard e Ilhas McDonald",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/23px-Flag_of_Australia.svg.png",
    ddi: 672,
    continente: "Oceania",
  },
  {
    pais: "Maldivas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Maldives.svg/23px-Flag_of_Maldives.svg.png",
    ddi: 960,
    continente: "Ásia",
  },
  {
    pais: "Ilhas Malvinas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_Falkland_Islands.svg/23px-Flag_of_the_Falkland_Islands.svg.png",
    ddi: 500,
    continente: "América do Sul",
  },
  {
    pais: "Ilhas Marianas do Norte",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Flag_of_the_Northern_Mariana_Islands.svg/23px-Flag_of_the_Northern_Mariana_Islands.svg.png",
    ddi: 1,
    continente: "Oceania",
  },
  {
    pais: "Ilhas Marshall",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Flag_of_the_Marshall_Islands.svg/23px-Flag_of_the_Marshall_Islands.svg.png",
    ddi: 692,
    continente: "Oceania",
  },
  {
    pais: "Ilha Norfolk",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Norfolk_Island.svg/23px-Flag_of_Norfolk_Island.svg.png",
    ddi: 672,
    continente: "Oceania",
  },
  {
    pais: "Ilhas Salomão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/74/Flag_of_the_Solomon_Islands.svg/23px-Flag_of_the_Solomon_Islands.svg.png",
    ddi: 677,
    continente: "Oceania",
  },
  {
    pais: "Ilhas Virgens Americanas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Flag_of_the_United_States_Virgin_Islands.svg/23px-Flag_of_the_United_States_Virgin_Islands.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Ilhas Virgens Britânicas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/42/Flag_of_the_British_Virgin_Islands.svg/23px-Flag_of_the_British_Virgin_Islands.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Índia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/23px-Flag_of_India.svg.png",
    ddi: 91,
    continente: "Ásia",
  },
  {
    pais: "Indonésia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/23px-Flag_of_Indonesia.svg.png",
    ddi: 62,
    continente: "Ásia/Oceania",
  },
  {
    pais: "Irã",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/23px-Flag_of_Iran.svg.png",
    ddi: 98,
    continente: "Ásia",
  },
  {
    pais: "Iraque",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Iraq.svg/23px-Flag_of_Iraq.svg.png",
    ddi: 964,
    continente: "Ásia",
  },
  {
    pais: "Irlanda",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/45/Flag_of_Ireland.svg/23px-Flag_of_Ireland.svg.png",
    ddi: 353,
    continente: "Europa",
  },
  {
    pais: "Islândia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Iceland.svg/21px-Flag_of_Iceland.svg.png",
    ddi: 354,
    continente: "Europa",
  },
  {
    pais: "Israel",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/21px-Flag_of_Israel.svg.png",
    ddi: 972,
    continente: "Ásia",
  },
  {
    pais: "Itália",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/23px-Flag_of_Italy.svg.png",
    ddi: 39,
    continente: "Europa",
  },
  {
    pais: "Jamaica",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_Jamaica.svg/23px-Flag_of_Jamaica.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Japão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/23px-Flag_of_Japan.svg.png",
    ddi: 81,
    continente: "Ásia",
  },
  {
    pais: "Jordânia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Jordan.svg/23px-Flag_of_Jordan.svg.png",
    ddi: 962,
    continente: "Ásia",
  },
  {
    pais: "Kiribati",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Flag_of_Kiribati.svg/23px-Flag_of_Kiribati.svg.png",
    ddi: 686,
    continente: "Oceania",
  },
  {
    pais: "Kosovo",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Flag_of_Kosovo.svg/21px-Flag_of_Kosovo.svg.png",
    ddi: 383,
    continente: "Europa",
  },
  {
    pais: "Kuwait",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Kuwait.svg/23px-Flag_of_Kuwait.svg.png",
    ddi: 965,
    continente: "Ásia",
  },
  {
    pais: "Laos",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/23px-Flag_of_Laos.svg.png",
    ddi: 856,
    continente: "Ásia",
  },
  {
    pais: "Lesoto",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Flag_of_Lesotho.svg/23px-Flag_of_Lesotho.svg.png",
    ddi: 266,
    continente: "África",
  },
  {
    pais: "Letônia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Latvia.svg/23px-Flag_of_Latvia.svg.png",
    ddi: 371,
    continente: "Europa",
  },
  {
    pais: "Líbano",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Lebanon.svg/23px-Flag_of_Lebanon.svg.png",
    ddi: 961,
    continente: "Ásia",
  },
  {
    pais: "Libéria",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_Liberia.svg/23px-Flag_of_Liberia.svg.png",
    ddi: 231,
    continente: "África",
  },
  {
    pais: "Líbia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Libya.svg/23px-Flag_of_Libya.svg.png",
    ddi: 218,
    continente: "África",
  },
  {
    pais: "Liechtenstein",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/47/Flag_of_Liechtenstein.svg/23px-Flag_of_Liechtenstein.svg.png",
    ddi: 423,
    continente: "Europa",
  },
  {
    pais: "Lituânia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Lithuania.svg/23px-Flag_of_Lithuania.svg.png",
    ddi: 370,
    continente: "Europa",
  },
  {
    pais: "Luxemburgo",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/da/Flag_of_Luxembourg.svg/23px-Flag_of_Luxembourg.svg.png",
    ddi: 352,
    continente: "Europa",
  },
  {
    pais: "Macau",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/63/Flag_of_Macau.svg/23px-Flag_of_Macau.svg.png",
    ddi: 853,
    continente: "Ásia",
  },
  {
    pais: "República da Macedônia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_North_Macedonia.svg/23px-Flag_of_North_Macedonia.svg.png",
    ddi: 389,
    continente: "Europa",
  },
  {
    pais: "Madagascar",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Madagascar.svg/23px-Flag_of_Madagascar.svg.png",
    ddi: 261,
    continente: "África",
  },
  {
    pais: "Malásia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/23px-Flag_of_Malaysia.svg.png",
    ddi: 60,
    continente: "Ásia",
  },
  {
    pais: "Malawi",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Flag_of_Malawi.svg/23px-Flag_of_Malawi.svg.png",
    ddi: 265,
    continente: "África",
  },
  {
    pais: "Mali",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Mali.svg/23px-Flag_of_Mali.svg.png",
    ddi: 223,
    continente: "África",
  },
  {
    pais: "Malta",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Malta.svg/23px-Flag_of_Malta.svg.png",
    ddi: 356,
    continente: "Europa",
  },
  {
    pais: "Marrocos",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/23px-Flag_of_Morocco.svg.png",
    ddi: 212,
    continente: "África",
  },
  {
    pais: "Martinica",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/23px-Flag_of_France.svg.png",
    ddi: 596,
    continente: "América Central",
  },
  {
    pais: "Maurícia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Mauritius.svg/23px-Flag_of_Mauritius.svg.png",
    ddi: 230,
    continente: "África",
  },
  {
    pais: "Mauritânia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/43/Flag_of_Mauritania.svg/23px-Flag_of_Mauritania.svg.png",
    ddi: 222,
    continente: "África",
  },
  {
    pais: "Mayotte",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/23px-Flag_of_France.svg.png",
    ddi: 269,
    continente: "África",
  },
  {
    pais: "México",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/23px-Flag_of_Mexico.svg.png",
    ddi: 52,
    continente: "América do Norte",
  },
  {
    pais: "Estados Federados da Micronésia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Flag_of_the_Federated_States_of_Micronesia.svg/23px-Flag_of_the_Federated_States_of_Micronesia.svg.png",
    ddi: 691,
    continente: "Oceania",
  },
  {
    pais: "Moçambique",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Mozambique.svg/23px-Flag_of_Mozambique.svg.png",
    ddi: 258,
    continente: "África",
  },
  {
    pais: "Moldávia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Moldova.svg/23px-Flag_of_Moldova.svg.png",
    ddi: 373,
    continente: "Europa",
  },
  {
    pais: "Mônaco",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/19px-Flag_of_Monaco.svg.png",
    ddi: 377,
    continente: "Europa",
  },
  {
    pais: "Mongólia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Mongolia.svg/23px-Flag_of_Mongolia.svg.png",
    ddi: 976,
    continente: "Ásia",
  },
  {
    pais: "Montenegro",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/64/Flag_of_Montenegro.svg/23px-Flag_of_Montenegro.svg.png",
    ddi: 382,
    continente: "Europa",
  },
  {
    pais: "Montserrat",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Montserrat.svg/23px-Flag_of_Montserrat.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Myanmar",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/23px-Flag_of_Myanmar.svg.png",
    ddi: 95,
    continente: "Ásia",
  },
  {
    pais: "Namíbia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Namibia.svg/23px-Flag_of_Namibia.svg.png",
    ddi: 264,
    continente: "África",
  },
  {
    pais: "Nauru",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/30/Flag_of_Nauru.svg/23px-Flag_of_Nauru.svg.png",
    ddi: 674,
    continente: "Oceania",
  },
  {
    pais: "Nepal",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Flag_of_Nepal.svg/12px-Flag_of_Nepal.svg.png",
    ddi: 977,
    continente: "Ásia",
  },
  {
    pais: "Nicarágua",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Nicaragua.svg/23px-Flag_of_Nicaragua.svg.png",
    ddi: 505,
    continente: "América Central",
  },
  {
    pais: "Níger",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Flag_of_Niger.svg/18px-Flag_of_Niger.svg.png",
    ddi: 227,
    continente: "África",
  },
  {
    pais: "Nigéria",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/79/Flag_of_Nigeria.svg/23px-Flag_of_Nigeria.svg.png",
    ddi: 234,
    continente: "África",
  },
  {
    pais: "Niue",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Niue.svg/23px-Flag_of_Niue.svg.png",
    ddi: 683,
    continente: "Oceania",
  },
  {
    pais: "Noruega",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/21px-Flag_of_Norway.svg.png",
    ddi: 47,
    continente: "Europa",
  },
  {
    pais: "Nova Caledônia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/26/Flags_of_New_Caledonia.svg/40px-Flags_of_New_Caledonia.svg.png",
    ddi: 687,
    continente: "Oceania",
  },
  {
    pais: "Nova Zelândia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/23px-Flag_of_New_Zealand.svg.png",
    ddi: 64,
    continente: "Oceania",
  },
  {
    pais: "Omã",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Oman.svg/23px-Flag_of_Oman.svg.png",
    ddi: 968,
    continente: "Ásia",
  },
  {
    pais: "Países Baixos",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/23px-Flag_of_the_Netherlands.svg.png",
    ddi: 31,
    continente: "Europa",
  },
  {
    pais: "Palau",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Palau.svg/23px-Flag_of_Palau.svg.png",
    ddi: 680,
    continente: "Oceania",
  },
  {
    pais: "Palestina",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/23px-Flag_of_Palestine.svg.png",
    ddi: 970,
    continente: "Ásia",
  },
  {
    pais: "Panamá",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Flag_of_Panama.svg/23px-Flag_of_Panama.svg.png",
    ddi: 507,
    continente: "América Central",
  },
  {
    pais: "PapuaNova Guiné",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Flag_of_Papua_New_Guinea.svg/20px-Flag_of_Papua_New_Guinea.svg.png",
    ddi: 675,
    continente: "Oceania",
  },
  {
    pais: "Paquistão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/23px-Flag_of_Pakistan.svg.png",
    ddi: 92,
    continente: "Ásia",
  },
  {
    pais: "Paraguai",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Paraguay.svg/23px-Flag_of_Paraguay.svg.png",
    ddi: 595,
    continente: "América do Sul",
  },
  {
    pais: "Peru",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Flag_of_Peru.svg/23px-Flag_of_Peru.svg.png",
    ddi: 51,
    continente: "América do Sul",
  },
  {
    pais: "Polinésia Francesa",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/db/Flag_of_French_Polynesia.svg/23px-Flag_of_French_Polynesia.svg.png",
    ddi: 689,
    continente: "Oceania",
  },
  {
    pais: "Polônia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/23px-Flag_of_Poland.svg.png",
    ddi: 48,
    continente: "Europa",
  },
  {
    pais: "Porto Rico",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/28/Flag_of_Puerto_Rico.svg/23px-Flag_of_Puerto_Rico.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Portugal",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/23px-Flag_of_Portugal.svg.png",
    ddi: 351,
    continente: "Europa",
  },
  {
    pais: "Qatar",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Qatar.svg/23px-Flag_of_Qatar.svg.png",
    ddi: 974,
    continente: "Ásia",
  },
  {
    pais: "Quênia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/23px-Flag_of_Kenya.svg.png",
    ddi: 254,
    continente: "África",
  },
  {
    pais: "Quirguistão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Flag_of_Kyrgyzstan.svg/23px-Flag_of_Kyrgyzstan.svg.png",
    ddi: 996,
    continente: "Ásia",
  },
  {
    pais: "Reino Unido",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/23px-Flag_of_the_United_Kingdom.svg.png",
    ddi: 44,
    continente: "Europa",
  },
  {
    pais: "República CentroAfricana",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Central_African_Republic.svg/23px-Flag_of_the_Central_African_Republic.svg.png",
    ddi: 236,
    continente: "África",
  },
  {
    pais: "República Dominicana",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_the_Dominican_Republic.svg/23px-Flag_of_the_Dominican_Republic.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "República Tcheca",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/23px-Flag_of_the_Czech_Republic.svg.png",
    ddi: 420,
    continente: "Europa",
  },
  {
    pais: "Reunião",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/23px-Flag_of_France.svg.png",
    ddi: 262,
    continente: "África",
  },
  {
    pais: "Romênia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flag_of_Romania.svg/23px-Flag_of_Romania.svg.png",
    ddi: 40,
    continente: "Europa",
  },
  {
    pais: "Ruanda",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Rwanda.svg/23px-Flag_of_Rwanda.svg.png",
    ddi: 250,
    continente: "África",
  },
  {
    pais: "Rússia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/23px-Flag_of_Russia.svg.png",
    ddi: 7,
    continente: "Europa/Ásia",
  },
  {
    pais: "Saara Ocidental",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/26/Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg/23px-Flag_of_the_Sahrawi_Arab_Democratic_Republic.svg.png",
    ddi: 212,
    continente: "África",
  },
  {
    pais: "Samoa",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/31/Flag_of_Samoa.svg/23px-Flag_of_Samoa.svg.png",
    ddi: 685,
    continente: "Oceania",
  },
  {
    pais: "Samoa Americana",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/87/Flag_of_American_Samoa.svg/23px-Flag_of_American_Samoa.svg.png",
    ddi: 1,
    continente: "Oceania",
  },
  {
    pais: "Santa Helena território",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Saint_Helena.svg/23px-Flag_of_Saint_Helena.svg.png",
    ddi: 290,
    continente: "África",
  },
  {
    pais: "Santa Lúcia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Saint_Lucia.svg/23px-Flag_of_Saint_Lucia.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "São Cristóvão e Nevis",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Saint_Kitts_and_Nevis.svg/23px-Flag_of_Saint_Kitts_and_Nevis.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "São Marinho",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Flag_of_San_Marino.svg/20px-Flag_of_San_Marino.svg.png",
    ddi: 378,
    continente: "Europa",
  },
  {
    pais: "SaintPierre e Miquelon",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/23px-Flag_of_France.svg.png",
    ddi: 508,
    continente: "América do Norte",
  },
  {
    pais: "São Tomé e Príncipe",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Sao_Tome_and_Principe.svg/23px-Flag_of_Sao_Tome_and_Principe.svg.png",
    ddi: 239,
    continente: "África",
  },
  {
    pais: "São Vicente e Granadinas",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Flag_of_Saint_Vincent_and_the_Grenadines.svg/23px-Flag_of_Saint_Vincent_and_the_Grenadines.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Seicheles",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Seychelles.svg/23px-Flag_of_Seychelles.svg.png",
    ddi: 248,
    continente: "África",
  },
  {
    pais: "Senegal",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/23px-Flag_of_Senegal.svg.png",
    ddi: 221,
    continente: "África",
  },
  {
    pais: "Serra Leoa",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Sierra_Leone.svg/23px-Flag_of_Sierra_Leone.svg.png",
    ddi: 232,
    continente: "África",
  },
  {
    pais: "Sérvia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Flag_of_Serbia.svg/23px-Flag_of_Serbia.svg.png",
    ddi: 381,
    continente: "Europa",
  },
  {
    pais: "Singapura",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/23px-Flag_of_Singapore.svg.png",
    ddi: 65,
    continente: "Ásia",
  },
  {
    pais: "Síria",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/5/53/Flag_of_Syria.svg/23px-Flag_of_Syria.svg.png",
    ddi: 963,
    continente: "Ásia",
  },
  {
    pais: "Somália",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_Somalia.svg/23px-Flag_of_Somalia.svg.png",
    ddi: 252,
    continente: "África",
  },
  {
    pais: "Sri Lanka",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/23px-Flag_of_Sri_Lanka.svg.png",
    ddi: 94,
    continente: "Ásia",
  },
  {
    pais: "Suazilândia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Flag_of_Eswatini.svg/23px-Flag_of_Eswatini.svg.png",
    ddi: 268,
    continente: "África",
  },
  {
    pais: "Sudão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_Sudan.svg/23px-Flag_of_Sudan.svg.png",
    ddi: 249,
    continente: "África",
  },
  {
    pais: "Sudão do Sul",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Flag_of_South_Sudan.svg/23px-Flag_of_South_Sudan.svg.png",
    ddi: 211,
    continente: "África",
  },
  {
    pais: "Suécia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/23px-Flag_of_Sweden.svg.png",
    ddi: 46,
    continente: "Europa",
  },
  {
    pais: "Suíça",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/16px-Flag_of_Switzerland.svg.png",
    ddi: 41,
    continente: "Europa",
  },
  {
    pais: "Suriname",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/60/Flag_of_Suriname.svg/23px-Flag_of_Suriname.svg.png",
    ddi: 597,
    continente: "América do Sul",
  },
  {
    pais: "Tadjiquistão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_Tajikistan.svg/23px-Flag_of_Tajikistan.svg.png",
    ddi: 992,
    continente: "Ásia",
  },
  {
    pais: "Tailândia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/23px-Flag_of_Thailand.svg.png",
    ddi: 66,
    continente: "Ásia",
  },
  {
    pais: "República da China",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/7/72/Flag_of_the_Republic_of_China.svg/23px-Flag_of_the_Republic_of_China.svg.png",
    ddi: 886,
    continente: "Ásia",
  },
  {
    pais: "Tanzânia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tanzania.svg/23px-Flag_of_Tanzania.svg.png",
    ddi: 255,
    continente: "África",
  },
  {
    pais: "Território Britânico do Oceano Índico",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_the_Commissioner_of_the_British_Indian_Ocean_Territory.svg/23px-Flag_of_the_Commissioner_of_the_British_Indian_Ocean_Territory.svg.png",
    ddi: 246,
    continente: "África",
  },
  {
    pais: "TimorLeste",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/26/Flag_of_East_Timor.svg/23px-Flag_of_East_Timor.svg.png",
    ddi: 670,
    continente: "Ásia",
  },
  {
    pais: "Togo",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/68/Flag_of_Togo.svg/23px-Flag_of_Togo.svg.png",
    ddi: 228,
    continente: "África",
  },
  {
    pais: "Tokelau",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Flag_of_Tokelau.svg/23px-Flag_of_Tokelau.svg.png",
    ddi: 690,
    continente: "Oceania",
  },
  {
    pais: "Tonga",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Tonga.svg/23px-Flag_of_Tonga.svg.png",
    ddi: 676,
    continente: "Oceania",
  },
  {
    pais: "Trinidad e Tobago",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/64/Flag_of_Trinidad_and_Tobago.svg/23px-Flag_of_Trinidad_and_Tobago.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Tunísia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/23px-Flag_of_Tunisia.svg.png",
    ddi: 216,
    continente: "África",
  },
  {
    pais: "Turcas e Caicos",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Flag_of_the_Turks_and_Caicos_Islands.svg/23px-Flag_of_the_Turks_and_Caicos_Islands.svg.png",
    ddi: 1,
    continente: "América Central",
  },
  {
    pais: "Turquemenistão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Turkmenistan.svg/23px-Flag_of_Turkmenistan.svg.png",
    ddi: 993,
    continente: "Ásia",
  },
  {
    pais: "Turquia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/23px-Flag_of_Turkey.svg.png",
    ddi: 90,
    continente: "Ásia//Europa",
  },
  {
    pais: "Tuvalu",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/3/38/Flag_of_Tuvalu.svg/23px-Flag_of_Tuvalu.svg.png",
    ddi: 688,
    continente: "Oceania",
  },
  {
    pais: "Ucrânia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Ukraine.svg/23px-Flag_of_Ukraine.svg.png",
    ddi: 380,
    continente: "Europa",
  },
  {
    pais: "Uganda",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flag_of_Uganda.svg/23px-Flag_of_Uganda.svg.png",
    ddi: 256,
    continente: "África",
  },
  {
    pais: "Uruguai",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/23px-Flag_of_Uruguay.svg.png",
    ddi: 598,
    continente: "América do Sul",
  },
  {
    pais: "Uzbequistão",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/23px-Flag_of_Uzbekistan.svg.png",
    ddi: 998,
    continente: "Ásia",
  },
  {
    pais: "Vanuatu",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Vanuatu.svg/23px-Flag_of_Vanuatu.svg.png",
    ddi: 678,
    continente: "Oceania",
  },
  {
    pais: "Vaticano",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_the_Vatican_City.svg/15px-Flag_of_the_Vatican_City.svg.png",
    ddi: 379,
    continente: "Europa",
  },
  {
    pais: "Venezuela",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Venezuela.svg/23px-Flag_of_Venezuela.svg.png",
    ddi: 58,
    continente: "América do Sul",
  },
  {
    pais: "Vietnã",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/23px-Flag_of_Vietnam.svg.png",
    ddi: 84,
    continente: "Ásia",
  },
  {
    pais: "Wallis e Futuna",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/23px-Flag_of_France.svg.png",
    ddi: 681,
    continente: "Oceania",
  },
  {
    pais: "Zâmbia",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Zambia.svg/23px-Flag_of_Zambia.svg.png",
    ddi: 260,
    continente: "África",
  },
  {
    pais: "Zimbábue",
    img: "https:////upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Flag_of_Zimbabwe.svg/23px-Flag_of_Zimbabwe.svg.png",
    ddi: 263,
    continente: "África",
  },
];
//document.getElementById('flag-country').style.backgroundImage = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png)';

const mask = (selector) => {
  function setMask() {
    let matrix = "+###############";

    maskList.forEach((item) => {
      let code = item.code.replace(/[\s#]/g, ""),
        phone = this.value.replace(/[\s#-)(]/g, "");

      if (phone.includes(code)) {
        matrix = item.code;
        const phoneAdjust = phone.replace(/\s+/g, "").substring(1);

        let flagUrl = "";

        for (let country of countryList) {
          if (country.ddi == phoneAdjust) {
            flagUrl = country.img;
            break;
          }
        }

        if (flagUrl) {
          document.getElementById("flag-country").style.backgroundImage =
            "url(" + flagUrl + ")";
        }
      }
    });

    let i = 0,
      val = this.value.replace(/\D/g, "");

    this.value = matrix.replace(/(?!\+)./g, function (a) {
      return /[#\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
  }

  let inputs = document.querySelectorAll(selector);

  inputs.forEach((input) => {
    if (!input.value) {
      input.value = "+55";
    }
    input.addEventListener("input", setMask);
    input.addEventListener("focus", setMask);
    input.addEventListener("blur", setMask);
  });
};

mask("input[name='whatsApp']");
