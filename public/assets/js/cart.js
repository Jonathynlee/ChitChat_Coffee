$(function(){
   const cart= $(".cart");

   const arr=[{image:"../public/assets/images/englishbreakfastTea.jpg",
               name:"English Breakfast Tea",
               inventory:20,
               quantity:2,
               price:4.00},
            
              {image:"../public/assets/images/ButterCroissant.jpg",
               name:"Butter Croissant",
               quantity:2,
               inventory:10,
               price:3.00}];

    //Read it from database

     for(let i=0;i<arr.length;i++){
         
         const item=$("<div class='row'>"+
                         "<div class='col-sm-8'>"+
                             "<img src='"+arr[i].image+"'>"+
                             "<h6 class='item'>"+arr[i].name+" ("+arr[i].quantity+") </h6>"+
                          "</div>"+
                        "<div class='col-sm-4'>"+
                        "</div>"+
                      "</div>");

         cart.append(item);

     }   
});