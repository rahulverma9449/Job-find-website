// Wait for the document to be ready
$(document).ready(function() {
    // Get the modal and the button
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("openModalBtn");

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
