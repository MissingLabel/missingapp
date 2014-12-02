$(document).on('deviceready', function(){
  var myElement = document.getElementById('body');
  var swipeEvents = new Hammer(myElement);
  var pagePosition = 1;
  swipeEvents.on('swipeleft', function(ev) {
    alert(viewTemplating);
    alert(currentProductData);
    if(pagePosition === 1) {
      $("#left-button").css("display", "none");
      viewTemplating.showLocationTemplate(currentProductData);
    }else{
      $("#right-button").css("display", "block");
      viewTemplating.showNutritionalData(currentProductData);
    };
    pagePosition -=1;
  }).on('swiperight', function(ev) {
    alert(viewTemplating);
    alert(currentProductData);
    if(pagePosition === 1){
      $("#right-button").css("display", "none");
      viewTemplating.showProduceProfile(currentProductData);
    }else{
      $("#left-button").css("display", "block");
      viewTemplating.showNutritionalData(currentProductData);
    };
    pagePosition += 1;
  });
});



