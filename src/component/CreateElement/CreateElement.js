const CreateElement = (tag, className) => {
  const domElement = document.createElement(tag);

  if (className) {
    domElement.classList.add(className);
  }
  return domElement;
};

export default CreateElement;
