$(function(){

tbodyEl=$("#table");
const colorme=["table-danger","table-warning"];
let color_index=0;
let db;
//let table_index=0;
//////////////////////////////////
/*$('#myModal').on('shown.bs.modal', function() {
    $('#myModal').modal(hide);
}  );  */
$("#orderComplete").on("click",function(event){
    const orderNo=document.getElementById("ono").innerText;
    const itemNo=document.getElementById("ino").innerText;
    const customerName=document.getElementById("customerName").innerText;
    const customerID=document.getElementById("customerID").innerText;
    const phone=document.getElementById("phone").innerText;
    let str="#"+"r"+itemNo;
    $(str).attr("disabled",true);
    $(str).attr("checked",true);

    //////////database functions////////////
    $("#myModal").modal("hide");
   
    

});

$("#orderCancel").on("click",function(event){
    const orderNo=document.getElementById("ono").innerText;
    const itemNo=document.getElementById("ino").innerText;
    const customerName=document.getElementById("customerName").innerText;
    const customerID=document.getElementById("customerID").innerText;
    const phone=document.getElementById("phone").innerText;
   

});

$("#table").on("click",function(event){
   const i=event.target.getAttribute("data-i");
   const j=event.target.getAttribute("data-j");
   const id=event.target.getAttribute("data-id");
   
   let addon=""
   if(db[i].orderItems[j].id==id){
    $("#ono").text(db[i].orderItems[j].orderId);
    $("#ino").text(db[i].orderItems[j].id);
    $(".imgAdmin").attr("src",db[i].orderItems[j].product.image);
    $("#drink").text(db[i].orderItems[j].product.name);
    $("#customerName").text(db[i].user.username);
    $("#customerID").text(db[i].user.id);
    $("#phone").text(db[i].user.phone);
    $("#numOLeft").text((db.length)-i-1);
    $("#numILeft").text(db[i].orderItems.length-j-1);
    /////////ADD ON//////////////////////////////////////
    add=JSON.parse(db[i].orderItems[j].addons);
    ////////////////Basic set up///////////////////
      const div1=$('#detcol');
      div1.empty();
    //const div1=$("<div>").attr("class","col-sm-6");
    const div2=$("<div>").attr("class","card mt-2");
          div2.attr("style","width: 35rem");
    div1.append(div2); 
    let h5=$("<h5>").attr("class","card-header");
    h5.text("ADD INS");
    div2.append(h5);
    const div3=$("<div>").attr("class","card-body");
    div2.append(div3);
    //////////////////////////////////////////////

    for (let k=0;k<add.length;k++){
         h5=$("<h5>").attr("class","card-title");
         h5.text(add[k].question.title+":");
         div3.append(h5);
         //const question=add[k].question.title;
         //console.log(question);
         let answer="";
         for(l=0;l<add[k].question.answers.length;l++){
             /////////////////////////////////////////
             const div4=$("<div>").attr("class","form-check");
             div4.attr("class","form-check-inline");
             const input=$("<input>").attr("class","form-check-input");
             input.attr("type","checkbox");
             input.attr("id","inlineCheckbox");
             input.attr("value","option");
             input.attr("checked",true);
             input.attr("disabled",true);;
             const label=$("<label>").attr("class","form-check-label");
             label.attr("style","font-size:1rem;");
             label.attr("for","inlineCheckbox").$
             label.text(add[k].question.answers[l].title)
             div4.append(input);
             div4.append(label);
             div3.append(div4);
             
             ////////////////////////////////////////
             //answer=add[k].question.answers[l].title;
             //console.log(answer);
         }  

    }

    $("#admincol").append(div1);
    
   } 
   else{
    alert("Contanct Support!!");
   }
   

    $('#myModal').modal();

});

/////////////////////////////////
$.ajax({
   method: "GET",
   url: "/api/orderAdminList",
    
}).done(function(result){

           console.log(result);
           if (result){
               db=result;
               for(let i=0;i<result.length;i++){
                  for(let j=0;j<result[i].orderItems.length;j++){ 
                   const row=$("<tr>");
                   row.attr("class",colorme[color_index]);
                   let th=$("<th>");
                   th.text(result[i].orderItems[j].id);
                   row.append(th.attr("scope","row"));
                   row.append($("<td>").text(result[i].id));
                   row.append($("<td>").text(result[i].orderItems[j].product.name));
                   let td=$("<td>");
                   let btn=$("<button>");
                   btn.attr("type","submit");
                  // btn.attr("data-toggle","modal");
                  // btn.attr("data-target","#myModal");
                   btn.attr("data-i",i);
                   btn.attr("data-j",j);
                   btn.attr("data-id",result[i].orderItems[j].id);
                   btn.text("Info");
                   btn.attr("id","b");
                   td.append(btn);
                   row.append(td);
                  
                   td=$("<td>");
                   let input=$("<input>");
                   input.attr("type","checkbox");
                   input.attr("class","form-check-input");
                   input.attr("id","r"+result[i].orderItems[j].id);

                   if(result[i].orderItems[j].ready){
                       input.attr("checked",true);
                   }
                   input.attr("disabled",true);

                   let div=$("<div>");
                   div.attr("class","form-check text-center");
                   div.append(input);
                   let div2=$("<div>");
                   div2.attr("class","form-group");
                   div2.append(div);
                   td.append(div2);
                   row.append(td);


                   td=$("<td>");
                   input=$("<input>");
                   input.attr("type","checkbox");
                   input.attr("class","form-check-input");
                   input.attr("id","c"+result[i].orderItems[j].id);
                   input.attr("disabled",true);
                    div=$("<div>");
                   div.attr("class","form-check text-center");
                   div.append(input);
                    div2=$("<div>");
                   div2.attr("class","form-group");
                   div2.append(div);
                   td.append(div2);
                   row.append(td);
                   row.append(td);
                   tbodyEl.append(row);

                  }
                  if (color_index==0){color_index=1}else{color_index=0}
                //  table_index++;
               }
               
           }
           
} );  

});

/*
    <div class="col-sm-6">
              <!--Will be Dymanically Generated-->
              <!--Card-->

              <div class="card mt-2" style="width: 35rem">/////div2
                    <h5 class="card-header">ADD INS</h5>
                    <div class="card-body">/////div3
                        <h5 class="card-title">Creamer:</h5>........

                        <div class="form-check form-check-inline"> /////div4
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" checked disabled>
                                <label class="form-check-label" for="inlineCheckbox1">%1 Milk</label>
                       </div>
                       <h5 class="card-title">Sweetener:</h5>
                      <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"checked disabled>
                            <label class="form-check-label" for="inlineCheckbox2">Stevia</label>
                     </div>

                    <h5 class="card-title">Espresso/Shot Option:</h5>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" checked disabled>
                        <label class="form-check-label" for="inlineCheckbox3">3 Shots</label>
                    </div>
                    <h5 class="card-title">Others</h5> 
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" checked disabled>
                        <label class="form-check-label" for="inlineCheckbox3">Decaf</label>
                    </div>
                </div>
            </div> 
*/