export function getDados (){
    let dados = localStorage.getItem("dadosLogin");
    dados = JSON.parse(dados);
    return dados;
}

export function setDados (dados){
    dados = JSON.stringify(dados);
    localStorage.setItem("dadosLogin", dados);
}