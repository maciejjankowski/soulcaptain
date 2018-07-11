# SoulCaptain
Dream your dream!

## Readings
https://news.ycombinator.com/item?id=16515080

## [Soul Backlog](https://gitlab.com/maciejjankowski/soulcaptain/boards?scope=all&utf8=%E2%9C%93&state=opened&assignee_username=roktiw)

---

# Kontrakt Macieja i Wiktora

# BHP

## 0.1 ŚRODOWISKO
1. UWAGA! Branch develop i master są z każdym merdżem wystawiane produkcyjnie.
2. master https://soulcaptain-app.azurewebsites.net/
3. develop https://soulcaptain-dev.azurewebsites.net/
4. Przed merdżem do mastera robimy gruntowne testowanie i omówienie jakie zmiany wchodzą na produkcję.
5. Wyjątek: HOTFIX; gdy cała produkcja leży i trzeba zrobić szybką, małą poprawkę, żeby przywrócić serwis.

## 0.2 FICZER BRANCZE  
1. Testujemy/pracujemy na branczu develop - do niego robimy wszystkie pull requesty.
2. Oddzielny branch per ficzer, np. "zmiany na blogu", "potwierdzenie kasowania karty".

## 0.3 EDYTOR I PRACA Z KODEM   
1. Używamy Visual Code Sudio.
2. Używamy domyślnego formatera kodu VS Code (nie używamy Prettier i Beutify).
3. Jak będziemy umieli zmieniać fomyślną konfigurację formattera:
4. Pomiędzy nazwą property a wartością poperty Maciej mieć spację, np. 
```js
    {
        czytokot : "tak"
    }   
```
5. Jeśli formatujesz plik, to najpierw Pull Request z formatowaniem, dopiero potem z nowym kodem.

---

## PLAN SPOTKANIA

### 1. JEDZENIE
1. Przed kodzeniem jemy pyszne, lekkie, zdrowe i koszerne jedzenie.
2. Nie rozmawiamy o kodzeniu, rozmawiamy o wszystkich innych sprawach.

### 2. MIEJSCE
* mini_dev - idziemy do kawiarni lub innego miejsca gdzie można wygodnie zasiąść do kodzenia i gdzie człowiek nie jest nadmiernie rozpraszany atmosferą.
* Możemy chodzić do hackerspace
* main_dev - dom, pusta firma lub spokojnie miejsce

### 3. PRZEDPLANOWANIE 15M
* Odpalić edytor lokalny, przejrzeć i wypchnąć
* Odpalić Glitch, przejrzeć i wypchnąć
* Wejść na Github i zmerdżować
* Stworzyć branch z datą kodzenia

## 4. PLANOWANIE 15M
* Co zamierzamy dziś zrobić. Jaka będzie Definition of Done na dziś.
* Jak zamierzamy to zrobić. Jakimi narzędziami.
* Czy będą jakieś przeszkody? Czy będziemy potrzebować do tego pomocy?

### 5. ROZGRZEWKA 15M
* Proste zadanie w ramach tego co umiemy kodować, np. poprawka lub upsrawnienie widoku logowania. 

### 6. MAIN DEVELOPEMENT 3 x 45M
* Tu każdy pracuje jak może nad tym co było na planowaniu. Nie uczymy się nowych rzeczy, tylko robimy to co umiemy. Czyli Wiktor robi głównie HTML i CSS a nie stara się zrozumieć jak co działa. 2 x 45M, 2H 45MIN

### 7. MINI RETRO 15M
* Patrzymy co zrobiliśmy i się chwalimy (morale).
* Czy był dobry flow?
* Czy nie było złej energii?
* Co można zrobić lepiej?
* Co robimy za tydzień?
