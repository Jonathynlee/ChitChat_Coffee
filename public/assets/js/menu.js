$(document).ready(function() {
    const row=$("#catSelect");
    const pcolumn=$("#productColumn");
    $.ajax({
        method: "GET",
        url: "/menu/getAllCategories",
    
       }).done(function(result){
           numCategories=result.length;
           ////Load the categories
           for (let i=0;i<result.length;i++){
               //console.log(result[i].name);
               let div=$("<div>");
               div.attr("class","col-md-6");
                let div2=$("<div>");
                div2.attr("class","form-check");
                let input=$("<input>");
                input.attr("class","form-check-input");
                input.attr("type","checkbox");
                input.attr("id","radio"+result[i].id);
                input.attr("value",result[i].name);
                let label=$("<label>");
                label.attr("class","form-check-label");
                label.attr("for",input.attr("id"));
                label.text(result[i].name);
                div2.append(input);
                div2.append(label);
                div.append(div2);
                row.append(div);
           }
          
           //load the products.
           $.ajax({
            method: "GET",
            url: "/menu/getAllProducts",
        
           }).done(function(reslt){
               for(let j=0;j<reslt;j++){
                   //////////
                   let div=$("<div>");
                   div.attr("class","outterBox");
                   div.attr("productId","p"+reslt[i].id);
                   let div2=$("<div>");
                   div2.attr("class","productBox");
                   let div3=$("<div>");
                   div3.attr("class","productTextBox");
                   let h2=$("<h2>");
                   h2.text(reslt[i].name);
                   div3.append(h2);
                   div2.append(div3);
                   div.append(div2);
                   pcolumn.append(div);
                   //////////
               }
           });    
           

           
       } );   
     
} );   





/*
<div class="col-md-6">
                        
                        <div class="form-check " id="" title="">
                            <input class="form-check-input " type="checkbox" name="" id="icedDrinkRadio"
                                value="icedDrink">
                            <label class="form-check-label" for="icedDrinkRadio">Coffee</label>
                        </div>

                    </div>*/