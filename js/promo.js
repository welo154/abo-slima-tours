(function () {
  var STORAGE_MODAL = 'aboslima_vip_modal_seen';
  var STORAGE_COUNT = 'aboslima_vip_reminder_count';
  var MAX_REMINDERS = 8;
  var REMINDER_MS = 40000;
  var AFTER_DISMISS_MS = 90000;
  var START_DELAY_MS = 8000;

  var trips = [
    {
      start: '22 سبتمبر',
      end: '1 أكتوبر',
      days: 10,
      label: 'من 22 سبتمبر إلى 1 أكتوبر — 10 أيام',
      book: '/book?service=umrah&package=' + encodeURIComponent('من 22 سبتمبر إلى 1 أكتوبر (سبتمبر) — 10 أيام') + '&departure=' + encodeURIComponent('22 سبتمبر'),
      details: '/umrah'
    },
    {
      start: '23 سبتمبر',
      end: '29 سبتمبر',
      days: 7,
      label: 'من 23 سبتمبر إلى 29 سبتمبر — 7 أيام',
      book: '/book?service=umrah&package=' + encodeURIComponent('من 23 سبتمبر إلى 29 سبتمبر (سبتمبر) — 7 أيام') + '&departure=' + encodeURIComponent('23 سبتمبر'),
      details: '/umrah'
    }
  ];

  var tripIndex = 0;
  var shapeIndex = 0;
  var timer = null;
  var reminderCount = 0;

  function trackView(name) {
    if (window.AboSlimaPixel) {
      window.AboSlimaPixel.trackViewContent(name, 'Umrah');
    }
  }

  function getCount() {
    try {
      return parseInt(sessionStorage.getItem(STORAGE_COUNT) || '0', 10) || 0;
    } catch (e) {
      return reminderCount;
    }
  }

  function setCount(n) {
    reminderCount = n;
    try {
      sessionStorage.setItem(STORAGE_COUNT, String(n));
    } catch (e) { /* ignore */ }
  }

  function modalSeen() {
    try {
      return sessionStorage.getItem(STORAGE_MODAL) === '1';
    } catch (e) {
      return false;
    }
  }

  function markModalSeen() {
    try {
      sessionStorage.setItem(STORAGE_MODAL, '1');
    } catch (e) { /* ignore */ }
  }

  function el(html) {
    var wrap = document.createElement('div');
    wrap.innerHTML = html.trim();
    return wrap.firstChild;
  }

  function hideAllSoft() {
    ['promoRibbon', 'promoToast', 'promoBubble'].forEach(function (id) {
      var node = document.getElementById(id);
      if (node) node.classList.remove('is-visible');
    });
  }

  function currentTrip() {
    return trips[tripIndex % trips.length];
  }

  function nextTrip() {
    tripIndex = (tripIndex + 1) % trips.length;
  }

  function buildUI() {
    if (document.getElementById('promoOverlay')) return;

    document.body.appendChild(el(
      '<div class="promo-overlay" id="promoOverlay" role="dialog" aria-modal="true" aria-labelledby="promoTitle">' +
        '<div class="promo-modal">' +
          '<button type="button" class="promo-close" data-promo-close aria-label="إغلاق">&times;</button>' +
          '<h2 id="promoTitle">عمرة سبتمبر VIP</h2>' +
          '<p class="promo-lead">أقرب رحلتين متاحتين الآن — أماكن محدودة. احجز قبل اكتمال العدد.</p>' +
          '<div class="promo-trips">' +
            '<a class="promo-trip-btn" href="' + trips[0].book + '" data-promo-track="VIP Entry 22 Sep">' +
              '<strong>22 سبتمبر ← 1 أكتوبر</strong>' +
              '<span>10 أيام · VIP · أماكن محدودة</span>' +
            '</a>' +
            '<a class="promo-trip-btn" href="' + trips[1].book + '" data-promo-track="VIP Entry 23 Sep">' +
              '<strong>23 سبتمبر ← 29 سبتمبر</strong>' +
              '<span>7 أيام · VIP · أماكن محدودة</span>' +
            '</a>' +
          '</div>' +
          '<div class="promo-actions">' +
            '<a class="btn btn-primary" href="/umrah" data-promo-track="VIP Entry See All">عرض العمرة</a>' +
            '<button type="button" class="btn btn-outline" data-promo-close>لاحقاً</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    ));

    var ribbon = el(
      '<div class="promo-ribbon" id="promoRibbon" role="status">' +
        '<button type="button" class="promo-dismiss" data-promo-soft-dismiss aria-label="إغلاق">&times;</button>' +
        '<span id="promoRibbonText"></span>' +
        '<a id="promoRibbonCta" href="/umrah">احجز الآن</a>' +
      '</div>'
    );
    var header = document.querySelector('header.site');
    if (header && header.parentNode) {
      header.parentNode.insertBefore(ribbon, header.nextSibling);
    } else {
      document.body.insertBefore(ribbon, document.body.firstChild);
    }

    document.body.appendChild(el(
      '<div class="promo-toast" id="promoToast" role="status">' +
        '<div id="promoToastText"></div>' +
        '<a class="btn" id="promoToastCta" href="/umrah">احجز الآن</a>' +
        '<button type="button" class="promo-dismiss" data-promo-soft-dismiss aria-label="إغلاق">&times;</button>' +
      '</div>'
    ));

    document.body.appendChild(el(
      '<div class="promo-bubble" id="promoBubble" role="status">' +
        '<div class="promo-bubble-title" id="promoBubbleTitle">عمرة VIP</div>' +
        '<p id="promoBubbleText"></p>' +
        '<div class="promo-bubble-actions">' +
          '<a class="btn btn-primary" id="promoBubbleCta" href="/umrah" style="padding:8px 14px;font-size:.88rem">احجز الآن</a>' +
          '<a class="btn btn-outline" id="promoBubbleDetails" href="/umrah" style="padding:8px 14px;font-size:.88rem">التفاصيل</a>' +
          '<button type="button" class="promo-dismiss" data-promo-soft-dismiss aria-label="إغلاق">&times;</button>' +
        '</div>' +
      '</div>'
    ));
  }

  function openModal() {
    var overlay = document.getElementById('promoOverlay');
    if (!overlay) return;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    trackView('VIP Umrah Entry Modal');
  }

  function closeModal() {
    var overlay = document.getElementById('promoOverlay');
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    markModalSeen();
    scheduleReminders(START_DELAY_MS);
  }

  function showShape(shape) {
    if (getCount() >= MAX_REMINDERS) return;
    hideAllSoft();
    var trip = currentTrip();
    var copy = 'عمرة ' + trip.start + ' · ' + trip.days + ' أيام — أماكن محدودة';

    if (shape === 'ribbon') {
      var ribbon = document.getElementById('promoRibbon');
      var rText = document.getElementById('promoRibbonText');
      var rCta = document.getElementById('promoRibbonCta');
      if (ribbon && rText && rCta) {
        rText.textContent = 'VIP: ' + copy;
        rCta.href = trip.book;
        ribbon.classList.add('is-visible');
      }
    } else if (shape === 'toast') {
      var toast = document.getElementById('promoToast');
      var tText = document.getElementById('promoToastText');
      var tCta = document.getElementById('promoToastCta');
      if (toast && tText && tCta) {
        tText.textContent = copy + ' — احجز قبل اكتمال العدد';
        tCta.href = trip.book;
        toast.classList.add('is-visible');
      }
    } else {
      var bubble = document.getElementById('promoBubble');
      var bTitle = document.getElementById('promoBubbleTitle');
      var bText = document.getElementById('promoBubbleText');
      var bCta = document.getElementById('promoBubbleCta');
      var bDetails = document.getElementById('promoBubbleDetails');
      if (bubble && bTitle && bText && bCta && bDetails) {
        bTitle.textContent = 'أقرب عمرة · VIP';
        bText.textContent = trip.label + '. أماكن محدودة — اضغط للحجز مباشرة.';
        bCta.href = trip.book;
        bDetails.href = trip.details;
        bubble.classList.add('is-visible');
      }
    }

    setCount(getCount() + 1);
    trackView('VIP Reminder ' + shape + ' ' + trip.start);
    nextTrip();
    shapeIndex = (shapeIndex + 1) % 3;
  }

  function showNextReminder() {
    if (getCount() >= MAX_REMINDERS) return;
    var shapes = ['toast', 'bubble', 'ribbon'];
    showShape(shapes[shapeIndex % 3]);
    scheduleReminders(REMINDER_MS);
  }

  function scheduleReminders(delay) {
    if (timer) clearTimeout(timer);
    if (getCount() >= MAX_REMINDERS) return;
    timer = setTimeout(showNextReminder, delay);
  }

  function softDismiss() {
    hideAllSoft();
    scheduleReminders(AFTER_DISMISS_MS);
  }

  function bind() {
    document.addEventListener('click', function (e) {
      var closeBtn = e.target.closest('[data-promo-close]');
      if (closeBtn) {
        e.preventDefault();
        closeModal();
        return;
      }
      var soft = e.target.closest('[data-promo-soft-dismiss]');
      if (soft) {
        e.preventDefault();
        softDismiss();
        return;
      }
      var overlay = document.getElementById('promoOverlay');
      if (overlay && e.target === overlay) {
        closeModal();
      }
      var tracked = e.target.closest('[data-promo-track]');
      if (tracked && window.AboSlimaPixel) {
        window.AboSlimaPixel.trackViewContent(tracked.getAttribute('data-promo-track'), 'Umrah');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var page = document.body.getAttribute('data-page');
    if (page === 'thank-you' || page === 'book') return;

    reminderCount = getCount();
    buildUI();
    bind();

    if (!modalSeen()) {
      setTimeout(openModal, 600);
    } else {
      scheduleReminders(START_DELAY_MS);
    }
  });
})();
