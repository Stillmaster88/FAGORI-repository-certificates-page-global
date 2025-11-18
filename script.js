/* ---------- CARRUSEL DE IMÁGENES ---------- */
let index = 0;
const slides = document.querySelectorAll(".slider-container img");

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 4000);



/* ---------- FUNCIÓN CUANDO SELECCIONAN UN EVENTO ---------- */
function seleccionarEvento(evento) {
  document.getElementById("evento").value = evento;
  document.location.hash = "inicio";  
}



/* ---------- BUSCAR CERTIFICADO ---------- */
document.getElementById("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const cedula = document.getElementById("cedula").value.trim();
  const evento = document.getElementById("evento").value;

  if (!cedula || !evento) {
    document.getElementById("resultado").innerHTML =
      "<p style='color:red;'>Debes ingresar tu cédula y seleccionar un evento.</p>";
    return;
  }

  // ARCHIVO PDF SEGÚN EVENTO (Debes subirlos a GitHub en /certificados/)
  const pdfRoutes = {
    santotomun: `certificados/santotomun/${cedula}.pdf`,
    paz: `certificados/paz/${cedula}.pdf`,
    foro: `certificados/foro/${cedula}.pdf`
  };

  const pdfUrl = pdfRoutes[evento];

  // Verificar si el archivo existe
  fetch(pdfUrl)
    .then(res => {
      if (res.ok) {
        document.getElementById("resultado").innerHTML = `
          <a href="${pdfUrl}" target="_blank" class="btn-descargar">
            Descargar certificado en PDF
          </a>`;
      } else {
        document.getElementById("resultado").innerHTML = `
          <p style='color:red;'>No se encontró certificado para esta cédula en este evento.</p>`;
      }
    })
    .catch(() => {
      document.getElementById("resultado").innerHTML =
        "<p style='color:red;'>Error al buscar el certificado.</p>";
    });
});
