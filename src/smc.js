import { loadScoreboard } from "./init";
import { getUserLocal, saveUserLocal } from "./utils";

console.log("init smc module...");

export async function saveUserContactBackend(user) {
  // TODO: this should work at the backend side
  console.log("execute transaction");
/*  const network = {
    endpoint: "https://rpc.constantine.archway.tech",
    prefix: "archway",
  };
  let encodedString =
    "Ymx1ciBkb3ZlIHplcm8gbnV0IG9wZW4gYmFjaGVsb3IgdHJ1c3QgcmVwZWF0IGNsaWVudCBkcmlsbCBvcGVyYSB3b3JkIHR5cGUgYnV6eiBidXNpbmVzcyBsZWdlbmQgYWRkcmVzcyBsaWJlcnR5IHByaWRlIGluc3RhbGwgdHJhcCBoYXdrIGNhY3R1cyBzaGFsbG93";
  const walletMnemonic = atob(encodedString);

  console.log("wallet...");
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(walletMnemonic, {
    prefix: network.prefix,
  });
  console.log("wallet created: ", wallet);

  console.log("creating client...");
  const client = await SigningArchwayClient.connectWithSigner(
    network.endpoint,
    wallet
  );

  console.log("execute transaction with user:", user);
  const { transactionHash } = await client.execute(
    walletAddress,
    smartContract,
    {
      AddTopUser: {
        user: {
          address: user.address,
          name: user.name,
          score: user.score,
        },
      },
    },
    "auto"
  );
  loadScoreboard();
  console.log("hash:", transactionHash);*/
}


export async function executeStoreWinner(score) {
  console.log("score", score);
  let nickName = document.getElementById("nickName").value;
  if (!nickName) {
    nickName = "undefined";
  }

  let userToStore = {
    name: nickName,
    address: walletAddress,
    score: score,
  };
/*
  // TODO: add method to check if user beat the record before the smart contract execution
  let storedUsers = getUserLocal(); // TODO: read from smart contract instead of local storage
  if (storedUsers && storedUsers.length == 100) {
    // TODO: read contrac max, keep from useless transactions...
    storedUsers.sort((a, b) => b.score - a.score);
    lastUser = storedUsers[storedUsers.length - 1];
    let betterThenLast = userToStore.score >= lastUser.score;
    if (betterThenLast) {
      console.log("user beat previous record...");
      // storedUsers.pop();
      // storedUsers.push(userToStore);
      // saveUserLocal(storedUsers);
      // saveUserContact(userToStore);
      saveUserContactBackend(userToStore);
    }
  } else {
    console.log("still have room for the record...");
    // storedUsers.push(userToStore);
    // saveUserLocal(storedUsers); // save to local storage for development
    // saveUserContact(userToStore);
    saveUserContactBackend(userToStore);
  }*/
}

export function saveUserContact(user) {
  console.log("save user :", user);
  /*signingClient
    .execute(
      walletAddress,
      smartContract,
      {
        AddTopUser: {
          user: {
            address: user.address,
            name: user.name,
            score: user.score,
          },
        },
      },
      "auto"
    )
    .then((response) => {
      console.log("executed after finishing the game. Response: ", response);
      loadScoreboard();
      console.log(
        `execute smart contract\n User ${user.name}: with score: ${user.score}`
      );
    });*/
}
