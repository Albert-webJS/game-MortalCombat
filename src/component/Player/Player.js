import CreateElement from "../CreateElement/CreateElement.js";

class Player {
  constructor(props) {
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.player = props.player;
    this.selector = `player${this.player}`;
    this.rootSelector = props.rootSelector;
  }

  changeHP = (damage) => {
    this.hp -= damage;

    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  elHP = () => {
    return document.querySelector(`.${this.selector} .life`);
  };

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`;
  };

  createPlayer = () => {
    const hero = CreateElement("div", this.selector);
    const progressbar = CreateElement("div", "progressbar");
    const character = CreateElement("div", "character");

    const life = CreateElement("div", "life");
    const playerName = CreateElement("div", "name");

    const palyerImg = CreateElement("img");

    hero.append(progressbar, character);
    progressbar.append(life, playerName);
    character.append(palyerImg);

    life.style.width = `${this.hp}%`;
    playerName.innerText = this.name;
    palyerImg.src = this.img;

    const root = document.querySelector(`.${this.rootSelector}`);
    root.append(hero);

    return hero;
  };
}

export default Player;
