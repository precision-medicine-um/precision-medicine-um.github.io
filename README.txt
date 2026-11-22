Department of Precision Medicine website (new version)
=====================================================

Open index.html in a browser to view the site. No server or build step is needed.

Pages
  index.html          Home (labs, latest news, partners)
  d-lab.html          D-Lab research lines
  m-lab.html          M-Lab research lines
  publications.html   Publications with D-Lab / M-Lab filter and search
  theses.html         PhD theses 2022-2026 (Philippe Lambin & Jan Theys), by year; covers open the PDF in a new tab
  news.html           All news items
  contact.html        Contact details, map and message form

Folders
  assets/css/site.css   All styling (colours are set at the top under :root)
  assets/js/site.js     Menu, filters, image zoom
  img/                  Logos, lab figures (compressed from ~8 MB to ~250 KB each), news images, thesis covers

To add a thesis: copy a cover into img/theses/ and duplicate one <a class="book" ...> block in theses.html
(data-sup="lambin" or data-sup="theys"). To add news: duplicate one <article class="news-card"> block.
