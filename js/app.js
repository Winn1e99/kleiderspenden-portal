console.log("app.js läuft");

// Referenz-PLZ als globale Konstante ganz oben definieren
const GESCHAEFTSSTELLE_PLZ = "60314";

const radios = document.querySelectorAll('input[name="uebergabeweg"]');
const abholFelder = document.getElementById("abholFelder");
const abholInputs = abholFelder.querySelectorAll("input");
const formular = document.getElementById("spendenFormular");
const plzInput = document.getElementById("plz");

function felderAktualisieren() 
{
    const gewaehlt = document.querySelector('input[name="uebergabeweg"]:checked').value;
    console.log("Übergabeweg:", gewaehlt);

    if (gewaehlt === "abholung") 
    {
        abholFelder.classList.remove("d-none");
        // Pflichtfelder wieder aktivieren (E-Mail bleibt optional)
        abholInputs.forEach(function (feld) 
        {
            if (feld.id !== "email") // E-Mail bleibt optional
            {
                feld.required = true;
            }
        });
    }
    else 
    {
        abholFelder.classList.add("d-none");
        // Ausgeblendete Felder dürfen nicht mehr required sein
        abholInputs.forEach(function (feld) 
        {
            feld.required = false;
        });
    }
}

//Reine PLZ-Prüflogik in eigene Funktion ausgelagert
function plzIstImAbholgebiet() 
{
    const eingegebenePLZ = plzInput.value.trim();
    const referenzPrefix = GESCHAEFTSSTELLE_PLZ.substring(0, 2);
    const kundenPrefix = eingegebenePLZ.substring(0, 2);

    return kundenPrefix === referenzPrefix; // liefert true oder false
}

formular.addEventListener("submit", function (event) 
{
    event.preventDefault(); // Standard-Formularübermittlung verhindern
    console.log("Formular abgeschickt");

    const gewaehlt = document.querySelector('input[name="uebergabeweg"]:checked').value;
    if (gewaehlt === "abholung" && !plzIstImAbholgebiet()) 
    {
        console.log("PLZ-Prüfung FEHLGESCHLAGEN: Nicht im selben Gebiet.");
        alert("Abholung nicht möglich: Die Postleitzahl muss mit 60 beginnen (Gebiet Frankfurt).");
        return;
    }
    console.log("PLZ-Prüfung ERFOLGREICH oder Geschäftsstelle gewählt.");

});

radios.forEach(function (radio) 
{
    radio.addEventListener('change', felderAktualisieren);
});

felderAktualisieren(); // Initialer Aufruf, um den Zustand beim Laden der Seite zu setzen