
  /* myLib start */
  ;(function() {
    window.myLib = {};
  
    window.myLib.body = document.querySelector('body');
  
    window.myLib.closestAttr = function(item, attr) {
      var node = item;
  
      while(node) {
        var attrValue = node.getAttribute(attr);
        if (attrValue) {
          return attrValue;
        }
  
        node = node.parentElement;
      }
  
      return null;
    };
  
    window.myLib.closestItemByClass = function(item, className) {
      var node = item;
  
      while(node) {
        if (node.classList.contains(className)) {
          return node;
        }
  
        node = node.parentElement;
      }
  
      return null;
    };
  
    window.myLib.toggleScroll = function() {
      myLib.body.classList.toggle('no-scroll');
    };
  })();
  /* myLib end */
  
  /* header start */
  ;(function() {
    if (window.matchMedia('(max-width: 992px)').matches) {
      return;
    }
  
    var headerPage = document.querySelector('.site_header');
  
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 0) {
        headerPage.classList.add('is-active');
      } else {
        headerPage.classList.remove('is-active');
      }
    });
  })();
  /* header end */
  
  /* scrollTo start */
;(function() {


    var scroll = function(target) {
      var targetTop = target.getBoundingClientRect().top;
      var scrollTop = window.pageYOffset;
      var targetOffsetTop = targetTop + scrollTop;
      var headerOffset = document.querySelector('.site_header').clientHeight;
  
      window.scrollTo(0, targetOffsetTop - headerOffset);
    }
  
    myLib.body.addEventListener('click', function(e) {
      var target = e.target;
      var scrollToItemClass = myLib.closestAttr(target, 'data-scroll-to');
  
      if (scrollToItemClass === null) {
        return;
      }
  
      e.preventDefault();
      var scrollToItem = document.querySelector('.' + scrollToItemClass);
  
      if (scrollToItem) {
        scroll(scrollToItem);
      }
    });
  })();
  /* scrollTo end */
  
/* popup start */
;(function() {
    var showPopup = function(target) {
      target.classList.add('is-active');
    };
  
    var closePopup = function(target) {
      target.classList.remove('is-active');
    };
  
    myLib.body.addEventListener('click', function(e) {
      var target = e.target;
      var popupClass = myLib.closestAttr(target, 'data-popup');
  
      if (popupClass === null) {
        return;
      }
  
      e.preventDefault();
      var popup = document.querySelector('.' + popupClass);
  
      if (popup) {
        showPopup(popup);
        myLib.toggleScroll();
      }
    });
  
    myLib.body.addEventListener('click', function(e) {
      var target = e.target;
  
      if (target.classList.contains('popup-close') ||
          target.classList.contains('popup__inner')) {
            var popup = myLib.closestItemByClass(target, 'popup');
  
            closePopup(popup);
            myLib.toggleScroll();
      }
    });
  
    myLib.body.addEventListener('keydown', function(e) {
      if (e.keyCode !== 27) {
        return;
      }
  
      var popup = document.querySelector('.popup.is-active');
  
      if (popup) {
        closePopup(popup);
        myLib.toggleScroll();
      }
    });
  })();
  
  /* popup end */
    
/* map start */
// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: 50.419536356014994, lng: 25.7475829 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 17.5,
      center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: uluru,
      map: map,
    });
  }
  
  window.initMap = initMap;
  /* map end */
  
  ;(function() {
  var counter=1;
  setInterval(function(){
      document.getElementById('radio'+ counter).checked=true;
      counter++;
      if(counter>4){
          counter = 1;
      }
  },5000)
})(); 
