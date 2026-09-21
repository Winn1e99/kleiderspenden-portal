console.log("app.js läuft");

// Referenz-PLZ als globale Konstante ganz oben definieren
const GESCHAEFTSSTELLE_PLZ = "60314";

const radios = document.querySelectorAll('input[name="uebergabeweg"]');
const abholFelder = document.getElementById("abholFelder");
const abholInputs = abholFelder.querySelectorAll("input");
const formular = document.getElementById("spendenFormular");
const plzInput = document.getElementById("plz");
const plzHinweisBox = document.getElementById("plzHinweisBox");
const btnZuGeschaeftsstelle = document.getElementById("btnZuGeschaeftsstelle");

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
            feld.value = ""; // Eingaben löschen, wenn die Felder ausgeblendet werden
        });

        // Wenn auf Geschäftstelle gewechselt wird = Fehler/Boxen entfernen
        fehleranzeigeZuruecksetzen();
    }
}

// Reine PLZ-Prüflogik in eigene Funktion ausgelagert
function plzIstImAbholgebiet() 
{
    const eingegebenePLZ = plzInput.value.trim();
    const referenzPrefix = GESCHAEFTSSTELLE_PLZ.substring(0, 2);
    const kundenPrefix = eingegebenePLZ.substring(0, 2);

    return kundenPrefix === referenzPrefix; // liefert true oder false
}

function fehleranzeigeZuruecksetzen()
{
    plzInput.classList.remove("is-invalid");
    plzHinweisBox.classList.add("d-none");
}

formular.addEventListener("submit", function (event) 
{
    event.preventDefault(); // Standard-Formularübermittlung verhindern
    console.log("Formular abgeschickt");

    // Wichtig: Fehleranzeige vor jedem neuen Absenden zurücksetzen
    fehleranzeigeZuruecksetzen();

    const gewaehlt = document.querySelector('input[name="uebergabeweg"]:checked').value;
    if (gewaehlt === "abholung" && !plzIstImAbholgebiet()) 
    {
        console.log("PLZ-Prüfung FEHLGESCHLAGEN: Nicht im selben Gebiet.");
        // Roter Rahmen und Fehlermeldung am Feld
        plzInput.classList.add("is-invalid");
        // Gelbe Hinweisbox mit Button einblenden
        plzHinweisBox.classList.remove("d-none");
        plzInput.focus(); // Setzt den Fokus auf das PLZ-Feld, damit der Benutzer sofort sieht, wo das Problem liegt
        return;
    }
    console.log("PLZ-Prüfung ERFOLGREICH oder Geschäftsstelle gewählt.");
 
    // Text der Auswahllisten holen
    const clothesSelect = document.getElementById("clothes");
    const locationSelect = document.getElementById("location");
    const clothesText = clothesSelect.options[clothesSelect.selectedIndex].text;
    const locationText = locationSelect.options[locationSelect.selectedIndex].text;

    // Datum und Uhrzeit der Registrierung erzeugen
    const jetzt = new Date();
    const datumText = jetzt.toLocaleDateString("de-DE");
    const uhrzeitText = jetzt.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

    // Ort bestimmen je nach Übergabeweg
    let ortText = "";
    if (gewaehlt === "geschaeftsstelle") {
        ortText = "Geschäftsstelle (Hanauer Landstraße 210, 60314 Frankfurt am Main)";
    } else {
        const strasse = document.getElementById("strasse").value.trim();
        const plz = plzInput.value.trim();
        const ort = document.getElementById("ort").value.trim();
        ortText = `Abholung an: ${strasse}, ${plz} ${ort}`;
    }

    // Datenobjekt schnüren und im sessionStorage ablegen
    const spendenDaten = {
        clothes: clothesText,
        location: locationText,
        datum: datumText,
        uhrzeit: uhrzeitText,
        ort: ortText
    };

    sessionStorage.setItem("spendenDaten", JSON.stringify(spendenDaten));

    // Formular zurücksetzen
    formular.reset();

    // Weiterleiten auf die Bestätigungsseite
    window.location.href = "bestaetigung.html";
});

radios.forEach(function (radio) 
{
    radio.addEventListener('change', felderAktualisieren);
});

// Klick auf die Schaltfläche in der gelben Hinweisbox
btnZuGeschaeftsstelle.addEventListener("click", function ()
{
    document.getElementById("geschaeftsstelle").checked = true; // 1. Radiobutton auf Geschäftsstelle setzen
    felderAktualisieren(); // 2. Formularansicht aktualisieren (da JS kein 'change'-Event auslöst)
});

// Fehlermarkierung und Hinweisbox sofort entfernen, sobald die PLZ geändert wird
plzInput.addEventListener("input", fehleranzeigeZuruecksetzen);

felderAktualisieren(); // Initialer Aufruf, um den Zustand beim Laden der Seite zu setzen