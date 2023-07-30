import { getScoreboardBackend} from "./smc";
import styles from "../app/app.css";
import { getUserLocal, saveUserLocal } from "./utils";
import { GameCoordinator } from "../app/scripts/core/gameCoordinator";

export function initCoordinator() {
  console.log("init coordinator: ", GameCoordinator);
  let gameCoordinator = new GameCoordinator();
  console.log("gameCoordinator is laoded", gameCoordinator);
}

export async function loadScoreboard() {
  const responseList = document.getElementById("scoreboard");
  while (responseList.firstChild) {
    responseList.removeChild(responseList.firstChild);
  }

  let users = getUserLocal();
  if (users) {
    users.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScore", users[0].score);
    for (let i = 0; i < users.length; i++) {
      const userName = users[i].nickname;
      const score = users[i].score;
      const scoreElements = document.createElement("div");
      const line = `${(i + 1).toString().padStart(2, " ")}-${userName.padEnd(
        30,
        '.'
      )}score:${score.toString().padStart(8, "_")}`;
      scoreElements.innerHTML = `<p style="margin: 3px">
      ${line}</p>`;
      responseList.appendChild(scoreElements);
    }
  } else {
    saveUserLocal([]);
  }
}

window.onload = async () => {
  initCoordinator();
  getScoreboardBackend();
};
