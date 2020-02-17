let itemDetail = { name: "", basePrice: 0, addOns: [], image: "", description: "", seasonal: "", EstimatedTime: 1 }

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

function createProduct(cb) {
    let productTitle = $("#productTitle").val();
    let productCategory = $("#categorySelect").val();
    let productBasePrice = $("#productPrice").val();
    let productETM = $("#productETM").val();
    let productDescription = $("#productDescription").val();
 //{"question":{"title":"","questionType":"pickOne","answers":[{}]}}]"
    let sizes ={question:{title:"Size",questionType: "pickOne",answers:[{title:"small",include:"false", price:0},{title:"medium",include:"false", price:0}, {title:"large",include:"false", price:0}, {title:"xlarge",include:"false", price:0}] }};
    
    
    if ($("#smallAdd").is(":checked")){
        sizes.question.answers[0].include = true;
        
        
    }
    if ($("#mediumAdd").is(":checked")){
        sizes.question.answers[1].include = true;
        sizes.question.answers[1].price = $("#medAdd").val();
    }
    if ($("#largeAdd").is(":checked")){
        sizes.question.answers[2].include = true;
        sizes.question.answers[2].price = $("#lgAdd").val();
    }
    if ($("#xLargeAdd").is(":checked")){
        sizes.question.answers[3].include = true;
        sizes.question.answers[3].price = $("#xlAdd").val();
    }
    

    //Set Up Temp
    let temp ={question:{title:"Temp",questionType: "pickOne",answers:[{title:"Iced",include:"false", price:0},{title:"Hot",include:"false", price:0}] }};
    if ($("#icedCheck").is(":checked")){
        temp.question.answers[0].include = true;
        temp.question.answers[0].price = $("#icedAdd").val();
    }
    if ($("#hotCheck").is(":checked")){
        temp.question.answers[1].include = true;
        temp.question.answers[1].price = $("#hotAdd").val();
    }


    //Set Up Addons String
    let addOnObject = [sizes,temp];
    for (let i = 2; i < questionCount+2; i++) {
        addOnObject[i] = {};
        addOnObject[i]["question"] = {};

        addOnObject[i]["question"]["title"] = $("#questionTitle" + (i-1)).val();
        addOnObject[i]["question"]["questionType"] = $("#questionType" + (i-1)).val();
        addOnObject[i]["question"]["answers"] = [];
        for (let o = 0; o < answersCount[i-2]; o++) {
            
            addOnObject[i]["question"]["answers"][o] = {};
            
            
            addOnObject[i]["question"]["answers"][o]["title"] = $("#answerTitle" + (i-1) + "-" + (o+1)).val();
            addOnObject[i]["question"]["answers"][o]["price"] = $("#answerPrice" + (i-1) + "-" + (o+1)).val();
            

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
    
    


    itemDetail.seasonal = seasonal;
    itemDetail.name = productTitle;
    itemDetail.categoryId = productCategory;
    itemDetail.basePrice = productBasePrice;
    itemDetail.EstimatedTime = productETM;
    itemDetail.description = productDescription;
    itemDetail.addOns = JSON.stringify(addOnObject);
    
    

    
    cb();
}



$("#submitProductButton").on("click", function () {
    submitProduct();
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
    
    createProduct(function(){
        $.ajax({
            method:"post",
            url:"/createProductAdmin/addProduct",
            data:itemDetail,
            success:function(data){
               
            }
    
        })
    })
    console.log(itemDetail)

}

$("#imageForm").on("change", function(event){
    
    /*
    $.ajax({
        method:"post",
        url:"/uploadImage",
        data:event.files,
        success:function(data){
           
        }
    })
      */
      // You need to use standard javascript object here
    
     var formData = new FormData();
     formData.append('image', $('input[type=file]')[0].files[0]); 
     console.log(formData.get("image"))

     $.ajax({
        method:"post",
        url:"/imageUpload",
        data:formData,
        contentType: false, 
        processData: false,
        success:function(data){
           $("#pictureBox").css("background-image", `url("${data}")`)
           itemDetail.image = data;
           
        }
    })
})
$("#pictureBox").on("click", function(event){
event.preventDefault();
    $("#uploadImage").click();
    
    
})


$("#pictureBox").on("formdata", function(event){
    console.log(e.formData)
        
        
    })