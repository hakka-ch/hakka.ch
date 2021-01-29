document.addEventListener('DOMContentLoaded', function() {

  const itemsEle = document.querySelectorAll('.clothet__item');
  const itemsArr = Array.from(itemsEle);

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
      aName = a.querySelector('.item__' + by + ' span');
      bName = b.querySelector('.item__' + by + ' span');
      if (aName.innerText > bName.innerText) {
        return sort;
      }
      if (aName.innerText < bName.innerText) {
        return - sort;
      }
    });
    sorted.forEach(function (e, i) {
      e.style.order = i + 1;
    });
    return sorted;
  }

  document.querySelector('input.searchItems').addEventListener('input', function (e) {
    findItems(e.target.value);
  }, false);
});
