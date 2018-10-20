function (error) {
  console.error(error);
  if (typeof document === 'undefined') {
    return;
  } else if (!document.body) {
    document.addEventListener('DOMContentLoaded', print);
  } else {
    print();
  }
  function print() {
    var pre = document.createElement('pre');
    pre.className = 'errorify';
    pre.textContent = error.message || error;
    if (document.body.firstChild) {
      document.body.insertBefore(pre, document.body.firstChild);
    } else {
      document.body.appendChild(pre);
    }
  }
}({"message":"typescript/server/PlanetServ.ts(2,9): Error TS2305: Module '\"typescript/shared/planet\"' has no exported member 'Buffer'.","line":2,"column":9,"name":"TypeScript error","fileName":"typescript/server/PlanetServ.ts"})