document.addEventListener('DOMContentLoaded', function() {
  const query = new URLSearchParams(location.search);

  if (query.has('print')) {
    document.querySelectorAll('[data-abbr]').forEach(
        value => value.innerText = value.dataset['abbr']
    );
  }

  if (query.has('phone')) {
    document.querySelectorAll('#phone').forEach(
        value => value.innerText = query.get('phone')
    );
  }
});
