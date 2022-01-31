const saveButton = document.querySelector("button.save");
const modal = document.querySelector(".modal");

saveButton.addEventListener("click", function () {
  modal.classList.toggle("modal-active");
});
