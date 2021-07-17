document.addEventListener('DOMContentLoaded', function() {

  const items = Array.from(document.querySelectorAll('.clothet__item'));
  const selector = document.querySelector('select.clothet-supported-avatar');

  const avatars = [
    ["薄荷1.2"],
    ["透羽"],
    ["薄荷"],
    ["一介天使"],
    ["翠蓮"],
  ];

  const filterItem = (avatars) => {
    let count = 0;
    items.sort((a, b) => {
      if (a.style.order < b.style.order) {
        return 1;
      }
      if (a.style.order > b.style.order) {
        return -1;
      }
    }).forEach((e, index) => {
      const support = e.dataset.support.split(',');
      if (support.some(f => avatars.includes(f))) {
        e.style.order = ++count;
        e.style.opacity = 1;
      } else {
        e.style.order = items.length + count;
        e.style.opacity = 0.5;
      }
    });
  }

  const initSelector = () => {
    const optionFragment = new DocumentFragment();

    avatars.forEach(e => {
      const o = document.createElement('option');
      const t = document.createTextNode(e);
      o.setAttribute('value', e);
      o.appendChild(t);

      optionFragment.appendChild(o);
    });

    selector.appendChild(optionFragment);
    selector.value = avatars[0]
  }

  initSelector();

  selector.addEventListener('change', function(e) {
    const arr = Array.from(e.target.selectedOptions).map(f=>f.value);
    filterItem(arr);
  });
})
