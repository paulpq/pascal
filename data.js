// Demonstration materials and fictional results. Replace with official PDFs and results when ready.
// Add an edition’s practice PDF in practicePdf; ranking positions are per category.
window.PASCAL = {
  "editions": [
    {
      "id": "2026-10",
      "problemsPdf": "pdf/pascal-2026-10-probleme.pdf",
      "solutionsPdf": "pdf/pascal-2026-10-solutii.pdf",
      "practicePdf": null,
      "monthName": "Octombrie",
      "label": "Octombrie 2026",
      "year": 2026
    },
    {
      "id": "2026-09",
      "problemsPdf": "pdf/pascal-2026-09-probleme.pdf",
      "solutionsPdf": "pdf/pascal-2026-09-solutii.pdf",
      "practicePdf": null,
      "monthName": "Septembrie",
      "label": "Septembrie 2026",
      "year": 2026
    },
    {
      "id": "2026-08",
      "problemsPdf": "pdf/pascal-2026-08-probleme.pdf",
      "solutionsPdf": "pdf/pascal-2026-08-solutii.pdf",
      "practicePdf": null,
      "monthName": "August",
      "label": "August 2026",
      "year": 2026
    }
  ],
  "problems": [
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
      "id": "p2025-5",
      "edition": "2026-09",
      "year": 2026,
      "grade": 5,
      "title": "Suma ascunsă",
      "topic": "Aritmetică",
      "statement": "Calculează suma tuturor numerelor naturale de la 1 la 50, inclusiv.",
      "answer": 1275,
      "solution": "<p>Grupăm numerele în perechi: 1 + 50, 2 + 49, …, 25 + 26. Fiecare pereche are suma 51.</p><p>Există 25 de perechi, așadar suma este 25 × 51 = <strong>1275</strong>.</p>"
    },
    {
      "id": "p2025-6",
      "edition": "2026-09",
      "year": 2026,
      "grade": 6,
      "title": "Restul care rămâne",
      "topic": "Aritmetică",
      "statement": "Care este cel mai mic număr natural mai mare decât 10 care dă restul 2 atât la împărțirea la 5, cât și la împărțirea la 7?",
      "answer": 37,
      "solution": "<p>Dacă scădem 2 din numărul căutat, obținem un multiplu comun al lui 5 și al lui 7.</p><p>Cel mai mic multiplu comun pozitiv este 35. Numărul căutat este 35 + 2 = <strong>37</strong>.</p><p>Valoarea 2 dă și ea restul cerut, dar nu este mai mare decât 10.</p>"
    },
    {
      "id": "p2025-7",
      "edition": "2026-09",
      "year": 2026,
      "grade": 7,
      "title": "Pătratul din triunghi",
      "topic": "Geometrie",
      "statement": "Un triunghi dreptunghic are catetele de 6 cm și 8 cm. Care este lungimea ipotenuzei, în centimetri?",
      "answer": 10,
      "solution": "<p>Aplicăm teorema lui Pitagora: c² = 6² + 8² = 36 + 64 = 100.</p><p>Lungimea este pozitivă, deci c = √100 = <strong>10 cm</strong>.</p>"
    },
    {
      "id": "p2025-8",
      "edition": "2026-09",
      "year": 2026,
      "grade": 8,
      "title": "Un produs convenabil",
      "topic": "Algebră",
      "statement": "Calculează valoarea expresiei 2025² − 2024 × 2026, fără să efectuezi înmulțiri cu numere de patru cifre.",
      "answer": 1,
      "solution": "<p>Notăm n = 2025. Atunci 2024 × 2026 = (n − 1)(n + 1) = n² − 1.</p><p>Expresia devine n² − (n² − 1) = <strong>1</strong>.</p>"
    },
    {
      "id": "p2024-5",
      "edition": "2026-08",
      "year": 2026,
      "grade": 5,
      "title": "Cifre inversate",
      "topic": "Aritmetică",
      "statement": "Un număr de două cifre are suma cifrelor egală cu 9. Numărul obținut prin inversarea cifrelor este cu 27 mai mic decât numărul inițial. Care este numărul inițial?",
      "answer": 63,
      "solution": "<p>Notăm cifra zecilor cu a și cifra unităților cu b. Avem a + b = 9.</p><p>Diferența dintre număr și inversul său este 9(a − b) = 27, deci a − b = 3.</p><p>Din sumă și diferență obținem a = 6 și b = 3. Numărul este <strong>63</strong>.</p>"
    },
    {
      "id": "p2024-6",
      "edition": "2026-08",
      "year": 2026,
      "grade": 6,
      "title": "Alegerea unei echipe",
      "topic": "Combinatorică",
      "statement": "Dintr-un grup de 6 elevi se alege o echipă de 2 elevi, fără roluri distincte. Câte echipe diferite se pot forma?",
      "answer": 15,
      "solution": "<p>Primul elev poate fi ales în 6 moduri, iar al doilea în 5 moduri: 6 × 5 = 30.</p><p>Fiecare echipă a fost numărată de două ori, deoarece ordinea elevilor nu contează.</p><p>Există 30 / 2 = <strong>15 echipe</strong>.</p>"
    },
    {
      "id": "p2024-7",
      "edition": "2026-08",
      "year": 2026,
      "grade": 7,
      "title": "La mijloc",
      "topic": "Geometrie",
      "statement": "În triunghiul ABC, punctele M și N sunt mijloacele laturilor AB și AC. Dacă BC = 18 cm, determină lungimea segmentului MN, în centimetri.",
      "answer": 9,
      "solution": "<p>Segmentul care unește mijloacele a două laturi ale unui triunghi este linie mijlocie.</p><p>Linia mijlocie este paralelă cu a treia latură și are jumătate din lungimea acesteia.</p><p>Așadar, MN = BC / 2 = 18 / 2 = <strong>9 cm</strong>.</p>"
    },
    {
      "id": "p2024-8",
      "edition": "2026-08",
      "year": 2026,
      "grade": 8,
      "title": "Diferența de pătrate",
      "topic": "Algebră",
      "statement": "Un număr real pozitiv x verifică x − 1/x = 3. Calculează x² + 1/x².",
      "answer": 11,
      "solution": "<p>Ridicăm la pătrat egalitatea: (x − 1/x)² = 9.</p><p>Dezvoltând, obținem x² − 2 + 1/x² = 9.</p><p>Prin urmare, x² + 1/x² = <strong>11</strong>.</p>"
    }
  ],
  "demoResults": [
    {
      "edition": "2026-10",
      "grade": 5,
      "rank": 3,
      "name": "Andrei Neagu",
      "school": "Liceul Exemplu C",
      "score": 95,
      "award": "Premiul III"
    },
    {
      "edition": "2026-10",
      "grade": 5,
      "rank": 6,
      "name": "Adela Ionescu",
      "school": "Liceul Exemplu C",
      "score": 90,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 5,
      "rank": 7,
      "name": "Radu Petrescu",
      "school": "Liceul Exemplu C",
      "score": 87,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 5,
      "rank": 8,
      "name": "Matei Dumitru",
      "school": "Liceul Exemplu B",
      "score": 76,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 5,
      "rank": 10,
      "name": "Cristina Stancu",
      "school": "Liceul Exemplu A",
      "score": 74,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 5,
      "rank": 12,
      "name": "Maria Munteanu",
      "school": "Liceul Exemplu A",
      "score": 68,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 6,
      "rank": 1,
      "name": "Mihai Dobre",
      "school": "Liceul Exemplu B",
      "score": 98,
      "award": "Premiul I"
    },
    {
      "edition": "2026-10",
      "grade": 6,
      "rank": 2,
      "name": "Teodora Cojocaru",
      "school": "Liceul Exemplu A",
      "score": 96,
      "award": "Premiul II"
    },
    {
      "edition": "2026-10",
      "grade": 6,
      "rank": 4,
      "name": "Sofia Lupu",
      "school": "Liceul Exemplu B",
      "score": 93,
      "award": "Mențiune"
    },
    {
      "edition": "2026-10",
      "grade": 6,
      "rank": 5,
      "name": "Luca Roman",
      "school": "Liceul Exemplu B",
      "score": 92,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 6,
      "rank": 9,
      "name": "Gabriel Popescu",
      "school": "Liceul Exemplu C",
      "score": 75,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 6,
      "rank": 10,
      "name": "David Ursu",
      "school": "Liceul Exemplu A",
      "score": 74,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 7,
      "rank": 5,
      "name": "Elena Moraru",
      "school": "Liceul Exemplu A",
      "score": 85,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 7,
      "rank": 6,
      "name": "Ștefan Marin",
      "school": "Liceul Exemplu B",
      "score": 79,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 7,
      "rank": 7,
      "name": "Daniel Sandu",
      "school": "Liceul Exemplu B",
      "score": 74,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 7,
      "rank": 8,
      "name": "Daria Rusu",
      "school": "Liceul Exemplu A",
      "score": 71,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 7,
      "rank": 9,
      "name": "Ana Ciobanu",
      "school": "Liceul Exemplu C",
      "score": 70,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 7,
      "rank": 11,
      "name": "Alexandru Cristea",
      "school": "Liceul Exemplu B",
      "score": 65,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 8,
      "rank": 1,
      "name": "Ioana Nistor",
      "school": "Liceul Exemplu A",
      "score": 96,
      "award": "Premiul I"
    },
    {
      "edition": "2026-10",
      "grade": 8,
      "rank": 2,
      "name": "Vlad Rotaru",
      "school": "Liceul Exemplu A",
      "score": 95,
      "award": "Premiul II"
    },
    {
      "edition": "2026-10",
      "grade": 8,
      "rank": 3,
      "name": "Irina Dinu",
      "school": "Liceul Exemplu B",
      "score": 89,
      "award": "Premiul III"
    },
    {
      "edition": "2026-10",
      "grade": 8,
      "rank": 4,
      "name": "Victor Toma",
      "school": "Liceul Exemplu C",
      "score": 86,
      "award": "Mențiune"
    },
    {
      "edition": "2026-10",
      "grade": 8,
      "rank": 10,
      "name": "Bianca Balan",
      "school": "Liceul Exemplu A",
      "score": 66,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 8,
      "rank": 12,
      "name": "Natalia Ceban",
      "school": "Liceul Exemplu C",
      "score": 64,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 5,
      "rank": 1,
      "name": "Radu Petrescu",
      "school": "Liceul Exemplu B",
      "score": 99,
      "award": "Premiul I"
    },
    {
      "edition": "2026-09",
      "grade": 5,
      "rank": 2,
      "name": "Cristina Stancu",
      "school": "Liceul Exemplu B",
      "score": 97,
      "award": "Premiul II"
    },
    {
      "edition": "2026-09",
      "grade": 5,
      "rank": 3,
      "name": "Daniel Sandu",
      "school": "Liceul Exemplu C",
      "score": 96,
      "award": "Premiul III"
    },
    {
      "edition": "2026-09",
      "grade": 5,
      "rank": 4,
      "name": "Adela Ionescu",
      "school": "Liceul Exemplu C",
      "score": 94,
      "award": "Mențiune"
    },
    {
      "edition": "2026-09",
      "grade": 5,
      "rank": 5,
      "name": "Bianca Balan",
      "school": "Liceul Exemplu A",
      "score": 92,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 5,
      "rank": 8,
      "name": "Andrei Neagu",
      "school": "Liceul Exemplu C",
      "score": 76,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 6,
      "rank": 6,
      "name": "Gabriel Popescu",
      "school": "Liceul Exemplu A",
      "score": 84,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 6,
      "rank": 7,
      "name": "Daria Rusu",
      "school": "Liceul Exemplu C",
      "score": 78,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 6,
      "rank": 9,
      "name": "Sofia Lupu",
      "school": "Liceul Exemplu A",
      "score": 74,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 6,
      "rank": 10,
      "name": "Natalia Ceban",
      "school": "Liceul Exemplu B",
      "score": 71,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 6,
      "rank": 11,
      "name": "Alexandru Cristea",
      "school": "Liceul Exemplu B",
      "score": 68,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 6,
      "rank": 12,
      "name": "Maria Munteanu",
      "school": "Liceul Exemplu C",
      "score": 65,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 7,
      "rank": 1,
      "name": "Mihai Dobre",
      "school": "Liceul Exemplu C",
      "score": 99,
      "award": "Premiul I"
    },
    {
      "edition": "2026-09",
      "grade": 7,
      "rank": 3,
      "name": "Ioana Nistor",
      "school": "Liceul Exemplu C",
      "score": 90,
      "award": "Premiul III"
    },
    {
      "edition": "2026-09",
      "grade": 7,
      "rank": 4,
      "name": "Teodora Cojocaru",
      "school": "Liceul Exemplu A",
      "score": 88,
      "award": "Mențiune"
    },
    {
      "edition": "2026-09",
      "grade": 7,
      "rank": 5,
      "name": "David Ursu",
      "school": "Liceul Exemplu A",
      "score": 87,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 7,
      "rank": 7,
      "name": "Ana Ciobanu",
      "school": "Liceul Exemplu A",
      "score": 81,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 7,
      "rank": 10,
      "name": "Matei Dumitru",
      "school": "Liceul Exemplu C",
      "score": 70,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 8,
      "rank": 2,
      "name": "Ștefan Marin",
      "school": "Liceul Exemplu B",
      "score": 96,
      "award": "Premiul II"
    },
    {
      "edition": "2026-09",
      "grade": 8,
      "rank": 6,
      "name": "Luca Roman",
      "school": "Liceul Exemplu A",
      "score": 85,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 8,
      "rank": 8,
      "name": "Elena Moraru",
      "school": "Liceul Exemplu B",
      "score": 77,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 8,
      "rank": 9,
      "name": "Vlad Rotaru",
      "school": "Liceul Exemplu C",
      "score": 71,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 8,
      "rank": 11,
      "name": "Irina Dinu",
      "school": "Liceul Exemplu A",
      "score": 67,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 8,
      "rank": 12,
      "name": "Victor Toma",
      "school": "Liceul Exemplu C",
      "score": 66,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 5,
      "rank": 3,
      "name": "Ștefan Marin",
      "school": "Liceul Exemplu A",
      "score": 87,
      "award": "Premiul III"
    },
    {
      "edition": "2026-08",
      "grade": 5,
      "rank": 4,
      "name": "Natalia Ceban",
      "school": "Liceul Exemplu B",
      "score": 86,
      "award": "Mențiune"
    },
    {
      "edition": "2026-08",
      "grade": 5,
      "rank": 5,
      "name": "Daria Rusu",
      "school": "Liceul Exemplu A",
      "score": 85,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 5,
      "rank": 7,
      "name": "Teodora Cojocaru",
      "school": "Liceul Exemplu B",
      "score": 81,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 5,
      "rank": 11,
      "name": "Sofia Lupu",
      "school": "Liceul Exemplu C",
      "score": 66,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 5,
      "rank": 12,
      "name": "Vlad Rotaru",
      "school": "Liceul Exemplu C",
      "score": 65,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 6,
      "rank": 1,
      "name": "Bianca Balan",
      "school": "Liceul Exemplu C",
      "score": 92,
      "award": "Premiul I"
    },
    {
      "edition": "2026-08",
      "grade": 6,
      "rank": 2,
      "name": "Alexandru Cristea",
      "school": "Liceul Exemplu B",
      "score": 89,
      "award": "Premiul II"
    },
    {
      "edition": "2026-08",
      "grade": 6,
      "rank": 6,
      "name": "Matei Dumitru",
      "school": "Liceul Exemplu A",
      "score": 82,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 6,
      "rank": 8,
      "name": "Daniel Sandu",
      "school": "Liceul Exemplu B",
      "score": 75,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 6,
      "rank": 9,
      "name": "Luca Roman",
      "school": "Liceul Exemplu B",
      "score": 73,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 6,
      "rank": 10,
      "name": "Victor Toma",
      "school": "Liceul Exemplu B",
      "score": 71,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 7,
      "rank": 2,
      "name": "David Ursu",
      "school": "Liceul Exemplu B",
      "score": 97,
      "award": "Premiul II"
    },
    {
      "edition": "2026-08",
      "grade": 7,
      "rank": 4,
      "name": "Cristina Stancu",
      "school": "Liceul Exemplu B",
      "score": 90,
      "award": "Mențiune"
    },
    {
      "edition": "2026-08",
      "grade": 7,
      "rank": 5,
      "name": "Elena Moraru",
      "school": "Liceul Exemplu B",
      "score": 87,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 7,
      "rank": 6,
      "name": "Andrei Neagu",
      "school": "Liceul Exemplu A",
      "score": 80,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 7,
      "rank": 7,
      "name": "Ioana Nistor",
      "school": "Liceul Exemplu A",
      "score": 77,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 7,
      "rank": 11,
      "name": "Maria Munteanu",
      "school": "Liceul Exemplu C",
      "score": 67,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 8,
      "rank": 1,
      "name": "Mihai Dobre",
      "school": "Liceul Exemplu A",
      "score": 99,
      "award": "Premiul I"
    },
    {
      "edition": "2026-08",
      "grade": 8,
      "rank": 3,
      "name": "Gabriel Popescu",
      "school": "Liceul Exemplu A",
      "score": 96,
      "award": "Premiul III"
    },
    {
      "edition": "2026-08",
      "grade": 8,
      "rank": 8,
      "name": "Radu Petrescu",
      "school": "Liceul Exemplu C",
      "score": 75,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 8,
      "rank": 9,
      "name": "Irina Dinu",
      "school": "Liceul Exemplu B",
      "score": 71,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 8,
      "rank": 10,
      "name": "Ana Ciobanu",
      "school": "Liceul Exemplu A",
      "score": 69,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 8,
      "rank": 12,
      "name": "Adela Ionescu",
      "school": "Liceul Exemplu B",
      "score": 64,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 9,
      "name": "Alexandra Popa",
      "school": "Liceul Exemplu A",
      "score": 98,
      "rank": 1,
      "award": "Premiul I"
    },
    {
      "edition": "2026-10",
      "grade": 9,
      "name": "Rareș Mocanu",
      "school": "Liceul Exemplu B",
      "score": 91,
      "rank": 4,
      "award": "Mențiune"
    },
    {
      "edition": "2026-10",
      "grade": 9,
      "name": "Călin Pavel",
      "school": "Liceul Exemplu C",
      "score": 84,
      "rank": 6,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 9,
      "name": "Diana Enache",
      "school": "Liceul Exemplu A",
      "score": 77,
      "rank": 8,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 9,
      "name": "Tudor Stoica",
      "school": "Liceul Exemplu B",
      "score": 70,
      "rank": 10,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 9,
      "name": "Mara Vasile",
      "school": "Liceul Exemplu C",
      "score": 63,
      "rank": 12,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 10,
      "name": "Elisa Manole",
      "school": "Liceul Exemplu A",
      "score": 92,
      "rank": 3,
      "award": "Premiul III"
    },
    {
      "edition": "2026-10",
      "grade": 10,
      "name": "Paul Rădulescu",
      "school": "Liceul Exemplu B",
      "score": 85,
      "rank": 5,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 10,
      "name": "Sorin Cazacu",
      "school": "Liceul Exemplu C",
      "score": 78,
      "rank": 7,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 10,
      "name": "Amelia Toma",
      "school": "Liceul Exemplu A",
      "score": 71,
      "rank": 9,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 10,
      "name": "Robert Ilie",
      "school": "Liceul Exemplu B",
      "score": 64,
      "rank": 11,
      "award": "—"
    },
    {
      "edition": "2026-10",
      "grade": 10,
      "name": "Iulia Florea",
      "school": "Liceul Exemplu C",
      "score": 93,
      "rank": 2,
      "award": "Premiul II"
    },
    {
      "edition": "2026-09",
      "grade": 9,
      "name": "Diana Enache",
      "school": "Liceul Exemplu A",
      "score": 95,
      "rank": 3,
      "award": "Premiul III"
    },
    {
      "edition": "2026-09",
      "grade": 9,
      "name": "Tudor Stoica",
      "school": "Liceul Exemplu B",
      "score": 88,
      "rank": 6,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 9,
      "name": "Mara Vasile",
      "school": "Liceul Exemplu C",
      "score": 81,
      "rank": 8,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 9,
      "name": "Elisa Manole",
      "school": "Liceul Exemplu A",
      "score": 74,
      "rank": 10,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 9,
      "name": "Paul Rădulescu",
      "school": "Liceul Exemplu B",
      "score": 67,
      "rank": 12,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 9,
      "name": "Sorin Cazacu",
      "school": "Liceul Exemplu C",
      "score": 96,
      "rank": 2,
      "award": "Premiul II"
    },
    {
      "edition": "2026-09",
      "grade": 10,
      "name": "Amelia Toma",
      "school": "Liceul Exemplu A",
      "score": 89,
      "rank": 5,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 10,
      "name": "Robert Ilie",
      "school": "Liceul Exemplu B",
      "score": 82,
      "rank": 7,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 10,
      "name": "Iulia Florea",
      "school": "Liceul Exemplu C",
      "score": 75,
      "rank": 9,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 10,
      "name": "Alexandra Popa",
      "school": "Liceul Exemplu A",
      "score": 68,
      "rank": 11,
      "award": "—"
    },
    {
      "edition": "2026-09",
      "grade": 10,
      "name": "Rareș Mocanu",
      "school": "Liceul Exemplu B",
      "score": 97,
      "rank": 1,
      "award": "Premiul I"
    },
    {
      "edition": "2026-09",
      "grade": 10,
      "name": "Călin Pavel",
      "school": "Liceul Exemplu C",
      "score": 90,
      "rank": 4,
      "award": "Mențiune"
    },
    {
      "edition": "2026-08",
      "grade": 9,
      "name": "Elisa Manole",
      "school": "Liceul Exemplu A",
      "score": 92,
      "rank": 3,
      "award": "Premiul III"
    },
    {
      "edition": "2026-08",
      "grade": 9,
      "name": "Paul Rădulescu",
      "school": "Liceul Exemplu B",
      "score": 85,
      "rank": 6,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 9,
      "name": "Sorin Cazacu",
      "school": "Liceul Exemplu C",
      "score": 78,
      "rank": 8,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 9,
      "name": "Amelia Toma",
      "school": "Liceul Exemplu A",
      "score": 71,
      "rank": 10,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 9,
      "name": "Robert Ilie",
      "school": "Liceul Exemplu B",
      "score": 64,
      "rank": 12,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 9,
      "name": "Iulia Florea",
      "school": "Liceul Exemplu C",
      "score": 93,
      "rank": 2,
      "award": "Premiul II"
    },
    {
      "edition": "2026-08",
      "grade": 10,
      "name": "Alexandra Popa",
      "school": "Liceul Exemplu A",
      "score": 86,
      "rank": 5,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 10,
      "name": "Rareș Mocanu",
      "school": "Liceul Exemplu B",
      "score": 79,
      "rank": 7,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 10,
      "name": "Călin Pavel",
      "school": "Liceul Exemplu C",
      "score": 72,
      "rank": 9,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 10,
      "name": "Diana Enache",
      "school": "Liceul Exemplu A",
      "score": 65,
      "rank": 11,
      "award": "—"
    },
    {
      "edition": "2026-08",
      "grade": 10,
      "name": "Tudor Stoica",
      "school": "Liceul Exemplu B",
      "score": 94,
      "rank": 1,
      "award": "Premiul I"
    },
    {
      "edition": "2026-08",
      "grade": 10,
      "name": "Mara Vasile",
      "school": "Liceul Exemplu C",
      "score": 87,
      "rank": 4,
      "award": "Mențiune"
    }
  ],
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
