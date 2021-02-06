import fetch from "isomorphic-unfetch";

export async function read(...args) {
  const res = await fetch(...args);
  return res.json();
}

export async function create(url, body) {
  read(url, {
    method: "POST",
    body: JSON.stringify(body)
  });
}

export async function update(url, body) {
  read(url, {
    method: "PUT",
    body: JSON.stringify(body)
  });
}

export async function del(url, body) {
  read(url, {
    method: "DELETE",
    body: JSON.stringify(body)
  });
}
