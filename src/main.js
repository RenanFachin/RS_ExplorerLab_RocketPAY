// Importando as estilizações css diretamente pelo javascript através do vite
import "./css/index.css"

// Atribuindo à uma constante o HTML com o uso do querySelector
// > g -> significa que é para pegar o primeiro nível do seletor g
const primaryCreditCardBgColor = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const secondaryCreditCardBgColor = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

// Trocando a logo
const creditCardLogo = document.querySelector(".cc-logo span:nth-child(2) img")

// Usando uma função para capturar a bandeira do cartão
function setCardType(cardType){
    // Criando um array para receber as cores possíveis
    const colors = {
        "visa": ['#436D99', "#2D57F2"],
        "mastercard": ["#DF6F29", "#C69347"],
        "default": ["black", "gray"]
    }

    // Alterando a color deste path
    // colors[cardType] -> Maneira de se acessar uma propriedade de um objeto através de um variável
    // Semelhante à colors.visa ou colors.mastercad
    // [0] e [1] são as posições
    
    primaryCreditCardBgColor.setAttribute("fill", colors[cardType][0])
    secondaryCreditCardBgColor.setAttribute("fill", colors[cardType][1])


    // Alterando a svg do logo de acordo com o cardType
    creditCardLogo.setAttribute("src", `cc-${cardType}.svg`)
}


// globalThis é a mesma coisa que adicionar na window do projeto
// Disponibilizando a função criada para acesso
globalThis.setCardType = setCardType