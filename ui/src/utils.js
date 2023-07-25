export function saveUserLocal(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function getUserLocal() {
  let users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(localStorage.getItem("users"));
  } else {
    return undefined;
  }
}
