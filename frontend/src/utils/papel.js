export function deletePapel(idPapel) {
  return fetch(`http://127.0.0.1:8080/papel/${idPapel}`, {
    method: "DELETE",
  });
}

export function getPapeis() {
  return fetch("http://127.0.0.1:8080/papel").then((res) => res.json());
}

export function postPapel(papel) {
  fetch(`http://127.0.0.1:8080/papel`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(papel),
  });
}

export function putPapel(papel) {
  fetch(`http://127.0.0.1:8080/papel/${papel.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(papel),
  });
}

export function formatarTextoPapeis(papeis) {
  return papeis.map((papel) => papel.descricao).join(", ");
}
