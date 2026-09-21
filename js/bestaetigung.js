// Daten aus dem sessionStorage holen
const gespeicherteDaten = sessionStorage.getItem("spendenDaten");

if (gespeicherteDaten) 
{
    const daten = JSON.parse(gespeicherteDaten);

    document.getElementById("bestaetigung-kleidung").innerHTML = daten.clothes;
    document.getElementById("bestaetigung-krisengebiet").innerHTML = daten.location;
    document.getElementById("bestaetigung-datum").innerHTML = daten.datum;
    document.getElementById("bestaetigung-uhrzeit").innerHTML = daten.uhrzeit;
    document.getElementById("bestaetigung-ort").innerHTML = daten.ort;
}
