// Importando as estilizações css diretamente pelo javascript através do vite
import "./css/index.css"

// Importando as máscaras de formatação
import { expirationDateInputMasked, cardNumberMasked, securityCodeInputMasked } from './masks.js'

// Importando as funções auxiliares
import { changeCreditCardBgColor, changeCreditCardLogo } from './utils.js'

// Importando as funções de eventos
import { updateCardNumber, updateExpirationDate, updateSecurityCode } from './updateFunctions'

// Manipuação de eventos com a DOM
const addButton = document.querySelector("#add-card")
const cardHolder = document.querySelector("#card-holder")

addButton.addEventListener("click", () => {
    alert("Cartão adicionado com sucesso!")
})

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault()
})

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

cardNumberMasked.on("accept", () => {
    // Descobrindo o tipo do cartão
    const cardType = cardNumberMasked.masked.currentMask.cardType
    setCardType(cardType)

    updateCardNumber(cardNumberMasked.value)
})

expirationDateInputMasked.on("accept", () => {
    updateExpirationDate(expirationDateInputMasked.value)
})

function setCardType(cardType){
    changeCreditCardBgColor(cardType)
    changeCreditCardLogo(cardType)
}

// globalThis é a mesma coisa que adicionar na window do projeto
// Disponibilizando a função criada para acesso
globalThis.setCardType = setCardType