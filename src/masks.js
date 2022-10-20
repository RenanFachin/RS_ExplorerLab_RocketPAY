// Importando o imask
import IMask from "imask"

// Campos de Input e Máscara
// Capturando com a DOM
const securityCodeInput = document.querySelector("#security-code")
const expirationDateInput = document.querySelector("#expiration-date")
const cardNumber = document.querySelector('#card-number')

// Variáveis de controle 
const currentDate = String(new Date().getFullYear()).slice(2)
const limitDateExpiration = String(new Date().getFullYear() + 10).slice(2)

// Criando um padrão de máscara de formatação com o iMask
const securityCodeInputPatern = {
    mask: "0000"
}

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


// Aplicando o padrão criado junto ao campo selecionado pela DOM
export const securityCodeInputMasked = IMask(securityCodeInput, securityCodeInputPatern)
export const expirationDateInputMasked = IMask(expirationDateInput, expirationDateInputPattern)
export const cardNumberMasked = IMask(cardNumber, cardNumberPattern)