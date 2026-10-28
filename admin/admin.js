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
                alert("erro no codigo")
                return
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
            return
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
    produto_img = produto.img_url
    divproduto = event.currentTarget.parentElement
    if(!divproduto.classList.contains("PRODUTOclicado")){
        divproduto.classList.add("PRODUTOclicado")
        armazemtemporario.push({nome:produto_nome,preco:produto_preco,img:produto_img})
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
        cadastrarPedido.push({nome:produto.nome,preco:produto.preco,quantidade:quantidade,img:produto.img})
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
        const resposta = await fetch("https://fapfntdcpumrrvxjyudt.supabase.co/rest/v1/pedidos",{
            method: 'POST',
            headers: {
                    'apikey': "sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
                    'Authorization': "Bearer sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
                    'Content-Type': 'Application/json',
                    'Prefer':'return=representation'
                    },
            body: JSON.stringify({
                status: "aguardando",
                origem: "CASA",
                form_pagamento: `${inputFORMAdepagamento.value.toUpperCase()}`,
                total: `${total}`
            })
        })
        
        if(!resposta.ok){
            console.log("erro html:",resposta.status)
            alert("erro no html!")
            return
        }
        
        const dados = await resposta.json()
        pedidoId = dados[0].id_pedido
    }
    catch(erro){
        console.log("erro de conexão:",erro)
        alert("coneção estavel!")
        return
    }
    
    const itens = cadastrarPedido.map(produto => ({
        nome_produto: produto.nome,
        quantidade: Number(produto.quantidade), 
        pedido_id: pedidoId,
        img_produto: produto.img
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
chamarCONETIENerVIsaoGERAl.addEventListener("click",()=>{
    visaogeral(DiaSelecionado = new Date())
})
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
    texto.textContent = inputData.value
    const [ano,mes,dia] = inputData.value.split('-')
    visaogeral((new Date(ano,mes - 1,dia)))
})

function mesmoDia(a, b){
    return a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
}

let pedidos = null

async function visaogeral(DiaSelecionado = new Date()){
    mostrar('visao-geral')
    const diaAtual = new Date()
    
    let faturamentoDIA = null
    let totalPix = null
    let quantidadeDEpedidos = null
    let quantidadePPontem = null
    let totalcartao = null
    let totalDINHEIRO = null
    let faturamentoDIA_anterior = null

    const ontem = new Date(DiaSelecionado)
    ontem.setDate(ontem.getDate() - 1)
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
            alert("erro") 
            return
        }
        
        pedidos = await resposta.json()
        const pedidos_concluidos = pedidos.filter(pedido=>{
            pedido.status === "cluncluido"
        })
        pedidos_concluidos.forEach(pedido =>{
            const dataPEDido = new Date(pedido.dia_do_pedido)
            if(mesmoDia(dataPEDido,DiaSelecionado)){
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
            }else{
                crescimentoporcemPD.style.color = "red"
                quantidadePD.textContent = `0`
            }
            
            if(mesmoDia(dataPEDido,ontem)){
                quantidadePPontem++
                faturamentoDIA_anterior += pedido.total
            }
        })
        
        
        if(totalDINHEIRO === null){
            porcemdinheiro.textContent = `0%`
            totaldinheiro.textContent = `R$ ${0},00`
        }else{
            porcemdinheiro.textContent = `${((totalDINHEIRO * 100) / faturamentoDIA).toFixed(2)}%`
            totaldinheiro.textContent = `R$ ${totalDINHEIRO},00`
        }
        if(totalcartao === null){
            porcemCARTAO.textContent = `0%`
            totalCartAO.textContent = `R$ ${0},00`
        }else{
            totalCartAO.textContent = `R$ ${totalcartao},00`
            porcemCARTAO.textContent = `${((totalcartao * 100 ) / faturamentoDIA).toFixed(2)}%`
        }
        if(totalPix === null){
            porcempix.textContent = `0%`
            totalPIX.textContent = `R$ ${0},00`
        }else{
            porcempix.textContent = `${((totalPix * 100) / faturamentoDIA).toFixed(2)}%`
            totalPIX.textContent = `R$ ${totalPix},00`
        }
        
        if(faturamentoDIA === null){
            faturamentoDOdia.textContent = `R$ ${0},00`
            crescimentoporcem.textContent = `0%`
        }else{
            const calculoPORcemFAtu = ((faturamentoDIA - faturamentoDIA_anterior) * 100 / faturamentoDIA_anterior).toFixed(1)
            if(calculoPORcemFAtu <  1){
                crescimentoporcem.textContent = `${calculoPORcemFAtu}%`
                faturamentoDOdia.textContent = `R$ ${faturamentoDIA},00`
                crescimentoporcem.style.color = "red"
            }else{
                crescimentoporcem.textContent = `+${((faturamentoDIA - faturamentoDIA_anterior) * 100 / faturamentoDIA_anterior).toFixed(1)}`
                faturamentoDOdia.textContent = `R$ ${faturamentoDIA},00`
                crescimentoporcem.style.color = "green"
            }
        }
        if(quantidadeDEpedidos === null){
            crescimentoporcemPD.textContent = `0%`
        }else{
            const calculoporcemQPD =  ((quantidadeDEpedidos - quantidadePPontem) * 100 / quantidadePPontem).toFixed(1)
            if(calculoporcemQPD <= 0){
                crescimentoporcemPD.textContent = `${calculoporcemQPD}%`
                crescimentoporcemPD.style.color = "red"
                quantidadePD.textContent = quantidadeDEpedidos
            }else{
                crescimentoporcemPD.textContent = `+${((quantidadeDEpedidos - quantidadePPontem) * 100 / quantidadePPontem).toFixed(1)}%`
                quantidadePD.textContent = quantidadeDEpedidos
                crescimentoporcemPD.style.color = "green"
            }
        }

        if(((faturamentoDIA - faturamentoDIA_anterior) * 100 / faturamentoDIA_anterior).toFixed(1) > 100){
            crescimentoporcem.textContent = `+100%`
            crescimentoporcemPD.textContent = "+100%"
        }
    }
    catch(erro){
        alert("conexão estável!")
        console.log("erro de conexão:",erro)
        return
    }
    mostrarMaisVendidos(DiaSelecionado)
    
}
let pedidosMAISvendidos = null

async function mostrarMaisVendidos(DiaSelecionado = new Date()){
    const container = document.querySelector('.produtos-mais-vendidos')
    const contagem = []
    let totalVendido = 0
    
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
            alert("erro no codigo")
            console.log("erro html:",resposta.status)
            return
        }
        
        pedidosMAISvendidos = await resposta.json()
        
        const hoje = new Date();
        const pedidosHoje = pedidos.filter(pedido =>
            mesmoDia(new Date(pedido.dia_do_pedido),DiaSelecionado)
        )
        
        const idsPedidosHoje = pedidosHoje.map(pedido => pedido.id_pedido);
        const itensDeHoje = pedidosMAISvendidos.filter(item =>
            idsPedidosHoje.includes(item.pedido_id)
        )
        
        itensDeHoje.forEach(item => {
            const qtd = Number(item.quantidade);
            const existente = contagem.find(p => p.nome === item.nome_produto)
            if(existente){
                existente.quantidade += qtd
            }else{
                contagem.push({nome:item.nome_produto, quantidade: qtd,img:item.img_produto})
            }
            totalVendido += qtd
        })
        contagem.sort((a,b) => b.quantidade - a.quantidade)
        // apaga os cards antigos (o cabeçalho continua)
        container.querySelectorAll('.produtoMAISvendido, .barra').forEach(el => el.remove());
        contagem.slice(0,5).forEach(produto =>{
            const  porcentagem = Math.round((produto.quantidade / totalVendido) * 100).toFixed(1)
            
            const card = document.createElement('div')
            card.className = 'produtoMAISvendido'
            
            const img = document.createElement('img')
            img.src = produto.img
            img.className = 'imgPRodutoMAIsvendido'
            
            const nome = document.createElement('h4')
            nome.textContent = produto.nome
            
            const pedidos = document.createElement('p')
            pedidos.textContent = `${produto.quantidade} pedidos`
            
            card.appendChild(img)
            card.appendChild(nome)
            card.appendChild(pedidos)
            
            // barra de porcentagem
            const barra = document.createElement('div')
            barra.className = 'barra'
            
            const progresso = document.createElement('div')
            progresso.className = 'progresso'
            progresso.style.width = `${porcentagem}%`
            
            const texto = document.createElement('p')
            texto.textContent = `${porcentagem}%`
            
            barra.appendChild(progresso)
            barra.appendChild(texto)
            
            container.appendChild(card)
            container.appendChild(barra)
        })
        
        if (totalVendido === 0) return // nada vendido, evita dividir por zero
    }
    catch(erro){
        alert("conexão estável!")
        console.log("erro de conexão:",erro)
    }
    
}

// codigo operação

const pedidos_novos = document.querySelector(".pedidos-novos")
const pedidosEmpreparo = document.querySelector(".pedidos-em-preparo")
const pedidoSaiuparaentrega = document.querySelector(".pedidos-saiu-paraENTREga")
const pedidosCOnluidos = document.querySelector(".pedidos-conluidos")

const chamarCONTEINEROperação = document.getElementById("CHAMAR-operacao")
chamarCONTEINEROperação.addEventListener("click",conteinerOPERAcaO)

const voltarOperacao = document.getElementById("voltar-de-operacao")
voltarOperacao.addEventListener("click",()=>{
    mostrar('area-admin')
})
const butaoconcluido = document.querySelector(".conluido")
const butaosaiuPAraentrega = document.querySelector(".pedidosPARAentrega")
const buttaoPREPARAndo = document.querySelector(".pedidosEmpreparo")
const pedidosNOVOs = document.querySelector(".pedidosNOVOs")

const pronto = document.querySelector(".pronto")
const conteudoPRonto = document.querySelector(".pedidos-prontos")

const butoesOcutarConteiner = document.querySelectorAll("[data-conteiner]")
butoesOcutarConteiner.forEach(butao=>{
    butao.addEventListener("click",mostrarConteiner)
})

async function conteinerOPERAcaO(){
    mostrar('operacao')
    const container = document.querySelectorAll("[data-pedidos]")
    container.forEach(conteiner=>{
        conteiner.innerHTML = "" 
    })

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
            alert("erro no codigo")
            console.log("erro html:",resposta.status)
        }
        
        const pedidos_do_dia = await resposta.json()
        const hoje = new Date()

        const pedidosHOJE = pedidos_do_dia.filter(pedido=>
            new Date(pedido.dia_do_pedido).getDate() === hoje.getDate()
        )
        
        pedidosHOJE.forEach(pedido=>{
            const divPEdiDO = document.createElement("div")
            const spanNUMEROdoPEdido = document.createElement("span")
            const pHORArio = document.createElement("p")
            const buttonStatus = document.createElement("button")
            const horario = new Date(pedido.dia_do_pedido)
            buttonStatus.addEventListener("click",(event)=>{
                // stopPropagation evita que oa clicar no butão o "navegador" avise para subir o clique
                // esse bug se chama (buddling) propagação do clique
                // o stopPropagation evita isso, meio que ele diz -"não avisa o card que o elemento clicado esta dentro dele!"
                event.stopPropagation();
                alterarStatusdoPEDido(pedido)
            })
            
            divPEdiDO.className = "pedido-dia"
            spanNUMEROdoPEdido.id = "numero-do-pedido"
            buttonStatus.id = "status-do-pedido"
            pHORArio.id = "horario-do-pedido"
            
            divPEdiDO.addEventListener("click",()=>{
                mostrarDEscricaoDopedido(pedido)
            })
            
            spanNUMEROdoPEdido.textContent = `#0${pedido.id_pedido}`
            pHORArio.textContent = `${horario.getHours()}:${horario.getMinutes()}`
            buttonStatus.textContent = pedido.status.toUpperCase()

            divPEdiDO.append(spanNUMEROdoPEdido,pHORArio,buttonStatus)
            if(pedido.status.toUpperCase() === "preparando".toUpperCase()){
                buttonStatus.style.color = "white"
                buttonStatus.style. background = "orangered"
                pedidosEmpreparo.appendChild(divPEdiDO)
            }else if(pedido.status.toUpperCase() === "para entrega".toUpperCase()){
                buttonStatus.style.color = "white"
                buttonStatus.style.background = "blue"
                pedidoSaiuparaentrega.appendChild(divPEdiDO)
            }else if(pedido.status.toUpperCase() === "aguardando".toUpperCase()){
                pedidos_novos.appendChild(divPEdiDO)
            }else if(pedido.status.toUpperCase() === "pronto".toUpperCase()){
                buttonStatus.style.color = "white"
                buttonStatus.style.background = "green"
                conteudoPRonto.appendChild(divPEdiDO)
            }else{
                buttonStatus.style.color = "white"
                buttonStatus.style.background = "green"
                pedidosCOnluidos.appendChild(divPEdiDO)
            }
        })
        
    }
    catch(erro){
        alert("conexão estável!")
        console.log("erro de conexão:",erro)
    }
    // O children é a lista de elementos filhos do container 
    // (só os que estão diretamente dentro dele), e o .length conta quantos são.
    atualizarConteiner(pedidos_novos,pedidosNOVOs)
    atualizarConteiner(conteudoPRonto,pronto)
    atualizarConteiner(pedidosCOnluidos,butaoconcluido)
    atualizarConteiner(pedidoSaiuparaentrega,butaosaiuPAraentrega)
    atualizarConteiner(pedidosEmpreparo,buttaoPREPARAndo)

}
// o que esta a esquerda é o valor atual,se esse valor for vedadeiro,
// o px valor da lista é o que esta a direita
const proximoStatus = {
    "aguardando": "preparando",
    "preparando": "para entrega",
    "para entrega": "concluido"
}

const proximoStatusCasa = {
    "aguardando": "preparando",
    "preparando": "pronto",
    "pronto": "concluido"
}

function atualizarConteiner(container,butao){
    if(container.children.length < 1){
        butao.style.display = "none"
    }else{
        butao.style.display = "block"
    }
}

async function alterarStatusdoPEDido(pedido){
    let novo = null
    if(pedido.origem === "casa".toLocaleUpperCase()){
        novo = proximoStatusCasa[pedido.status]
    }else{
        novo = proximoStatus[pedido.status]
    }
    if(!novo) return;
    try{
        const resposta = await fetch(
            `https://fapfntdcpumrrvxjyudt.supabase.co/rest/v1/pedidos?id_pedido=eq.${pedido.id_pedido}`,
            {   
                method:"PATCH",
                headers: {
                    apikey: "sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
                    Authorization: "Bearer sb_publishable_tg3HC7_Nu3Rgb7zlPua4FQ_zhoV3VXe",
                    "Content-Type": "application/json",
                    "Prefer": "return=representation"
                },

                body:JSON.stringify({status: novo})
            }
        )
        const resultado = await resposta.json()

        if (!resposta.ok) {
            console.log("Erro do Supabase:", resultado)
            alert("Erro ao atualizar o pedido!")
            return
        }
        
    }catch(erro) {
            alert("erro de conexão")
            console.log("Erro de conexão:", erro)
            return
    }
    
    conteinerOPERAcaO();
}

function mostrarConteiner(event){
    const id = event.currentTarget.dataset.conteiner
    const container = document.getElementById(id)
    container.classList.toggle("escondido")
}

const conteiner_descricaoADmin = document.querySelector(".conteiner-descricãoPEdidoADMIN")
const conteudo_descricaoADmin = document.querySelector(".conteudo-descricaoADmin")
const numPEdido = document.getElementById("numero-pedido")
const totalPEdidoDEscricao = document.getElementById("totalPEDIDoDEscricao")
const pagamentoDescricaoADmin = document.getElementById("formadepagamento")
const voltarDescricaoADmin = document.getElementById("voltarDEscricaoADmin")
voltarDescricaoADmin.addEventListener("click",()=>{ 
    conteudo_descricaoADmin.innerHTML = "";
    mostrar('operacao')})

async function mostrarDEscricaoDopedido(pedido){
    numPEdido.textContent = `pedido: #0${pedido.id_pedido}`
    totalPEdidoDEscricao.textContent = `total: R$ ${pedido.total},00`
    pagamentoDescricaoADmin.textContent = `Forma de pagamento: ${pedido.form_pagamento}`     
    
    mostrar('descricaoADmin')
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
            alert("erro no codigo")
            console.log("erro html:",resposta.status)
            return
        }
        
        const itensDopedido = await resposta.json()
        const ptotal = document.createElement("p")
        const pedidoDEscricao = itensDopedido.filter(Pedido=>
            Pedido.pedido_id === pedido.id_pedido
        )
        pedidoDEscricao.forEach(pedidos_selecionado=>{
            const div_produto = document.createElement("div")
            div_produto.className = "div-descricaoADmin"
            const img = document.createElement("img")
            const h4quantidade = document.createElement("h4")
            const h3nome = document.createElement("h3")

            img.src = pedidos_selecionado.img_produto
            h4quantidade.textContent = pedidos_selecionado.quantidade
            h3nome.textContent = pedidos_selecionado.nome_produto
            ptotal.textContent = `R$ ${pedido.total}`

            div_produto.appendChild(img)
            div_produto.appendChild(h4quantidade)
            div_produto.appendChild(h3nome)
            conteudo_descricaoADmin.appendChild(div_produto)
        })

    }
    catch(erro){
        alert("conexão estável!")
        console.log("erro de conexão:",erro)
        return
    }
}

async function cancelarPEdido(){

}