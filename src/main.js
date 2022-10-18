// Importando as estilizações css diretamente pelo javascript através do vite
import "./css/index.css"

// Atribuindo à uma constante o HTML com o uso do querySelector
// > g -> significa que é para pegar o primeiro nível do seletor g
const primaryCreditCardBgColor = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const secondaryCreditCardBgColor = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

// Alterando a color deste path
primaryCreditCardBgColor.setAttribute("fill", "#C045F5")
secondaryCreditCardBgColor.setAttribute("fill", "#4572FF")


// Criando um array para receber as cores possíveis
const colors = {
    "visa": ['#436D99', "#2D57F2"],
    "mastercard": ["#DF6F29", "#C69347"],
    "default": ["black", "gray"]
}