console.log("app.js läuft");

const radios = document.querySelectorAll('input[name="uebergabeweg"]');
const abholFelder = document.getElementById("abholFelder");
const abholInputs = abholFelder.querySelectorAll("input");
const formular = document.getElementById("spendenFormular");

formular.addEventListener("submit", function(event)
{
    // Überprüfen, ob die Pflichtfelder ausgefüllt sind
    event.preventDefault(); // Standard-Formularübermittlung verhindern
    console.log("Formular abgeschickt");
});

function felderAktualisieren() 
{
    const gewaehlt = document.querySelector('input[name="uebergabeweg"]:checked').value;
    console.log("Übergabeweg:", gewaehlt);

    if (gewaehlt === "abholung") 
    {
        abholFelder.classList.remove("d-none");
        // Pflichtfelder wieder aktivieren (E-Mail bleibt optional)
        abholInputs.forEach(function(feld)
        {
            if(feld.id !== "email") // E-Mail bleibt optional
            {
                feld.required = true;
            }
        });
    }
    else
    { 
        abholFelder.classList.add("d-none");
        // Ausgeblendete Felder dürfen nicht mehr required sein
        abholInputs.forEach(function(feld)
        {
            feld.required = false;
        });
    }
}

radios.forEach(function(radio) 
{
    radio.addEventListener('change', felderAktualisieren);
});

felderAktualisieren(); // Initialer Aufruf, um den Zustand beim Laden der Seite zu setzen