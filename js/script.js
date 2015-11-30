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
var ownedSelect = $('.owned');
var productIconSelect = $('.productIcon');
var productNameSelect = $('.productName p');
var buy10Select = $('.buy10');
var sell1Select = $('.sell1');
var sellAllSelect = $('.sellAll');

var tempo = 10000;
var nbCookie = 0;
var perSecond = 0;

var affichCookie = function() {
  nbCookieSelect.empty();
  nbCookieSelect.append((Math.round(nbCookie*10))/10);
};
var affichPersecond = function() {
  perSecondSelect.empty();
  perSecondSelect.append(perSecond);
};
var affichOwned = function(argOwned) {
  ownedSelect.eq(argOwned).empty();
  ownedSelect.eq(argOwned).append(tableau[argOwned].owned);
};
var affichPrice = function(argPrice) {
  priceSelect.eq(argPrice).empty();
  priceSelect.eq(argPrice).append(tableau[argPrice].price);
};

var buyAutoClick = function (argBuyAutoClick) {
  if (nbCookie>=tableau[argBuyAutoClick].price) {
    perSecond += tableau[argBuyAutoClick].perSec;
    perSecond = (Math.round(perSecond*10))/10;
    nbCookie -= tableau[argBuyAutoClick].price;
    tableau[argBuyAutoClick].maj();
    affichPrice(argBuyAutoClick);
    affichOwned(argBuyAutoClick);
    affichPersecond();
    affichCookie();
  }
};

var product = function(name, price, priceOrigin, owned, perSec, totalPrice, iconOff, iconOn) {
  this.name = name;
  this.price = price;
  this.priceOrigin = priceOrigin;
  this.price = price;
  this.owned = owned;
  this.perSec = perSec;
  this.totalPrice = totalPrice;
  this.iconOff = iconOff;
  this.iconOn = iconOn;
  this.maj = function() {
    this.owned++;
    this.totalPrice += this.price;
    this.price = Math.round(this.price*1.15);
  };
  this.sell1 = function() {
    this.owned--;
    this.price = Math.round(this.price/1.15);
    this.totalPrice -= this.price;
  };
  this.sell = function() {
    this.owned = 0;
    this.totalPrice = 0;
    this.price = this.priceOrigin;
  };
};

var cursor = new product('Cursor', 15, 15, 0, 0.1, 0, "cursorIconDefault", "cursorIconUnlocked");
var grandma = new product('Grandma', 100, 100, 0, 0.5, 0, "grandmaIconDefault", "grandmaIconUnlocked");
var farm = new product('Farm', 500, 500, 0, 4, 0, "farmIconDefault", "farmIconUnlocked");
var factory = new product('Fatcory', 3000, 3000, 0, 10, 0, "factoryIconDefault", "factoryIconUnlocked");
var mine = new product('Mine', 10000, 10000, 0, 40, 0, "mineIconDefault", "mineIconUnlocked");
var shipment = new product('Shipment', 40000, 40000, 0, 100, 0, "shipmentIconDefault", "shipmentIconUnlocked");
var alchemy = new product('Alchemy lab', 200000, 200000, 0, 400, 0, "alchemyIconDefault", "alchemyIconUnlocked");
var portal = new product('Portal', 1500000, 1500000, 0, 5000, 0, "portalIconDefault", "portalIconUnlocked");
var time = new product('Time machine', 125000000, 125000000, 0, 100000, 0, "timeIconDefault", "timeIconUnlocked");
var antimatter = new product('Antimatter condenser', 4000000000, 4000000000, 0, 1000000, 0, "antimatterIconDefault", "antimatterIconUnlocked");
var prism = new product('Prism', 72000000000, 72000000000, 0, 15000000, 0, "prismIconDefault", "prismIconUnlocked");

var tableau = [cursor, grandma, farm, factory, mine, shipment, alchemy, portal, time, antimatter, prism];

buyItSelect.hide();
productSelect.hide();
productSelect.eq(0).show();
productSelect.eq(1).show();
affichCookie();
affichPersecond();

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
AFFICHAGE DES PRIX DE BASE ET DES QUANTITE
=======================================================================================*/

for (var i = 0; i < tableau.length; i++) {
  affichPrice(i);
  affichOwned(i);
}


/*=====================================================================================
Click sur gros cookie
=======================================================================================*/

clickCookieSelect.click(function(){
  nbCookie++;
  affichCookie();
});

/*=====================================================================================
ACHAT D AUTO CLICK
=======================================================================================*/

productSelect.click(function(){
  var buy = productSelect.index( this );
  buyAutoClick(buy);
});

/*=====================================================================================
ACHAT D AUTO CLICK PAR 10 ET REVENTE
=======================================================================================*/

buy10Select.click(function(){
  var buy10 = buy10Select.index( this );
  for (var i = 0; i < 10; i++) {
    buyAutoClick(buy10);
  }
});

sell1Select.click(function() {
  var sellOne = sell1Select.index( this);
  if (tableau[sellOne].owned>0) {
    perSecond -= tableau[sellOne].perSec;
    perSecond = (Math.round(perSecond*10))/10;
    tableau[sellOne].sell1();
    nbCookie += (tableau[sellOne].price)/2;
    affichPrice(sellOne);
    affichOwned(sellOne);
    affichPersecond();
    affichCookie();
  }
});

sellAllSelect.click(function() {
  var sellAll = sellAllSelect.index( this);
  if (tableau[sellAll].owned>0) {
    perSecond -= (tableau[sellAll].perSec)*(tableau[sellAll].owned);
    perSecond = (Math.round(perSecond*10))/10;
    nbCookie += (tableau[sellAll].totalPrice)/2;
    tableau[sellAll].sell();
    affichPrice(sellAll);
    affichOwned(sellAll);
    affichPersecond();
    affichCookie();
  }
});

/*=====================================================================================
Fonction Genérale
=======================================================================================*/

var myFunction = function(){

  var productUnlocked = $('.product:visible');

  if (perSecond>0) {  //autoclick
    nbCookie += perSecond/10;
    affichCookie();
  }

  for (var i = 0; i < tableau.length; i++) {
    (function (arg1) {
      if ((tableau[arg1].price/3) <= nbCookie) {
        productSelect.eq(arg1).show();
      }
      if ((tableau[arg1].price/2) <= nbCookie) {
        productNameSelect.eq(arg1).empty();
        productNameSelect.eq(arg1).append(tableau[arg1].name);
      }
      if (tableau[arg1].price <= nbCookie) {
        productIconSelect.eq(arg1).removeClass(tableau[arg1].iconOff);
        productIconSelect.eq(arg1).addClass(tableau[arg1].iconOn);
      }
      if (tableau[arg1].price <= nbCookie) {
        priceSelect.eq(arg1).removeClass("red");
        priceSelect.eq(arg1).addClass("green");
        productUnlocked.eq(arg1).fadeTo(0,1);
      } else {
        priceSelect.eq(arg1).removeClass("green");
        priceSelect.eq(arg1).addClass("red");
        productUnlocked.eq(arg1).fadeTo(0,0.5);
      }
    })(i);
  }
}
var interval = setInterval(myFunction, 100);

});
