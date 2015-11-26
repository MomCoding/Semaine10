$(function () {

/*=====================================================================================
RESET ET VARIABLE
=======================================================================================*/

var productSelect = $('.product');
var nbCookieSelect = $('.nbCookie');
var clickCookieSelect = $('.bigCookie');
var buyItSelect = $('.buyIt');
var perSecondSelect = $('.perSecond');
var priceSelect = $('.price');
var ownedSelect = $('.owned')

var tempo = 10000;
var nbCookie = 0;
var perSecond = 0.1;

var product = function(name, price, owned, perSec, totalPrice) {
  this.name = name;
  this.price = price;
  this.owned = owned;
  this.perSec = perSec;
  this.totalPrice = totalPrice;
  this.maj = function() {
    this.owned++;
    this.totalPrice += this.price;
    this.price = Math.round(this.price*1.15);
  };
};

var cursor = new product('Cursor', 15, 0, 0.1, 0);
var grandma = new product('Grandma', 100, 0, 0.5, 0);
var farm = new product('Farm', 500, 0, 4, 0);
var factory = new product('Fatcory', 3000, 0, 10, 0);
var mine = new product('Mine', 10000, 0, 40, 0);
var shipment = new product('Shipment', 40000, 0, 100, 0);
var alchemy = new product('Alchemy lab', 200000, 0, 400, 0);
var portal = new product('Portal', 1500000, 0, 5000, 0);
var time = new product('Time machine', 125000000, 0, 100000, 0);
var antimatter = new product('Antimatter condenser', 4000000000, 0, 1000000, 0);
var prism = new product('Prism', 72000000000, 0, 2000000, 0);

var tableau = [cursor, grandma, farm, factory, mine, shipment, alchemy, portal, time, antimatter, prism];

nbCookieSelect.empty();
nbCookieSelect.append(nbCookie);
perSecondSelect.empty();
perSecondSelect.append(perSecond);
buyItSelect.hide();
productSelect.hide();
productSelect.eq(0).show();
productSelect.eq(1).show();

/*=====================================================================================
AFFICHAGE DYNAMIQUE DES buyIt AU SURVOL DES product
=======================================================================================*/

productSelect.mouseenter(function(){
  var index = productSelect.index( this );
  var buyIt = buyItSelect.eq(index);
  buyIt.show();
});
productSelect.mouseleave(function(){
  var index = productSelect.index( this );
  var buyIt = buyItSelect.eq(index);
  buyIt.hide();
});

buyItSelect.mouseenter(function() {
  $(this).show();
});
buyItSelect.mouseleave(function() {
  $(this).hide();
});

/*=====================================================================================
AFFICHAGE DES PRIX
=======================================================================================*/

for (var i = 0; i < tableau.length; i++) {
  priceSelect.eq(i).empty();
  priceSelect.eq(i).append(tableau[i].price);
};


/*=====================================================================================
Click sur gros cookie
=======================================================================================*/

clickCookieSelect.click(function(){
  nbCookie++;
  nbCookieSelect.empty();
  nbCookieSelect.append(nbCookie);
});

/*=====================================================================================
ACHAT D AUTO CLICK
=======================================================================================*/

productSelect.click(function(){
  var buy = productSelect.index( this );
  if (nbCookie>=tableau[buy].price) {
    perSecond += tableau[buy].perSec;
    perSecond = (Math.round(perSecond*10))/10;
    tableau[buy].maj();
    priceSelect.eq(buy).empty();
    priceSelect.eq(buy).append(tableau[buy].price);
    ownedSelect.eq(buy).empty();
    ownedSelect.eq(buy).append(tableau[buy].owned);
    perSecondSelect.empty();
    perSecondSelect.append(perSecond);
  };
});


/*=====================================================================================
AUTO CLICK
=======================================================================================*/

//definir fonction generale avec interval et inclure tout le reste



var myFunction = function(){
    clearInterval(interval);
    tempo=1000*(1/perSecond);
    nbCookie++;
    nbCookieSelect.empty();
    nbCookieSelect.append(nbCookie);
    interval = setInterval(myFunction, tempo);
}
var interval = setInterval(myFunction, tempo);

});
