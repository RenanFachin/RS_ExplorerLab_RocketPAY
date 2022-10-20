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

// Variáveis de controle 
const currentDate = String(new Date().getFullYear()).slice(2)
const limitDateExpiration = String(new Date().getFullYear() + 10).slice(2)

const expirationDateInput = document.querySelector("#expiration-date")
const expirationDateInputPattern = {
    // {/} vai criar automaticamente uma barra para separar os digitos
    mask: "MM{/}YY",
    lazy: false,

    // Criando validações para esta máscara
    blocks: {
        YY: {
            mask: IMask.MaskedRange,
            from: currentDate,
            to: limitDateExpiration,
        },
        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        }
    }
}

const expirationDateInputMasked = IMask(expirationDateInput, expirationDateInputPattern)


const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
    mask: [
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardType: "visa"
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
            cardType: "mastercard"
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /^3[47]\d{0,13}/,
            cardType: "american"
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
            cardType: "elo"
        },
        {
            mask: "0000 0000 0000 0000",
            cardType: "default"
        },
    ],
    dispatch: function(appended, dynamicMasked){
        const number = (dynamicMasked.value + appended).replace(/\D/, "")
        // O replace vai fazer a trocar de todo e qualquer caracter que for digitado, que não sejam dígitos, se transformem em ""
        // \D -> não digito

        const foundMask = dynamicMasked.compiledMasks.find(function(item) {
            return number.match(item.regex)
        })
        return foundMask
    },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

// Manipuação de eventos com a DOM
const addButton = document.querySelector("#add-card")

addButton.addEventListener("click", () => {
    alert("Cartão adicionado com sucesso!")
})

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
    // Capturando o valor
    const creditCardHolder = document.querySelector(".cc-holder .value")

    // Modificando o conteúdo deste value para o que estiver sendo digitado
    // Aplicando um if ternário para aplicar condições específicas
    creditCardHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value

})

// Adicionando um evento junto ao iMask 
securityCodeInputMasked.on("accept", () => {
    updateSecurityCode(securityCodeInputMasked.value)
})

function updateSecurityCode(code){
    // acessando o input e pegando a classe value dele
    const ccSecurity = document.querySelector(".cc-security .value")

    ccSecurity.innerText = code.length === 0 ? "123": code
}

cardNumberMasked.on("accept", () => {
    // Descobrindo o tipo do cartão
    const cardType = cardNumberMasked.masked.currentMask.cardType
    setCardType(cardType)

    updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(cardNumber){
    const ccNumber = document.querySelector(".cc-number")

    //cardNumber.length === 0 significa que nada foi digitado
    ccNumber.innerText = cardNumber.length === 0 ? "1234 5678 9012 3456" : cardNumber
}

expirationDateInputMasked.on("accept", () => {
    updateExpirationDate(expirationDateInputMasked.value)
})

function updateExpirationDate(date){
    // Selecionando valor dentro da div com classe cc-extra
    const ccExpiration = document.querySelector(".cc-extra .value")

    //innerText é para alterar o que tem lá
    ccExpiration.innerText = date.length === 0 ? "02/32" : date
}


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