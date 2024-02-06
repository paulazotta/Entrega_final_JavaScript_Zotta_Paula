const confirmarCompra = document.getElementById("confirmarCompra");
const btn = document.createElement("button")
btn.innerText = "Completar compra"
btn.className = "btn btn-secondary"
btn.onclick = () => ejecutarCompra ();

confirmarCompra.appendChild(btn);

function ejecutarCompra (){
    Swal.fire({
        title: "Hacé click para confirmar tu compra",
        text: "",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Tu compra ha sido exitosa",
            text: "",
            icon: "success"
          });
        }
      });
}




