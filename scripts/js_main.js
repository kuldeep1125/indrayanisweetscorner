$(document).ready(function(){
var host_url = location.protocol + "//" + location.host;
  // Initialise the vertical slider
  // if(verticalSlider){
  //   verticalSlider.init();
  //   var $scene;
  //   $scene = $(".scene").parallax(), $scene.parallax("scalar", 120, 100)
  // }

  $('.cart_update').on('click',function(){

      var pwid = $(this).data('pwid');
      var action = $(this).data('act');
      // console.log(action);
      var ajax_data = {
            pwid:pwid,
            action:action,
        };

           $.ajaxSetup({
               headers: {
                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
               }
           });
           $.ajax({
                      type: "POST",
                      url: host_url + '/update_cart_qty',
                      data: ajax_data,
                      beforeSend:function(result) {

                      },
                      success: function(result) {
                          if(result == 1)
                          {
                              location.reload(true);
                          }
                          else
                          {
                              $.notify("Something went wrong", "error");
                          }
                      },
                      error: function() {
                          $.notify("Something went wrong", "error");
                      }
                  });

      // var product_id = $(this).data('pid');
  });


  $( ".selectproduct" ).click(function() {
    $( ".subheaderproductpage" ).slideToggle( "slow" );
  });

  // This button will increment the value
  $('.qtyplus').click(function(e){
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    var prod_id = $(this).attr('id');
    prod_id = prod_id.substring(4);
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name='+fieldName+prod_id+']').val());
    // If is not undefined
    if (!isNaN(currentVal)) {
      // Increment
      $('input[name='+fieldName+prod_id+']').val(currentVal + 1);
    } else {
      // Otherwise put a 0 there
      $('input[name='+fieldName+prod_id+']').val(0);
    }
  });
  // This button will decrement the value till 0
  $(".qtyminus").click(function(e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    var prod_id = $(this).attr('id');
    prod_id = prod_id.substring(5);
    fieldName = $(this).attr('field');
    // Get its current value
    var currentVal = parseInt($('input[name='+fieldName+prod_id+']').val());
    // If it isn't undefined or its greater than 0
    if (!isNaN(currentVal) && currentVal > 0) {
      // Decrement one
      $('input[name='+fieldName+prod_id+']').val(currentVal - 1);
    } else {
      // Otherwise put a 0 there
      $('input[name='+fieldName+prod_id+']').val(0);
    }
  });

    de();

      $("#fileU").on("change", function() {
        if ($("#fileU").val() != "") {
          $(".remove").attr("style", "display:block");
        } else {
          de();
        }
      });
      $(".remove").click(function() {
        $("#fileU").val('');
        de();
      })
    
    function de() {
      $(".remove").attr("style", "display:none");
    }

    
      de1();

      $("#fileU1").on("change", function() {
        if ($("#fileU1").val() != "") {
          $(".remove1").attr("style", "display:block");
        } else {
          de1();
        }
      });
      $(".remove1").click(function() {
        $("#fileU1").val('');
        de1();
      })
    
    function de1() {
      $(".remove1").attr("style", "display:none");
    }

    
      de2();

      $("#fileU2").on("change", function() {
        if ($("#fileU2").val() != "") {
          $(".remove2").attr("style", "display:block");
        } else {
          de2();
        }
      });
      $(".remove2").click(function() {
        $("#fileU2").val('');
        de2();
      })
    
    function de2() {
      $(".remove2").attr("style", "display:none");
    }


    
    de3();

    $("#fileU3").on("change", function() {
      if ($("#fileU3").val() != "") {
        $(".remove3").attr("style", "display:block");
      } else {
        de3();
      }
    });
    $(".remove3").click(function() {
      $("#fileU3").val('');
      de3();
    })
 
  function de3() {
    $(".remove3").attr("style", "display:none");
  }


    de4();

    $("#fileU4").on("change", function() {
      if ($("#fileU4").val() != "") {
        $(".remove4").attr("style", "display:block");
      } else {
        de4();
      }
    });
    $(".remove4").click(function() {
      $("#fileU4").val('');
      de4();
    })
  
  function de4() {
    $(".remove4").attr("style", "display:none");
  }


});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function addToCart(product_id,product_title,product_price) {

  var product_qty = $("#"+product_id).val();
  if(product_qty>0){
    $.ajax({
      method: 'POST', // Type of response and matches what we said in the route
      url: '/cart/add', // This is the url we gave in the route
      data: {'product_id' : product_id, 'product_title' :product_title, 'product_qty' : product_qty, 'product_price' : product_price}, // a JSON object to send back
      success: function(response){ // What to do if we succeed
        console.log(response);
        $("#cart_count").html(response);
      },
      error: function(jqXHR, textStatus, errorThrown) { // What to do if we fail
        //console.log(JSON.stringify(jqXHR));
        console.log("AJAX error: " + textStatus + ' : ' + errorThrown);
      }
    });
  }else{
    alert('Please Select number of products!!');
  }
}