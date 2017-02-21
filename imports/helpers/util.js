export default function showModal(header, msg ) {
  document.getElementById("modalTitle").innerHTML = header;
  document.getElementById("textoModal").innerHTML = msg;
  $('#myModal').modal('show');
}
