(function () {
  const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  const STORAGE_KEY = 'aboslima_utms';

  function capture() {
    const params = new URLSearchParams(window.location.search);
    const found = {};
    let hasAny = false;
    KEYS.forEach(function (key) {
      const value = params.get(key);
      if (value) {
        found[key] = value;
        hasAny = true;
      }
    });
    if (hasAny) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      } catch (e) { /* ignore */ }
    }
  }

  function get() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  function formatForMessage() {
    const utms = get();
    const lines = KEYS.filter(function (k) { return utms[k]; })
      .map(function (k) { return k + ': ' + utms[k]; });
    return lines.length ? '\n\n— مصدر الحملة —\n' + lines.join('\n') : '';
  }

  capture();
  window.AboSlimaUTM = { get: get, formatForMessage: formatForMessage };
})();
