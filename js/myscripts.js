console.log("ENTRA");
const center = [25.50124, -103.55115];
const zoom = 15;

const popup = document.querySelector(".popup");
const inputlatitud = document.querySelector(".latitud");
const inputlongitude = document.querySelector(".longitude");
const inputlocation = document.querySelector(".location");
const buttonCancel = document.querySelector(".Cancel");
const buttonSave = document.querySelector(".Save");
const supaBaseUrl = "https://kljsngydtenvmbefhwth.supabase.co";
const supaBaseKey = "sb_publishable_ZoS2YhaUUCFSyHYTGnfNhA_G5fjAP_W";

supabase = window.supabase.createClient(supaBaseUrl, supaBaseKey);

buttonCancel.addEventListener("click", (e) => {
  e.preventDefault();
  popup.close();
});

buttonSave.addEventListener("click", async (e) => {
  e.preventDefault();
  lat = inputlatitud.value;
  lng = inputlongitude.value;
  loc = inputlocation.value;

  const { error } = supabase.from("cordinates").insert([
    {
      latitud: lat,
      longitud: lng,
      location_name: loc,
    },
  ]);

  console.error(error);

  popup.close();
});
// 2) Create the map
const map = L.map("map").setView(center, zoom);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

async function cargarIconosalIniciar() {
  const { data, error } = await supabase.from("cordinates".select("*"));

  data.forEach((renglon) => {
    clickMarker = L.marker([renglon.latitud, renglon.longitud]).addTo(map);
  });

  alert(error);
}

cargarIconosalIniciar();

let clickMarker = null; //PARA CREAR MARCADORES

map.on("click", async (e) => {
  const { lat, lng } = e.latlng; //e.latlng ES TOMAR LA LAT Y LONG DE DONDE CLICK
  console.log(lat, lng);
  inputlatitud.value = lat;
  inputlongitude.value = lng;

  popup.showModal();
  clickMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup("Marcador agregado en Lati:" + lat.toFixed(6) + lng.toFixed(6));
  clickMarker.openPopup();

  clickMarker.openPopup();
});
