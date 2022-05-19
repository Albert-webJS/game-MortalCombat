import Player from "./src/component/Player/Player.js";
import CreateReloadButton from "./src/component/CreateReloadButton/CreateReloadButton.js";
import ShowResultText from "./src/component/ShowResultText/ShowResultText.js";
import { getRandom } from "./src/utils/getRandom.js";
import { getTime } from "./src/utils/getTime.js";
import { HIT, ATTACK } from "./src/constants/constants.js";
import { LOGS } from "./src/constants/logs.js";
import { ARENAS } from "./src/constants/constants.js";
import Game from "./src/component/Game/Game.js";



const FORM = document.querySelector(".control");
const buttonControl = document.querySelector(".button");
const chat = document.querySelector(".chat");

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3)];
  const defence = ATTACK[getRandom(3)];

  return {
    value: HIT[hit],
    hit,
    defence,
  };
};

const playerAttack = () => {
  const attack = {};

  for (let item of FORM) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }

    item.checked = false;
  }
  return attack;
};

const showResult = () => {
  if (kitana.hp === 0 || scorpion.hp === 0) {
    buttonControl.disabled = true;
    const reloadButton = CreateReloadButton();

    reloadButton.addEventListener("click", () => {
      window.location.reload();
    });
    ARENAS.append(reloadButton);
  }

  if (kitana.hp === 0 && kitana.hp < scorpion.hp) {
    ARENAS.append(ShowResultText(scorpion.name));
    generateLogs("end", scorpion, kitana);
  } else if (scorpion.hp === 0 && scorpion.hp < kitana.hp) {
    ARENAS.append(ShowResultText(kitana.name));
    generateLogs("end", kitana, scorpion);
  } else if (kitana.hp === 0 && scorpion.hp === 0) {
    ARENAS.append(ShowResultText());
    generateLogs("draw");
  }
};

const getTextLogo = (type, playerName1, playerName2) => {
  switch (type) {
    case "start":
      return LOGS[type]
        .replace("[player1]", playerName1)
        .replace("[player2]", playerName2)
        .replace("[time]", getTime());
      break;
    case "hit":
      return LOGS[type][getRandom(LOGS[type].length)]
        .replace("[playerKick]", playerName1)
        .replace("[playerDefence]", playerName2);
      break;
    case "defence":
      return LOGS[type][getRandom(LOGS[type].length)]
        .replace("[playerKick]", playerName1)
        .replace("[playerDefence]", playerName2);
      break;
    case "end":
      return LOGS[type][getRandom(LOGS[type].length)]
        .replace("[playerWins]", playerName1)
        .replace("[playerLose]", playerName2);
      break;
    case "draw":
      return LOGS[type];
      break;
  }
};

export const generateLogs = (
  type,
  { name } = {},
  { name: playerName2, hp } = {},
  valueAttack
) => {
  let text = getTextLogo(type, name, playerName2);

  switch (type) {
    case "hit":
      text = `${getTime()} ${text} -${valueAttack} [${hp}/100]`;
      break;
    case "defence":
    case "end":
    case "draw":
      text = `${getTime()} ${text}`;
      break;
  }

  const element = `<p>${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", element);
};

FORM.addEventListener("submit", (event) => {
  event.preventDefault();
  const {
    hit: hitEnemy,
    defence: defenceEnemy,
    value: valueEnemy,
  } = enemyAttack();
  const {
    hit: hitAttack,
    defence: defenceAttack,
    value: valueAttack,
  } = playerAttack();

  if (defenceAttack !== hitEnemy) {
    kitana.changeHP(valueEnemy);
    kitana.renderHP();
    generateLogs("hit", scorpion, kitana, valueEnemy);
  } else {
    generateLogs("defence", scorpion, kitana);
  }

  if (defenceEnemy !== hitAttack) {
    scorpion.changeHP(valueAttack);
    scorpion.renderHP();
    generateLogs("defence", kitana, scorpion, valueAttack);
  } else {
    generateLogs("defence", kitana, scorpion);
  }

  showResult();
});

const game = new Game()

game.start()




