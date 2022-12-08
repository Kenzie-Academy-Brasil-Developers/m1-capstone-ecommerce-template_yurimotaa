/* 
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

        let li_vazio = document.querySelector('.carrinho_vazio')
        li_vazio.remove()
        


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
    li.classList.add('ppp')
    li.id = 'f_' + produto.id
    let img = document.createElement("img")
    let p_nome = document.createElement("p")
    
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

} */

const renderProducts = (products) => {
    const list = document.querySelector('.vitrine')

    products.forEach(product => {
        const card = createCard(product)

        list.appendChild(card)
    });
}

const createCard = (product) => {
    let div_produto = document.createElement('div')
    div_produto.classList.add("produto")

    let img_produto = document.createElement("img")
    img_produto.src = product.img

    let p_secao = document.createElement('p')
    p_secao.innerText = product.tag
    p_secao.classList.add("secao-produto")

    let p_nome = document.createElement('h3')
    p_nome.innerText = product.nameItem
    p_nome.classList.add("nome-produto")

    let p_descricao = document.createElement('p')
    p_descricao.innerText = product.description
    p_descricao.classList.add("descricao-produto")

    let p_valor = document.createElement('p')
    p_valor.innerText = `R$ ${product.value.toFixed(2)}`
    p_valor.classList.add("valor-produto")

    let button_add = document.createElement("button")
    button_add.innerText = product.addCart
    button_add.classList.add("botao-add")

    div_produto.setAttribute("id", product.id)
    button_add.setAttribute("id", product.id)
    div_produto.append(img_produto, p_secao, p_nome, p_descricao, p_valor, button_add)
    
    return div_produto
}

const renderFilterProducts = (array) => {
    const buttons = document.querySelectorAll('.sub-menu > li')
    const vitrine = document.querySelector('.vitrine')

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            vitrine.innerHTML = ''

            if(event.target.innerText == "Todos"){
                renderProducts(array)
            }

            const filteredProducts = filterProducts(array, event.target.innerText)

            renderProducts(filteredProducts)
        })
    })
}

const filterProducts = (array, filterWord) => {
    const newArray = array.filter(product => {
        if(product.tag == filterWord){
            return product
        }
    })
    return newArray
}

const renderSearch = () => {
    const input = document.querySelector('.pesquisa > input')
    const searchBtn = document.querySelector('.botao-pesquisar')
    const vitrine = document.querySelector('.vitrine')

    searchBtn.addEventListener('click', (event) => {
        vitrine.innerHTML = ''

        const foundProduct = searchProductFilter(input.value)

        renderProducts(foundProduct)
    })

    input.addEventListener('keyup', () => {
        vitrine.innerHTML = ''
        
        const searchArray = searchProductFilter(input.value)

        renderProducts(searchArray)
    })
}

const searchProductFilter = (searchWord) => {
    const foundProduct = data.filter(product => {
        if(product.nameItem.toLowerCase().includes(searchWord) || product.description.toLowerCase().includes(searchWord)){
            return product
        }
    })
    return foundProduct
}

renderProducts(data)
renderFilterProducts(data)
renderSearch()
