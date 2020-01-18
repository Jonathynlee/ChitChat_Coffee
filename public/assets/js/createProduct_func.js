let itemDetail = {};
let questionCount = 1;
let answerCount = [];
$(".addAnswerButton").on("click", function (event) {

    $(event.target).parent().parent().parent().find(".answersWrapper1").append(`    
    <div class="row question">
                        <div class="col-sm-6 answerBox">

                            <input type="text" class="form-control addAnswer"  placeholder="e.g. Almond Milk">
                        </div>


                        <div class="col-sm-6 answerAdditionalCost">
                            <div class="input-group-prepend">
                                <div class="input-group-text ">$</div>
                                <input type="text" class="form-control addCost" 
                                    placeholder="e.g. 0.50">
                            </div>
                        </div>

                    </div>
                    `)
})

$("#addProduct").on("click", function (event) {
    questionCount++;
    $("#questionsArea").append(`

    <div class="addProductInformation row" questionNumber = "${questionCount}">

<div class="col-md-4 selectionTypeSection">
<label>Question Type</label>
<select class="form-control">

<option value="pickOne">Pick One</option>
<option value="pickMult">Pick Multiple</option>


</select>
</div>
<div class="col-md-4 questionTitleSection">
<div class="form-group">

<label>Question Title</label>
<input type="text" class="form-control questionTitle"
    placeholder="e.g. Creamer Type">
</div>
</div>
<div class="col-md-4 questionAnswersSection">
<div class="answersWrapper${questionCount}">
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

        <input type="text" class="form-control addAnswer" 
            placeholder="e.g. Almond Milk">
    </div>


    <div class="col-sm-6 answerAdditionalCost">
        <div class="input-group-prepend">
            <div class="input-group-text ">$</div>
            <input type="text" class="form-control addCost" 
                placeholder="e.g. 0.50">
        </div>
    </div>

</div>
</div>
<div class="row addAnswer">
<button class="addAnswerButton">
    <p>+ Add Answer</p>
</button>
</div>


</div>    
                    `

    )
    $(".addAnswerButton").on("click", function (event) {

        $(event.target).parent().parent().parent().find(".answersWrapper" + questionCount).append(`    
    <div class="row question">
                        <div class="col-sm-6 answerBox">

                            <input type="text" class="form-control addAnswer"  placeholder="e.g. Almond Milk">
                        </div>


                        <div class="col-sm-6 answerAdditionalCost">
                            <div class="input-group-prepend">
                                <div class="input-group-text ">$</div>
                                <input type="text" class="form-control addCost" 
                                    placeholder="e.g. 0.50">
                            </div>
                        </div>

                    </div>
                    `)
    })

})


const submitProduct = function () {
    console.log("Product Added")
}