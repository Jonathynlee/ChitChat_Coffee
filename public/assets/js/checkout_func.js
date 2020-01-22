




    $.ajax({
        method: "POST",
        url: "/checkout/getOrderItems",
        data: { userId: 1 }
    })
        .done(function (response) {
            console.log(response);
            $(".subTotalPrice").html(`$${response[0].subtotal}`)
            const taxes = response[0].subtotal*.075;
            $(".taxPrice").html(`$${taxes.toFixed(2)}`)
            const total = (response[0].subtotal + taxes)
            $(".orderTotalPrice").html(`$${total.toFixed(2)}`)
            for (item in response) {
                $.ajax({
                    method: "POST",
                    url: "/checkout/getProduct",
                    data: { productId: response[item].productId }
                }).done(function (product) {
                    let currentSubItemList = ""
                    let currentAddons = JSON.parse(product.addOns);
                    console.log(currentAddons);
                    for (questions in currentAddons){
                        for (answer in currentAddons[questions].question.answers){
                        let currentText = `<div class='row subItem'><p class='leftText text1'>${currentAddons[questions].question.answers[answer].title}</p><p class='rightText text2'>$${currentAddons[questions].question.answers[answer].price}</p></div>`
                        currentSubItemList += currentText;
                        }
                    }
                    console.log(currentSubItemList)

                   
                $(".cartBreakdown").append(`<div class='item row' id='item_${item}'><p class='itemName' state='closed'>${product.name}<i class='fas fa-caret-right'></i></p><p class='itemPrice'>$${product.basePrice} </p><div class='itemizedList'> ${currentSubItemList}  </div></div>`)

                    
                }).then(function(){
                    $(".itemName").on("click", function (event) {
                        let state = $(event.target).attr("state");
                        if (state === "open") {
                            $(event.target).attr("state", "closed")
                            $(event.target).parent().children(".itemizedList").css("height", "0px").css("padding", "20px")
                    
                            $(event.target).children("i").css("transform", "rotate(0deg)")
                        } else {
                            $(event.target).attr("state", "open")
                    
                            let sectionHeight = $(event.target).parent().children(".itemizedList")[0].scrollHeight;
                    
                            $(event.target).parent().children(".itemizedList").css("height", (sectionHeight + 10) + "px").css("padding", "15px");
                            $(event.target).children("i").css("transform", "rotate(90deg)")
                        }
                    
                    
                    });
                })
            }
        })



