const express = require('express')
const { response, request } = require('express')
const app = express()

app.use(express.json())
const complemento = []
const Produtos = [
    {idProduto: 0,nomeProduto: "Console", quantidade: 70, valorUnitario: 1500,precoTotal:105000, precoVenda:1800, Lucro:300,SituaçãoProduto:"Boa", complemento}
]

const checkProdutoArray = (request, response, next) =>{
    const {idProduto} = request.params
    if(!Produtos[idProduto]){
        return response
            .status(400).json({erro: 'Nao existe Produto com esse id '})
    }
    return next()
} 

const checkProdutoExiste = (request, response, next) =>{
    const {idProduto, nomeProduto, quantidade, valorUnitario, complemento} = request.body
    
    if(!idProduto || !nomeProduto || !quantidade || !valorUnitario || !complemento){
        return response 
            .status(400).json({erro: 'O campo id do produto ou nome do produto ou quantidade ou valor unitario ou complemento não existe no corpo da requisição'})
    }
    return next()
}



app.use((request, response, next) => {
    console.log('Controle de Estoque da Empresa ABC')
    return next()
})

app.get('/produtos', (request, response) => {
    return response.json(Produtos)
})

app.get('/produtos/:idProduto',checkProdutoArray,(request, response) =>{
    const {idProduto} = request.params
    return response.json(Produtos[idProduto])
})

app.post('/produtos',checkProdutoExiste, (request, response) =>{
    const {idProduto, nomeProduto, quantidade, valorUnitario, complemento} = request.body
    const precoTotal = quantidade * valorUnitario
    const precoVenda = valorUnitario +(valorUnitario * 0.20)
    const Lucro = precoVenda - valorUnitario
    const situacaoProduto = ""
    
        if(quantidade < 50){
            SituacaoProduto = "Estavel"
        }if(quantidade >= 50 && quantidade < 100){
            SituacaoProduto = "Boa"
        }if(quantidade >= 100){
            SituacaoProduto = "Excelente"
    
        }
        
    const produto ={
        idProduto,
        nomeProduto,
        quantidade, 
        valorUnitario, 
        precoTotal,
        precoVenda,
        Lucro, 
        SituacaoProduto,
        complemento
    }
    Produtos.push(produto)
    return response.json(produto)

})

app.put('/produtos/:idProduto', checkProdutoExiste, checkProdutoArray, (request, response)=> {
    const {idProduto} = request.params
    const {idproduto, nomeProduto, quantidade, valorUnitario, complemento} = request.body
    const precoTotal = quantidade * valorUnitario
    const precoVenda = valorUnitario +(valorUnitario * 0.20)
    const Lucro = precoVenda - valorUnitario
    const situacaoProduto = ""
    
        if(quantidade < 50){
            SituacaoProduto = "Estavel"
        }if(quantidade >= 50 && quantidade < 100){
            SituacaoProduto = "Boa"
        }if(quantidade >= 100){
            SituacaoProduto = "Excelente"
    
        }
        
    const produto ={
        idproduto,
        nomeProduto,
        quantidade, 
        valorUnitario, 
        precoTotal,
        precoVenda,
        Lucro, 
        SituacaoProduto,
        complemento
    }
    Produtos[idProduto] = produto
    return response.json(produto)
})

app.delete('/produtos/:idProduto', checkProdutoArray,(request, response)=>{
    const {idProduto} = request.params
    console.log(Produtos[idProduto])
    Produtos.splice(idProduto, 1)
    return response.json(Produtos)
})

app.put('/produtos/:idProduto',(request, response) =>{
    const {idProduto, nomeProduto, quantidade, valorUnitario, complemento} = request.body
    const precoTotal = quantidade * valorUnitario
    const precoVenda = valorUnitario +(valorUnitario * 0.20)
    const Lucro = precoVenda - valorUnitario
    const situacaoProduto = ""
    
        if(quantidade < 50){
            SituacaoProduto = "Estavel"
        }if(quantidade >= 50 && quantidade < 100){
            SituacaoProduto = "Boa"
        }if(quantidade >= 100){
            SituacaoProduto = "Excelente"
    
        }
        
    const produto ={
        idProduto,
        nomeProduto,
        quantidade, 
        valorUnitario, 
        precoTotal,
        precoVenda,
        Lucro, 
        SituacaoProduto,
        complemento
    }
    Produtos.push(produto)
    return response.json(produto)
})


app.listen(3333, ()=>{
    console.log("Servidor Rodando")
})

