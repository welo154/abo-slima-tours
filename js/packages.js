/* ============ BOOKING LINKS ============ */
function bookUrl(params){
  const q = new URLSearchParams(params);
  return '/book?' + q.toString();
}

/* ============ DATA: HAJJ PACKAGES ============ */
const hajjPackages = [
  {
    name: "حج القرعة 5 نجوم — أبراج الساعة",
    price: "593,000",
    mecca: "الإقامة بأبراج الساعة (من 8 إلى 14 ذو الحجة)",
    madinah: "فندق الحارثية أو ما يماثله (من 4 إلى 8 ذو الحجة)",
    camps: "مخيمات منى وعرفة خمس نجوم (من 8 إلى 13 ذو الحجة)"
  },
  {
    name: "حج القرعة 5 نجوم — فندق الصفوة",
    price: "578,000",
    mecca: "الإقامة بفندق الصفوة (من 8 إلى 14 ذو الحجة)",
    madinah: "فندق الحارثية أو ما يماثله (من 4 إلى 8 ذو الحجة)",
    camps: "مخيمات منى وعرفة خمس نجوم (من 8 إلى 13 ذو الحجة)"
  },
  {
    name: "حج القرعة 5 نجوم — فندق الشهداء",
    price: "545,000",
    mecca: "فندق الشهداء أو ما يماثله (من 8 إلى 14 ذو الحجة)",
    madinah: "فندق إعمار رويال أو ما يماثله (من 4 إلى 8 ذو الحجة)",
    camps: "مخيمات منى وعرفة خمس نجوم (من 8 إلى 13 ذو الحجة)"
  },
  {
    name: "حج القرعة 5 نجوم — الباقة الاقتصادية",
    price: "388,000",
    mecca: "فندق مصنف لدى وزارة السياحة ★ (من 8 إلى 14 ذو الحجة)",
    madinah: "فندق الحارثية أو ما يماثله (من 4 إلى 8 ذو الحجة)",
    camps: "مخيمات منى وعرفة خمس نجوم (من 8 إلى 13 ذو الحجة)"
  },
  {
    name: "أبراج كدانة",
    price: "555,000",
    oldPrice: "580,000",
    mecca: "أبراج كدانة (من 8 إلى 13 ذو الحجة)",
    madinah: "فندق الحارثية أو ما يماثله (من 4 إلى 8 ذو الحجة)",
    camps: "مخيمات عرفة / كدانة، والإقامة بفندق مصنف لدى وزارة السياحة"
  },
  {
    name: "أبراج كدانة المميز VIP",
    price: "695,000",
    mecca: "أبراج كدانة — متوسط 13 حاجًا بالمخيم (من 8 إلى 13 ذو الحجة)",
    madinah: "فندق الحارثية أو ما يماثله (من 4 إلى 8 ذو الحجة)",
    camps: "مخيمات عرفة / كدانة بخدمة VIP، والإقامة بفندق مصنف لدى وزارة السياحة"
  },
  {
    name: "الحج الاقتصادي السريع",
    price: "253,000",
    mecca: "عمارة فندقية بالعزيزية (من 5 إلى 15 أو من 15 إلى 17 ذو الحجة)",
    madinah: "فندق أودست أو ما يماثله (من 2 إلى 5 ذو الحجة)",
    camps: "مخيمات مكيفة ومجهزة خلال أيام المشاعر (من 8 إلى 13 ذو الحجة)"
  },
  {
    name: "الحج الاقتصادي تحسين 5 نجوم",
    price: "273,000",
    oldPrice: "287,000",
    mecca: "عمارة فندقية بالعزيزية، ثم أبراج الساعة أو فندق الصفوة (حتى 17 ذو الحجة)",
    madinah: "فندق أودست أو ما يماثله (من 2 إلى 5 ذو الحجة)",
    camps: "مخيمات مكيفة ومجهزة خلال أيام المشاعر (من 8 إلى 13 ذو الحجة)"
  }
];

function iconSvg(name){
  const icons = {
    mecca: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6"/></svg>',
    madinah: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M8 6l4-4 4 4M6 10h12M6 14h12M4 21h16"/></svg>',
    camp: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l9 18H3zM12 3v18"/></svg>'
  };
  return icons[name] || '';
}

function renderHajj(){
  const grid = document.getElementById('hajjGrid');
  if (!grid) return;
  grid.innerHTML = hajjPackages.map(p => {
    const href = bookUrl({ service: 'hajj', package: p.name, price: p.price });
    return `
    <div class="hajj-card" data-package="${p.name}">
      <div class="card-top">
        ${p.oldPrice ? '<span class="badge-offer">عرض خاص</span>' : ''}
        <h3>${p.name}</h3>
        <div class="years">موسم 1448هـ &middot; 2027م</div>
      </div>
      <div class="price-block">
        ${p.oldPrice ? `<span class="old-price">${p.oldPrice} جنيه</span>` : ''}
        <div class="price">${p.price}<small> جنيه للفرد</small></div>
        <div class="price-note">السعر غير شامل تذكرة الطيران</div>
      </div>
      <div class="details">
        <div class="detail-row">
          <span class="ic">${iconSvg('mecca')}</span>
          <span class="txt"><strong>الإقامة في مكة المكرمة</strong><span>${p.mecca}</span></span>
        </div>
        <div class="detail-row">
          <span class="ic">${iconSvg('madinah')}</span>
          <span class="txt"><strong>الإقامة في المدينة المنورة</strong><span>${p.madinah}</span></span>
        </div>
        <div class="detail-row">
          <span class="ic">${iconSvg('camp')}</span>
          <span class="txt"><strong>منى وعرفة</strong><span>${p.camps}</span></span>
        </div>
      </div>
      <div class="card-book">
        <a class="btn btn-primary book-now" href="${href}" data-service="hajj" data-package="${p.name}">احجز الآن</a>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.book-now').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.AboSlimaPixel) {
        window.AboSlimaPixel.trackViewContent(btn.getAttribute('data-package') || 'Hajj Package', 'Hajj');
      }
    });
  });
}
if (document.getElementById('hajjGrid')) renderHajj();

/* ============ DATA: UMRAH TRIPS ============ */
/* hotels: array of 5 rows [madinahHotel, meccaHotel, quad, trio, duo] — starred row is best value */
const umrahTrips = [
  { month:"سبتمبر", start:"22 سبتمبر", end:"1 أكتوبر", days:10, nightsMadinah:4, nightsMecca:5,
    vip:true, vipLabel:"عاجل · أماكن محدودة", priority:1,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","71350","76750","86650"],
      ["وينران / دار الخير","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","65950","71450","81450"],
      ["وينران / دار الخير","برستيج بالإفطار","61350","65950","75400"],
      ["وينران / دار الخير","الماسة جراند","54750","59350","67850"],
      ["أودست","الماسة جراند","52950","56950","64350"]
    ], star:4 },

  { month:"سبتمبر", start:"23 سبتمبر", end:"29 سبتمبر", days:7, nightsMadinah:3, nightsMecca:3,
    vip:true, vipLabel:"عاجل · أماكن محدودة", priority:2,
    go:"8:55 ص", back:"11:55 م",
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","61350","64950","71450"],
      ["وينران / دار الخير","المروة روتانا - برج الساعة بالإفطار","57250","60950","67650"],
      ["وينران / دار الخير","برستيج بالإفطار","54350","57650","63950"],
      ["وينران / دار الخير","الماسة جراند","50650","53550","59250"],
      ["أودست","الماسة جراند","48950","51950","56950"]
    ], star:4 },

  { month:"أكتوبر", start:"1 أكتوبر", end:"10 أكتوبر", days:10, nightsMadinah:4, nightsMecca:5, twoFridays:true,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","74350","80400","92250"],
      ["وينران / دار الخير","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","68850","74950","87250"],
      ["وينران / دار الخير","برستيج بالإفطار","61850","67250","76950"],
      ["وينران / دار الخير","الماسة جراند","54750","59250","67750"],
      ["أودست","الماسة جراند","52450","56550","63750"]
    ], star:4 },

  { month:"أكتوبر", start:"6 أكتوبر", end:"17 أكتوبر", days:12, nightsMadinah:4, nightsMecca:7, twoFridays:true,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","82350","89950","104850"],
      ["وينران / دار الخير","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","76950","84750","99950"],
      ["وينران / دار الخير","برستيج بالإفطار","68850","75350","87800"],
      ["وينران / دار الخير","الماسة جراند","58550","64250","75350"],
      ["أودست","الماسة جراند","56250","62350","71350"]
    ], star:4 },

  { month:"أكتوبر", start:"7 أكتوبر", end:"13 أكتوبر", days:7, nightsMadinah:3, nightsMecca:3,
    go:"5:35 ص", back:"12:30 م",
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","63150","67150","74850"],
      ["وينران / دار الخير","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","58950","62950","70950"],
      ["وينران / دار الخير","برستيج بالإفطار","54850","58350","64850"],
      ["وينران / دار الخير","الماسة جراند","50350","53350","59350"],
      ["أودست","الماسة جراند","48750","51250","56350"]
    ], star:4 },

  { month:"أكتوبر", start:"22 أكتوبر", end:"31 أكتوبر", days:10, nightsMadinah:4, nightsMecca:5,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","74350","80300","92250"],
      ["وينران / دار الخير","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","68850","74950","87250"],
      ["وينران / دار الخير","برستيج بالإفطار","62850","68450","78450"],
      ["وينران / دار الخير","الماسة جراند","55750","60250","69350"],
      ["أودست","الماسة جراند","53350","57550","65350"]
    ], star:4 },

  { month:"أكتوبر", start:"27 أكتوبر", end:"7 نوفمبر", days:12, nightsMadinah:4, nightsMecca:7,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","82350","89950","104950"],
      ["وينران / دار الخير","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","76950","84750","99950"],
      ["وينران / دار الخير","برستيج بالإفطار","68750","75350","87900"],
      ["وينران / دار الخير","الماسة جراند","58550","64250","75350"],
      ["أودست","الماسة جراند","56350","61550","71350"]
    ], star:4 },

  { month:"أكتوبر", start:"28 أكتوبر", end:"3 نوفمبر", days:7, nightsMadinah:3, nightsMecca:3,
    go:"8:50 ص", back:"11:00 م",
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","63150","66950","74950"],
      ["وينران / دار الخير","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","58850","62950","70950"],
      ["وينران / دار الخير","برستيج بالإفطار","55550","59200","65950"],
      ["وينران / دار الخير","الماسة جراند","50950","54350","60350"],
      ["أودست","الماسة جراند","48950","52350","57350"]
    ], star:4 },

  { month:"نوفمبر", start:"5 نوفمبر", end:"14 نوفمبر", days:10, nightsMadinah:4, nightsMecca:5,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","76350","83350","96350"],
      ["وينران","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","69950","76950","89350"],
      ["وينران","برستيج بالإفطار","63650","69650","80350"],
      ["وينران","الماسة جراند","56650","61650","70950"],
      ["أودست","الماسة جراند","55450","60550","69650"]
    ], star:4 },

  { month:"نوفمبر", start:"10 نوفمبر", end:"21 نوفمبر", days:12, nightsMadinah:4, nightsMecca:7,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","85950","93250","110950"],
      ["وينران","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","78950","87850","104350"],
      ["وينران","برستيج بالإفطار","69950","76650","89850"],
      ["وينران","الماسة جراند","59650","65550","76950"],
      ["أودست","الماسة جراند","58850","64350","75350"]
    ], star:4 },

  { month:"نوفمبر", start:"11 نوفمبر", end:"17 نوفمبر", days:7, nightsMadinah:3, nightsMecca:3,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","64950","66350","77950"],
      ["وينران","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","60750","64950","73850"],
      ["وينران","برستيج بالإفطار","56750","60350","67850"],
      ["وينران","الماسة جراند","51650","55650","62250"],
      ["أودست","الماسة جراند","51650","54750","60850"]
    ], star:3 },

  { month:"نوفمبر", start:"19 نوفمبر", end:"28 نوفمبر", days:10, nightsMadinah:4, nightsMecca:5,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","79950","87950","102950"],
      ["وينران","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","69950","76950","89350"],
      ["وينران","برستيج بالإفطار","63650","69650","80350"],
      ["وينران","الماسة جراند","56650","61650","70950"],
      ["أودست","الماسة جراند","55450","60550","69650"]
    ], star:4 },

  { month:"نوفمبر", start:"24 نوفمبر", end:"5 ديسمبر", days:12, nightsMadinah:4, nightsMecca:7,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","88950","98850","117950"],
      ["وينران","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","78950","87850","104350"],
      ["وينران","برستيج بالإفطار","69950","76650","89850"],
      ["وينران","الماسة جراند","59650","65550","76950"],
      ["أودست","الماسة جراند","58550","64350","75350"]
    ], star:4 },

  { month:"نوفمبر", start:"25 نوفمبر", end:"5 ديسمبر", days:7, nightsMadinah:3, nightsMecca:3,
    hotels:[
      ["الحارثية بالإفطار","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","67950","73350","83950"],
      ["وينران","المروة روتانا - موفنبيك (برج الساعة بالإفطار)","60750","64950","73850"],
      ["وينران","برستيج بالإفطار","56750","60350","67850"],
      ["وينران","الماسة جراند","51650","55650","62250"],
      ["أودست","الماسة جراند","51650","54750","60850"]
    ], star:4 }
];

function cheapestOf(trip){
  return Math.min(...trip.hotels.map(h => parseInt(h[4],10)));
}

function tripCard(trip, idx){
  const rows = trip.hotels.map((h, i) => `
    <tr class="${i === trip.star ? 'best' : ''}">
      <td class="hotel-name">${h[1]}</td>
      <td class="hotel-name">${h[0]}</td>
      <td>${h[2]}</td>
      <td>${h[3]}</td>
      <td class="${i === trip.star ? 'starred' : ''}">${h[4]}${i===trip.star ? ' ★' : ''}</td>
    </tr>`).join('');

  const timesRow = trip.go ? `
    <div class="go-back-times">
      <span>موعد الذهاب: <b>${trip.go}</b></span>
      <span>موعد العودة: <b>${trip.back}</b></span>
    </div>` : '';

  const packageLabel = `من ${trip.start} إلى ${trip.end} (${trip.month}) — ${trip.days} أيام`;
  const href = bookUrl({
    service: 'umrah',
    package: packageLabel,
    departure: trip.start
  });
  const vipClass = trip.vip ? ' trip-card--vip' : '';
  const vipBadges = trip.vip
    ? `<span class="vip-badge">${trip.vipLabel || 'عاجل · أماكن محدودة'}</span><span class="chip gold">احجز بسرعة</span>`
    : '';

  return `
  <details class="trip-card${vipClass}" data-month="${trip.month}" data-package="${packageLabel}" ${trip.vip ? 'data-vip="true"' : ''}>
    <summary>
      <span class="trip-dates">من ${trip.start} إلى ${trip.end}</span>
      <span class="trip-meta">
        ${vipBadges}
        <span class="chip">${trip.days} أيام</span>
        <span class="chip">${trip.nightsMadinah} ليالي مدينة</span>
        <span class="chip">${trip.nightsMecca} ليالي مكة</span>
        ${trip.twoFridays ? '<span class="chip gold">جمعتين في الحرم</span>' : ''}
      </span>
      <span class="from-price">${cheapestOf(trip).toLocaleString('en-US')}<small> جنيه ابتداءً من (رباعي)</small></span>
      <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
    </summary>
    <div class="trip-body">
      ${timesRow}
      <div class="price-table-wrap">
        <table class="price-table">
          <thead>
            <tr>
              <th>فندق مكة المكرمة</th>
              <th>فندق المدينة المنورة</th>
              <th>سعر الرباعي</th>
              <th>سعر الثلاثي</th>
              <th>سعر الثنائي</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="price-table-legend">الأسعار بالجنيه المصري للفرد الواحد، وغير شاملة تذكرة الطيران. ★ يشير إلى أفضل سعر متاح في هذه الرحلة.</div>
      <div class="card-book">
        <a class="btn btn-primary book-now" href="${href}" data-service="umrah" data-package="${packageLabel}">احجز الآن</a>
      </div>
    </div>
  </details>`;
}

function renderUmrah(activeMonth){
  const list = document.getElementById('tripList');
  if (!list) return;
  const items = umrahTrips
    .filter(t => t.month === activeMonth)
    .slice()
    .sort((a, b) => {
      const pa = a.priority != null ? a.priority : 999;
      const pb = b.priority != null ? b.priority : 999;
      if (pa !== pb) return pa - pb;
      if (a.vip && !b.vip) return -1;
      if (!a.vip && b.vip) return 1;
      return 0;
    });
  list.innerHTML = items.map((t,i) => tripCard(t,i)).join('');
}

window.AboSlimaVipTrips = umrahTrips.filter(t => t.vip).sort((a, b) => (a.priority || 99) - (b.priority || 99));

function renderMonthTabs(){
  const tabs = document.getElementById('monthTabs');
  if (!tabs) return;
  const months = [...new Set(umrahTrips.map(t=>t.month))];
  tabs.innerHTML = months.map((m,i) => `<button type="button" data-month="${m}" class="${i===0?'active':''}">${m}</button>`).join('');
  tabs.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      tabs.querySelectorAll('button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderUmrah(btn.dataset.month);
    });
  });
  renderUmrah(months[0]);
}
renderMonthTabs();