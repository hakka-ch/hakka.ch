document.addEventListener('DOMContentLoaded', function() {

  const itemsEle = document.querySelectorAll('.clothet__item');
  const itemsArr = Array.from(itemsEle);

  const selector = document.querySelector('select.clothet-sort');

  const sortOption = [
    // [, 'default', 'デフォルト'],
    [true, 'name', 'なまえ （昇順）'],
    [false, 'name', 'なまえ （降順）'],
    [true, 'author', '作者 （昇順）'],
    [false, 'author', '作者 （降順）'],
    [false, 'release', 'リリース日時 （新しい）'],
    [true, 'release', 'リリース日時 （古い）'],
  ];

  function findItems (word) {
    word = word.toLowerCase();
    const found = itemsArr.filter(function (e, i) {
      if (e.dataset.key.toLowerCase().indexOf(word) >= 0) {
        e.style.order = 1 + i;
        return true;
      } else {
        e.style.order = itemsArr.length + i;
        return false;
      }
    });
    return found;
  }

  function sortItems (ascOrder, by) {
    by = by ? by : 'name';
    const sorted = itemsArr.sort(function (a, b) {
      const sort = ascOrder ? 1 : -1;
      const comparison = (i) => {
        if (by == 'name' || by == 'author') return i.dataset[by]
        if (by == 'release') {
          if (i.dataset[by].length < 1) {
            return new Date("2000-01-01");
          }
          return new Date(i.dataset[by]);
        }
      };
      if (comparison(a) > comparison(b)) {
        return sort;
      }
      if (comparison(a) < comparison(b)) {
        return - sort;
      }
    });
    sorted.forEach(function (e, i) {
      e.style.order = i + 1;
    });
    return sorted;
  }

  function initSelector () {

    const fragment = new DocumentFragment();
    sortOption.forEach(i => {
      const o = document.createElement('option');
      const t = document.createTextNode(i[2]);
      o.setAttribute('value', i[2]);
      o.appendChild(t);

      fragment.appendChild(o);
    });
    selector.appendChild(fragment);
    sortItems(false, 'release');
    selector.selectedIndex = 4;
  }
  initSelector();

  selector.addEventListener('change', function (e) {
    const v = e.target.value;
    const i = sortOption.findIndex(i => i[2] == v);
    sortItems(sortOption[i][0], sortOption[i][1]);
  });

  /**
   * カテゴリで絞るやつ
   */
  document.querySelectorAll('input[name=cloth-category]').forEach(el => {
    el.addEventListener('change', function (ev) {
      const checked = ev.target.checked;
      const category = ev.target.id;
      itemsArr.forEach(item => {
        if (item.dataset.category == category) {
          if (checked) {
            item.classList.remove('clothet__item--hidden');
          } else {
            item.classList.add('clothet__item--hidden');
          }
        }
      });
    });
  });

  /**
   * リロード時などチェックボックスの状態にあわせる
   */
  document.querySelectorAll('input[name=cloth-category]').forEach(el => {
    const checked = el.checked;
    const category = el.id;
    itemsArr.forEach(item => {
      if (item.dataset.category == category) {
        if (checked) {
          item.classList.remove('clothet__item--hidden');
        } else {
          item.classList.add('clothet__item--hidden');
        }
      }
    });
  });

  document.querySelector('input.searchItems').addEventListener('input', function (e) {
    findItems(e.target.value);
  }, false);
});

