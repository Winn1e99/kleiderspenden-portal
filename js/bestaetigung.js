// Daten aus dem sessionStorage holen
const gespeicherteDaten = sessionStorage.getItem("spendenDaten");

if (gespeicherteDaten) 
{
    const daten = JSON.parse(gespeicherteDaten);

    document.getElementById("bestaetigung-kleidung").textContent = daten.clothes;
    document.getElementById("bestaetigung-krisengebiet").textContent = daten.location;
    document.getElementById("bestaetigung-datum").textContent = daten.datum;
    document.getElementById("bestaetigung-uhrzeit").textContent = daten.uhrzeit;
    document.getElementById("bestaetigung-ort").textContent = daten.ort;
}
