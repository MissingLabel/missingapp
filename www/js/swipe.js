$(document).on('deviceready', function(){
  var myElement = document.getElementById('body');

  var swipeEvents = new Hammer(myElement);
  swipeEvents.on('swipeleft', function(ev) {
    if(pagePosition === 1) {
      pagePosition -=1;
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

  swipeEvents.on('swiperight', function(ev) {
    if(pagePosition === 1){
      pagePosition += 1;
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



