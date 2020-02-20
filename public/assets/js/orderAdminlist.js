$(function(){

tbodyEl=$("#table");
const colorme=["table-danger","table-warning"];
let color_index=0;
let db;
let myVar;
let seed;
//let table_index=0;
//////////////////////////////////
/*$('#myModal').on('shown.bs.modal', function() {
    $('#myModal').modal(hide);
}  );  */
function isCompleted(orderId){
    let index=0;
    for(let i=0;i<db.length;i++){
        if (db[i].id==orderId){
            index=i;
            break;
        }
    }
    
    for (let i=0;i<db[index].orderItems.length;i++){
        if (!db[index].orderItems[i].ready){
            
            return false;
        }
        

    }
    
    return true;
}

function hasStarted(orderId){
    let index=0;
    for(let i=0;i<db.length;i++){
        if (db[i].id==orderId){
            index=i;
            break;
        }
    }
    
    for (let i=0;i<db[index].orderItems.length;i++){
        if (db[index].orderItems[i].ready){
            return true;
        }
        

    }
    return false;

}
$("#orderComplete").on("click",function(event){
    clearInterval(myVar)
    const orderNo=document.getElementById("ono").innerText;
    const itemNo=document.getElementById("ino").innerText;
    const customerName=document.getElementById("customerName").innerText;
    const customerID=document.getElementById("customerID").innerText;
    const phone=document.getElementById("phone").innerText;
    let str="#"+"r"+itemNo;
    $(str).attr("disabled",true);
    $(str).attr("checked",true);
    $("#myModal").modal("hide");
   

    //////////database functions////////////
    
       const data={
            ready:1
         }
     
         $.ajax({
           method: "PUT",
           url: "/orderAdminList/partOrder/"+itemNo,
           data: data
         }).then(function() {
            $.ajax({
                method: "GET",
                url: "/api/orderAdminList",
                 
             }).done(function(result){
                 db=result;
                let completed=isCompleted(orderNo);
               
               if(completed){
                
                 const stat={
                     status:"completed"
                 }
                 $.ajax({
                    method: "PUT",
                    url: "/orderAdminList/updateStatusOrder/"+orderNo,
                    data:stat
                  }).then(function() {
                    
                      //////////////////////////////
                   ///////////////sms////////////
                  /* let phoneTwilio="+16099334965";
                   phoneTwilio+= phone.replace(/[^\d]/g, "");
                   console.log(phoneTwilio);
                   const message ={body: 'ChitChat:Your order is ready!', from: '+18632165761', to:phoneTwilio};
                   
                  $.ajax({
                       method: "POST",
                       url: "/orderAdminList/sendSMS",
                       data: message
                   }).then(function(mess) {
                       console.log(mess);  
                       window.location.reload();
     
                   });
                  //////////////////////////////*/
                
                      
                });
                
             }
            });
             
           });
          
       

    
    //////////////////////////////////////// 

});

$("#orderCancel").on("click",function(event){
    
    const orderNo=document.getElementById("ono").innerText;
    const itemNo=document.getElementById("ino").innerText;
    const customerName=document.getElementById("customerName").innerText;
    const customerID=document.getElementById("customerID").innerText;
    const phone=document.getElementById("phone").innerText;
    console.log(orderNo);
    if(hasStarted(orderNo)){
        alert("Order is started!! Cannot cancel!!!");
    }
    else{
        clearInterval(myVar)
            const data={
                status:"cancelled"
            }

          $.ajax({
            method: "PUT",
            url: "/orderAdminList/updateStatusOrder/"+orderNo,
            data:data

          }).then(function() {
             
              window.location.reload();
              
            });

    }
   

});

$("#table").on("click",function(event){
   const i=event.target.getAttribute("data-i");
   const j=event.target.getAttribute("data-j");
   const id=event.target.getAttribute("data-id");
   
   let addon=""
   let add="";
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
    $('#et').text(db[i].orderItems[j].product.EstimatedTime);
    
    /////////ADD ON//////////////////////////////////////
    if (db[i].orderItems[j].addons){
      add=JSON.parse(db[i].orderItems[j].addons);
    }  

    ////////////////Basic set up///////////////////
      const div1=$('#detcol');
      div1.empty();
    //const div1=$("<div>").attr("class","col-sm-6");
    const div2=$("<div>").attr("class","card mt-2");
          div2.attr("style","width: auto");
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
   
    /////////////////////////TIMER/////////
    const pbar=$(".progress-bar");
    pbar.attr("aria-valuenow",0)
    pbar.attr("style","width:0%");
    pbar.text(0);

    seed=(db[i].orderItems[j].product.EstimatedTime)*600;
     myVar = setInterval(myTimer, seed);
    $('#myModal').modal();

});
////////////////////////////////////////
function myTimer(){
    const pbar=$(".progress-bar");
    const value=pbar.attr("aria-valuenow");
    //console.log(value);
    if(parseInt(value)==100){
        clearInterval(myVar)
    }
    else{
        pbar.attr("aria-valuenow",parseInt(value)+1);
        pbar.attr("style","width:"+(parseInt(value)+1)+"%");
        pbar.text((parseInt(value)+1)+"%");
    }   
    
}

/////////////////////////////////
$.ajax({
   method: "GET",
   url: "/api/orderAdminList",
    
}).done(function(result){
           tbodyEl.empty();
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
                   td.text(result[i].orderItems[j].product.EstimatedTime+" min");
                   row.append(td);
                   tbodyEl.append(row);

                  }
                  if (color_index==0){color_index=1}else{color_index=0}
                
               }
               
           }
           
} );  



});