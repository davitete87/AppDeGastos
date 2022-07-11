const form = document.getElementById("transactionForm");

form.addEventListener("submit", function(event){
    event.preventDefault();
    
    let transactionFormData = new FormData(form);
    let transactionObjet = convertFormDataToTransactionData(transactionFormData);
    saveTransactionObj(transactionObjet);
    insertRowinTransactionTable(transactionObjet);
    form.reset();

});

//////////////////////////////////////////
function draw_category(){
    let allCategories = [
        "Alimentos","Ropa","Comida","Hogar","Transporte","Otros"
    ];
    allCategories.forEach(categoria => insertCategory(categoria));

}

////////////////////////////////////////////
function insertCategory(category){
    const selectElement = document.getElementById("txtCat");
    let htmlToInsert = `<option>${category}</option>`;
    selectElement.insertAdjacentHTML("beforeend",htmlToInsert);

}

document.addEventListener("DOMContentLoaded",function(event){
    draw_category();
    let transtactionObjArr = JSON.parse(localStorage.getItem("transactionData")) || [];
    transtactionObjArr.forEach(transactionElement => {insertRowinTransactionTable(transactionElement)});
    
});

function getNewTransactionId(){

    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1";
    let newTransactionId = JSON.parse(lastTransactionId)+1;
    localStorage.setItem("lastTransactionId",JSON.stringify(newTransactionId));
    return newTransactionId;
}


/////////////////////////////
function convertFormDataToTransactionData(transactionFormData){
    
    let tt = transactionFormData.get("transactionType")
    let desc = transactionFormData.get("txtDesc")
    let monto = transactionFormData.get("txtMonto")
    let cat = transactionFormData.get("txtCat")
    let transactionId = getNewTransactionId();

    return{
        "transactionType": tt,
        "txtDesc":desc, 
        "txtMonto":monto,
        "txtCat":cat,
        "transactionId":transactionId
        };
}

/////////////////////////////
function insertRowinTransactionTable(transactionObjet){
    let tt = document.getElementById("transactionTable");
    let newTransactionRow = tt.insertRow(-1); //-1 se inserta al final
    
    //creo un atributo personalizado con el id de la transaccion de la fila
    newTransactionRow.setAttribute("data-transactionId",transactionObjet["transactionId"]);

    let newTypeTransactionCell = newTransactionRow.insertCell(0);
    newTypeTransactionCell.textContent =transactionObjet["transactionType"];

    let newDesctTransactionCell = newTransactionRow.insertCell(1);
    newDesctTransactionCell.textContent =transactionObjet["txtDesc"];

    let newMontoTransactionCell = newTransactionRow.insertCell(2);
    newMontoTransactionCell.textContent =transactionObjet["txtMonto"];

    let newCaatTransactionCell = newTransactionRow.insertCell(3);
    newCaatTransactionCell.textContent =transactionObjet["txtCat"];

    let newDeleteCell = newTransactionRow.insertCell(4);
    let deleteButtom = document.createElement("button");
    deleteButtom.textContent="Eliminar";
    newDeleteCell.appendChild(deleteButtom);

    /////////// AL TOcAR EL BOTON ELIMINAR
    deleteButtom.addEventListener("click",function(event){
        //obtengo los padres del boton, td y el padre de tr para eliminar esa tr o fila
        var transactionRow = event.target.parentNode.parentNode;
        var transactionId = transactionRow.getAttribute("data-transactionId");
        
        transactionRow.remove();
        deleteTransactionObj(transactionId);
    });            

}

///////////////////////////////////
function deleteTransactionObj(transactionId){

    let transactionObjetArray = JSON.parse(localStorage.getItem("transactionData"));
    let transactionIndexInArray = transactionObjetArray.findIndex(element => element.transactionId == transactionId);
    console.log(transactionIndexInArray);
    
    transactionObjetArray.splice(transactionIndexInArray,1);//splice borra un elemento del array

    let transactionArrayJSON = JSON.stringify(transactionObjetArray);
    localStorage.setItem("transactionData",transactionArrayJSON);
}


///////////////////////////////////
function saveTransactionObj(transactionObjet){
    
    //el || [] ->  es como un if, si es null o el array esta vacio, crea un array vacio []
    let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    myTransactionArray.push(transactionObjet);

    let transactionArrayJSON = JSON.stringify(myTransactionArray);
    localStorage.setItem("transactionData",transactionArrayJSON);
}