$(document).on('deviceready', function(){
  var myElement = document.getElementById('body');
  var swipeEvents = new Hammer(myElement);

  var views = [viewTemplating.showLocationTemplate,
               viewTemplating.showNutritionalData,
               viewTemplating.showProduceProfile];


  swipeEvents.on('swipeleft', function() {
    if(viewTemplating.currentPagePosition() === 1) {
      $("#left-button").css("display", "none");
      views[viewTemplating.currentPagePosition() - 1]();

      viewTemplating.showLocationTemplate(currentProductData);
    }else{
      $("#right-button").css("display", "block");
      viewTemplating.showNutritionalData(currentProductData);
    }
  }).on('swiperight', function() {
    if(viewTemplating.currentPagePosition() === 1){
      $("#right-button").css("display", "none");
      viewTemplating.showProduceProfile(currentProductData);
    }else{
      $("#left-button").css("display", "block");
      viewTemplating.showNutritionalData(currentProductData);
    }
  });
});



