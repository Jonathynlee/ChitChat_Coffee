let itemDetail = { name: "",sizes:"{small:{include:false,price:0 },medium:{include:false,price:0 },large:{include:false,price:0 }, xlarge:{include:false,price:0 } }", temp:"{iced:{include:false,price:0 },hot:{include:false,price:0 }}", basePrice: 0, addOns: [], image: "", description: "", seasonal: "", EstimatedTime: 1 }

let questionCount = 1;
let answersCount = [1];
renderCategories();


// This will render the categories with all categories available in the database
function renderCategories() {
    $.ajax({
        method: "GET",
        url: "/createProductAdmin/getCategories"
    }).then(function (allCategories) {
        
        $("#categorySelect").html("")
        $("#categorySelect").append(`<option class = "disable">Select Category</option id = "addCategory">`)
        for (category in allCategories) {
            $("#categorySelect").append(`<option value = "${allCategories[category].id}">${allCategories[category].name}</option id = "addCategory">`)


        }
        $("#categorySelect").append(`<option value = "addCategory">Add Category</option id = "addCategory">`)
    })

}

function createProduct() {
    let productTitle = $("#productTitle").val();
    let productCategory = $("#categorySelect").val();
    let productBasePrice = $("#productPrice").val();
    let productETM = $("#productETM").val();
    let productDescription = $("#productDescription").val();


    //Set Up Addons String
    let addOnObject = [];
    for (let i = 0; i < questionCount; i++) {
        addOnObject[i] = {};
        addOnObject[i]["question"] = {};

        addOnObject[i]["question"]["title"] = $("#questionTitle" + (i+1)).val();
        addOnObject[i]["question"]["questionType"] = $("#questionType" + (i+1)).val();
        addOnObject[i]["question"]["answers"] = [];
        for (let o = 0; o < answersCount[i]; o++) {
            
            addOnObject[i]["question"]["answers"][o] = {};
            
            
            addOnObject[i]["question"]["answers"][o]["title"] = $("#answerTitle" + (i+1) + "-" + (o+1)).val();
            addOnObject[i]["question"]["answers"][o]["price"] = $("#answerPrice" + (i+1) + "-" + (o+1)).val();
            console.log("logging" + i+"-"+o);

        }
    }

    //set Up Seasonal
   let seasonal = ""; 
   if ($("#seasonalCheck").is(":checked")){
        seasonal = "true"
    }else{
        seasonal = "false"
    }
    
    //setUp sizes
    let sizes = {small:{include:false,price:0 },medium:{include:false,price:0 },large:{include:false,price:0 }, xlarge:{include:false,price:0 } };
    if ($("#smallAdd").is(":checked")){
        sizes.small.include = true;
        
        
    }
    if ($("#mediumAdd").is(":checked")){
        sizes.medium.include = true;
        sizes.medium.price = $("#medAdd").val();
    }
    if ($("#largeAdd").is(":checked")){
        sizes.large.include = true;
        sizes.large.price = $("#lgAdd").val();
    }
    if ($("#xLargeAdd").is(":checked")){
        sizes.xlarge.include = true;
        sizes.xlarge.price = $("#xlAdd").val();
    }
    

    //Set Up Temp
    let temp  = {iced:{include:false,price:0 },hot:{include:false,price:0 }}
    if ($("#icedCheck").is(":checked")){
        temp.iced.include = true;
        temp.iced.price = $("#icedAdd").val();
    }
    if ($("#hotCheck").is(":checked")){
        temp.hot.include = true;
        temp.hot.price = $("#hotAdd").val();
    }

    


    itemDetail.seasonal = seasonal;
    itemDetail.name = productTitle;
    itemDetail.categoryId = productCategory;
    itemDetail.basePrice = productBasePrice;
    itemDetail.EstimatedTime = productETM;
    itemDetail.description = productDescription;
    itemDetail.addOns = JSON.stringify(addOnObject);
    itemDetail.temp = JSON.stringify(temp);
    itemDetail.sizes = JSON.stringify(sizes);
    

    console.log(itemDetail);
}



$("#submitProductButton").on("click", function () {
    createProduct();
});

$("#categorySelect").on("change", function () {
    
    if (this.value == "addCategory") {
        $('#addCategoryModal').modal()
    }

})

$("#finishAddCategory").on("click", function () {

    if ($("#addedCategoryName").val() != "") {
        
        $('#addCategoryModal').modal('hide')
        $.ajax({
            method: "POST",
            url: "/createProductAdmin/addCategory",
            data: { name: $("#addedCategoryName").val(), description: $("#addedCategoryDescritpion").val() },

        })
        renderCategories();
    } else {
        alert("add title");
    }

})











$("#addAnswerButton1").on("click", function (event) {
    
    let currentQuestionNumber = $(event.target).parent().parent().parent().parent().attr("questionNumber")
    answersCount[parseInt(currentQuestionNumber) - 1]++;
    $(event.target).parent().parent().parent().find(".answersWrapper").append(`    
    <div class="row question">
                        <div class="col-sm-6 answerBox">

                            <input type="text" class="form-control addAnswer" id = "answerTitle${currentQuestionNumber}-${answersCount[parseInt(currentQuestionNumber - 1)]}"  placeholder="e.g. Almond Milk">
                        </div>


                        <div class="col-sm-6 answerAdditionalCost">
                            <div class="input-group-prepend">
                                <div class="input-group-text ">$</div>
                                <input type="text" class="form-control addCost" id = "answerPrice${currentQuestionNumber}-${answersCount[parseInt(currentQuestionNumber - 1)]}" placeholder="e.g. 0.50">
                            </div>
                        </div>

                    </div>
                    `)
})

$("#addProduct").on("click", function (event) {
    questionCount++;
    answersCount[questionCount - 1] = 1;

    $("#questionsArea").append(`

    <div class="addProductInformation row" id = "question${questionCount}" questionnumber = "${questionCount}">

<div class="col-md-4 selectionTypeSection">
<label>Question Type</label>
<select class="form-control" id="questionType${questionCount}">

<option value="pickOne">Pick One</option>
<option value="pickMult">Pick Multiple</option>


</select>
</div>
<div class="col-md-4 questionTitleSection">
<div class="form-group">

<label>Question Title</label>
<input type="text" class="form-control questionTitle" id = "questionTitle${questionCount}"
    placeholder="e.g. Creamer Type">
</div>
</div>
<div class="col-md-4 questionAnswersSection">
<div class="answersWrapper">
<div class="row question">
    <div class="col-sm-6">
        <p>Answers</p>
    </div>
    <div class="col-sm-6">
        <p>Additional Price</p>
    </div>
</div>

<div class="row question">
                        <div class="col-sm-6 answerBox">

                            <input type="text" class="form-control addAnswer" id = "answerTitle${questionCount}-1"  placeholder="e.g. Almond Milk">
                        </div>


                        <div class="col-sm-6 answerAdditionalCost">
                            <div class="input-group-prepend">
                                <div class="input-group-text ">$</div>
                                <input type="text" class="form-control addCost" id = "answerPrice${questionCount}-1" placeholder="e.g. 0.50">
                            </div>
                        </div>

                    </div>

                    </div> 
<div class="row addAnswer">
<button id="addAnswerButton${questionCount}" class = "addAnswerButton">
    <p>+ Add Answer</p>
</button>
</div>


`)
    $("#addAnswerButton" + questionCount).on("click", function (event) {

        let currentQuestionNumber = $(event.target).parent().parent().parent().parent().attr("questionnumber");

        answersCount[parseInt(currentQuestionNumber) - 1]++;
        
        
        $(event.target).parent().parent().parent().find(".answersWrapper").append(`    
        <div class="row question">
                            <div class="col-sm-6 answerBox">
    
                                <input type="text" class="form-control addAnswer" id = "answerTitle${currentQuestionNumber}-${answersCount[parseInt(currentQuestionNumber - 1)]}"  placeholder="e.g. Almond Milk">
                            </div>
    
    
                            <div class="col-sm-6 answerAdditionalCost">
                                <div class="input-group-prepend">
                                    <div class="input-group-text ">$</div>
                                    <input type="text" class="form-control addCost" id = "answerPrice${currentQuestionNumber}-${answersCount[parseInt(currentQuestionNumber - 1)]}" placeholder="e.g. 0.50">
                                </div>
                            </div>
    
                        </div>
                        `)
    })

})


const submitProduct = function () {
    

    $.ajax({
        method:"post",
        url:"/createProductAdmin/addProduct",
        data:itemDetail,
        success:function(data){
            console.log("Product Added") 
        }

    })
}