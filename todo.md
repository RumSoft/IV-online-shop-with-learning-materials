#TODO

## to ma byc zrobione jak najszybciej, 

bo po skończeniu tych ośmiu zadań dojdzie na nie kolejna iteracja poprawek, wydaje mi się że to po tym to już finish.

Zostało przemyśleć jeszcze co z notyfikacjami PUSH


*** 

0) w `UserPanel2` - stronie jakiegoś użytkownika (cudowna nazwa XD) - trzeba zrobić aby notatki pokazywało korzystając z komponentu tego co jest na głównej stronie - pasku "Ostatnie notatki"

1) jeśli `(!localStorage["cookiesAccepted"])` to pokaże się taki pasek cookies jak np. na `http://www.newappointmentsgroup.co.uk/` 
`"akceptuj"` go chowa i dodaje do `localStorage["cookiesAccepted"]=true` (poszukać w kodzie jak używać localStorage w razie problemów, lub w google)
guzik "więcej informacji" przekierowuje do strony `.../rodo`

2) Dokończenie panelu użytkownika (`UserPanel`)
wyświetlanie kupionych notatek - trzeba dopisać do noteService metodę która to zwraca

3) używanie komponentu `MyTextField` we wszystkich polach tekstowych login/rejestracja/dodanie notatki
nie należy się przejmować wyświetlaniem błędu walidacji od razu, to później się rozszerzy

4) w loginPanel gdy mamy być przekierowani   `if(redirectData && redirectData.to)` powinno pokazywać link na który nas przekierowuje 
`"Musisz się zalogować aby przejść na stronę {redirectData.to}"`

5) Komponent "Historia Płatności" - będzie pobierał z serwera dane, zwracane w taki sposób: 
Np:
```[
  { 
    "Date": "jakaś data",
    "Notes: [ 
      {
        "Id":"1212412124",
        "Name":"Moja super notatka"
      },
      {
        "Id":"109241980241-241-25214,
        "Name":"ujebany projekt z SI"
      }
      ],
     "Status": 4 //(jakiś numerek) - później sie go przerobi na nazwę statusu
  },
  { 
    "Date": "jakaś data 2",
    "Notes: [
      {
        "Id":"109241980241-241-25214,
        "Name":"ujebany projekt z SI 2"
      }
    ],
    Status": 0 //(jakiś numerek) - później sie go przerobi na nazwę statusu
  }
]  
```
		

6) Komponent "Moje zarobki" - lista zarobionych na poszczególnych notatkach; będzie pobierał z serwera dane, zwracane w taki sposób: 

```[
  { 
    "Id": "192418241-412-412-4124"
    "Name":"ujebane sprawko SI"
    "Price": 10.5,
    "Purchases": 5,
    "Profit": 52.5
  },
  { 
    "Id": "192418241-412-412-4126"
    "Name":"zdane sprawko z SI"
    "Price": 10.5,
    "Purchases": 50,
    "Profit": 525
  }
]  
```

7) Zrobienie "placeholderów" dla różnych stron/komponentów - tak jak to jest w NotePanel
zanim strona się załaduje to widoczny jest NotePanelPlaceholder


## podane obiekty w formacie JSON można bez problemu wstawić do kodu
```
let mojazmienna = ...wklejacie.... ;
```
