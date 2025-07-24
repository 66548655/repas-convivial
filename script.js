const SHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit?usp=sharing';
const sheetId = 'YOUR_SHEET_ID';
let data = {};

function init() {
  Tabletop.init({ key: SHEET_URL, callback: updateFromSheet, simpleSheet: false });
}
function updateFromSheet(sheetData) {
  const sheets = sheetData.sheets;
  data = {
    restes: sheets['Restes'][0].Texte || '',
    planning: sheets['Planning'],
    courses: sheets['Courses']
  };
  document.getElementById('restes').value = data.restes;
  renderPlanning();
  renderCourses();
}
function renderPlanning() {
  const pc = document.getElementById('planning-content');
  pc.innerHTML = '';
  data.planning.forEach(row => {
    const div = document.createElement('div');
    div.textContent = `${row.Jour} ${row.Moment} – ${row.Qui} : ${row.Plat}`;
    pc.appendChild(div);
  });
}
function renderCourses() {
  const ul = document.getElementById('courses-list');
  ul.innerHTML = '';
  data.courses.forEach(row => {
    const li = document.createElement('li');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = row.Coche === 'Oui';
    cb.onchange = () => updateCourse(row.Id, cb.checked);
    li.append(cb);
    li.append(` ${row.Article}`);
    ul.append(li);
  });
}
function updateCourse(id, checked) {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Courses!A${id+1}:C${id+1}?valueInputOption=USER_ENTERED&key=YOUR_API_KEY`, {
    method: 'PUT',
    body: JSON.stringify({ values: [[ data.courses[id].Article, checked ? 'Oui' : 'Non' ]] }),
  }).then(r => r.json()).then(init);
}
document.getElementById('add-course').onclick = () => {
  const text = document.getElementById('new-course').value.trim();
  if (!text) return;
  data.courses.push({ Article: text, Coche: 'Non', Id: data.courses.length });
  // save to sheet...
  // simplifié pour exemple
  renderCourses();
};
init();
