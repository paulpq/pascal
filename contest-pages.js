const contestStages = ['online','final'];
const localValue = value => typeof value === 'object' && value ? value[language] || value.ro || '' : value || '';
const safeExternalUrl = value => typeof value === 'string' && /^https:\/\//.test(value) ? value : '';
function formatDate(value) {
  if (!value) return t('datePending');
  const date = new Date(value.length === 10 ? value + 'T12:00:00' : value);
  if (!Number.isFinite(date.getTime())) return t('datePending');
  return new Intl.DateTimeFormat(language === 'ro' ? 'ro-MD' : 'ru-MD',{day:'numeric',month:'long',year:'numeric',timeZone:'Europe/Chisinau',...(value.includes('T') ? {hour:'2-digit',minute:'2-digit'} : {})}).format(date);
}
function syncContact() {
  if (!D) return;
  const names = $('#organizer-names'), address = $('#contact-address');
  if (names) names.textContent = D.contact?.organizers?.length ? D.contact.organizers.map(localValue).join(', ') : t('organizersPending');
  if (address) {
    const email = D.contact?.email;
    address.innerHTML = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `<a href="mailto:${escapeHTML(email)}">${escapeHTML(email)}</a>` : t('contactPending');
  }
}
function stageName(stage) { return t(stage === 'online' ? 'onlineStage' : 'finalStage'); }
function selectedStage() { return contestStages.includes(params().get('etapa')) ? params().get('etapa') : 'final'; }
function stageSelect(selected) {
  return `<div class="field"><label for="ranking-stage">${t('stage')}</label><select id="ranking-stage" name="etapa">${contestStages.map(stage => `<option value="${stage}" ${selected === stage ? 'selected' : ''}>${stageName(stage)}</option>`).join('')}</select></div>`;
}
function registrationContent(edition) {
  const url = safeExternalUrl(localValue(edition.registrationUrl));
  return `<section class="participation-panel" aria-labelledby="registration-heading"><div><h2 class="reveal" id="registration-heading">${t(url ? 'registration' : 'registrationTitle')}</h2><p class="panel-status reveal">${editionLabel(edition)}</p></div><div class="about-text"><p class="reveal">${t(url ? 'registrationOpen' : 'registrationPending')}</p><dl class="schedule-facts reveal"><div><dt>${t('deadline')}</dt><dd>${edition.registrationDeadline ? formatDate(edition.registrationDeadline) : t('deadlinePending')}</dd></div>${(edition.stages || []).map(stage => `<div><dt>${stageName(stage.id)}</dt><dd>${formatDate(stage.date)}</dd></div>`).join('')}</dl>${url ? `<a class="button accent reveal" href="${escapeHTML(url)}" target="_blank" rel="noopener">${t('openForm')} <span aria-hidden="true">↗</span></a>` : `<a class="text-link reveal" data-ui href="#/noutati">${t('checkNews')} <span aria-hidden="true">↗</span></a>`}<p class="sample-label reveal">${t('allTimes')}</p></div></section>`;
}
function registrationPage() {
  const edition = D.editions.find(item => item.id === selectedEdition());
  $('#main').innerHTML = `<div class="wrap content-page">${title(t('registration'),t('registrationIntro'))}${registrationContent(edition)}<section class="editorial-section"><h2 class="reveal">${t('howParticipate')}</h2><div class="editorial-list"><article><h3 class="reveal">${t('chooseCategory')}</h3><p class="reveal">${t('chooseCategoryText')}</p></article><article><h3 class="reveal">${t('registerStep')}</h3><p class="reveal">${t('registerStepText')}</p></article><article><h3 class="reveal">${t('finalStage')}</h3><p class="reveal">${t('finalText')}</p></article></div></section><div class="page-actions" data-ui><a class="button reveal" href="#/regulament">${t('readRules')}</a><a class="text-link reveal" data-ui href="#/editie?editie=${edition.id}">${t('viewEdition')} <span aria-hidden="true">↗</span></a></div></div>`;
}
function rulesPage() {
  const pdf = localValue(D.rulesPdfs), valid = typeof pdf === 'string' && pdf.startsWith('pdf/');
  $('#main').innerHTML = `<div class="wrap content-page">${title(t('rules'),t('rulesIntro'))}<section class="editorial-section rules-section"><h2 class="reveal">${t('confirmedInfo')}</h2><div class="editorial-list"><article><h3 class="reveal">${t('firstEdition')}</h3><p class="reveal">${t('rulesConfirmed')}</p></article><article><h3 class="reveal">${t('rulesCategoriesTitle')}</h3><p class="reveal">${t('rulesCategories')}</p></article><article><h3 class="reveal">${t('rulesPublicationTitle')}</h3><p class="reveal">${t('rulesPublication')}</p></article></div></section><section class="participation-panel rules-pending"><h2 class="reveal">${t('rulesPendingTitle')}</h2><div class="about-text"><p class="reveal">${t('rulesPending')}</p>${valid ? `<a class="button reveal" href="${escapeHTML(pdf)}" download>${t('rulesPdf')} <span aria-hidden="true">↓</span></a>` : ''}<p class="sample-label reveal">${t('rulesPdfNote')}</p></div></section><div class="page-actions" data-ui><a class="text-link reveal" data-ui href="#/inscriere">${t('registration')} <span aria-hidden="true">↗</span></a></div></div>`;
}
function newsItems(items) {
  if (!items.length) return `<p class="notice">${t('noNews')}</p>`;
  return `<div class="news-list">${items.map(item => `<article class="news-item"><div><h3 class="reveal">${escapeHTML(localValue(item.title))}</h3><time class="sample-label reveal" datetime="${escapeHTML(item.date)}">${formatDate(item.date)}</time></div><div class="about-text"><p class="reveal">${escapeHTML(localValue(item.body))}</p>${D.editions.some(edition => edition.id === item.edition) ? `<a class="text-link reveal" data-ui href="#/editie?editie=${item.edition}">${t('viewEdition')} <span aria-hidden="true">↗</span></a>` : ''}</div></article>`).join('')}</div>`;
}
function newsPage() {
  $('#main').innerHTML = `<div class="wrap content-page">${title(t('news'),t('newsIntro'))}${newsItems([...D.news].sort((a,b) => b.date.localeCompare(a.date)))}</div>`;
}
function stageResults(edition, stage, categories = D.categories) {
  return D.results.filter(result => result.edition === edition.id && (result.stage || 'final') === stage && categories.some(category => category.grades.includes(+result.grade)));
}
function resultScore(result) {
  if (typeof result.score === 'number' && Number.isFinite(result.score)) return result.score;
  return (result.problemScores || []).reduce((total,score) => total + (typeof score === 'number' && Number.isFinite(score) ? score : 0),0);
}
function problemColumnCount(edition, results) {
  return Math.max(Number.isInteger(edition.problemCount) && edition.problemCount > 0 ? edition.problemCount : 0, ...results.map(result => result.problemScores?.length || 0));
}
function scoreCells(result, count) {
  return Array.from({length:count},(_,index) => `<td class="problem-score" data-problem-label="${t('problem')} ${index+1}">${escapeHTML(result.problemScores?.[index] ?? '—')}</td>`).join('');
}
function rankingGroups(edition,stage,categories,results,heading = 'h2') {
  const count = problemColumnCount(edition,stageResults(edition,stage));
  return categories.map(category => {
    const rows = results.filter(result => category.grades.includes(+result.grade)).sort((a,b) => a.rank-b.rank);
    return `<section class="ranking-group"><${heading}>${categoryTitle(category)}</${heading}>${rows.length ? `<div class="table-scroll"><table class="results-table"><caption class="sr-only">${t('contestResults')} · ${editionLabel(edition)} · ${stageName(stage)} · ${categoryTitle(category)}</caption><thead><tr>${['rank','participant','grade','school'].map(key => `<th scope="col">${t(key)}</th>`).join('')}${Array.from({length:count},(_,index) => `<th scope="col" aria-label="${t('problem')} ${index+1}">${t('problemPrefix')}${index+1}</th>`).join('')}<th scope="col">${t('score')}</th><th scope="col">${t('award')}</th></tr></thead><tbody>${rows.map(result => `<tr class="${result.rank <= 3 ? 'top-result' : ''} ${!result.award || result.award === '—' ? 'no-award' : ''}"><td class="result-rank"><span class="rank-number">${escapeHTML(result.rank)}</span></td><td class="result-name">${escapeHTML(result.name)}</td><td class="result-grade" data-grade-prefix="${t('grade')} ">${escapeHTML(gradeLabel(result.grade))}</td><td class="result-school">${escapeHTML(schoolLabel(result.school))}</td>${scoreCells(result,count)}<td class="result-total" data-score-unit="${scoreUnit(resultScore(result))}"><span class="score-value">${escapeHTML(resultScore(result))}</span></td><td class="result-award">${escapeHTML(awardLabel(result.award))}</td></tr>`).join('')}</tbody></table></div>` : `<p class="notice">${t('resultsPending')}</p>`}</section>`;
  }).join('');
}
function resultsCsv(edition,stage,results) {
  const count = problemColumnCount(edition,stageResults(edition,stage));
  const headers = ['category','rank','participant','grade','school'].map(key => t(key)).concat(Array.from({length:count},(_,index) => t('problemPrefix')+(index+1)),[t('score'),t('award'),t('stage')]);
  const ordered = [...results].sort((a,b) => categoryFor(a.grade).grades[0] - categoryFor(b.grade).grades[0] || a.rank-b.rank);
  const rows = ordered.map(result => [categoryLabel(categoryFor(result.grade)),result.rank,result.name,gradeLabel(result.grade),schoolLabel(result.school),...Array.from({length:count},(_,index) => result.problemScores?.[index] ?? ''),resultScore(result),awardLabel(result.award),stageName(stage)]);
  const quote = value => '"' + String(value ?? '').replace(/"/g,'""') + '"';
  return '\uFEFF' + [headers,...rows].map(row => row.map(quote).join(',')).join('\r\n');
}
function rankingPage() {
  $('#main').innerHTML = `<div class="wrap archive-page">${title(t('ranking'),t('rankingIntro'))}<form class="filter-bar" id="ranking-filters" data-ui><div class="field"><label for="edition">${t('monthlyEdition')}</label><select id="edition" name="editie">${editionOptions(selectedEdition())}</select></div>${stageSelect(selectedStage())}${categorySelect('category',selectedCategory())}</form><div id="ranking-results" aria-live="polite"></div></div>`;
  const update = () => {
    const edition = D.editions.find(item => item.id === $('#edition').value),stage = $('#ranking-stage').value,category = $('#category').value;
    const filters = new URLSearchParams({editie:edition.id,etapa:stage}); if (category) filters.set('categorie',category);
    history.replaceState(null,'','#/clasament?' + filters);
    const categories = D.categories.filter(item => !category || item.id === category), results = stageResults(edition,stage,categories);
    $('#ranking-results').innerHTML = `<div class="results-info"><span>${t('editionResults',{edition:editionLabel(edition),count:participantCount(results.length)})} · ${stageName(stage)}</span>${results.length ? `<button class="text-link export-button" id="export-csv">${t('csv')}</button>` : ''}</div>${rankingGroups(edition,stage,categories,results)}`;
    if ($('#export-csv')) $('#export-csv').onclick = () => {
      const url = URL.createObjectURL(new Blob([resultsCsv(edition,stage,results)],{type:'text/csv;charset=utf-8'})),link = document.createElement('a');
      link.href = url; link.download = `pascal-clasament-${edition.id}-${stage}-${language}.csv`; link.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
    };
  };
  $('#ranking-filters').onsubmit = event => event.preventDefault(); $('#ranking-filters').oninput = update; update();
}
function editionPage() {
  const id = params().get('editie') || D.editions[0]?.id, edition = D.editions.find(item => item.id === id);
  if (!edition) { notFound(); return; }
  const index = D.editions.indexOf(edition),adjacent = [D.editions[index+1],D.editions[index-1]];
  $('#main').innerHTML = `<div class="wrap content-page edition-page">${title(editionLabel(edition),t('firstEditionOnly'))}<div class="edition-state"><p class="upcoming-status reveal">${t(edition.status === 'upcoming' ? 'comingSoon' : 'editionCalendar')}</p><a class="text-link reveal" data-ui href="#/arhiva">${t('backArchive')} <span aria-hidden="true">↗</span></a></div><section class="editorial-section"><h2 class="reveal">${t('editionCalendar')}</h2><div class="editorial-list">${(edition.stages || []).map(stage => `<article class="stage-entry"><h3 class="reveal">${stageName(stage.id)}</h3><div class="about-text"><p class="stage-date reveal">${formatDate(stage.date)}</p><p class="reveal">${t(stage.id === 'online' ? 'onlineText' : 'finalText')}</p>${stage.problemsPdf || stage.solutionsPdf ? `<div class="edition-actions reveal" data-ui>${pdfLink({...edition,problemsPdf:stage.problemsPdf,solutionsPdf:stage.solutionsPdf},'problems')}${pdfLink({...edition,problemsPdf:stage.problemsPdf,solutionsPdf:stage.solutionsPdf},'solutions')}</div>` : `<p class="sample-label reveal">${t('stageMaterialsPending')}</p>`}<a class="text-link reveal" data-ui href="#/clasament?editie=${edition.id}&etapa=${stage.id}">${t('viewStageResults')} <span aria-hidden="true">↗</span></a></div></article>`).join('')}</div></section><section class="edition-signup"><div><h2 class="reveal">${t('registrationDetails')}</h2><p class="reveal">${t('registrationDetailsText')}</p></div><a class="button reveal" href="#/inscriere?editie=${edition.id}">${t('registration')}</a></section><section class="edition-published-results"><h2 class="reveal">${t('editionResultsTitle')}</h2>${contestStages.some(stage => stageResults(edition,stage).length) ? contestStages.map(stage => { const results = stageResults(edition,stage); return results.length ? `<details class="solution" id="edition-results-${stage}"><summary>${stageName(stage)}</summary>${rankingGroups(edition,stage,D.categories,results,'h3')}</details>` : ''; }).join('') : `<p class="reveal">${t('editionResultsPending')}</p>`}</section>${adjacent.some(Boolean) ? `<nav class="edition-pagination" aria-label="${t('archive')}">${adjacent.map((item,i) => item ? `<a class="text-link" data-ui href="#/editie?editie=${item.id}">${t(i ? 'nextEdition' : 'previousEdition')}: ${editionLabel(item)}</a>` : '').join('')}</nav>` : ''}</div>`;
  document.title = 'Pascal — ' + editionLabel(edition);
}
