export function deleteUsuario(idUsuario) {
  return fetch(`http://127.0.0.1:8080/usuario/${idUsuario}`, {
    method: "DELETE",
  });
}

export function getUsuarios() {
  return fetch("http://127.0.0.1:8080/usuario").then((res) => res.json());
}

export function postUsuario(usuario) {
  fetch(`http://127.0.0.1:8080/usuario`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(usuario),
  });
}

export function putUsuario(usuario) {
  fetch(`http://127.0.0.1:8080/usuario${usuario.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(usuario),
  });
}
