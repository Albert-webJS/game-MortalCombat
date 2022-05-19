import CreateElement from "../CreateElement/CreateElement.js";

const CreateReloadButton = () => {
  const reloadWrap = CreateElement("div", "reloadWrap");
  const reloadButton = CreateElement("button", "button");

  reloadButton.innerText = "Restart";
  reloadWrap.append(reloadButton);

  return reloadWrap;
};

export default CreateReloadButton;
