let D, currentPage = '', renderedUrl = '', renderedLanguage = '';
const $ = (selector, root = document) => root.querySelector(selector);
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const params = () => new URLSearchParams(location.hash.split('?')[1] || '');
function initialLanguage() {
  const requested = new URLSearchParams(location.search).get('lang');
  if (['ro','ru'].includes(requested)) return requested;
  try { if (localStorage.getItem('pascal-language') === 'ru') return 'ru'; } catch {}
  return 'ro';
}
let language = initialLanguage();
const t = (key, values = {}) => {
  const text = window.PASCAL_I18N[language][key];
  if (typeof text !== 'string') throw new Error('Missing translation: ' + key);
  return text.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
};
const categoryFor = grade => D.categories.find(category => category.grades.includes(+grade));
const categoryLabel = category => language === 'ru' ? category.grades.join('–') : category.label;
const categoryTitle = category => t('classes', {grades:categoryLabel(category)});
const gradeLabel = grade => language === 'ru' ? String(grade) : ({5:'a V-a',6:'a VI-a',7:'a VII-a',8:'a VIII-a',9:'a IX-a',10:'a X-a',11:'a XI-a',12:'a XII-a'})[grade] || String(grade);
function plural(number, roOne, roMany, ruOne, ruFew, ruMany) {
  if (language === 'ro') return `${number} ${number === 1 ? roOne : roMany}`;
  const form = new Intl.PluralRules('ru').select(number);
  return `${number} ${({one:ruOne,few:ruFew})[form] || ruMany}`;
}
const editionCount = number => plural(number,'ediție','ediții','конкурс','конкурса','конкурсов');
const participantCount = number => plural(number,'participant','participanți','участник','участника','участников');
function scoreUnit(number) {
  return language === 'ro' ? (number === 1 ? 'punct' : 'puncte') : ({one:'балл',few:'балла'})[new Intl.PluralRules('ru').select(number)] || 'баллов';
}
function editionLabel(value) {
  const edition = typeof value === 'object' ? value : D.editions.find(item => item.id === value);
  if (!edition) return String(value);
  const month = Number(edition.id.split('-')[1]);
  return `${window.PASCAL_I18N[language].months[month - 1]} ${edition.year}`;
}
const translatedProblem = problem => language === 'ru' ? {...problem,...window.PASCAL_I18N.ru.problemTranslations[problem.id]} : problem;
const schoolLabel = value => language === 'ru' ? value.replace(/^Liceul Exemplu /,'Условный лицей ') : value;
const awardLabel = value => language === 'ru' ? ({'Premiul I':'Диплом I степени','Premiul II':'Диплом II степени','Premiul III':'Диплом III степени','Mențiune':'Похвальная грамота'})[value] || value || '—' : value || '—';
const seenReveals = new WeakSet();
const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('reveal-in');
    revealObserver.unobserve(entry.target);
  });
}, {threshold:0.08}) : null;
function revealContent() {
  if (!revealObserver) return;
  document.querySelectorAll('.reveal').forEach(element => {
    if (seenReveals.has(element)) return;
    seenReveals.add(element);
    revealObserver.observe(element);
  });
}
function closeMenu() {
  $('#navigation').classList.remove('open');
  $('#menu-toggle').setAttribute('aria-expanded','false');
}
function syncChrome() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(element => { element.innerHTML = t(element.dataset.i18n); });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => { element.setAttribute('aria-label',t(element.dataset.i18nAria)); });
  document.querySelectorAll('[data-language]').forEach(button => { button.setAttribute('aria-pressed',String(button.dataset.language === language)); });
  $('meta[name="description"]').content = t('meta');
}
function changeLanguage(nextLanguage) {
  if (nextLanguage === language) return;
  const scrollPosition = window.scrollY;
  const openSolutions = [...document.querySelectorAll('details[open][id]')].map(element => element.id);
  const answer = $('#challenge-answer')?.value;
  const feedback = $('#answer-feedback')?.dataset.feedback;
  language = nextLanguage;
  try { localStorage.setItem('pascal-language',language); } catch {}
  const url = new URL(location.href);
  url.searchParams.set('lang',language);
  if (url.hash === '#main') url.hash = '#/' + currentPage;
  history.replaceState(null,'',url);
  syncChrome();
  route();
  openSolutions.forEach(id => { const element = document.getElementById(id); if (element) element.open = true; });
  if ($('#challenge-answer') && answer !== undefined) {
    $('#challenge-answer').value = answer;
    if (feedback) showChallengeFeedback(feedback);
  }
  requestAnimationFrame(() => window.scrollTo({top:scrollPosition,left:0,behavior:'instant'}));
}
function init() {
  D = window.PASCAL;
  syncChrome();
  window.addEventListener('hashchange',route);
  window.addEventListener('popstate',route);
  $('#menu-toggle').onclick = () => {
    const open = $('#navigation').classList.toggle('open');
    $('#menu-toggle').setAttribute('aria-expanded',open);
  };
  document.querySelectorAll('[data-language]').forEach(button => { button.onclick = () => changeLanguage(button.dataset.language); });
  document.addEventListener('keydown',event => {
    if (event.key === 'Escape' && $('#navigation').classList.contains('open')) { closeMenu(); $('#menu-toggle').focus(); }
  });
  document.addEventListener('click',event => { if (!event.target.closest('.site-header')) closeMenu(); });
  route();
}
function selectedEdition() {
  const value = params().get('editie');
  const id = ({2026:'2026-10',2025:'2026-09',2024:'2026-08'})[value] || value;
  return D.editions.some(edition => edition.id === id) ? id : D.editions[0].id;
}
function selectedCategory() {
  const id = params().get('categorie') || categoryFor(params().get('clasa'))?.id;
  return D.categories.some(category => category.id === id) ? id : '';
}
function route() {
  const requested = new URLSearchParams(location.search).get('lang');
  if (['ro','ru'].includes(requested) && requested !== language) {
    language = requested;
    try { localStorage.setItem('pascal-language',language); } catch {}
    syncChrome();
  }
  if (location.href === renderedUrl && language === renderedLanguage) return;
  if (location.hash === '#main') {
    if ($('#main').childElementCount && language === renderedLanguage) { $('#main').focus(); return; }
    history.replaceState(null,'','#/' + ($('#main').childElementCount ? currentPage : ''));
  }
  let page = (location.hash.split('?')[0] || '#/').replace('#/','');
  if (['editii','probleme','solutii'].includes(page)) {
    const edition = D.problems.find(problem => problem.id === params().get('problema'))?.edition || (params().has('editie') ? selectedEdition() : '');
    history.replaceState(null,'','#/arhiva' + (edition ? '?editie=' + edition : ''));
    page = 'arhiva';
  }
  if (page === 'despre') {
    history.replaceState(null,'','#/despre-concurs');
    page = 'despre-concurs';
  }
  const previous = currentPage;
  currentPage = page;
  revealObserver?.disconnect();
  closeMenu();
  const routes = {'':home,arhiva:archive,antrenament:practice,clasament:ranking,'despre-concurs':contestAbout};
  (routes[page] || notFound)();
  revealContent();
  document.querySelectorAll('#navigation a').forEach(link => link.getAttribute('href') === '#/' + page ? link.setAttribute('aria-current','page') : link.removeAttribute('aria-current'));
  const titles = {'':'contest',arhiva:'archive',antrenament:'practice',clasament:'ranking','despre-concurs':'about'};
  document.title = 'Pascal — ' + t(titles[page] || 'notFound');
  renderedUrl = location.href;
  renderedLanguage = language;
  if (previous !== page) { window.scrollTo({top:0,left:0,behavior:'instant'}); $('#main').focus({preventScroll:true}); }
}
function title(heading, intro) {
  return `<div class="page-intro"><h1 class="reveal">${heading}</h1><p class="reveal">${intro}</p></div>`;
}
function showChallengeFeedback(state) {
  const feedback = $('#answer-feedback');
  feedback.dataset.feedback = state;
  feedback.textContent = t(state);
  feedback.classList.toggle('incorrect',state !== 'correct');
}
function home() {
  const challenge = translatedProblem(D.practice.find(problem => problem.id === 'p2026-6'));
  $('#main').innerHTML = `<div class="wrap">
    <section class="hero">
      <div class="hero-copy"><h1 class="reveal">Pascal</h1><p class="reveal"><strong>${t('contest')}</strong>${t('heroIntro')}</p><a class="button accent reveal" href="#/arhiva">${t('discoverArchive')}</a></div>
      <div class="hero-format"><h2 class="reveal">${t('categories')}</h2><div class="category-list">${D.categories.map(category => `<a class="reveal" href="#/antrenament?categorie=${category.id}" aria-label="${t('practiceCategory',{classes:categoryTitle(category)})}"><span class="category-grade">${categoryLabel(category)}</span><span class="category-action">${t('practice')}</span></a>`).join('')}</div><p class="reveal">${t('calendar')}</p></div>
    </section>
    <section class="home-section"><div class="section-head"><h2 class="reveal">${t('firstEdition')}</h2><p class="reveal">${t('firstEditionIntro')}</p></div><div class="edition-list">${D.editions.map(editionCard).join('')}</div></section>
    <section class="about-section" aria-labelledby="about-heading"><h2 class="reveal" id="about-heading">${t('about')}</h2><div class="about-text"><p class="reveal">${t('aboutSummary')}</p><a class="text-link reveal" href="#/despre-concurs">${t('readAbout')} <span aria-hidden="true">↗</span></a></div></section>
    <section class="resource-band"><div><h2 class="reveal">${t('practice')}</h2><p class="reveal">${t('practiceIntroHome')}</p></div><div class="resource-links"><a class="resource-link reveal" href="#/antrenament"><div><h3>${t('practiceProblems')}</h3><p>${t('practiceCategories')}</p></div><span aria-hidden="true">↗</span></a><a class="resource-link reveal" href="#/clasament"><div><h3>${t('ranking')}</h3><p>${t('rankingCategories')}</p></div><span aria-hidden="true">↗</span></a></div></section>
    <section class="challenge" aria-labelledby="challenge-heading"><div class="challenge-copy"><h2 class="reveal" id="challenge-heading">${t('challenge')}</h2><p class="reveal">${t('challengeStatement')}</p><p class="sample-label">${t('challengeSample')}</p></div><div class="challenge-answer reveal"><form id="challenge-form" novalidate><label for="challenge-answer">${t('challengeQuestion')}</label><div class="answer-controls"><input id="challenge-answer" name="raspuns" type="number" min="0" step="1" required inputmode="numeric" placeholder="${t('answerPlaceholder')}"><button class="button" type="submit">${t('check')}</button></div><p id="answer-feedback" class="answer-feedback" role="status"></p></form><details class="solution" id="challenge-solution"><summary>${t('showSolution')}</summary>${challenge.solution}</details></div></section>
  </div>`;
  $('#challenge-form').onsubmit = event => {
    event.preventDefault();
    const raw = $('#challenge-answer').value, answer = Number(raw);
    if (raw === '' || !Number.isInteger(answer) || answer < 0) { showChallengeFeedback('invalidAnswer'); $('#challenge-answer').focus(); return; }
    showChallengeFeedback(answer === 10 ? 'correct' : 'incorrect');
  };
}
function contestAbout() {
  $('#main').innerHTML = `<div class="wrap contest-about-page">
    ${title(t('about'),t('aboutIntro'))}
    <section class="contest-purpose" aria-labelledby="purpose-heading"><h2 class="reveal" id="purpose-heading">${t('purposeTitle')}</h2><div class="about-text"><p class="reveal">${t('aboutPurpose')}</p><p class="reveal">${t('aboutObjectives')}</p></div></section>
    <section class="about-section contest-format" aria-labelledby="format-heading"><div><h2 class="reveal" id="format-heading">${t('formatTitle')}</h2><p class="about-tagline reveal">${t('aboutTagline')}</p></div><div class="about-text"><p class="reveal">${t('aboutStages')}</p><p class="reveal">${t('aboutSelection')}</p><p class="reveal">${t('aboutMaterials')}</p><a class="text-link reveal" href="#/arhiva">${t('exploreArchive')} <span aria-hidden="true">↗</span></a></div></section>
  </div>`;
}
function pdfLink(edition, type) {
  const rawPath = ({problems:edition.problemsPdf,solutions:edition.solutionsPdf,practice:edition.practicePdf})[type];
  const path = rawPath && typeof rawPath === 'object' ? rawPath[language] || rawPath.ro : rawPath;
  const text = t(({problems:'problemsPdf',solutions:'solutionsPdf',practice:'practicePdf'})[type]);
  const variant = type === 'solutions' ? ' secondary' : '';
  const safePath = typeof path === 'string' && (path.startsWith('pdf/') || /^https:\/\//.test(path));
  const context = `${text} · ${editionLabel(edition)}`;
  return safePath ? `<a class="button${variant}" href="${escapeHTML(path)}" target="_blank" rel="noopener" aria-label="${context} (${t('newTab')})">${text}</a>` : `<button class="button${variant}" disabled aria-label="${context}, ${t('unavailable')}">${text}</button>`;
}
function upcomingEdition(edition, heading = 'h2') {
  return `<article class="upcoming-edition reveal"><div><${heading}>${editionLabel(edition)}</${heading}><p class="upcoming-status">${t('comingSoon')}</p></div><div class="about-text"><p>${t('upcomingDetails')}</p><p>${t('upcomingMaterials')}</p></div></article>`;
}
function editionCard(edition) {
  if (edition.status === 'upcoming') return upcomingEdition(edition,'h3');
  return `<article class="edition-entry reveal" id="editia-${edition.id}"><div><h3>${editionLabel(edition)}</h3><p>${t('editionMaterials')}</p></div><div class="edition-actions" data-ui>${pdfLink(edition,'problems')}${pdfLink(edition,'solutions')}${edition.practicePdf ? pdfLink(edition,'practice') : ''}</div></article>`;
}
function editionOptions(selected, includeAll = false) {
  return `${includeAll ? `<option value="">${t('allEditions')}</option>` : ''}${D.editions.map(edition => `<option value="${edition.id}" ${edition.id === selected ? 'selected' : ''}>${editionLabel(edition)}</option>`).join('')}`;
}
function archive() {
  if (D.editions.every(edition => edition.status === 'upcoming')) {
    $('#main').innerHTML = `<div class="wrap archive-page">${title(t('archive'),t('archiveIntro'))}${D.editions.map(edition => upcomingEdition(edition)).join('')}</div>`;
    return;
  }
  const selected = params().has('editie') ? selectedEdition() : '';
  $('#main').innerHTML = `<div class="wrap archive-page">${title(t('archive'),t('archiveIntro'))}<form class="filter-bar" id="archive-filters"><div class="field archive-select"><label for="archive-edition">${t('monthlyEdition')}</label><select id="archive-edition">${editionOptions(selected,true)}</select></div><div class="field search-field"><label for="archive-search">${t('searchArchive')}</label><input id="archive-search" type="search" placeholder="${t('searchPlaceholder')}" value="${escapeHTML(params().get('cauta') || '')}"></div></form><p class="archive-explainer">${t('archiveExplainer')}</p><div class="archive-status"><p id="archive-count" role="status"></p><button type="button" class="text-link" id="reset-archive" hidden>${t('resetFilters')}</button></div><div id="edition-results" class="edition-list" aria-live="polite"></div></div>`;
  const update = () => {
    const id = $('#archive-edition').value, query = $('#archive-search').value.trim(), search = query.toLocaleLowerCase(language);
    const filters = new URLSearchParams();
    if (id) filters.set('editie',id);
    if (query) filters.set('cauta',query);
    history.replaceState(null,'','#/arhiva' + (filters.size ? '?' + filters : ''));
    const editions = D.editions.filter(edition => (!id || edition.id === id) && (!search || [editionLabel(edition),edition.label,window.PASCAL_I18N.ru.months[Number(edition.id.split('-')[1])-1]].some(label => label.toLocaleLowerCase(language).includes(search))));
    $('#archive-count').textContent = editionCount(editions.length);
    $('#reset-archive').hidden = !id && !search;
    document.querySelectorAll('#edition-results .reveal').forEach(element => revealObserver?.unobserve(element));
    $('#edition-results').innerHTML = editions.length ? editions.map(editionCard).join('') : `<div class="empty-state"><h2>${t('noEditions')}</h2><p>${t('tryMonth')}</p></div>`;
    revealContent();
  };
  $('#archive-filters').onsubmit = event => event.preventDefault();
  $('#archive-filters').oninput = update;
  $('#reset-archive').onclick = () => { $('#archive-edition').value = ''; $('#archive-search').value = ''; update(); $('#archive-search').focus(); };
  update();
}
function categorySelect(id, selected) {
  return `<div class="field"><label for="${id}">${t('category')}</label><select id="${id}" name="categorie"><option value="">${t('allCategories')}</option>${D.categories.map(category => `<option value="${category.id}" ${category.id === selected ? 'selected' : ''}>${categoryTitle(category)}</option>`).join('')}</select></div>`;
}
function practice() {
  $('#main').innerHTML = `<div class="wrap archive-page">${title(t('practice'),t('practiceIntro'))}<div class="practice-intro"><p>${t('practiceSchedule')}</p><p class="sample-label">${t('practiceSample')}</p></div><form class="filter-bar" id="practice-filters">${categorySelect('practice-category',selectedCategory())}</form><div class="practice-materials">${D.editions.filter(edition => edition.practicePdf).map(edition => `<div><h2>${editionLabel(edition)}</h2>${pdfLink(edition,'practice')}</div>`).join('')}</div><div id="practice-results" class="practice-list" aria-live="polite"></div></div>`;
  const update = () => {
    const id = $('#practice-category').value;
    history.replaceState(null,'','#/antrenament' + (id ? '?categorie=' + id : ''));
    const categories = D.categories.filter(category => !id || category.id === id);
    $('#practice-results').innerHTML = categories.map(category => {
      const problems = D.practice.filter(problem => category.grades.includes(problem.grade)).map(translatedProblem);
      return `<section class="practice-group"><h2>${categoryTitle(category)}</h2>${problems.length ? problems.map(problem => `<article class="practice-problem"><h3>${escapeHTML(problem.title)}</h3><p class="problem-topic">${escapeHTML(problem.topic)}</p><p>${escapeHTML(problem.statement)}</p><details class="solution" id="solution-${problem.id}"><summary>${t('showSolution')}</summary>${problem.solution}</details></article>`).join('') : `<p class="notice">${t('practicePending')}</p>`}</section>`;
    }).join('');
  };
  $('#practice-filters').onsubmit = event => event.preventDefault();
  $('#practice-filters').oninput = update;
  update();
}
function ranking() {
  $('#main').innerHTML = `<div class="wrap archive-page">${title(t('ranking'),t('rankingIntro'))}<form class="filter-bar" id="ranking-filters"><div class="field"><label for="edition">${t('monthlyEdition')}</label><select id="edition" name="editie">${editionOptions(selectedEdition())}</select></div>${categorySelect('category',selectedCategory())}</form><div id="ranking-results" aria-live="polite"></div></div>`;
  const update = () => {
    const edition = $('#edition').value, category = $('#category').value;
    const filters = new URLSearchParams({editie:edition});
    if (category) filters.set('categorie',category);
    history.replaceState(null,'','#/clasament?' + filters);
    const official = D.results.filter(result => result.edition === edition), isDemo = !official.length;
    const categories = D.categories.filter(item => !category || item.id === category);
    const results = (isDemo ? D.demoResults : official).filter(result => result.edition === edition && categories.some(item => item.grades.includes(result.grade)));
    $('#ranking-results').innerHTML = `${isDemo && results.length ? `<div class="notice">${t('rankingDemo')}</div>` : ''}<div class="results-info"><span>${t('editionResults',{edition:editionLabel(edition),count:participantCount(results.length)})}</span>${results.length ? `<button class="text-link export-button" id="export-csv">${t('csv')}</button>` : ''}</div>${categories.map(item => {
      const rows = results.filter(result => item.grades.includes(result.grade)).sort((a,b) => a.rank - b.rank);
      return `<section class="ranking-group"><h2>${categoryTitle(item)}</h2>${rows.length ? `<div class="table-scroll"><table><caption class="sr-only">${t(isDemo ? 'rankingExample' : 'contestResults')} · ${editionLabel(edition)} · ${categoryTitle(item)}</caption><thead><tr>${['rank','participant','grade','school','score','award'].map(key => `<th scope="col">${t(key)}</th>`).join('')}</tr></thead><tbody>${rows.map(result => `<tr class="${result.rank <= 3 ? 'top-result' : ''} ${!result.award || result.award === '—' ? 'no-award' : ''}"><td><span class="rank-number">${escapeHTML(result.rank)}</span></td><td>${escapeHTML(result.name)}</td><td data-grade-prefix="${t('grade')} ">${escapeHTML(gradeLabel(result.grade))}</td><td>${escapeHTML(schoolLabel(result.school))}</td><td data-score-unit="${scoreUnit(result.score)}"><span class="score-value">${escapeHTML(result.score)}</span></td><td>${escapeHTML(awardLabel(result.award))}</td></tr>`).join('')}</tbody></table></div>` : `<p class="notice">${t('resultsPending')}</p>`}</section>`;
    }).join('')}`;
    if ($('#export-csv')) $('#export-csv').onclick = () => {
      const quote = value => '"' + String(value ?? '').replace(/"/g,'""') + '"';
      const ordered = [...results].sort((a,b) => categoryFor(a.grade).grades[0] - categoryFor(b.grade).grades[0] || a.rank - b.rank);
      const csv = '\uFEFF' + [['category','rank','participant','grade','school','score','award','resultType'].map(key => t(key)),...ordered.map(result => [categoryLabel(categoryFor(result.grade)),result.rank,result.name,gradeLabel(result.grade),schoolLabel(result.school),result.score,awardLabel(result.award),t(isDemo ? 'demo' : 'official')])].map(row => row.map(quote).join(',')).join('\r\n');
      const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})), link = document.createElement('a');
      link.href = url; link.download = `pascal-clasament-${isDemo ? 'demo-' : ''}${edition}-${language}.csv`; link.click();
      setTimeout(() => URL.revokeObjectURL(url),1000);
    };
  };
  $('#ranking-filters').onsubmit = event => event.preventDefault();
  $('#ranking-filters').oninput = update;
  update();
}
function notFound() {
  $('#main').innerHTML = `<div class="wrap archive-page">${title(t('notFound'),t('notFoundIntro'))}<a class="button" href="#/">${t('home')}</a></div>`;
}
init();
