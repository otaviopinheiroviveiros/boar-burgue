const conteinerlogin = document.querySelector(".conteiner-principal")
const conteinerADm = document.querySelector(".area-celular")
const form_login = document.getElementById("form-login")
form_login.addEventListener("submit",verificar)
const div_produtos = document.querySelector(".produtos")
const usuario = document.querySelector("input[name='usuario']")
const senha = document.querySelector("input[name='senha']")
const mensagemERRo = document.getElementById("mensagem-login")
const senha1 = "1234"
const ausuairo = "admin"
const butaomostrarCADAstrarpedido = document.getElementById("chamar-cadastrarPEDIDO")
butaomostrarCADAstrarpedido.addEventListener("click",cadastrarpedido)
const cadastrar = document.getElementById("Cadastrar")
cadastrar.addEventListener("click",adicionarProduto)
const voltarCADAStrarpp = document.getElementById("voltar-cadastrarPEdido")
voltarCADAStrarpp.addEventListener("click",()=>{
    mostrar('area-admin')
})

const finalizarCAdastro = document.getElementById("finalizar-cadastro")
finalizarCAdastro.addEventListener("click",finalizarCAdastroPEDIDO)
const voltarmostarcadastro = document.getElementById("voltarmostarcadastro")
voltarmostarcadastro.addEventListener("click",limparPEdido)
const conteinercadastrarPEDido  = document.querySelector(".cadastrar-pedido")
const canCelarcadastro = document.getElementById("cancelarCAdastro")
canCelarcadastro.addEventListener("click",limparPEdido)

function verificar(form_login){
    form_login.preventDefault();   // impede o formulário de recarregar a página

    if(usuario.value === ausuairo && senha.value === senha1){
        libearACEsso()
    }else{
        alert("Erro: Tente novamente")
    }
}

function libearACEsso(){
    mostrar('area-admin')
}

let divproduto = null
let Produtoclicado = null
let butaoMais = null
let butaoMenos = null
let quantidadeP = null

async function cadastrarpedido(){
    mostrar('cadastrarPEDIDO')
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
            const produto_disponivel = produtos.filter(produto => produto.disponivel  === true)
            
            produto_disponivel.forEach(produto =>{
                const Produto = document.createElement("div")
                const div_quantidade = document.createElement("div")
                div_quantidade.className = "div-quantidade"
                
                const img_produto = document.createElement("img")
                const nome_produto = document.createElement("h2")
                nome_produto.addEventListener("click",(event)=>{
                    produtoclicado(produto,event)
                })
                Produto.className = "produto"
                const btcontrolemenos = document.createElement("button")
                const quantidade = document.createElement("h2")
                const btcontrolemais = document.createElement("button")
                btcontrolemais.textContent = "+"
                btcontrolemais.id = "butao-mais"
                btcontrolemenos.textContent = "-"
                btcontrolemenos.id = "butao-menos"
                quantidade.textContent = "1"
                quantidade.id = "quantidade-produto"
                div_quantidade.append(btcontrolemenos)
                div_quantidade.append(quantidade)
                div_quantidade.append(btcontrolemais)

                img_produto.src = produto.img_url
                nome_produto.textContent = produto.nome
                Produto.append(img_produto)
                Produto.append(nome_produto)
                Produto.append(div_quantidade)
                div_produtos.appendChild(Produto)
            })

        }
        
        catch(erro){
            alert("conexão estável!")
            console.log("erro de conexão:",erro)
        }
        
        butaoMais =  document.querySelectorAll("#butao-mais")
        butaoMais.forEach(maisproduto =>{
            maisproduto.addEventListener("click",quantidadeMais)
        })
        butaoMenos =  document.querySelectorAll("#butao-menos")
        butaoMenos.forEach(menosproduto=>{
            menosproduto.addEventListener("click",quantidadeMenos)
        })
            
        quantidadeP = document.getElementById("quantidade-produto")
}  

function mostraradd(){
    const divADD = document.querySelector(".adicionais")
    divADD.style.display = "block"
}

let cadastrarPedido = []
let armazemtemporario = []

function produtoclicado(produto,event){
    produto_nome = produto.nome
    produto_preco = produto.preco

    divproduto = event.currentTarget.parentElement
    if(!divproduto.classList.contains("PRODUTOclicado")){
        divproduto.classList.add("PRODUTOclicado")
        armazemtemporario.push({nome:produto_nome,preco:produto_preco})
    }else{
        divproduto.classList.remove("PRODUTOclicado")
        divproduto.querySelector("#quantidade-produto").textContent = 1
        const produto_nome = divproduto.querySelector(".produto h2").textContent
        for(let i = 0; i < armazemtemporario.length; i++){
            if(armazemtemporario[i].nome === produto_nome){
                armazemtemporario.splice(i, 1)
                break
            }
        }
    }
}

function quantidadeMais(event){
    const conteinerpai = event.currentTarget.parentElement.parentElement
    if(!conteinerpai.classList.contains("PRODUTOclicado")) return
    
    const div = event.currentTarget.parentElement
    const h2 = div.querySelector("#quantidade-produto")
    h2.textContent++
}

function quantidadeMenos(event){
    const conteinerpai = event.currentTarget.parentElement.parentElement
    const div = event.currentTarget.parentElement
    const h2 = div.querySelector("#quantidade-produto")
    
    if(!conteinerpai.classList.contains("PRODUTOclicado")) return
    
    if(h2.textContent <= 1) return
    
    h2.textContent--
}

function mensagem(){
    const h4 = document.createElement("h4")
    const divTEla = document.createElement("div")
    divTEla.className = "divopacidade"
    divTEla.append(h4)
    document.body.appendChild(divTEla)
    h4.textContent = "selecione os produtos para serem cadastrados!"
    h4.style.display = "block"
    divTEla.style.display = "flex"
    h4.className = "h4mensagem"
    setTimeout(function(){
        h4.style.display = "none"
        divTEla.style.display = "none"
        h4.remove()
        divTEla.remove()
    },5000)

}

function adicionarProduto(){
    const cards = document.querySelectorAll(".PRODUTOclicado")
    if(cards.length < 1){
        mensagem()
        return
    }
    // aqui, eu estou pegando o prouto e o indice dele, dessa forma consigo.
    armazemtemporario.forEach((produto , i) =>{
        // pegar o indice e pegar exatamante o mesmo indice na minha lista de cads clicados
        // assim eu consigo adicionar a quantidade  do produto
        const card = cards[i]
        const quantidade = card.querySelector("#quantidade-produto").textContent
        cadastrarPedido.push({nome:produto.nome,preco:produto.preco,quantidade:quantidade})
    })
    armazemtemporario = []
    mostrar('mostrarProdutocastrado')
    mostraprodutoscadastrado()
}

function mostrar(id){
    document.querySelectorAll('section').forEach(secao => {
        secao.classList.add("escondido")
    })
    document.getElementById(id).classList.remove("escondido")
}

const divPAIresumovalor =  document.querySelector(".resumo-total")
const divProduto = document.querySelector(".produtos-conteudo")
const inputFORMAdepagamento = document.getElementById("fomaDEpagamentoCADAsTRopedido")

let total = null

function mostraprodutoscadastrado(){
    let totaltexto = document.createElement("h6")
    cadastrarPedido.forEach(Produto =>{
        const div = document.createElement("div")
        const divFILHOresumototal = document.createElement("div")
        divFILHOresumototal.className = "sub-total"
        const subtotal = document.createElement("h5")
        div.className = "produto-cadastrado"
        const quantidade = document.createElement("h3")
        const nome = document.createElement("h2")
        nome.textContent = Produto.nome
        quantidade.textContent = Produto.quantidade
        div.append(quantidade)
        div.append(nome)
        divProduto.appendChild(div)
        
        total += Produto.quantidade * Produto.preco
        totaltexto.textContent = `total a pagar ${total}!`
        subtotal.textContent =  `${Produto.quantidade} x ${Produto.preco} = ${Produto.quantidade  * Produto.preco}`
        divFILHOresumototal.append(subtotal)
        divPAIresumovalor.appendChild(divFILHOresumototal)
    })
    divPAIresumovalor.appendChild(totaltexto)
}

async function finalizarCAdastroPEDIDO(){
    if(inputFORMAdepagamento.value === ""){
        alert("digite a forma de pagamento")
        return
    }
    
    let pedidoId = null
    
    try{
        const resposta = await fetch(`https://fapfntdcpumrrvxjyudt.supabase.co/rest/v1/pedidos`,{
            method: 'POST',
            headers: {
                    'apikey': "sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
                    'Authorization': "Bearer sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
                    'Content-Type': 'Application/json',
                    'Prefer':'return=representation'
                    },
            body: JSON.stringify({
                status: "agurdando",
                origem: "CASA",
                form_pagamento: `${inputFORMAdepagamento.value.toUpperCase()}`,
                total: `${total}`
            })
        })
        
        if(!resposta.ok){
            console.log("erro html:",resposta.status)
        }
        
        const dados = await resposta.json()
        pedidoId = dados[0].id_pedido
    }
    catch(erro){
        console.log("erro de conexão:",erro)
    }
    
    const itens = cadastrarPedido.map(produto => ({
        nome_produto: produto.nome,
        quantidade: Number(produto.quantidade), 
        pedido_id: pedidoId,
    }))
    
    await fetch(`https://fapfntdcpumrrvxjyudt.supabase.co/rest/v1/itens_pedidos`,{
        method: 'POST',
        headers:{
            'apikey': "sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
            'Authorization': "Bearer sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
            'Content-Type': 'Application/json',
        },
        
        body:JSON.stringify(itens)
    
    })
    
    mostrarTELAdeconcluido()
}

function mostrarTELAdeconcluido(){
    const  divPiaprodutos = document.querySelector(".produtos")
    const divpai = document.createElement("div")
    const p = document.createElement("p")
    p.textContent = "Pedido cadastrado com sucesso"
    divpai.className = "divPAIpedidoConcLUIDo"
    const div = document.createElement("div")
    const img = document.createElement("img")
    img.src = "../img/concluido.png"
    img.className = "imgconcluido"
    div.append(img)
    divpai.append(div)
    divpai.append(p)
    document.body.appendChild(divpai)
    setTimeout(function(){
        divpai.style.display = "none"
        mostrar('area-admin')
        divpai.remove()
    },2000)
    limparPEdido()
}

function limparPEdido(){
    mostrar('area-admin')
    const div = document.querySelectorAll(".PRODUTOclicado")
    divProduto.textContent = ""
    divPAIresumovalor.textContent = ""
    div.forEach(removerclass=>{
        removerclass.remove("PRODUTOclicado")
    })
    cadastrarPedido = []
    total = null

}

//   INICIO CODIGO MENU VISÂO GERAL
const chamarCONETIENerVIsaoGERAl = document.getElementById("CHAMARvisao-geral")
chamarCONETIENerVIsaoGERAl.addEventListener("click",visaogeral)
const voltavisaogeral = document.getElementById("voltarDEvisaogeral")
voltavisaogeral.addEventListener("click",()=>{
    mostrar('area-admin')
})
const faturamentoDOdia = document.getElementById("faturamentoDOdia")
const totalPIX = document.getElementById("totalPIX")
const totalCartAO = document.getElementById("totalCARTAO")
const totaldinheiro = document.getElementById("totalDINheiro")

let porcempix = document.getElementById("porcentagemPIX")
let porcemdinheiro = document.getElementById("porcentagemDInheiro")
let porcemCARTAO = document.getElementById("porcentagemCARTAO")

const crescimentoporcemPD = document.getElementById("crescimentoPORcemPEDIDO")
const crescimentoporcem = document.getElementById("crescimentoPORcemtagem")
const quantidadePD = document.getElementById("PedididosdoDIA")
const texto = document.getElementById("texto-data")
texto.textContent = `Hoje, ${new Date().toLocaleDateString("pt-BR")}`

const botaoData = document.querySelector(".botao-data")
const inputData = document.getElementById("input-data")

botaoData.addEventListener("click", () => {
    // quando clicad no botão chama o input, e abre o calendario
    inputData.showPicker()
})

let dia_trabalhado = null
// o change roda quando o usuario escolhe o dia, e ai ja vem no formato
// 2012-09-12
inputData.addEventListener("change", () => {
    dia_trabalhado = inputData.value
    texto.textContent = inputData.value
    visaogeral()
})

function mesmoDia(a, b) {
    return a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear();
}


async function visaogeral(){
    mostrar('visao-geral')
    const diaAtual = new Date()
    
    let faturamentoDIA = null
    let totalPix = null
    let quantidadeDEpedidos = null
    let quantidadePPontem = null
    let totalcartao = null
    let totalDINHEIRO = null
    let faturamentoDIA_anterior = null
    
    try{
        const resposta = await fetch(
            "https://fapfntdcpumrrvxjyudt.supabase.co/rest/v1/pedidos",
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
        
        const pedidos = await resposta.json()
        pedidos.forEach(pedido =>{
            const dataPEDido = new Date(pedido.dia_do_pedido)
            const dia = dataPEDido.getDate()
            const mes = dataPEDido.getMonth() + 1
            const ano = dataPEDido.getFullYear()
            const dia_do_Pedidos = `${ano}-${mes}-${dia}`
            // perguntado se o dai que esta na minha tabela é igual ao que  o admin clicou
            // se for igual ele vai geral os dados das venddas daquele dia
            if(dataPEDido.getDate() === diaAtual.getDate()){
                quantidadeDEpedidos++
                faturamentoDIA += pedido.total
                if(pedido.form_pagamento === "PIX"){
                    totalPix += pedido.total
                }
                
                if(pedido.form_pagamento === "CARTAO"){
                    totalcartao += pedido.total
                }
                
                if(pedido.form_pagamento === "DINHEIRO"){
                    totalDINHEIRO += pedido.total
                    
                }
            }
            
            if(dataPEDido.getDate() === diaAtual.getDate() - 1){
                quantidadePPontem++
                faturamentoDIA_anterior += pedido.total
            }
        })
        
        porcemdinheiro.textContent = `${((totalDINHEIRO * 100) / faturamentoDIA).toFixed(2)}%`
        porcemCARTAO.textContent = `${((totalcartao * 100 ) / faturamentoDIA).toFixed(2)}%`
        porcempix.textContent = `${((totalPix * 100) / faturamentoDIA).toFixed(2)}%`
        
        totaldinheiro.textContent = `R$ ${totalDINHEIRO},00`
        totalPIX.textContent = `R$ ${totalPix},00`
        totalCartAO.textContent = `R$ ${totalcartao},00`
        
        faturamentoDOdia.textContent = `R$ ${faturamentoDIA},00`
        crescimentoporcem.textContent = `+${((faturamentoDIA - faturamentoDIA_anterior) * 100 / faturamentoDIA_anterior).toFixed(1)}%`
        crescimentoporcemPD.textContent = `+${((quantidadeDEpedidos - quantidadePPontem) * 100 / quantidadePPontem).toFixed(1)}%`
        quantidadePD.textContent = quantidadeDEpedidos
    }
    catch(erro){
        alert("conexão estável!")
        console.log("erro de conexão:",erro)
    }

    mostrarMaisVendidos()
    
}

async function mostrarMaisVendidos() {
    const container = document.querySelector('.produtos-mais-vendidos');
    try{
        const resposta = await fetch(
            "https://fapfntdcpumrrvxjyudt.supabase.co/rest/v1/itens_pedidos",
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
        
        const pedidosMAISvendidos = await resposta.json()
        pedidosMAISvendidos.forEach(pedido =>{
            const barra = document.createElement('div');
            barra.className = 'barra';

            const progresso = document.createElement('div');
            progresso.className = 'progresso';
            progresso.style.width = `${porcentagem}%`;

            const texto = document.createElement('p');
            texto.textContent = `${porcentagem}%`;

            barra.appendChild(progresso);
            barra.appendChild(texto);

            container.appendChild(card);
            container.appendChild(barra);

            const card = document.createElement('div');
            card.className = 'produtoMAISvendido';

            const img = document.createElement('img');
            img.src = '../img/cifrao.png';
            img.style.width = '4rem';

            const nome = document.createElement('h4');
            nome.textContent = produto.nome;

            const pedidos = document.createElement('p');
            pedidos.textContent = `${produto.quantidade} pedidos`;

            card.appendChild(img);
            card.appendChild(nome);
            card.appendChild(pedidos);
        })
    }
    catch(erro){
        alert("conexão estável!")
        console.log("erro de conexão:",erro)
    }
  // apaga os cards antigos (o cabeçalho continua)
    container.querySelectorAll('.produtoMAISvendido, .barra').forEach(el => el.remove());
}

visaogeral()