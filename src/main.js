// Importando as estilizações css diretamente pelo javascript através do vite
import "./css/index.css"

// Importando o imask
import IMask from "imask"

// Atribuindo à uma constante o HTML com o uso do querySelector
// > g -> significa que é para pegar o primeiro nível do seletor g
const primaryCreditCardBgColor = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const secondaryCreditCardBgColor = document.querySelector(".cc-bg svg > g g:nth-child(2) path")

// Trocando a logo
const creditCardLogo = document.querySelector(".cc-logo span:nth-child(2) img")

// Campos de Input e Máscara
// Capturando com a DOM
const securityCodeInput = document.querySelector("#security-code")

// Criando um padrão de máscara de formatação com o iMask
const securityCodeInputPatern = {
    mask: "0000"
}

// Aplicando o padrão criado junto ao campo selecionado pela DOM
const securityCodeInputMasked = IMask(securityCodeInput, securityCodeInputPatern)


function setCardType(cardType){
    changeCreditCardBgColor(cardType)
    changeCreditCardLogo(cardType)
}

function changeCreditCardBgColor(cardType){
    // Criando um array para receber as cores possíveis
    const colors = {
        "visa":{
            primary:"#436D99",
            secondary: "#2D57F2"
        },
        "mastercard": {
            primary:"#5C5353",
            secondary: "#DB5E58"
        },
        "american": {
            primary: "#5C5353",
            secondary: "#AEF5CF"
        },
        "elo": {
            primary: "#5C5953",
            secondary: "#F5E1AB"
        },
        "default": {
            primary: "black", 
            secondary: "gray"
        }
    }

    // Alterando a color deste path
    // colors[cardType] -> Maneira de se acessar uma propriedade de um objeto através de um variável
    // Semelhante à colors.visa ou colors.mastercad
    // [0] e [1] são as posições
    
    primaryCreditCardBgColor.setAttribute("fill", colors[cardType].primary)
    secondaryCreditCardBgColor.setAttribute("fill", colors[cardType].secondary)
}

function changeCreditCardLogo(cardType){
    // Alterando a svg do logo de acordo com o cardType
    creditCardLogo.setAttribute("src", `cc-${cardType}.svg`)
}


// globalThis é a mesma coisa que adicionar na window do projeto
// Disponibilizando a função criada para acesso
globalThis.setCardType = setCardType