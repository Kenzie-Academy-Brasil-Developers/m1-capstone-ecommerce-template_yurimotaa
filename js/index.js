
function inserirItem(lista){
    for(let i=0; i<lista.length; i++){
        let div_vitrine = document.querySelector(".vitrine")
        
        let div_produto = document.createElement('div')
        div_produto.classList.add("produto")

        let img_produto = document.createElement("img")
        img_produto.src = lista[i].img

        let p_secao = document.createElement('p')
        p_secao.innerText = lista[i].tag
        p_secao.classList.add("secao-produto")

        let p_nome = document.createElement('h3')
        p_nome.innerText = lista[i].nameItem
        p_nome.classList.add("nome-produto")

        let p_descricao = document.createElement('p')
        p_descricao.innerText = lista[i].description
        p_descricao.classList.add("descricao-produto")

        let p_valor = document.createElement('p')
        p_valor.innerText = `R$ ${lista[i].value.toFixed(2)}`
        p_valor.classList.add("valor-produto")

        let button_add = document.createElement("button")
        button_add.innerText = lista[i].addCart
        button_add.classList.add("botao-add")

        div_produto.setAttribute("id", lista[i].id)
        button_add.setAttribute("id", lista[i].id)
        div_produto.append(img_produto, p_secao, p_nome, p_descricao, p_valor, button_add)
        div_vitrine.appendChild(div_produto)


    }
}
inserirItem(data)

let count = 0
let total = 0

let buttons_add = document.querySelectorAll(".botao-add")
console.log(buttons_add)

for(let i=0; i<buttons_add.length; i++){
    let botao = buttons_add[i]

    botao.addEventListener('click', function(e){
        let id = parseInt(e.target.id)

        count++
        document.querySelector(".p_numeroProdutos").innerText = `Número de produtos: ${count}`

        let produto = procuraProduto(id)

        let produtoElemento = criarCardProduto(produto)
        total+=produto.value
        document.querySelector(".p_valorTotal").innerText = `Valor Total: R$ ${total.toFixed(2)}`

        let ul_carrinho = document.querySelector(".produtos-carrinho")
        ul_carrinho.append(produtoElemento)

    })
}

function soma(){
    let soma = 0
    for(let i=0; i<produto.length; i++){
        soma+=produto[i].value
    }
    return soma
}

function procuraProduto(id){
    for(let i=0; i<data.length; i++){
        let produto = data[i]

        if(produto.id == id){
            return produto
        }
    }
}

function criarCardProduto(produto){
    let li = document.createElement("li")
    li.id = 'f_' + produto.id
    let img = document.createElement("img")
    let p_nome = document.createElement("p")
    p_nome.classList.add("nome-produto")
    let p_valor = document.createElement("p")
    p_valor.classList.add("valor-produto")
    let button_remover = document.createElement("button")

    img.src = produto.img
    img.height = 80
    p_nome.innerText = produto.nameItem
    p_valor.innerText = `R$ ${produto.value.toFixed(2)}`
    button_remover.innerHTML = "Remover"
    button_remover.id = produto.id
    button_remover.classList.add('botao-add')

    button_remover.addEventListener('click', function(e){
        let li = document.querySelector('#f_'+produto.id)
        li.remove()
        count--
        document.querySelector(".p_numeroProdutos").innerText = `Número de produtos: ${count}`
        total-=produto.value
        document.querySelector(".p_valorTotal").innerText = `Valor Total: R$ ${total.toFixed(2)}`
    })

    li.append(img, p_nome, p_valor, button_remover)

    return li

}


