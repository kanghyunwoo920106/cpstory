import React from "react";

function auth(props) {
  return <div></div>;
}

export function removeToken() {
  localStorage.removeItem("access_token");
}

export default auth;
