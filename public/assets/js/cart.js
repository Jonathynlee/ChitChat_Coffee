$(function(){
   const cart= $(".cart");
   const sub=$("#sprice");
   /////////////////////DELETE FUNCTION/////////////////////////
   $('.del').on("click",function(){
     const id=$(this).attr("id").slice(1);
     $.ajax({
      method: "DELETE",
      url: "/shoppingCard/" + id
    })
      .then(function() {
        window.location.reload();
      });
  
   });
   
   /////////////when Quantity Changes/////////////////////
   $('select').on('change', function() {
    id=$(this).attr("id").slice(1);
    number=this.value;

    const data={
       id:id,
       quantity:number
    }

    $.ajax({
      method: "PUT",
      url: "/shoppingCard",
      data: data
    }).then(function() {
        window.location.reload();
      });
   });
  
   //////////////////////////////////////
   
   $.ajax({
    method: "GET",
    url: "/api/shoppingCard",

   }).done(function(result){
     
      
     
    /////////////////////////Price Calculations, Listing Add Ons
     let subtotal=0.0;
    
     //console.log(result);
    
    for(let i=0;i<result.length;i++){
      ////////////SELECT BUTTON FOR QUANTITY UPDATE//////////
        let sid="#s"+result[i].id;
        if(result[i].product.quantity===null){
          // $(sid).empty();
           for(let m=-1;m<10;m++){
             let n=m+1;
             let el= $("<option value="+n+'>'+n+'</option>');
             $(sid).append(el);
           }
         }else if (result[i].product.quantity<=10){
          
          //$(sid).empty();
          for(let m=-1;m<result[i].product.quantity;m++){
            let n=m+1;
            let el= $("<option value="+n+'>'+n+'</option>');
            $(sid).append(el);
          }
        }
        else{
          for(let m=-1;m<10;m++){
            let n=m+1;
            let el= $("<option value="+n+'>'+n+'</option>');
            $(sid).append(el);
          }
        }

      //////////////////////////////////////////////////////
      subtotal+=result[i].quantity*result[i].basePrice;
      let add=JSON.parse(result[i].addons);
      
      let label=$("#l"+result[i].id);
      label.append("<br>");
     
      const btn=$("<div class='btn-group dropleft'><button type='button' class='btn-info btn-sm dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Add On</button></div>");
  
      const div=$("<div>");
      for (let j=0;j<add.length;j++){
            
            div.css({"background-color":"#ffafbc"});
            div.attr("class","dropdown-menu ");
           
            uEl = $("<ul>");
         
            uEl.append(add[j].question.title+": ");
            uEl.css({"color":"red"});
            uEl.css({"font-size":"0.8rem"});
          for(k=0;k<add[j].question.answers.length;k++){
            let liEl=$("<li>").append(add[j].question.answers[k].title+": $"+add[j].question.answers[k].price);
            subtotal+=parseFloat(add[j].question.answers[k].price)*result[i].quantity;
            
           
            liEl.css({"color":"black"});
            liEl.css({"font-size":"0.8rem"});
            uEl.append(liEl);
            div.append(uEl);
          }
          btn.append(div);
          label.append(btn);
         
        
      }

      sub.text(subtotal.toFixed(2)); 
    }

    if (result.length!=0){
     const stotal={
       subtotal:subtotal.toFixed(2),
       orderId:result[0].orderId

     
     }
     $.ajax({
       method: "PUT",
       url: "/shoppingCard/charges",
       data:stotal
     }).done(function(db){console.log(db)});
    } 

   });
   

  }); 