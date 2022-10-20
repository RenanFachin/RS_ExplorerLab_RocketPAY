export function updateSecurityCode(code){
    // acessando o input e pegando a classe value dele
    const ccSecurity = document.querySelector(".cc-security .value")

    ccSecurity.innerText = code.length === 0 ? "123": code
}

export function updateCardNumber(cardNumber){
    const ccNumber = document.querySelector(".cc-number")

    //cardNumber.length === 0 significa que nada foi digitado
    ccNumber.innerText = cardNumber.length === 0 ? "1234 5678 9012 3456" : cardNumber
}

export function updateExpirationDate(date){
    // Selecionando valor dentro da div com classe cc-extra
    const ccExpiration = document.querySelector(".cc-extra .value")

    //innerText é para alterar o que tem lá
    ccExpiration.innerText = date.length === 0 ? "02/32" : date
}