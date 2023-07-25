import axios from 'axios';
import { loadScoreboard } from "./init";
import { getUserLocal, saveUserLocal } from "./utils";

console.log("init smc module...");

export async function getScoreboardBackend() {
  const response = await axios.get('/api/scoreboard/');
  saveUserLocal(response.data);
}


export async function saveUserContactBackend(userScore) {
  axios.post('/api/scoreboard/', JSON.stringify(userScore), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export async function executeStoreWinner(score) {
  console.log("Uploading score", score);
  let nickName = document.getElementById("nickName").value;
  let email = document.getElementById("email").value;
  if (!email) {
    return;
  }
  if (!nickName) {
    nickName = email;
  }

  let userToStore = {
    nickname: nickName,
    email: email,
    score: score,
  };

  saveUserContactBackend(userToStore);

  let storedUsers = getUserLocal();
  if (storedUsers && storedUsers.length >= 20) {
    storedUsers.sort((a, b) => b.score - a.score);
    lastUser = storedUsers[storedUsers.length - 1];
    let betterThenLast = userToStore.score >= lastUser.score;
    if (betterThenLast) {
      console.log("user beat previous record...");
      getScoreboardBackend();
      loadScoreboard();
    }
  }
  else {
    getScoreboardBackend();
    loadScoreboard();
  }
}
