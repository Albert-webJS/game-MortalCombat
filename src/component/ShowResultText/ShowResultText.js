import createElement from '../CreateElement/CreateElement.js'

const ShowResultText = function (name) {
  const showTitle = createElement("div", "showTitle");

  name
    ? (showTitle.innerText = `${name} wins`)
    : (showTitle.innerText = "Draw");

  return showTitle;
};

export default ShowResultText;
