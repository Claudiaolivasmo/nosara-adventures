// Utilidades globales livianas
window.$  = (sel, ctx = document) => ctx.querySelector(sel);
window.$$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

window.addErr = el => el && el.classList.add("field-error");
window.delErr = el => el && el.classList.remove("field-error");



