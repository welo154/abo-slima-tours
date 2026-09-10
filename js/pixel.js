(function () {
  var PIXEL_ID = '1770125864269170';

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  function track(event, params) {
    if (typeof fbq === 'function') fbq('track', event, params || {});
  }

  function trackViewContent(name, category) {
    track('ViewContent', {
      content_name: name,
      content_category: category || 'General'
    });
  }

  function observeSection(selector, name, category) {
    var el = document.querySelector(selector);
    if (!el || !('IntersectionObserver' in window)) return;
    var seen = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !seen) {
          seen = true;
          trackViewContent(name, category);
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });
    observer.observe(el);
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href') || '';

    if (href.indexOf('wa.me') !== -1) {
      var service =
        link.getAttribute('data-service') ||
        (link.closest('.hajj-card') ? 'Hajj' : link.closest('.trip-card, details') ? 'Umrah' : 'General');
      var pkg = link.getAttribute('data-package') || service + ' WhatsApp Contact';
      track('Contact', {
        content_name: pkg,
        content_category: service,
        contact_method: 'WhatsApp'
      });
    }

    if (href.indexOf('tel:') === 0) {
      track('Contact', {
        content_name: 'Phone Call',
        contact_method: 'Phone'
      });
    }
  });

  document.addEventListener('toggle', function (event) {
    var details = event.target;
    if (!details || details.tagName !== 'DETAILS' || !details.open) return;
    if (!details.classList.contains('trip-card')) return;
    var name = details.getAttribute('data-package') || 'Umrah Trip';
    trackViewContent(name, 'Umrah');
  }, true);

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-page');
    if (page === 'hajj') trackViewContent('Hajj Landing', 'Hajj');
    if (page === 'umrah') trackViewContent('Umrah Landing', 'Umrah');
    observeSection('#hajj', 'Hajj Packages Section', 'Hajj');
    observeSection('#umrah', 'Umrah Packages Section', 'Umrah');
  });

  window.AboSlimaPixel = {
    track: track,
    trackViewContent: trackViewContent,
    PIXEL_ID: PIXEL_ID
  };
})();
