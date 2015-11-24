$(function () {
  $('.buyIt').hide()
  var product = $('.product');

  product.mouseenter(function() {
    var index = $('div').index( this )+1;
    var buyIt = $('div').eq(index);
    buyIt.show();
  });
  product.mouseleave(function() {
    var index = $('div').index( this )+1;
    var buyIt = $('div').eq(index);
    buyIt.hide();
  });

  $('.buyIt').mouseenter(function() {
    $(this).show();
  });
  $('.buyIt').mouseleave(function() {
    $(this).hide();
  });
});
