import { useEffect, useState } from "react";
import PapelForm from "./PapelForm";
import "./Usuarios.css";
import { deletePapel, getPapeis, putPapel, postPapel } from "../utils/papel";

export default function Papeis() {
  const [papeis, setPapeis] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [papelASerEditado, setPapelASerEditado] = useState(null);

  function novoPapel() {
    setPapelASerEditado(null);
    setModalVisivel(true);
  }

  async function atualizarPapeis() {
    const papeis = await getPapeis();
    setPapeis(papeis);
  }

  function editarPapel(papel) {
    setPapelASerEditado(papel);
    setModalVisivel(true);
  }

  async function excluirPapelEAtualizar(papel) {
    deletePapel(papel.id);
    atualizarPapeis();
  }

  useEffect(() => {
    atualizarPapeis();
  }, []);

  return (
    <>
      <table>
        <caption>Papéis</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th colSpan="2">Opções</th>
          </tr>
        </thead>
        <tbody>
          {papeis.map((papel) => (
            <tr key={papel.id}>
              <th>{papel.id}</th>
              <td>{papel.descricao}</td>
              <td>
                <span className="btn" onClick={() => editarPapel(papel)}>
                  <i className="bi bi-pencil"></i>
                </span>
              </td>
              <td>
                <span
                  className="btn"
                  onClick={() => excluirPapelEAtualizar(papel)}
                >
                  <i className="bi bi-trash"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="5">
              <button onClick={() => novoPapel()}>Adicionar Papel</button>
            </th>
          </tr>
        </tfoot>
      </table>
      {modalVisivel ? (
        <div className="modal">
          <PapelForm
            papelInicial={papelASerEditado}
            callback={(papelCallback) => {
              setModalVisivel(false);
              if (papelCallback === null) {
                return;
              }

              if (papelCallback.id === 0) {
                postPapel(papelCallback);
              } else {
                putPapel(papelCallback, papelCallback.id);
              }
              atualizarPapeis();
            }}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
