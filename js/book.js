(function () {
  var WHATSAPP_NUMBER = '201129329312';

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }

  function whatsAppLink(message) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
  }

  function fillFromQuery() {
    var service = qs('service');
    var pkg = qs('package');
    var departure = qs('departure');
    var serviceEl = document.getElementById('service');
    var packageEl = document.getElementById('package');
    var departureEl = document.getElementById('departure');
    if (serviceEl && (service === 'hajj' || service === 'umrah')) {
      serviceEl.value = service;
    }
    if (packageEl && pkg) packageEl.value = pkg;
    if (departureEl && departure) departureEl.value = departure;
  }

  function buildMessage(data) {
    var serviceLabel = data.service === 'hajj' ? 'حج' : data.service === 'umrah' ? 'عمرة' : data.service;
    var lines = [
      'ازاي أقدر أساعد حضرتك؟',
      '',
      'طلب حجز جديد من الموقع:',
      'الاسم: ' + data.name,
      'الموبايل: ' + data.phone,
      'الاهتمام: ' + serviceLabel,
      'الباقة / الرحلة: ' + data.package,
      'عدد المسافرين: ' + data.travellers,
      'موعد السفر المفضل: ' + (data.departure || 'غير محدد'),
      'المدينة: ' + data.city,
      'طريقة التواصل المفضلة: ' + data.contactMethod
    ];
    var utmBlock = window.AboSlimaUTM ? window.AboSlimaUTM.formatForMessage() : '';
    return lines.join('\n') + utmBlock;
  }

  function onSubmit(event) {
    event.preventDefault();
    var form = event.target;
    var data = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      service: form.service.value,
      package: form.package.value.trim(),
      travellers: form.travellers.value,
      departure: form.departure.value.trim(),
      city: form.city.value.trim(),
      contactMethod: form.contactMethod.value
    };

    if (!data.name || !data.phone || !data.service || !data.package || !data.travellers || !data.city) {
      return;
    }

    var category = data.service === 'hajj' ? 'Hajj' : data.service === 'umrah' ? 'Umrah' : 'General';
    if (window.AboSlimaPixel) {
      window.AboSlimaPixel.track('Lead', {
        content_category: category,
        content_name: data.package || (category + ' Reservation Enquiry')
      });
    }

    var message = buildMessage(data);
    var wa = whatsAppLink(message);
    window.open(wa, '_blank', 'noopener');
    window.location.href = '/thank-you';
  }

  document.addEventListener('DOMContentLoaded', function () {
    fillFromQuery();
    var form = document.getElementById('reservationForm');
    if (form) form.addEventListener('submit', onSubmit);
  });
})();
