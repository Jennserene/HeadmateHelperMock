let openMenu = false

function switchExpand() {
  if (openMenu) {
    let html = document.querySelector("html")
    html.removeEventListener("click", closeSwitchMenu)
    openMenu = false
  }
  let divMenu = document.getElementById("switchMenu")
  divMenu.classList.toggle("switchClose")
  divMenu.classList.toggle("switchExpand")
  let html = document.querySelector("html")
  if (divMenu.classList.contains("switchExpand")) {
    let html = document.querySelector("html")
    html.addEventListener("click", closeSwitchMenu)
    openMenu = true
  }
}

function closeSwitchMenu(e) {
  let divMenu = document.getElementById("switchMenu")
  let html = document.querySelector("html")
  let switchButton = document.getElementById("switchButton")
  if (e.target !== switchButton  && !divMenu.contains(e.target)) {
    divMenu.classList.toggle("switchClose")
    divMenu.classList.toggle("switchExpand")
    html.removeEventListener("click", closeSwitchMenu)
    openMenu = false
  }
}