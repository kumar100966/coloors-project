class Modal {
  constructor(modal, activeClass, useModalParent = true, toggleElements = []) {
    this.element = modal;
    this.toggleElements = [this.element.children[0], ...toggleElements];
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
      this.element.parentElement.classList.toggle(this.activeClass);
      return;
    }

    this.element.classList.toggle(this.activeClass);
  }
}
