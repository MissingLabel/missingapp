function makeTemplateProcessor($) {
  var currentPagePosition = 1;

  function showPage(page){
      $("#search-form").css("display", "none");
      $("#nutrition-facts-label").css("display", "none");
      $("#login-form").css("display", "none");
      $("#create-form").css("display", "none");
      $("#location-data").css("display", "none");
      $("#produce-profile").css("display", "none");
      $("#plu-search").css("display", "none");
      $("#" + page).css("display", "block");
  };

  function showNutritionalData(data) {
      showPage("nutrition-facts-label");
      currentPagePosition = 1;
      $("#swipe-buttons").css("display", "block");
      $("#scan-plu").css("display", "block");
      $("body").css("background-image", "none");
      $("#scanner-button").css("display", "none");
      // $(".logo").css("top", "-20px");

      var commodityName = data.name;

      _.templateSettings.variable = "nutritionData";
      var nutritionTemplate = _.template($("#nutrition-template").html());
      var nutritionData = data
      $("#nutrition-facts-label").html(nutritionTemplate(nutritionData));

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



  function errorCallback() {

  }

  function successCallback(position) {
    return position;
  }

  function showLocationTemplate(data) {
    showPage("location-data");
    currentPagePosition = 0;
    console.log("currentPagePosition = "+currentPagePosition);
    _.templateSettings.variable = "locationData";
    // var longLad = initGeolocation();
    var locationTemplate = _.template($("#location-template").html());
    // console.log(longLad);
    // var locationData = $.extend(longLad, data);
    var locationData = data;
    locationData["geolocation_data"] = longLad;
    // console.log(locationData);
    $("#location-data").html(locationTemplate(locationData));
  }

  function showProduceProfile(data) {
    showPage("produce-profile");
    currentPagePosition = 2;

    _.templateSettings.variable = "produceData";
    var produceProfileTemplate = _.template($("#produce-profile-template").html());
    var produceData = data;
    $("#produce-profile").html(produceProfileTemplate(produceData));
  }

  function showPluSearch(data) {
    showPage("plu-search")

    _.templateSettings.variable = "searchData"
    var pluSearchTemplate = _.template($("#plu-search-template").html());
    var searchData = data;
    $("#plu-search").html(pluSearchTemplate());
  }

  return {
    showPluSearch: showPluSearch,
    showProduceProfile: showProduceProfile,
    showLocationTemplate: showLocationTemplate,
    showNutritionalData: showNutritionalData,
    showPage: showPage,
    currentPagePosition: function(){return currentPagePosition;}
  };
}

function makeGeoLocator($){
  var currentPosition;
  var currentPositionSet = false;
  function determineCurrentPosition(){
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) { currentPosition = position; currentPositionSet = true; },
        function() { console.log("Failed to get current position"); currentPositionSet = false; }
      );
    } else {
      console.log('Geolocation is not supported');
    }
  }

  function getCurrentPosition() {
    if(currentPositionSet){
      return currentPosition;
    }else{
      return {city: Chicago, state: IL};
    }
  }

  return {
    getCurrentPosition: getCurrentPosition,
    determineCurrentPosition: determineCurrentPosition
  };
}

var geoLocator = makeGeoLocator(jQuery);
var viewTemplating = makeTemplateProcessor(jQuery);
var currentProductData;

$(document).on('deviceready', function(){
  geoLocator.determineCurrentPosition();
  geoLocator.getCurrentPosition;

  var re =/\d+$/;
  var localScanResult = re.exec(window.location);
  // alert(localScanResult);
  // console.log(localScanResult);
  if(localScanResult) {
    // alert(localScanResult);
    // ajax call with databar result
    var request = $.ajax({
      dataType: "json",
      url: "https://vast-cliffs-6881.herokuapp.com/items/" + localScanResult,
      type: "GET"
    });

    request.done( function(response){
      $("body").css("background-image", "none");
      $("#search-form").css("display", "none");
      // console.log(response);
      // console.log("hello");
      currentProductData = response;
      viewTemplating.showNutritionalData(currentProductData);
      // var googleMapHTML = "<html><iframewidth='600'height='450'frameborder='0' style='border:0'<img src='https://www.google.com/maps/embed/v1/directions?key=AIzaSyDdZNISuewaFtoSomCNI6eQWF9YdrSJgOU&origin="+locationData.farm_geo_location+"&destination=Chicago+IL'>></iframe></html>";
      // $("#google-map").append(googleMapHTML);

    });
  }



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
        $("#scanner-button").css("display", "block");

        // viewTemplating.showPluSearch(currentProductData);
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
      $(".scan-plu-button img").css("display", "block");
      console.log(response);
      console.log("hello");
      currentProductData = response;
      viewTemplating.showNutritionalData(currentProductData);

      // var googleMapHTML = "<html><iframewidth='600'height='450'frameborder='0' style='border:0'<img src= 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyDdZNISuewaFtoSomCNI6eQWF9YdrSJgOU&origin=" + locationData.farm_geo_location + "&destination=Chicago+IL' >></iframe></html>";
      $("#google-map").append(googleMapHTML);
    });
  });

  $("#scan-plu").click(function(e){
    e.preventDefault();
    $("#scan-plu").css("display", "none");
    $("#nutrition-facts-label").css("display", "none");
    $("#name-plu").css("display", "none");
    $("#swipe-buttons").css("display", "none");
    // $("#right-button").css("display", "none");
    // viewTemplating.showPluSearch(currentProductData);
    $("body").css("background-image", "url('../img/missing-label-veggie-backdrop.jpg')");
    $("#search-form").css("display", "block");
    $("#scanner-button").css("display", "block");
  });

  $("#left-button").click(function(e){
    e.preventDefault();
    $("#right-button").css("display", "block");
    if(viewTemplating.currentPagePosition() === 1) {
      // pagePosition -=1;
      $("#nutrition-facts-label").css("display", "none");
      $("#left-button").css("display", "none");
      console.log(currentProductData);
      viewTemplating.showLocationTemplate(currentProductData);
    }else{
      // pagePosition -=1;
      viewTemplating.showNutritionalData(currentProductData);
    };
  });

  $("#right-button").click(function(e){
    e.preventDefault();
    $("#left-button").css("display", "block");
    if(viewTemplating.currentPagePosition() === 1){
      // pagePosition += 1;
      $("#nutrition-facts-label").css("display", "none");
      $("#right-button").css("display", "none");
      viewTemplating.showProduceProfile(currentProductData);
    }else{
      // pagePosition +=1;
      viewTemplating.showNutritionalData(currentProductData);
    };
  });
});
