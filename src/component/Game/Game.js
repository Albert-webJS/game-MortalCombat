import Player from "../Player/Player.js";
import { getRandom } from "../../utils/getRandom.js";
import { generateLogs } from "../../../main.js";

let player1;
let player2;

class Game {
  getPlayers = async () => {
    const body = fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/players"
    ).then((response) => response.json());
    return body;
  };
  start = async () => {
    const players = await this.getPlayers();

    const p1 = players[getRandom(players.length)];
    const p2 = players[getRandom(players.length)];

    player1 = new Player({
      ...p1,
      player: 1,
      rootSelector: "arenas",
    });
    player2 = new Player({
      ...p2,
      player: 2,
      rootSelector: "arenas",
    });

    player1.createPlayer();
    player2.createPlayer();

    generateLogs("start", player1, player2);
  };
}

export default Game;
