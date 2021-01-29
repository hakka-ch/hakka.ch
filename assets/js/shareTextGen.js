
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function hakkachan () {
  let hakka = ['薄荷ちゃ', 'はっかちゃ', '薄荷ちゃん', 'はっかちゃん'];
  let exq = "！";

  const randA = getRandomInt(0, 3);
  const randB = getRandomInt(0, 2);

  return hakka[randA] + exq.repeat(randB)
}

document.addEventListener('DOMContentLoaded', function () {
  const tw = document.querySelector('.share a');
  if (!tw) return;

  const twt = new URL(tw.href);

  twt.searchParams.set('text', hakkachan());
  tw.href = twt.href;
});
