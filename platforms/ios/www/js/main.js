function makeTemplateProcessor($){

  function showPage(page){
      $("#search-form").css("display", "none");
      $("#nutrition-facts-label").css("display", "none");
      $("#login-form").css("display", "none");
      $("#create-form").css("display", "none");
      $("#location-data").css("display", "none");
      $("#produce-profile").css("display", "none");
      $("#" + page).css("display", "block");
  };

  function showNutritionalData(data) {
      showPage("nutrition-facts-label");
      $("#swipe-buttons").css("display", "block");
      $("body").css("background-image", "none");
      $(".logo").css("top", "-20px");

      var commodityName = data.name;

      _.templateSettings.variable = "nutritionData";

      var nutritionTemplate = _.template(
        $("#nutrition-template").html()
      );

      var nutritionData = data

      $("#nutrition-facts-label").html(
        nutritionTemplate( nutritionData )
      );

      $("#commodity-name").html(commodityName.charAt(0).toUpperCase() + commodityName.slice(1));
      $("#plu").html(data.plu_no);

      for (var i = 0; data.lower_label.length; i++) {

        var tableDiv =  "<tr><td id='item-percentage' class='td-left-bottom'>"
                        +data.lower_label[i].per.toString()+
                        "%</td><td class='td-right-bottom'><span id='item-name'>"
                        +data.lower_label[i].name.toString()+
                        "</span>&nbsp;<div id='item-qty'>"
                        +data.lower_label[i].num.toString()+
                        "</div>&nbsp;<div id='item-unit'>"
                        +data.lower_label[i].units.toString()+
                        "</div></td></tr>"

          $("#nutrition-lower-table tbody").append(tableDiv);
        };
  }

  function showLocationTemplate(data) {
    showPage("location-data");

    _.templateSettings.variable = "locationData";

    var locationTemplate = _.template(
      $("#location-template").html()
    );

    var locationData = data;

    $("#location-data").html(
      locationTemplate(locationData)
    )};

  function showProduceProfile(data) {
    showPage("produce-profile");

    _.templateSettings.variable = "produceData";

    var produceProfileTemplate = _.template(
      $("#produce-profile-template").html()
    );

    var produceData = data;

    $("#produce-profile").html(
      produceProfileTemplate( produceData )
    )};

  return {
    showProduceProfile: showProduceProfile,
    showLocationTemplate: showLocationTemplate,
    showNutritionalData: showNutritionalData,
    showPage: showPage
  };
}

var viewTemplating = makeTemplateProcessor(jQuery);

$(document).on('deviceready', function(){
  var re =/\d+$/;
  var localScanResult = re.exec(window.location);
  alert(localScanResult);
  // console.log(localScanResult);
  if(true) {
    alert(localScanResult);
    // ajax call with databar result
    var request = $.ajax({
      dataType: "json",
      url: "https://vast-cliffs-6881.herokuapp.com/items/" + localScanResult,
      type: "GET"
    });

    request.done( function(response){
      $("body").css("background-image", "none");
      $("#search-form").css("display", "none");
      console.log(response);
      console.log("hello");
      currentProductData = response;
      viewTemplating.showNutritionalData(currentProductData);
      // var googleMapHTML = "<html><iframewidth='600'height='450'frameborder='0' style='border:0'<img src= 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDdZNISuewaFtoSomCNI6eQWF9YdrSJgOU&origin=" + locationData.farm_geo_location + "&destination=Chicago+IL' >></iframe></html>";
      $("#google-map").append(googleMapHTML);

    });
  }

  var pagePosition = 1;
  var currentProductData;

  $("#login-button").click(function(e){
    e.preventDefault();
    var emailInput = $("#login-input-field").val();
    var loginInput = $("#password-input").val();
    var request = $.ajax({
      dataType: "json",
      url: "https://vast-cliffs-6881.herokuapp.com/login",
      data: {email: emailInput, password: loginInput},
      type: "POST"
    })

    request.done(function(response){
      console.log(response.loginSecure);
      if(response.loginSecure === "True"){
        $("#login-form").css("display", "none");
        $("#create-form").css("display", "none");
        $("#search-form").css("display", "block");
      } else {
        alert("Please try again");
      }
    });

  });

  $("#create-button").click(function(e){
    e.preventDefault();
    $("#login-form").css("display", "none");
    $("#create-form").css("display", "none");
    $("#signup-form").css("display", "block");
  });

  $("#create-account-button").click(function(e){
    e.preventDefault();
    var emailInput = $("#signup-input-field").val();
    var loginInput = $("#new-password-input").val();

    var request = $.ajax({
      dataType: "json",
      url: "https://vast-cliffs-6881.herokuapp.com/users",
      data: {email: emailInput, email: loginInput},
      type: "POST"
    })
    request.done( function(response){
      if(response.loginSecure === "True"){
        $("#signup-form").css("display", "none");
        $("#search-form").css("display", "block");
      } else {
        alert("Please try again");
      };
    });

  });

  $("#search-button").click(function(e){
    e.preventDefault();
    var input = $("#input-field").val();
    console.log(input);
    var request = $.ajax({
      dataType: "json",
      url: "https://vast-cliffs-6881.herokuapp.com/items/" + input,
      type: "GET"
    })

    request.done( function(response){
      $("body").css("background-image", "none");
      $("#search-form").css("display", "none");
      console.log(response);
      console.log("hello");
      currentProductData = response;
      viewTemplating.showNutritionalData(currentProductData);
      // var googleMapHTML = "<html><iframewidth='600'height='450'frameborder='0' style='border:0'<img src= 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDdZNISuewaFtoSomCNI6eQWF9YdrSJgOU&origin=" + locationData.farm_geo_location + "&destination=Chicago+IL' >></iframe></html>";
      $("#google-map").append(googleMapHTML);
    });
  });



  $("#left-button").click(function(e){
    e.preventDefault();
    if(pagePosition === 1) {
      pagePosition -=1;
      $("#nutrition-facts-label").css("display", "none");
      $("#left-button").css("display", "none");
      console.log(currentProductData);
      viewTemplating.showLocationTemplate(currentProductData);
    }else{
      pagePosition -=1;
      $("#right-button").css("display", "block");
      viewTemplating.showNutritionalData(currentProductData);
    };

    });

  $("#right-button").click(function(e){
    e.preventDefault();
    if(pagePosition === 1){
      pagePosition += 1;
    $("#nutrition-facts-label").css("display", "none");
    $("#right-button").css("display", "none");
    viewTemplating.showProduceProfile(currentProductData);
  }else{
    pagePosition +=1;
    $("#left-button").css("display", "block");
    viewTemplating.showNutritionalData(currentProductData);
  };

  });

});
