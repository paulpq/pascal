// First edition: December 2026. Add official PDFs and results after publication.
// Practice examples are independent of the contest archive.
window.PASCAL = {
  "editions": [
    {
      "id": "2026-12",
      "problemsPdf": null,
      "solutionsPdf": null,
      "practicePdf": null,
      "monthName": "Decembrie",
      "label": "Decembrie 2026",
      "year": 2026,
      "status": "upcoming"
    }
  ],
  "problems": [],
  "demoResults": [],
  "results": [],
  "categories": [
    {
      "id": "5-6",
      "label": "V–VI",
      "grades": [
        5,
        6
      ]
    },
    {
      "id": "7-8",
      "label": "VII–VIII",
      "grades": [
        7,
        8
      ]
    },
    {
      "id": "9-10",
      "label": "IX–X",
      "grades": [
        9,
        10
      ]
    },
    {
      "id": "11-12",
      "label": "XI–XII",
      "grades": [
        11,
        12
      ]
    }
  ],
  "practice": [
    {
      "id": "p2026-5",
      "edition": "2026-10",
      "year": 2026,
      "grade": 5,
      "title": "Un șir cu o regulă",
      "topic": "Aritmetică",
      "statement": "Se consideră șirul 3, 7, 11, 15, …, în care diferența dintre oricare doi termeni consecutivi este 4. Care este al 25-lea termen al șirului?",
      "answer": 99,
      "solution": "<p>Primul termen este 3. Pentru a ajunge la al 25-lea termen, adăugăm de 24 de ori numărul 4.</p><p>Prin urmare, a₂₅ = 3 + 24 × 4 = <strong>99</strong>.</p><p>Observație: de la primul la al 25-lea termen sunt 24 de pași, nu 25.</p>"
    },
    {
      "id": "p2026-6",
      "edition": "2026-10",
      "year": 2026,
      "grade": 6,
      "title": "Drumul cel mai scurt",
      "topic": "Combinatorică",
      "statement": "Pe o rețea de pătrate, pornești din punctul A și trebuie să ajungi în punctul B, aflat cu 3 unități la dreapta și 2 unități mai sus. Poți face doar pași de o unitate spre dreapta sau în sus. Câte drumuri diferite există?",
      "answer": 10,
      "solution": "<p>Orice drum conține exact 5 pași: 3 spre dreapta și 2 în sus. Alegerea pozițiilor celor 2 pași în sus determină întregul drum.</p><p>Sunt 5 × 4 / 2 = <strong>10 drumuri</strong>. Împărțim la 2 deoarece fiecare pereche de poziții a fost numărată de două ori.</p><p>Același rezultat apare în triunghiul lui Pascal, pe rândul 5, la poziția 2 (numărând de la 0).</p>"
    },
    {
      "id": "p2026-7",
      "edition": "2026-10",
      "year": 2026,
      "grade": 7,
      "title": "Unghiuri în echilibru",
      "topic": "Geometrie",
      "statement": "În triunghiul ABC avem AB = AC, iar unghiul BAC măsoară 40°. Determină măsura unghiului ABC, în grade.",
      "answer": 70,
      "solution": "<p>Triunghiul ABC este isoscel, cu baza BC, deci unghiurile ABC și BCA sunt egale.</p><p>Suma unghiurilor unui triunghi este 180°. Cele două unghiuri de la bază au împreună 180° − 40° = 140°.</p><p>Fiecare măsoară 140° / 2 = <strong>70°</strong>.</p>"
    },
    {
      "id": "p2026-8",
      "edition": "2026-10",
      "year": 2026,
      "grade": 8,
      "title": "Două numere, o relație",
      "topic": "Algebră",
      "statement": "Două numere reale pozitive x și y verifică x + y = 10 și xy = 21. Calculează x² + y².",
      "answer": 58,
      "solution": "<p>Folosim identitatea (x + y)² = x² + 2xy + y².</p><p>Rezultă x² + y² = (x + y)² − 2xy = 10² − 2 × 21 = 100 − 42 = <strong>58</strong>.</p><p>Nu este necesar să determinăm separat numerele x și y.</p>"
    },
    {
      "id": "practice-9",
      "grade": 9,
      "title": "Rădăcini fără ecuație",
      "topic": "Algebră",
      "statement": "Numerele reale x și y verifică x + y = 6 și x² + y² = 20. Calculează produsul xy.",
      "answer": 8,
      "solution": "<p>Din (x + y)² = x² + 2xy + y² rezultă 36 = 20 + 2xy. Așadar, 2xy = 16 și <strong>xy = 8</strong>.</p>"
    },
    {
      "id": "practice-10",
      "grade": 10,
      "title": "Trei alegeri",
      "topic": "Combinatorică",
      "statement": "Dintr-un grup de 8 elevi alegem o echipă de 3 elevi, fără roluri distincte. Câte echipe diferite putem forma?",
      "answer": 56,
      "solution": "<p>Avem 8 × 7 × 6 alegeri ordonate. Fiecare echipă este numărată de 3 × 2 × 1 ori, pentru toate ordonările celor trei elevi.</p><p>Prin urmare, numărul echipelor este 336 / 6 = <strong>56</strong>.</p>"
    }
  ]
};
