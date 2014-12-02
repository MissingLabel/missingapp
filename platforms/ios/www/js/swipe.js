$(document).on('deviceready', function(){
  var swipeleft = new Hammer("body");
  swipeleft.on('swipeleft', function(ev) {
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
      console.log(ev);
  });

  var swiperight = new Hammer("body");
  swiperight.on('swiperight', function(ev) {
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
      console.log(ev);
  });
});



