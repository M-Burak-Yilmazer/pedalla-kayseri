// Pedalla Kayseri — site etkileşimleri
(function () {
  "use strict";

  // ---- Mobil menü ----
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    });
  }

  // ---- Geçmiş etkinlikleri gizle (site yeniden derlenmese de güncel kalır) ----
  // Etkinlik, başlangıç saatinden 6 saat sonrasına kadar listede kalır.
  var now = Date.now();
  var GRACE = 6 * 60 * 60 * 1000;
  document.querySelectorAll("[data-yaklasan]").forEach(function (list) {
    var limit = parseInt(list.getAttribute("data-limit") || "0", 10);
    var shown = 0;
    list.querySelectorAll(".event").forEach(function (ev) {
      var t = Date.parse(ev.getAttribute("data-tarih"));
      var upcoming = !isNaN(t) && t + GRACE >= now;
      if (!upcoming || (limit && shown >= limit)) { ev.hidden = true; ev.style.display = "none"; }
      else shown++;
    });
    var empty = list.querySelector(".empty");
    if (empty) empty.hidden = shown > 0;
  });
  document.querySelectorAll("[data-gecmis-uyari]").forEach(function (el) {
    var t = Date.parse(el.getAttribute("data-gecmis-uyari"));
    if (!isNaN(t) && t + GRACE < now) el.hidden = false;
  });

  // ---- Faaliyetleri yıla göre filtrele ----
  var chips = document.querySelectorAll(".filters .chip");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      chip.classList.add("is-active");
      var f = chip.getAttribute("data-filter");
      document.querySelectorAll("[data-filter-list] [data-yil]").forEach(function (item) {
        item.style.display = f === "hepsi" || item.getAttribute("data-yil") === f ? "" : "none";
      });
    });
  });

  // ---- Galeri lightbox ----
  var lb = document.getElementById("lightbox");
  if (lb) {
    var img = lb.querySelector("img");
    var cap = lb.querySelector("figcaption");
    var items = [], idx = 0;
    function show(i) {
      idx = (i + items.length) % items.length;
      img.src = items[idx].getAttribute("href");
      cap.textContent = items[idx].getAttribute("data-caption") || "";
    }
    function close() { lb.hidden = true; document.body.style.overflow = ""; }
    document.querySelectorAll("[data-gallery]").forEach(function (g) {
      var links = Array.prototype.slice.call(g.querySelectorAll("a"));
      links.forEach(function (a, i) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          items = links; show(i);
          lb.hidden = false; document.body.style.overflow = "hidden";
        });
      });
    });
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__prev").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector(".lightbox__next").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  // ---- Üyelik formu: 18 yaş altı için veli alanları ----
  var dob = document.querySelector("[data-yas]");
  var veli = document.querySelector("[data-veli]");
  if (dob && veli) {
    var update = function () {
      var d = new Date(dob.value);
      var minor = false;
      if (!isNaN(d)) {
        var t = new Date();
        var age = t.getFullYear() - d.getFullYear();
        var m = t.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && t.getDate() < d.getDate())) age--;
        minor = age < 18;
      }
      veli.hidden = !minor;
      veli.querySelectorAll("[data-veli-alan]").forEach(function (f) { f.required = minor; });
    };
    dob.addEventListener("change", update);
    dob.max = new Date().toISOString().slice(0, 10);
    update();
  }

  // ---- Gönderim sırasında butonu kilitle ----
  document.querySelectorAll("form[data-netlify]").forEach(function (form) {
    form.addEventListener("submit", function () {
      var btn = form.querySelector("button[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = "Gönderiliyor…"; }
    });
  });
})();
