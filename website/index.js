import "./style.css"

(() => {
  function fillTheme(context) {
    try {
      const themeParams = {
        "color_scheme": context.colorScheme,
        "bg_color": context.themeParams.bg_color || "–",
        "text_color": context.themeParams.text_color || "–",
        "hint_color": context.themeParams.hint_color || "–",
        "link_color": context.themeParams.link_color || "–",
        "button_color": context.themeParams.button_color || "–",
        "button_text_color": context.themeParams.button_text_color || "–",
      }
      Object.keys(themeParams).map((name) => {
        const el = document.getElementById(name);
        if (el) {
          el.innerHTML = themeParams[name];
        }
      });
    } catch (err) { }
  }

  function fillUser(context) {
    try {
      document.getElementById("username").innerHTML = context.initDataUnsafe.user.username || "";
      document.getElementById("first_name").innerHTML = context.initDataUnsafe.user.first_name || "";
      document.getElementById("last_name").innerHTML = context.initDataUnsafe.user.last_name || "";
    } catch (err) { }
  }

  function listenToEvents(context) {
    try {
      const eventsContainer = document.getElementById("events");
      function handler(eventName) {
        const div = document.createElement("div");
        div.innerHTML = `<div class="bg-red-100 text-red-500">${eventName}</div>`;
        eventsContainer.appendChild(div);
      }
      context.onEvent("themeChanged", () => handler("themeChanged"));
      context.onEvent("viewportChanged", () => handler("viewportChanged"));
      context.onEvent("mainButtonClicked", () => handler("mainButtonClicked"));
    } catch (err) { }
  }

  function listenToButtonEvents(context) {
    try {
      const mainButton = context.MainButton;
      const showButton = document.getElementById("show-button");
      showButton.addEventListener("click", () => {
        mainButton.show();
      });
      const hideButton = document.getElementById("hide-button");
      hideButton.addEventListener("click", () => {
        mainButton.hide();
      });
      const enableButton = document.getElementById("enable-button");
      enableButton.addEventListener("click", () => {
        mainButton.enable();
      });
      const disableButton = document.getElementById("disable-button");
      disableButton.addEventListener("click", () => {
        mainButton.disable();
      });
      const showLoadingButton = document.getElementById("show-loading-button");
      showLoadingButton.addEventListener("click", () => {
        mainButton.showProgress();
      });
      const hideLoadingButton = document.getElementById("hide-loading-button");
      hideLoadingButton.addEventListener("click", () => {
        mainButton.hideProgress();
      });
      const expandAppButton = document.getElementById("expand-app-button");
      expandAppButton.addEventListener("click", () => {
        context.expand();
      });
      const closeAppButton = document.getElementById("close-app-button");
      closeAppButton.addEventListener("click", () => {
        context.close();
      });
    } catch (err) { }
  }

  try {
    const appContext = window.Telegram.WebApp;
    fillUser(appContext);
    fillTheme(appContext);
    listenToEvents(appContext);
    listenToButtonEvents(appContext);
  } catch (err) { }
})();