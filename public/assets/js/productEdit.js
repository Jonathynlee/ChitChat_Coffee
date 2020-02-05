let priceArray = [[{ title: null, price: 0, qty: 1 }], [{ title: null, price: 0, qty: 1 }]];
let checkedArray = [null, null];
let exportArray = [];
let exportData = { baseProductPrice:0, userId:1,basePrice:0, addons:"",subtotal:0, productId:0}
$("#addProductToCart").on("click",function(){
    console.log(exportData);
    $.ajax({
        url:"/menu/addProductToOrder",
        method:"POST",
        data:exportData

    })
})


function openModalProduct(inProductId) {

    $("#productModal").modal();
    $("#addQuestionsRow").html("")

function renderExport(product){
    let addOns = JSON.parse(product.addOns);
    for(let e = 0; e< priceArray.length; e++){
        
exportArray[e]={};
exportArray[e].question={};
exportArray[e].question.answers = [];
exportArray[e].question.title=addOns[e].question.title;

        for(let o = 0; o< priceArray[e].length;o++){



            exportArray[e].question.answers[o] = {}
            exportArray[e].question.answers[o].title=addOns[e].question.answers[o].title;
            exportArray[e].question.answers[o].price=addOns[e].question.answers[o].price;




        }}
        exportData.addons = JSON.stringify(exportArray);
}

  function renderItems(basePrice, productName){
    $("#renderItems").html(`<div class="row">
    <h2>Items:</h2>
</div>
<div class="row">
    <div class="col-md-6" id = "itemizeProductName">${productName}</div>
    <div class="col-md-6" id = "itemizeProductPrice">${basePrice}</div>
</div>`);


exportData.basePrice = basePrice;
let totalPrice = parseFloat(basePrice);
      for(let e = 0; e< priceArray.length; e++){
          for(let o = 0; o< priceArray[e].length;o++){
            if (priceArray[e][o].title != null && priceArray[e][o].title!=undefined && priceArray[e][o].title != ""){
            let listItem ="";
            totalPrice += (parseFloat(priceArray[e][o].price)*(parseFloat(priceArray[e][o].qty)));
            if(priceArray[e][o].qty>1){
                listItem = `<div class="row">
                <div class="col-md-6" id = "itemizeProductName">${priceArray[e][o].title} (QTY: ${priceArray[e][o].qty})</div>
                <div class="col-md-6" id = "itemizeProductPrice">$${parseFloat(priceArray[e][o].price)*(parseInt(priceArray[e][o].qty)).toFixed(2)} </div>
                </div>`
            }else{
                listItem = `<div class="row"><div class="col-md-6" id = "itemizeProductName">${priceArray[e][o].title} </div>
                <div class="col-md-6" id = "itemizeProductPrice">$${parseFloat(priceArray[e][o].price).toFixed(2)} </div>
                </div>`
            }
            
            
            $("#renderItems").append(listItem);
            $("#priceBox").html("$"+totalPrice.toFixed(2));
            exportData.subtotal = parseFloat(totalPrice);
          }
        }
      }
  }









    $.ajax({
        method: "POST",
        url: "/menu/getProduct",
        data: { productId: inProductId }
    }).then(function (product) {
        exportData.productId = product.id;
        let addOns = JSON.parse(product.addOns);

        checkedArray.length = addOns.length + 2;
        $("#productModalTitle").html(`Edit Product - ${product.name}`);
        $("#itemizeProductName").html(`${product.name}`);
        $("#itemizeProductPrice").html(`$${parseFloat(product.basePrice).toFixed(2)}`);



        if (addOns[1].question.answers[0].include == false) {
            $("#icedSelection").css("display", "none");

        } else {
            $("#icedSelection").children("label").html(`Iced - $${parseFloat(addOns[1].question.answers[0].price).toFixed(2)}`)
            $("#icedSelection").attr("price", parseFloat(addOns[1].question.answers[0].price).toFixed(2))
        }

        if (addOns[1].question.answers[1].include == false) {
            $("#hotSelection").css("display", "none");

        } else {
            $("#hotSelection").children("label").html(`Hot - $${parseFloat(addOns[1].question.answers[1].price).toFixed(2)}`)
            $("#hotSelection").attr("price", parseFloat(addOns[1].question.answers[1].price).toFixed(2))
        }


        if (addOns[0].question.answers[0].include == false) {
            $("#smallSelection").css("display", "none");

        } else {
            $("#smallSelection").children("label").html(`Small - $${parseFloat(addOns[0].question.answers[0].price).toFixed(2)}`)
            $("#smallSelection").attr("price", parseFloat(addOns[0].question.answers[0].price).toFixed(2))
        }
        if (addOns[0].question.answers[1].include == false) {
            $("#mediumSelection").css("display", "none");

        } else {
            $("#mediumSelection").children("label").html(`Medium - $${parseFloat(addOns[0].question.answers[1].price).toFixed(2)}`)
            $("#mediumSelection").attr("price", parseFloat(addOns[0].question.answers[1].price).toFixed(2))
        }

        if (addOns[0].question.answers[2].include == false) {
            $("#largeSelection").css("display", "none");

        } else {
            $("#largeSelection").children("label").html(`Large - $${parseFloat(addOns[0].question.answers[2].price).toFixed(2)}`)
            $("#largeSelection").attr("price", parseFloat(addOns[0].question.answers[2].price).toFixed(2))
        }
        if (addOns[0].question.answers[3].include == false) {
            $("#xlargeSelection").css("display", "none");

        } else {
            $("#xLargeSelection").children("label").html(`X-Large - $${parseFloat(addOns[0].question.answers[3].price).toFixed(2)}`)
            $("#xLargeSelection").attr("price", parseFloat(addOns[0].question.answers[3].price).toFixed(2))
        }









        






        for (let q = 2; q < addOns.length; q++) {

            let answersTextArray = [];
            let finalAnswer = ""


            if (addOns[q].question.questionType == "pickMult") {
                for (let a = 0; a < addOns[q].question.answers.length; a++) {
                    answersTextArray[a] = `<div class="form-check " id="optionSelection${q}-${a}">
                        <input class="form-check-input priceCalcCheck" question = "${q}" type="checkbox"
                            name="questionSelection" id="optionCheckbox${q}-${a}"
                            value="option${q}-${a}" price = ${parseFloat(addOns[q].question.answers[a].price).toFixed(2)} title = "${addOns[q].question.answers[a].title}">
                        <label class="form-check-label" for="option1Drinkcheckbox">
                        ${addOns[q].question.answers[a].title} - $${parseFloat(addOns[q].question.answers[a].price).toFixed(2)}    
                        <div class="input-group input-group-sm">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Qty</span>
                            </div>
                                <input type="text" id = "optionCheckbox${q}-${a}-qty"class="form-control qtyText" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value = "1">
                        </div>
                        </label>
                    </div>`
                    finalAnswer += answersTextArray[a]
                }



                $("#addQuestionsRow").append(`
                <div class = "col-md-12">
            <div class="row notLastRow productQuestionRow">
            
                                            <div class="col-md-6">
                                                <h2> ${addOns[q].question.title}:</h2>
                                            </div>
                                            <div class="col-md-6 question${q}">
                                                

                                                ${finalAnswer}
                                            </div>
                                            
                                        </div>
                                        </div>
                                        `)
            } else {

                for (let a = 0; a < addOns[q].question.answers.length; a++) {

                    answersTextArray[a] = `<option class = "selectPriceCalc" value="option${q}-${a}" title = "${addOns[q].question.answers[a].title}" price=${parseFloat(addOns[q].question.answers[a].price).toFixed(2)}>${addOns[q].question.answers[a].title} - $${parseFloat(addOns[q].question.answers[a].price).toFixed(2)}</option>`;
                    finalAnswer += answersTextArray[a];
                }


                $("#addQuestionsRow").append(`         
                <div class = "col-md-12">
                                        <div class="row notLastRow productQuestionRow">
                                            <div class="col-md-6">
                                                <h2> ${addOns[q].question.title}:</h2>
                                            </div>
                                            <div class="form-group col-md-6">

                                                <select id="singleSelectQuestion" class="form-control selectPriceCalc" question = "${q}">
                                                    <option selected>Please Select and Option</option>
                                                    ${finalAnswer}

                                                </select>
                                            </div>
                                        </div>
                                        </div>
                `)
            }
        }








        $(".priceCalc").on("click", function (event) {

            let questionNumber = parseInt($(event.target).parent().parent().attr("question"));
            priceArray[questionNumber] = [];
            priceArray[questionNumber][0] = {};

            priceArray[questionNumber][0].title = $(event.target).parent().attr("title");
            priceArray[questionNumber][0].price = $(event.target).parent().attr("price");
            priceArray[questionNumber][0].qty = 1;

            renderItems(product.basePrice,product.name);
            renderExport(product);
        })

        $(".selectPriceCalc").change(function (event) {
            let questionNumber = parseInt($(event.target).attr("question"));
            //let priceArray = [{title:null, price:0},{title:null, price:0} ];
            priceArray[questionNumber] = [];
            priceArray[questionNumber][0] = {};

            priceArray[questionNumber][0].title = $(event.target).children(":selected").attr("title");
            priceArray[questionNumber][0].price = $(event.target).children(":selected").attr("price");
            priceArray[questionNumber][0].qty = 1;

            //console.log($(event.target).children(":selected").attr("price"))
            //console.log($(event.target).children(":selected").attr("title"))

            renderItems(product.basePrice,product.name);
            renderExport(product);
        })
        $(".priceCalcCheck").click(function (event) {
            let questionNumber = parseInt($(event.target).attr("question"));

            if ($(event.target).is(":checked") && checkedArray[questionNumber] != undefined) {

                checkedArray[questionNumber]++
            } else if (checkedArray[questionNumber] == undefined) {

                checkedArray[questionNumber] = 1;
            } else {

                checkedArray[questionNumber]--;
            }

            priceArray[questionNumber] = [];
            let y = 0;
            for (let i = 0; i < addOns[questionNumber].question.answers.length; i++) {

                if ($("#optionSelection" + questionNumber + "-" + i).children("input").is(":checked")) {
                    priceArray[questionNumber][y] = {};

                    priceArray[questionNumber][y].title = $(`#optionCheckbox${questionNumber}-${i}`).attr("title");
                    priceArray[questionNumber][y].price = parseFloat($(`#optionCheckbox${questionNumber}-${i}`).attr("price")).toFixed(2);
                    priceArray[questionNumber][y].qty = parseInt($(`#optionCheckbox${questionNumber}-${i}-qty`).val());


                    y++
                }
            }



            //  console.log($(event.target).attr("price"))
            //  console.log($(event.target).attr("title"))
            renderItems(product.basePrice,product.name);
            renderExport(product);
        })


        $(".qtyText").change(function (event) {
            let questionNumber = parseInt($(event.target).parent().parent().parent().children("input").attr("question"));

            priceArray[questionNumber] = [];
            let y = 0;
            for (let i = 0; i < addOns[questionNumber].question.answers.length; i++) {

                if ($("#optionSelection" + questionNumber + "-" + i).children("input").is(":checked")) {
                    priceArray[questionNumber][y] = {};

                    priceArray[questionNumber][y].title = $(`#optionCheckbox${questionNumber}-${i}`).attr("title");
                    priceArray[questionNumber][y].price = parseFloat($(`#optionCheckbox${questionNumber}-${i}`).attr("price")).toFixed(2);
                    priceArray[questionNumber][y].qty = parseInt($(`#optionCheckbox${questionNumber}-${i}-qty`).val());


                    y++
                }
            }





            renderItems(product.basePrice,product.name);
            renderExport(product);
        })

    })


}


////--------------------------------///-----------------------------------////
/*let productString = "";
$.ajax({
    method:"get",
    url:"/menu/getAllProducts"

}).then(function(products){

   //console.log(products)
for (i in products){

    productString += `<div class="outterBox" productId="${products[i].id}">
    <div class="productBox">
        <div class="productTextBox">
            <h2>${products[i].name}</h2>
        </div>
    </div>

</div>`;
    

}
//console.log(productString)

$("#productColumn").html(productString)
$(".productBox").on("click", function(event){
    console.log("clicked")
    if( parseInt($(event.target).parent().attr("productid")) > 0 ){

    
    openModalProduct(parseInt($(event.target).parent().attr("productid")));
    
    }

})
})*/





