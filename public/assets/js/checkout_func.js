
        $(".itemName").on("click", function (event) {
            let state = $(event.target).attr("state");
            if (state === "open") {
                $(event.target).attr("state", "closed")
                $(event.target).parent().children(".itemizedList").css("height", "0px")

                $(event.target).children("i").css("transform", "rotate(0deg)")
            } else {
                $(event.target).attr("state", "open")

                let sectionHeight = $(event.target).parent().children(".itemizedList")[0].scrollHeight;

                $(event.target).parent().children(".itemizedList").css("height", (sectionHeight + 10) + "px");
                $(event.target).children("i").css("transform", "rotate(90deg)")
            }


        });