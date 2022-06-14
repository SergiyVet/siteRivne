
/* libs start */
;(function() {
  var canUseWebP = function() {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
        
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }

    
    return false;
  };
  
  var isWebpSupported = canUseWebP();

  if (isWebpSupported === false) {
    var lazyItems = document.querySelectorAll('[data-src-replace-webp]');

    for (var i = 0; i < lazyItems.length; i += 1) {
      var item = lazyItems[i];

      var dataSrcReplaceWebp = item.getAttribute('data-src-replace-webp');
      if (dataSrcReplaceWebp !== null) {
        item.setAttribute('data-src', dataSrcReplaceWebp);
      }
    }
  }

  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });
})();
/* libs end */

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

/* popup start */
;(function() {
  var showAdapt = function(el) {
    el.classList.add('is-active');
  };

  var closePopup = function(el) {
    el.classList.remove('is-active');
  };

  myLib.body.addEventListener('click', function(e) {
    var el = e.target;
    var popupClass = myLib.closestAttr(el, 'data-popup');

    if (popupClass === null) {
      return;
    }

    e.preventDefault();
    var popup = document.querySelector('.' + popupClass);

    if (popup) {
      showAdapt(popup);
      myLib.toggleScroll();
    }
  });

  myLib.body.addEventListener('click', function(e) {
    var el = e.target;

    if (el.classList.contains('win_close') ||
        el.classList.contains('adapt_inner')) {
          var adapt = myLib.closestItemByClass(el, 'popup');

          closePopup(adapt);
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

/* catalog start */
;(function() {
  var elementSection = document.querySelector('.section-go');

  if (elementSection === null) {
    return;
  }

  var removeChildren = function(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  };

  var updateChildren = function(el, childr) {
    removeChildren(el);
    for (var i = 0; i < childr.length; i += 1) {
      el.appendChild(childr[i]);
    }
  };

  var element = elementSection.querySelector('.search');
  var elementNav = elementSection.querySelector('.search-nav');
  var elementItems = elementSection.querySelectorAll('.search_item');

  elementNav.addEventListener('click', function(r) {
    var target = r.target;
    var el = myLib.closestItemByClass(target, 'search-nav_btn');

    if (el === null || el.classList.contains('is-active')) {
      return;
    }

    r.preventDefault();
    var elfilter = el.getAttribute('data-filter');
    var bootnisactv = elementNav.querySelector('.search-nav_btn.is-active');

    bootnisactv.classList.remove('is-active');
    el.classList.add('is-active');

    if (elfilter === 'all') {
      updateChildren(element, elementItems);
      return;
    }

    var itfilter = [];
    for (var i = 0; i < elementItems.length; i += 1) {
      var current = elementItems[i];
      if (current.getAttribute('data-category') === elfilter) {
        itfilter.push(current);
      }
    }

    updateChildren(element, itfilter);
  });
})();
/* catalog end */


/* map start */
function initMap() {
  const gps = { lat: 50.973, lng: 26.591 };
  const maps = new google.maps.Map(document.getElementById("map"), {
    zoom: 7.5,
    center: gps,
  });
  const marker = new google.maps.Marker({
    position: gps,
    map: maps,
  });
}

window.initMap = initMap;
/* map end */
