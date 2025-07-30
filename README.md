# Projekt: Gra 2D stworzona w JavaScript oraz Canvas
## *Zjadanie kulek*
**Autor: Mikołaj Wojciechowski**

---

## Spis treści

1. Wprowadzenie  
   a) Uruchomienie gry  
   b) Zasady gry  
   c) Sterowanie  

2. Struktura aplikacji  
   a) Plik `index.html`  
   b) Plik `main.js`  
   c) Folder `script/`  

3. Wnioski końcowe  
   a) Napotkane problemy  
   b) Możliwość rozbudowy  
   c) Uwagi końcowe  

---

## 1. Wprowadzenie

Gra jest inspirowana popularnym tytułem *agar.io*. Umożliwia rozgrywkę jednoosobową z przeciwnikami sterowanymi przez AI. Rozgrywka polega na sterowaniu kulką, zbieraniu mniejszych obiektów (jedzenia), unikaniu większych przeciwników oraz zarządzaniu przyspieszeniem.  
Celem gry jest osiągnięcie wyniku 2000 punktów lub przetrwanie jak najdłużej bez zostania zjedzonym przez przeciwnika.

### a) Uruchomienie gry

Grę uruchamia się, otwierając plik `index.html` w dowolnej nowoczesnej przeglądarce (np. Chrome, Firefox, Edge). Wszystkie pliki powinny znajdować się w tej samej strukturze katalogów, jak dostarczono.

![Ekran startowy](https://github.com/user-attachments/assets/4f5cd30e-66f5-49a3-a281-257b42189b3d)

### b) Zasady gry

Gracz steruje kulką, zjadając mniejsze od siebie przeciwniki oraz zielone jedzenie (zielone kulki), by rosnąć. W grze występują przeciwnicy sterowani przez AI, którzy również zbierają jedzenie i mogą się nawzajem zjadać.

Sztuczna inteligencja przeciwników opiera się na prostych zasadach: poruszają się losowo, odbijając się od ścian, a po zbliżeniu gracza, zaczynają go ścigać.

Gra kończy się, gdy gracz:
- osiągnie 2000 punktów (zwycięstwo), lub
- zostanie zjedzony przez większego przeciwnika (porażka).

![Rozgrywka](https://github.com/user-attachments/assets/1b516422-4dd7-4ef3-ba04-cfc753be1e96)

Po zakończeniu gry pojawia się ekran z wynikiem i przyciskiem "Zagraj ponownie", który resetuje stan gry.

![Ekran końcowy](https://github.com/user-attachments/assets/ab2c96a6-ca92-4cc3-9f83-53749bab76e8)

### c) Sterowanie

Sterowanie odbywa się za pomocą myszy (ruch) oraz klawisza SHIFT (sprint). Sprint działa przez maksymalnie 1 sekundę i posiada pasek ładowania.

---

## 2. Struktura aplikacji

### a) Plik `index.html`

Zawiera podstawową strukturę dokumentu HTML. Znajduje się tam element `canvas`, w którym renderowana jest gra, oraz elementy UI takie jak przyciski start/replay, pasek sprintu i wynik punktowy. Główny skrypt dołączony jest poprzez odwołanie do `main.js`.

### b) Plik `main.js`

Zawiera główną logikę gry, m.in.:
- Obsługa zdarzeń klawiatury i myszy
- Inicjalizacja i pętla gry
- Obsługa sprintu i punktacji
- Warunki zwycięstwa i przegranej
- Aktualizacja i renderowanie gracza, przeciwników i jedzenia
- Dynamiczna aktualizacja paska sprintu

### c) Folder `script/`

Zawiera osobne pliki z klasami:
- `player.js` – klasa `Player`, odpowiada za sterowanie i sprint gracza
- `enemy.js` – klasa `Enemy`, zawiera prostą logikę AI przeciwników
- `food.js` – klasa `Food`, odpowiedzialna za generowanie jedzenia
- `utils.js` – funkcje pomocnicze, np. obliczanie dystansu, kolizje

---

## 3. Wnioski końcowe

### a) Napotkane problemy

- Problem z odradzaniem przeciwników bezpośrednio na graczu — rozwiązano przez dodanie timera przezroczystości dla nowo zrespionych przeciwników.
- Sprint był nadużywany — ograniczono go do 1 sekundy, z widocznym paskiem ładowania.

### b) Potencjalna rozbudowa aplikacji

- Dodanie trybu multiplayer
- Ulepszenie AI przeciwników, np. unikanie siebie nawzajem
- Rozszerzenie mapy i wprowadzenie przesuwania kamery
- Różnorodność typów jedzenia i bonusów (np. dłuższy sprint, tymczasowa nieśmiertelność)

### c) Uwagi końcowe

Kod gry został podzielony na moduły (folder `script/`), co pozwala na łatwiejsze zarządzanie projektem oraz jego przyszłą rozbudowę.
