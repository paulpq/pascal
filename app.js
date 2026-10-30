const dataScript = document.createElement('script');
dataScript.src = 'data.js?v=monthly-groups-1';
dataScript.onload = init;
document.head.append(dataScript);
let D, currentPage = '';
const $ = (s, r = document) => r.querySelector(s);
const grades = {5:'a V-a',6:'a VI-a',7:'a VII-a',8:'a VIII-a',9:'a IX-a',10:'a X-a'};
const escapeHTML = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const params = () => new URLSearchParams(location.hash.split('?')[1] || '');
const editionLabel = id => D.editions.find(e => e.id === id)?.label || id;
const categoryFor = grade => D.categories.find(c => c.grades.includes(+grade));
function init() {
  D = window.PASCAL;
  window.addEventListener('hashchange', route);
  $('#menu-toggle').onclick = () => {
    const open = $('#navigation').classList.toggle('open');
    $('#menu-toggle').setAttribute('aria-expanded', open);
  };
  route();
}
function selectedEdition() {
  const value = params().get('editie');
  const id = ({2026:'2026-10',2025:'2026-09',2024:'2026-08'})[value] || value;
  return D.editions.some(e => e.id === id) ? id : D.editions[0].id;
}
function selectedCategory() {
  const id = params().get('categorie') || categoryFor(params().get('clasa'))?.id;
  return D.categories.some(c => c.id === id) ? id : '';
}
function route() {
  if (location.hash === '#main') { $('#main').focus(); return; }
  let page = (location.hash.split('?')[0] || '#/').replace('#/', '');
  if (['editii','probleme','solutii'].includes(page)) {
    const edition = D.problems.find(p => p.id === params().get('problema'))?.edition || (params().has('editie') ? selectedEdition() : '');
    history.replaceState(null, '', '#/arhiva' + (edition ? '?editie=' + edition : ''));
    page = 'arhiva';
  }
  const previous = currentPage;
  currentPage = page;
  $('#navigation').classList.remove('open');
  $('#menu-toggle').setAttribute('aria-expanded', 'false');
  const routes = {'':home,arhiva:archive,antrenament:practice,clasament:ranking,despre:about,'despre-concurs':home};
  (routes[page] || notFound)();
  document.querySelectorAll('#navigation a').forEach(a => a.getAttribute('href') === '#/' + page ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  const titles = {'':'Concurs lunar de matematică',arhiva:'Arhivă',antrenament:'Antrenament',clasament:'Clasament',despre:'Despre această versiune','despre-concurs':'Despre concurs'};
  document.title = 'Pascal — ' + (titles[page] || 'Pagină negăsită');
  if (previous !== page) { window.scrollTo(0, 0); $('#main').focus({preventScroll:true}); }
  if (page === 'despre-concurs') requestAnimationFrame(() => $('#despre-concurs').scrollIntoView({behavior:'instant',block:'start'}));
}
function title(h, p) {
  return `<div class="page-intro"><h1 class="reveal">${h}</h1><p class="reveal">${p}</p></div>`;
}
function home() {
  $('#main').innerHTML = `<div class="wrap">
    <section class="hero">
      <div class="hero-copy"><h1 class="reveal">Pascal</h1><p class="reveal"><strong>Concurs lunar de matematică</strong>O ediție în fiecare lună, pentru elevii cărora le plac problemele și ideile bune.</p><a class="button accent reveal" href="#/arhiva">Descoperă arhiva</a></div>
      <div class="hero-format"><h2 class="reveal">Categorii de clase</h2><div class="category-list">${D.categories.map(c => `<a class="reveal" href="#/antrenament?categorie=${c.id}" aria-label="Antrenament · clasele ${c.label}">${c.label}</a>`).join('')}</div><p class="reveal">Calendarul și detaliile de participare vor fi anunțate de organizatori.</p></div>
    </section>
    <section class="home-section"><div class="section-head"><h2 class="reveal">Edițiile lunare</h2><p class="reveal">Problemele și soluțiile fiecărei ediții, în PDF-uri separate.</p></div><div class="edition-list">${D.editions.map(editionCard).join('')}</div></section>
    <section class="about-section" id="despre-concurs" aria-labelledby="about-heading"><div><h2 class="reveal" id="about-heading">Despre concurs</h2><p class="about-tagline reveal">O ediție în fiecare lună</p></div><div class="about-text"><p class="reveal">Pascal este un concurs lunar de matematică, organizat pe trei categorii: clasele V–VI, VII–VIII și IX–X.</p><p class="reveal">Problemele și soluțiile se păstrează în arhivă, iar clasamentul fiecărei categorii va fi publicat după concurs.</p><p class="reveal tentative">Categoria XI–XII este în pregătire și va fi confirmată ulterior.</p></div></section>
    <section class="resource-band"><div><h2 class="reveal">Antrenament</h2><p class="reveal">Pregătește-te cu probleme din categoria ta. Materialele pentru o ediție vor apărea înaintea concursului, după publicarea lor de către organizatori.</p></div><div class="resource-links"><a class="resource-link reveal" href="#/antrenament"><div><h3>Probleme de pregătire</h3><p>Exemple pentru cele trei categorii</p></div><span aria-hidden="true">↗</span></a><a class="resource-link reveal" href="#/clasament"><div><h3>Clasament</h3><p>Rezultate pe ediții și categorii</p></div><span aria-hidden="true">↗</span></a></div></section>
    <section class="challenge" aria-labelledby="challenge-heading"><div class="challenge-copy"><h2 class="reveal" id="challenge-heading">Provocare</h2><p class="reveal">Pe o rețea de pătrate, faci trei pași la dreapta și doi în sus. În câte moduri diferite poți ajunge la destinație?</p><p class="sample-label">Problemă de exemplu · Combinatorică</p></div><div class="challenge-answer"><form id="challenge-form"><label for="challenge-answer">Câte drumuri ai găsit?</label><div class="answer-controls"><input id="challenge-answer" name="raspuns" type="number" min="0" step="1" required inputmode="numeric"><button class="button" type="submit">Verifică</button></div><p id="answer-feedback" class="answer-feedback" role="status"></p></form><details class="solution"><summary>Vezi soluția</summary>${D.practice.find(p => p.id === 'p2026-6').solution}</details></div></section>
  </div>`;
  $('#challenge-form').onsubmit = event => {
    event.preventDefault();
    const correct = +$('#challenge-answer').value === 10;
    $('#answer-feedback').textContent = correct ? 'Corect! Există 10 drumuri diferite.' : 'Mai încearcă. Alege pozițiile celor doi pași în sus dintre cei cinci pași.';
    $('#answer-feedback').classList.toggle('incorrect', !correct);
  };
}
function pdfLink(e, type, label) {
  const path = ({problems:e.problemsPdf,solutions:e.solutionsPdf,practice:e.practicePdf})[type];
  const text = label || ({problems:'Probleme PDF',solutions:'Soluții PDF',practice:'Antrenament PDF'})[type];
  const variant = type === 'solutions' ? ' secondary' : '';
  const safePath = typeof path === 'string' && (path.startsWith('pdf/') || /^https:\/\//.test(path));
  return safePath ? `<a class="button${variant}" href="${escapeHTML(path)}" target="_blank" rel="noopener" aria-label="${text} · ${e.label} (se deschide într-o filă nouă)">${text}</a>` : `<button class="button${variant}" disabled aria-label="${text} · ${e.label}, indisponibil">${text}</button>`;
}
function editionCard(e) {
  return `<article class="edition-entry reveal" id="editia-${e.id}"><div><h3>${e.label}</h3><p>PDF-uri demonstrative · clasele V–VIII</p></div><div class="edition-actions">${pdfLink(e,'problems')}${pdfLink(e,'solutions')}${e.practicePdf ? pdfLink(e,'practice') : ''}</div></article>`;
}
function archive() {
  const selected = params().has('editie') ? selectedEdition() : '';
  $('#main').innerHTML = `<div class="wrap archive-page">${title('Arhivă','O ediție pe lună. Problemele și soluțiile, la un loc.')}<form class="filter-bar" id="archive-filters"><div class="field archive-select"><label for="archive-edition">Ediția lunară</label><select id="archive-edition"><option value="">Toate edițiile</option>${D.editions.map(e => `<option value="${e.id}" ${e.id === selected ? 'selected' : ''}>${e.label}</option>`).join('')}</select></div><div class="field search-field"><label for="archive-search">Caută în arhivă</label><input id="archive-search" type="search" placeholder="Luna sau anul…"></div></form><p class="archive-explainer">Materialele sunt exemple de prezentare. Fișierele oficiale vor fi adăugate după publicare.</p><div id="edition-results" class="edition-list" aria-live="polite"></div></div>`;
  const update = () => {
    const id = $('#archive-edition').value, q = $('#archive-search').value.trim().toLocaleLowerCase('ro');
    history.replaceState(null, '', '#/arhiva' + (id ? '?editie=' + id : ''));
    const editions = D.editions.filter(e => (!id || e.id === id) && (!q || e.label.toLocaleLowerCase('ro').includes(q)));
    $('#edition-results').innerHTML = editions.length ? editions.map(editionCard).join('') : '<div class="empty-state"><h2>Nicio ediție găsită</h2><p>Încearcă o altă lună sau un alt an.</p></div>';
  };
  $('#archive-filters').onsubmit = e => e.preventDefault();
  $('#archive-filters').oninput = update;
  update();
}
function categorySelect(id, selected) {
  return `<div class="field"><label for="${id}">Categoria</label><select id="${id}" name="categorie"><option value="">Toate categoriile</option>${D.categories.map(c => `<option value="${c.id}" ${c.id === selected ? 'selected' : ''}>Clasele ${c.label}</option>`).join('')}</select></div>`;
}
function practice() {
  $('#main').innerHTML = `<div class="wrap archive-page">${title('Antrenament','Probleme pentru pregătire, pe categorii de clase.')}<div class="practice-intro"><p>Materialele de pregătire pentru fiecare ediție vor fi publicate înaintea concursului. Calendarul exact va fi anunțat.</p><p class="sample-label">Până atunci, poți încerca aceste probleme de exemplu. Nu sunt subiecte oficiale Pascal.</p></div><form class="filter-bar" id="practice-filters">${categorySelect('practice-category',selectedCategory())}</form><div class="practice-materials">${D.editions.filter(e => e.practicePdf).map(e => `<div><h2>${e.label}</h2>${pdfLink(e,'practice')}</div>`).join('')}</div><div id="practice-results" class="practice-list" aria-live="polite"></div></div>`;
  const update = () => {
    const id = $('#practice-category').value;
    history.replaceState(null, '', '#/antrenament' + (id ? '?categorie=' + id : ''));
    const categories = D.categories.filter(c => !id || c.id === id);
    $('#practice-results').innerHTML = categories.map(c => `<section class="practice-group"><h2>Clasele ${c.label}</h2>${D.practice.filter(p => c.grades.includes(p.grade)).map(p => `<article class="practice-problem"><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.statement)}</p><details class="solution"><summary>Vezi soluția</summary>${p.solution}</details></article>`).join('')}</section>`).join('');
  };
  $('#practice-filters').onsubmit = e => e.preventDefault();
  $('#practice-filters').oninput = update;
  update();
}
function ranking() {
  $('#main').innerHTML = `<div class="wrap archive-page">${title('Clasament','Rezultatele fiecărei ediții lunare, pe categorii de clase.')}<form class="filter-bar" id="ranking-filters"><div class="field"><label for="edition">Ediția lunară</label><select id="edition" name="editie">${D.editions.map(e => `<option value="${e.id}" ${e.id === selectedEdition() ? 'selected' : ''}>${e.label}</option>`).join('')}</select></div>${categorySelect('category',selectedCategory())}</form><div id="ranking-results" aria-live="polite"></div></div>`;
  const update = () => {
    const edition = $('#edition').value, category = $('#category').value;
    const p = new URLSearchParams({editie:edition});
    if (category) p.set('categorie', category);
    history.replaceState(null, '', '#/clasament?' + p);
    const official = D.results.filter(r => r.edition === edition), isDemo = !official.length;
    const categories = D.categories.filter(c => !category || c.id === category);
    const results = (isDemo ? D.demoResults : official).filter(r => r.edition === edition && categories.some(c => c.grades.includes(r.grade))).sort((a,b) => a.grade - b.grade || a.rank - b.rank);
    $('#ranking-results').innerHTML = `${isDemo ? '<div class="notice">Clasament demonstrativ. Numele, instituțiile și punctajele sunt fictive. Pozițiile sunt stabilite în cadrul fiecărei categorii.</div>' : ''}<div class="results-info"><span>Ediția ${editionLabel(edition)} · ${results.length} participanți</span>${results.length ? '<button class="text-link export-button" id="export-csv">Descarcă CSV ↓</button>' : ''}</div>${categories.map(c => {
      const rows = results.filter(r => c.grades.includes(r.grade)).sort((a,b) => a.rank - b.rank);
      return `<section class="ranking-group"><h2>Clasele ${c.label}</h2>${rows.length ? `<div class="table-scroll"><table><caption class="sr-only">${isDemo ? 'Exemplu de clasament' : 'Rezultatele concursului'} · ${editionLabel(edition)} · clasele ${c.label}</caption><thead><tr><th scope="col">Loc</th><th scope="col">Participant</th><th scope="col">Clasa</th><th scope="col">Instituție</th><th scope="col">Punctaj</th><th scope="col">Distincție</th></tr></thead><tbody>${rows.map(r => `<tr><td>${escapeHTML(r.rank)}</td><td>${escapeHTML(r.name)}</td><td>${escapeHTML(grades[r.grade])}</td><td>${escapeHTML(r.school)}</td><td>${escapeHTML(r.score)}</td><td>${escapeHTML(r.award || '—')}</td></tr>`).join('')}</tbody></table></div>` : '<p class="notice">Rezultatele acestei categorii vor fi publicate după concurs.</p>'}</section>`;
    }).join('')}`;
    if ($('#export-csv')) $('#export-csv').onclick = () => {
      const quote = s => '"' + String(s ?? '').replace(/"/g,'""') + '"';
      const csv = '\uFEFF' + [['Categorie','Loc','Participant','Clasa','Instituție','Punctaj','Distincție','Tip rezultate'],...results.sort((a,b) => +categoryFor(a.grade).grades[0] - +categoryFor(b.grade).grades[0] || a.rank - b.rank).map(r => [categoryFor(r.grade).label,r.rank,r.name,grades[r.grade],r.school,r.score,r.award,isDemo ? 'Demonstrative' : 'Oficiale'])].map(row => row.map(quote).join(',')).join('\r\n');
      const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
      const a = document.createElement('a');
      a.href = url; a.download = `pascal-clasament-${isDemo ? 'demo-' : ''}${edition}.csv`; a.click();
      setTimeout(() => URL.revokeObjectURL(url),1000);
    };
  };
  $('#ranking-filters').onsubmit = e => e.preventDefault();
  $('#ranking-filters').oninput = update;
  update();
}
function about() {
  $('#main').innerHTML = `<div class="wrap">${title('Despre site','Arhiva și rezultatele concursului lunar de matematică Pascal.')}<div class="about-copy"><h2>O versiune de prezentare</h2><p>Concursul are o ediție în fiecare lună și trei categorii: V–VI, VII–VIII și IX–X. Categoria XI–XII rămâne în pregătire.</p><p>Edițiile August, Septembrie și Octombrie 2026 sunt exemple pentru demonstrarea arhivei. PDF-urile actuale conțin probleme originale de antrenament pentru clasele V–VIII și nu reprezintă subiecte oficiale Pascal.</p><p>Pagina de antrenament include exemple pentru toate cele trei categorii. Aceste probleme nu se schimbă zilnic.</p><h2>Materialele oficiale</h2><p>Fișierele cu probleme și soluții vor fi înlocuite cu materialele organizatorilor când sunt disponibile. Materialele de pregătire pentru o ediție vor putea fi consultate înaintea concursului.</p><p>Clasamentul conține nume, instituții și punctaje fictive, marcate ca date demonstrative. Rezultatele oficiale vor înlocui exemplele după concurs.</p><p><a class="button" href="#/arhiva">Explorează arhiva</a></p></div></div>`;
}
function notFound() {
  $('#main').innerHTML = `<div class="wrap archive-page">${title('Pagină negăsită','Revino la arhivă pentru edițiile concursului.')}<a class="button" href="#/">Pagina principală</a></div>`;
}
