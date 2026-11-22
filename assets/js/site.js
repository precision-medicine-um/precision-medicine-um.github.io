// Department of Precision Medicine — site behaviour
(function () {
  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Year in footer
  document.querySelectorAll("[data-year]").forEach(function (n) {
    n.textContent = new Date().getFullYear();
  });

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (n) { io.observe(n); });
  } else {
    items.forEach(function (n) { n.classList.add("in"); });
  }

  // Lightbox for lab figures
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    document.querySelectorAll(".zoom").forEach(function (z) {
      z.addEventListener("click", function () {
        var img = z.querySelector("img");
        lbImg.src = img.src; lbImg.alt = img.alt;
        lb.classList.add("open");
      });
    });
    var close = function () { lb.classList.remove("open"); };
    lb.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  // Theses: supervisor filter + year jump
  var shelfRoot = document.getElementById("theses");
  if (shelfRoot) {
    var who = "all";
    var apply = function () {
      var any = false;
      shelfRoot.querySelectorAll(".year-block").forEach(function (block) {
        var n = 0;
        block.querySelectorAll(".book").forEach(function (b) {
          var show = who === "all" || b.dataset.sup === who;
          b.classList.toggle("hidden", !show);
          if (show) n++;
        });
        block.classList.toggle("hidden", n === 0);
        var c = block.querySelector(".count");
        if (c) c.textContent = n + (n === 1 ? " thesis" : " theses");
        if (n) any = true;
      });
      document.querySelectorAll("[data-yearlink]").forEach(function (a) {
        var blk = document.getElementById("y" + a.dataset.yearlink);
        a.style.display = blk && !blk.classList.contains("hidden") ? "" : "none";
      });
      var empty = shelfRoot.querySelector(".empty-note");
      if (empty) empty.style.display = any ? "none" : "block";
    };
    document.querySelectorAll("[data-sup-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        who = b.dataset.supFilter;
        document.querySelectorAll("[data-sup-filter]").forEach(function (x) { x.classList.toggle("on", x === b); });
        apply();
      });
    });
    apply();
  }

  // Publications: lab filter + search
  var pubRoot = document.getElementById("pubs");
  if (pubRoot) {
    var lab = "all", q = "", yr = "all";
    var ysel = document.getElementById("pub-year");
    var search = document.getElementById("pub-search");
    var counter = document.getElementById("pub-count");
    var run = function () {
      var n = 0;
      pubRoot.querySelectorAll(".pub").forEach(function (p) {
        var ok = (lab === "all" || p.dataset.lab === lab) && (yr === "all" || p.dataset.y === yr) && (!q || p.textContent.toLowerCase().indexOf(q) !== -1);
        p.classList.toggle("hidden", !ok);
        if (ok) n++;
      });
      if (counter) counter.textContent = n + (n === 1 ? " publication" : " publications");
      var empty = pubRoot.querySelector(".empty-note");
      if (empty) empty.style.display = n ? "none" : "block";
    };
    document.querySelectorAll("[data-lab-filter]").forEach(function (b) {
      b.addEventListener("click", function () {
        lab = b.dataset.labFilter;
        document.querySelectorAll("[data-lab-filter]").forEach(function (x) { x.classList.toggle("on", x === b); });
        run();
      });
    });
    if (ysel) ysel.addEventListener("change", function () { yr = ysel.value; run(); });
    if (search) search.addEventListener("input", function () { q = search.value.trim().toLowerCase(); run(); });
    run();
  }
})();

// Prefill contact subject from ?subject=
(function () {
  try {
    var subj = new URLSearchParams(location.search).get("subject");
    var field = document.getElementById("subject");
    if (subj && field && !field.value) field.value = subj;
  } catch (e) {}
})();
