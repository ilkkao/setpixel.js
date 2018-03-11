// Alea random number algorithm, modified version from: https://stackoverflow.com/a/47593316/2117215

const seed = '1575025042928.6128'; // Do not change
let n = 4022871197;

function mash(r) {
  const e = 0.02519603282416938;
  let t;

  for (let u = 0; u < r.length; u++) {
    n += r.charCodeAt(u);
    const f = e * n - ((n * e) | 0);
    n = 4294967296 * ((t = f * ((e * n) | 0)) - (t | 0)) + (t | 0);
  }

  return (n | 0) * 2.3283064365386963e-10;
}

let a = mash(' ');
let b = mash(' ');
let c = mash(' ');

a -= mash(seed);
b -= mash(seed);
c -= mash(seed);

b++; // because of the selected seed

let x = 1;

export default function rand() {
  const y = x * 2.3283064365386963e-10 + a * 2091639;
  a = b;
  b = c;
  x = y | 0;
  c = y - x;

  return c;
}
