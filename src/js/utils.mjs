// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  const element = qs(selector);
  if (element) {
    element.addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    element.addEventListener("click", callback);
  }
}

export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback) {

  // inserting the template into the parent element
  parentElement.innerHTML = template;

  // to check the existence of callback before invoking it
  if (callback) {
    callback(data);
  }
}

// adding an asynchronous function name
// loadTemplate to fetch the content of the HTML file given a path

export async function loadTemplate(path) {

  try {

    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const template = await response.text();
    return template;

  } catch (error) {
    console.error("Error loading template:", error);
    return "";
  }
}

// add a function named loadHeaderFooter that can be exported that will load the
// header and footer template from the partials using the loadTemplate
// grab the header and footer placeholder elements out of the DOM
// render the header and footer templates using renderWithTemplate

export async function loadHeaderFooter() {

  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  // targeting the header and footer with their ids
  const headerElement = qs("header#header-divider");
  const footerElement = qs("footer#footer-divider");

  // rendering the templates
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll = true) {
  // Create element to hold our alert
  const alert = document.createElement("div");
  // Add a class to style it
  alert.classList.add("alert");
  // Set the contents
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // Add a listener to the alert to see if they clicked on the X
  alert.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
      main.removeChild(this);
    }
  });

  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}
