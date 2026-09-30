const conteudo_conteirMOstrarProdutos = document.querySelector(".conteiner-produtos")
const conteiner_principal = document.querySelector(".conteiner_principal")
const butoes = document.querySelectorAll("[data-categoria]")
const conteiner_mostrarDEscricao = document.querySelector(".conteiner-descricao")
const conteiner_titulo = document.querySelector("header")
const conteudo_descricao = document.querySelector(".conteudo-descricao")
const addcarinho = document.getElementById("adicionar-ao-carrinho")
addcarinho.addEventListener("click",adicionarAOcarinho)
const valorProduto  =  document.getElementById("valor")
const quantidade_preoco_produto = document.getElementById("quantidade")
const chamarCarrinho = document.querySelector("#chamar-carrinho")
const conteiner_carrinho = document.querySelector(".conteiner-carrinho")

const conteudo_carrinho = document.querySelector(".conteudo-mostrarcarrinho")

chamarCarrinho.addEventListener("click",mostrarcarrinho)

const quantidademais = document.getElementById("quantidademais")
const quantidademenos = document.getElementById("quantidademenos")
quantidademais.addEventListener("click",addCARINHOmais)
quantidademenos.addEventListener("click",addCARINHOmenos)
const quantidade = document.getElementById("quantidade")
const menu = document.querySelector(".menu-de-navegacao")
const valorDEscricao = document.getElementById("valor")
const conteinerAdicionais = document.querySelector(".rederizar-Adicionais")
const voltarPricipal = document.getElementById("voltarPARAprincipal")
voltarPricipal.addEventListener("click",voltarDAdescricao)
addcarinho.addEventListener("click",adicionarAOcarinho)

window.addEventListener("load",buscarProdutos)

butoes.forEach(botao =>{
    botao.addEventListener("click",()=>{
        const categoria = botao.dataset.categoria
        document.getElementById(categoria).scrollIntoView({
            behavior: "smooth"
        })
    })
})

async function buscarProdutos(){
    try{
        const resposta = await fetch(
            "https://fapfntdcpumrrvxjyudt.supabase.co/rest/v1/produtos",
            {
                headers: {
                    apikey: "sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
                    Authorization: "Bearer sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe"
                }
            }
        )

        if(!resposta.ok){
            console.log("erro html:",resposta.status)
        }
        
        const produtos = await resposta.json()
        
        const secaoTradicionais = document.createElement("section")
        const secaoArtesanais = document.createElement("section")
        const secaoMacarronada = document.createElement("section")
        const secaoLasanha = document.createElement("section")
        const secaoCombo = document.createElement("section")
        const secaoBatatas = document.createElement("section")
        const secaoHot_dog = document.createElement("section")
        const secaoBebidas = document.createElement("section")
        
        produtos.forEach(produto =>{        
            if(produto.categoria_id === 1){
                const card = document.createElement("div")
                const nome = document.createElement("h3")
                const descricao = document.createElement("p")
                const preco = document.createElement("h4")
                
                card.addEventListener("click",() =>{
                    mostrarDescricao(produto)
                })
                
                nome.textContent = produto.nome
                preco.textContent = `R$ ${produto.preco},00`
                descricao.textContent = produto.descricao
                card.append(nome)
                card.append(descricao)
                card.append(preco)
                secaoTradicionais.id = "Tradicional"
                secaoTradicionais.appendChild(card)
            }        

            if(produto.categoria_id === 2){
                const card = document.createElement("div")
                const nome = document.createElement("h3")
                const descricao = document.createElement("p")
                const preco = document.createElement("h4")

                card.addEventListener("click",() =>{ 
                    mostrarDescricao(produto)
                })

                nome.textContent = produto.nome
                preco.textContent = `R$ ${produto.preco},00`
                descricao.textContent = produto.descricao
                card.append(nome)
                card.append(descricao)
                card.append(preco)
                secaoArtesanais.id = "Artesanal"
                secaoArtesanais.appendChild(card)
            }  

            if(produto.categoria_id === 3){
                const card = document.createElement("div")
                const nome = document.createElement("h3")
                const descricao = document.createElement("p")
                const preco = document.createElement("h4")

                card.addEventListener("click",()=>{
                    mostrarDescricao(produto)
                })

                nome.textContent = produto.nome
                preco.textContent = `R$ ${produto.preco},00`
                descricao.textContent = produto.descricao
                card.append(nome)
                card.append(descricao)
                card.append(preco)
                secaoMacarronada.id = "Macarronada"
                secaoMacarronada.appendChild(card)
            }

            if(produto.categoria_id === 4){
                const card = document.createElement("div")
                const nome = document.createElement("h3")
                const descricao = document.createElement("p")
                const preco = document.createElement("h4")

                card.addEventListener("click",() =>{
                    mostrarDescricao(produto)
                })


                nome.textContent = produto.nome
                preco.textContent = `R$ ${produto.preco},00`
                descricao.textContent = produto.descricao
                card.append(nome)
                card.append(descricao)
                card.append(preco)
                secaoLasanha.id = "Lasanha"
                secaoLasanha.appendChild(card)
            }

            if(produto.categoria_id === 5){
                const card = document.createElement("div")
                const nome = document.createElement("h3")
                const descricao = document.createElement("p")
                const preco = document.createElement("h4")

                card.addEventListener("click",()=>{
                    mostrarDescricao(produto)
                })

                nome.textContent = produto.nome
                preco.textContent = `R$ ${produto.preco},00`
                descricao.textContent = produto.descricao
                card.append(nome)
                card.append(descricao)
                card.append(preco)
                secaoCombo.id = "Combo"
                secaoCombo.appendChild(card)
            }

            if(produto.categoria_id === 6){
                const card = document.createElement("div")
                const nome = document.createElement("h3")
                const descricao = document.createElement("p")
                const preco = document.createElement("h4")

                card.addEventListener("click",()=>{
                    mostrarDescricao(produto)
                })

                nome.textContent = produto.nome
                preco.textContent = `R$ ${produto.preco},00`
                descricao.textContent = produto.descricao
                card.append(nome)
                card.append(descricao)
                card.append(preco)
                secaoBatatas.id = "Batata"
                secaoBatatas.appendChild(card)
            }

            if(produto.categoria_id === 7){
                const card = document.createElement("div")
                const nome = document.createElement("h3")
                const descricao = document.createElement("p")
                const preco = document.createElement("h4")

                card.addEventListener("click",()=>{
                    mostrarDescricao(produto)
                })

                nome.textContent = produto.nome
                preco.textContent = `R$ ${produto.preco},00`
                descricao.textContent = produto.descricao
                card.append(nome)
                card.append(descricao)
                card.append(preco)
                secaoHot_dog.id = "hot-dog"
                secaoHot_dog.appendChild(card)
            }

            if(produto.categoria_id === 8){
                const card = document.createElement("div")
                const nome = document.createElement("h3")
                const descricao = document.createElement("p")
                const preco = document.createElement("h4")

                card.addEventListener("click",()=>{
                    mostrarDescricao(produto)
                })

                nome.textContent = produto.nome
                preco.textContent = `R$ ${produto.preco},00`
                descricao.textContent = produto.descricao
                card.append(nome)
                card.append(descricao)
                card.append(preco)
                secaoBebidas.id = "Bebidas"
                secaoBebidas.appendChild(card)
            }

            conteudo_conteirMOstrarProdutos.appendChild(secaoTradicionais)
            conteudo_conteirMOstrarProdutos.appendChild(secaoArtesanais)
            conteudo_conteirMOstrarProdutos.appendChild(secaoMacarronada)
            conteudo_conteirMOstrarProdutos.appendChild(secaoLasanha)
            conteudo_conteirMOstrarProdutos.appendChild(secaoHot_dog)
            conteudo_conteirMOstrarProdutos.appendChild(secaoCombo)
            conteudo_conteirMOstrarProdutos.appendChild(secaoBatatas)
            conteudo_conteirMOstrarProdutos.appendChild(secaoBebidas)
            
            
        });
    }
    catch(erro){
        console.log("erro de conexão:",erro)
    }    
    
}

async function buscarAdicionais(categoriaID){
    try{
        const resposta = await fetch(`https://fapfntdcpumrrvxjyudt.supabase.co/rest/v1/categoria_adicional?categoria_id=eq.${categoriaID}`,{
            headers: {
                apikey: "sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
                Authorization: "Bearer sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe"
            }
        })
        
        if(!resposta.ok){
            console.log("erro html:",resposta.status)
        }
        const categoria_id = await resposta.json()
        
        const respostaADicionais = await fetch("https://fapfntdcpumrrvxjyudt.supabase.co/rest/v1/adicionais",{
            headers: {
                    apikey: "sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
                    Authorization: "Bearer sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe"
                }
        })

        if(!respostaADicionais.ok){
            console.log("erro html:",respostaADicionais.status)
        }

        const adicional = await respostaADicionais.json()
        
        const secaoAdicionais = document.createElement("div")
        
        categoria_id.forEach(add => {
            
            const adicionais_categoria = adicional.find(
                item => item.id === add.adicional_id
            )   
            
            const div = document.createElement("div")
            const card = document.createElement("div")
            const cardpai = document.createElement("div")
            const btcontrolemenos = document.createElement("button")
            const quantidade = document.createElement("h2")
            const btcontrolemais = document.createElement("button")

            btcontrolemais.id = "quantidadeADDmais"
            btcontrolemenos.id = "quantidadeADDmenos"
            btcontrolemenos.textContent = "-"
            quantidade.textContent = 1
            quantidade.dataset.quantidade = 1
            quantidade.className = "adicional_quantidade"
            btcontrolemais.textContent = "+"
            div.append(btcontrolemais)
            div.append(quantidade)
            div.append(btcontrolemenos)
            div.className = "quantidadeADD"

            const nome = document.createElement("h3")
            const preco = document.createElement("p")
            nome.textContent = adicionais_categoria.nome
            nome.dataset.id = adicionais_categoria.nome
            preco.dataset.preco = adicionais_categoria.preco
            preco.textContent = `R$ ${adicionais_categoria.preco},00`
            card.append(nome)
            card.append(preco)
            card.className = "adicionais"
            preco.className = "quantidade"
            card.addEventListener("click",(event)=>{
                addADicionais(adicionais_categoria,event)
            })

            cardpai.className = "cardADICionais"
            cardpai.append(card)
            cardpai.append(div)
            secaoAdicionais.appendChild(cardpai)
        })
        
        conteinerAdicionais.appendChild(secaoAdicionais)
    }
    
    catch(erro){
        console.log("erro de conexao:",erro)
    }

    const quantidadeAdicionaisMAIS = document.querySelectorAll("#quantidadeADDmais")
    const quantidadeAdicionaisMENOS = document.querySelectorAll("#quantidadeADDmenos")

    quantidadeAdicionaisMAIS.forEach(quantidade =>{
        quantidade.addEventListener("click",maisADicional)

    })
    quantidadeAdicionaisMENOS.forEach(menosquantidade =>{
        menosquantidade.addEventListener("click",menosADicional)

    })


}

let cardpai = null
let totalRemover = 0
let produtoClicado = null
let precoProduto = null 
let novopreco = 0
let H2quantidade_adicional = null

async function mostrarDescricao(produto){
    precoProduto = produto.preco
    novopreco = produto.preco
    produtoClicado = produto

    console.log(produtoClicado)

    conteudo_conteirMOstrarProdutos.style.display = "none"
    conteiner_titulo.style.display = "none"
    chamarCarrinho.style.display = "none"
    conteiner_mostrarDEscricao.style.display = "grid"
    menu.style.display = "none"

    const categoriaID = produto.categoria_id
    valorProduto.textContent = `R$ ${produto.preco},00`
    const adicionais = await buscarAdicionais(categoriaID)
    
    const img = document.createElement("img")
    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    h2.textContent = "Alguma observação?"
    const observacao = document.createElement("input")
    
    observacao.type = "text"
    observacao.placeholder = "Ex: tirar a cebola,ovo etc."
    observacao.maxLength = 80
    div.append(h2)
    div.append(observacao)
    div.id = "observacao" 

    const nome = document.createElement("h3")
    nome.textContent = produto.nome
    const descricao = document.createElement("p")
    descricao.textContent = produto.descricao
    const preco = document.createElement("h4")
    preco.textContent = `R$ ${produto.preco},00`
    img.src = produto.img_url
    img.className = "img-doProduto"

    conteudo_descricao.appendChild(img)
    conteudo_descricao.appendChild(nome)
    conteudo_descricao.appendChild(descricao)
    conteudo_descricao.appendChild(preco)
    conteudo_descricao.appendChild(div)

}

let carrinho_adicional = []
const carrinho = []


let adicionalpreco = 0

function addADicionais(adicionais_categoria,event){
    cardpai = event.currentTarget.parentElement
    if(!cardpai.classList.contains("selecionado")){
        cardpai.classList.add("selecionado")
        adicionalpreco = adicionais_categoria.preco
        novopreco += adicionais_categoria.preco
        valorDEscricao.textContent = `R$ ${novopreco},00`
    }else{
        cardpai.classList.remove("selecionado")
        subtrairADicional(cardpai)
        valorDEscricao.textContent = `R$ ${novopreco},00`
        }
}

function voltarDAdescricao(){
    conteiner_mostrarDEscricao.style.display = "none"
    conteudo_conteirMOstrarProdutos.style.display = "block"
    conteiner_titulo.style.display = "block"
    if(carrinho.length >= 1){
        chamarCarrinho.style.display = "block"
    }
    conteinerAdicionais.innerHTML = ""
    menu.style.display = "flex"
    conteudo_descricao.innerHTML = ""
    produtoClicado = null
}

let quantidadePEdido = 1

function addCARINHOmais(){
    quantidadePEdido++
    quantidade.textContent = quantidadePEdido
    novopreco += precoProduto
    valorDEscricao.textContent = `R$ ${novopreco},00`
}

function addCARINHOmenos(){
    if(quantidadePEdido <= 1){
        return
    }
    quantidadePEdido--
    quantidade.textContent = quantidadePEdido
    novopreco -= precoProduto
    valorDEscricao.textContent = `R$ ${novopreco},00`
}

function maisADicional(event){
    const conteinerpai = event.currentTarget.parentElement.parentElement
    const card = event.currentTarget.closest(".cardADICionais")
    H2quantidade_adicional = card.querySelector(".adicional_quantidade")

    if(!conteinerpai.classList.contains("selecionado")){
        return    
    }
    novopreco += adicionalpreco
    H2quantidade_adicional.dataset.quantidade++
    H2quantidade_adicional.textContent = Number(H2quantidade_adicional.dataset.quantidade)
    valorDEscricao.textContent = `R$ ${novopreco},00` 
}   

function menosADicional(event){
    const conteinerpai = event.currentTarget.parentElement.parentElement

    if(!conteinerpai.classList.contains("selecionado")){
        return
    }

    if(H2quantidade_adicional.textContent == 1){
        return
    }
    H2quantidade_adicional.dataset.quantidade--
    H2quantidade_adicional.textContent = Number(H2quantidade_adicional.dataset.quantidade)
    novopreco -= adicionalpreco
    valorDEscricao.textContent =  `R$ ${novopreco},00`
}

function subtrairADicional(cardpai){
    const preco = cardpai.querySelector("p")
    const quantidade = cardpai.querySelector("h2")
    totalRemover = preco.dataset.preco * quantidade.dataset.quantidade
    quantidade.textContent = Number(quantidade.dataset.quantidade = 1)
    novopreco -= totalRemover
}


function adicionarAOcarinho(){
    conteiner_mostrarDEscricao.style.display = "none"
    conteudo_conteirMOstrarProdutos.style.display = "block"
    conteiner_titulo.style.display = "block"
    menu.style.display = "flex"
    chamarCarrinho.style.display = "block"
    
    let cardobervacao = conteudo_descricao.querySelector("input").value
    let card_clidado = conteinerAdicionais.querySelectorAll(".selecionado")
    
    if(card_clidado.length === 0 && cardobervacao.length > 1){
        carrinho.push({nome:produtoClicado.nome,preco:produtoClicado.preco,quantidade:quantidade_preoco_produto.textContent,observacao:cardobervacao,img:produtoClicado.img_url})
    
    }else if(cardobervacao.length === 0  && card_clidado.length >= 1){
        card_clidado.forEach(card =>{
        carrinho_adicional.push({nome:card.querySelector("h3").dataset.id,preco:card.querySelector("p").dataset.preco,quantidade:card.querySelector("h2").dataset.quantidade,img:produtoClicado.img_url})
        })
        
        carrinho.push({nome:produtoClicado.nome,preco:produtoClicado.preco,quantidade:quantidade_preoco_produto.textContent,adicional:carrinho_adicional,img:produtoClicado.img_url})
        carrinho_adicional = []
    
    }else if(card_clidado.length >= 1 && cardobervacao.length > 1){
        card_clidado.forEach(card =>{
        carrinho_adicional.push({nome:card.querySelector("h3").dataset.id,preco:card.querySelector("p").dataset.preco,quantidade:card.querySelector("h2").dataset.quantidade,img:produtoClicado.img_url})
        })
        
        carrinho.push({nome:produtoClicado.nome,preco:produtoClicado.preco,quantidade:quantidade_preoco_produto.textContent,observacao:cardobervacao,adicional:carrinho_adicional,img:produtoClicado.img_url})
        
        carrinho_adicional = []

    }else{
        carrinho.push({nome:produtoClicado.nome,preco:produtoClicado.preco,quantidade:quantidade_preoco_produto.textContent,img:produtoClicado.img_url})
    }

    produtoClicado = null
    quantidade.textContent = 1
    quantidadePEdido = 1
    conteudo_descricao.innerHTML = ""
    conteinerAdicionais.innerHTML = ""
}

function mostrarcarrinho(){
    menu.style.display = "none"
    chamarCarrinho.style.display = "none"
    conteudo_conteirMOstrarProdutos.style.display = "none"
    conteiner_titulo.style.display = "none"
    conteiner_carrinho.style.display = "block"
    console.log(carrinho)
    carrinho.forEach(Produto =>{
        const cardPAI = document.createElement("div")
        const cardPROduto = document.createElement("div")
        const produto = document.createElement("h3")
        const img_produto = document.createElement("img")
        const observacao = document.createElement("p")
        const quantidade = document.createElement("h4")
        cardPAI.className = "card_produtos_carrinho" 
    
        produto.textContent = Produto.nome
        quantidade.textContent = Produto.quantidade
        img_produto.src = Produto.img
        
        img_produto.className = "img-carrinho"
        quantidade.className = "quantidadePRODUTO"    
        cardPROduto.className = "card-produto-carrinho"


        cardPROduto.append(img_produto)
        cardPROduto.append(quantidade)
        cardPROduto.append(produto)
        
        cardPAI.append(cardPROduto)
        
        if(Produto.observacao){
            console.log(Produto.observacao)
            const div_observacao = document.createElement("div")
            if(Produto.observacao.length >= 1){
                const observacao = document.createElement("p")
                div_observacao.className = "div-observacao"
                observacao.textContent = Produto.observacao
                div_observacao.append(observacao)
            }
            
            cardPAI.append(div_observacao)
        }
        
        if(Produto.adicional){   
            const divADD = document.createElement("div")
            if(Produto.adicional.length >= 1){
                Produto.adicional.forEach(adicional =>{
                    const divAuxiliar = document.createElement("div")
                    const Adicional = document.createElement("h4")                
                    const quantidadeADD = document.createElement("p")
                    quantidadeADD.className = "quantidadeADD"
                    Adicional.textContent = adicional.nome
                    quantidadeADD.textContent = adicional.quantidade
                    divADD.className = "card-adicionais"
                    divAuxiliar.className = "div-auxiliar-style"
                    divAuxiliar.append(quantidadeADD)
                    divAuxiliar.append(Adicional)
                    divADD.append(divAuxiliar)
                })

                cardPAI.append(divADD)
            }

        }        
        conteudo_carrinho.appendChild(cardPAI)
    })

}