class Modal {
  constructor(modal, activeClass, useModalParent = true, toggleElements = []) {
    this.modal = modal;
    this.toggleElements = [this.modal.children[0], ...toggleElements];
    this.activeClass = activeClass;
    this.useModalParent = useModalParent;
    this.enableModalToggle();
  }

  enableModalToggle() {
    this.toggleElements.forEach((element) =>
      this.addListenerToToggleElement(element)
    );
  }

  addListenerToToggleElement(element) {
    element.addEventListener("click", () => {
      this.toggleModal();
    });
  }

  toggleModal() {
    if (this.useModalParent) {
      this.modal.parentElement.classList.toggle(this.activeClass);
      return;
    }

    this.modal.classList.toggle(this.activeClass);
  }
}
