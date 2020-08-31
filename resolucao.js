const fs = require('fs');
const bdBroken = require('./broken_database.json');

function fixName(){
        bdBroken.forEach(registry => {
            registry.name = registry.name.replace(/æ/gi,'a')
                                 .replace(/ø/gi,"o")
                                 .replace(/¢/gi,"c")
                                 .replace(/ß/gi,"b")}
        )}

function fixPrice(){
    bdBroken.forEach(registro => {
        registro.price = parseFloat(registro.price)
    })
}

function checkQuantity(){
    bdBroken.forEach(registro => {
        if(!registro.hasOwnProperty("quantity")){
            registro.quantity = 0;
        }    
    })
}

function saveJSON(jsontoString){
    fs.writeFile("saida.json", jsontoString, function(err) {
        if (err) {
            console.log(err);
        }else{
            sortJSON();
            quotePrice();
        }
    });
}

const bdNew = require('./saida.json');

function sortJSON(){
    bdNew.sort((item1, item2) => {
        return item1.id - item2.id
    });

    bdNew.sort((item1, item2) => {
        if (item1.category < item2.category) {
             return -1} 
        else {return 1} return 0 })
    
    bdNew.forEach(registro => {
        console.log("|",registro.category,"|",registro.id,"|", registro.name)
    })
}


function quotePrice(){
    bdNew.sort((item1, item2) => {
        if (item1.category < item2.category) {
            return -1} 
        else {return 1} 
    return 0 })

    var categorias = bdNew.map((item) => {
        let category = {
            name: item.category,
            valor: 0}
        return category})
        .filter((set => f => !set.has(f.name) && set.add(f.name))(new Set)); 

    categorias.forEach((categoria) => {
        bdNew.filter(item => item.category == categoria.name)
        .reduce((acc, item) => {
            return categoria.valor = acc + (item.price*item.quantity);
        }, 0)
    })

    categorias.forEach(item => {
        console.log('|CATEGORIA|', item.name, '|VALORES| R$' , item.valor.toLocaleString('pt-BR'))
    })
 }


fixName();
fixPrice();
checkQuantity();
var toFixJSON = JSON.stringify(bdBroken,null, " ");
saveJSON(toFixJSON);

