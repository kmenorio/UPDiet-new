function update_notif() {
    //console.log("1");
    if(!is_notify) {
        $.get("../backend/d_notif_count.php", function(d1,s){
            var r1 = JSON.parse(d1);
            //console.log(r);
            if(r1["count"] > 0) {
                $.get("../backend/d_notif_fetch.php", function(d2,s){
                    var r2 = JSON.parse(d2);
                    var p = "\u20B1";

                    $(".notif-c-h-value").text(r2["order_status"].toLowerCase());
                    $(".notif-d-f-name").text(r2["food_name"]);
                    $(".notif-d-f-quantity").text(`x${r2["quantity"]}`);
                    $(".notif-d-store").text(r2["store_name"]);
                    $(".notif-d-price").text(`${p}${(r2["price"]*r2["quantity"]).toFixed(2)}`);

                    $(".notif-r-control").attr("id", `n-${r2["t_id"]}`);
                    $(".notif").css("display", "grid");

                    is_notify = true;
                })
            }
        });
    }
    else if(!is_viewed) {
        $.get("../backend/d_notif_count.php", function(d,s){
            var r = JSON.parse(d);

            $(".nav-notif-order").text(r["count"]);
            $(".nav-notif-order").css("display", "flex");

            if(r["count"] > 1) {
                $(".notif-subheader-text").text(`+ ${r["count"]-1} more updates`)
            }
        });
    }
}

$(document).ready(function(){
    setInterval(update_notif, 500);

    $(".notif").on("click", ".notif-r-control", function(){
        $.get("../backend/d_notif_close.php", function(d,s){
            is_viewed = true;
            
            $(".notif").css("display", "none");
            $(".nav-notif-order").css("display", "none");
    
            $("button").removeClass("nav-active");
            $("#order-trigger").addClass("nav-active");
    
            var k = {
                "t_id": $(this).attr("id")
            };
    
            $(".sidebar").load("order_items.php", k, function(d,s) {
    
            });
        });
    });

    $(".notif").on("click", ".notif-control", function(){
        $.get("../backend/d_notif_close.php", function(d,s){
            is_viewed = true;
            
            $(".notif").css("display", "none");
            $(".nav-notif-order").css("display", "none");
        });
    });
});

var is_notify = false;
var is_viewed = false;