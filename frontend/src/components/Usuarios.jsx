import { useEffect, useState } from "react";
import UsuarioForm from "./UsuarioForm";
import "./Usuarios.css";
import {
  deleteUsuario,
  getUsuarios,
  putUsuario,
  postUsuario,
} from "../utils/usuario";
import { formatarTextoPapeis } from "../utils/papel";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [usuarioASerEditado, setUsuarioASerEditado] = useState(null);

  function novoUsuario() {
    setUsuarioASerEditado(null);
    setModalVisivel(true);
  }

  async function atualizarUsuarios() {
    setUsuarios(await getUsuarios());
  }

  function editarUsuario(usuario) {
    setUsuarioASerEditado(usuario);
    setModalVisivel(true);
  }

  async function excluirUsuarioEAtualizar(usuario) {
    deleteUsuario(usuario.id);
    atualizarUsuarios();
  }

  useEffect(() => {
    atualizarUsuarios();
  }, []);

  return (
    <>
      <table>
        <caption>Usuários</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Papéis</th>
            <th colSpan="2">Opções</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <th>{usuario.id}</th>
              <td>{usuario.nome}</td>
              <td>{formatarTextoPapeis(usuario.papeis)}</td>
              <td>
                <span className="btn" onClick={() => editarUsuario(usuario)}>
                  <i className="bi bi-pencil"></i>
                </span>
              </td>
              <td>
                <span
                  className="btn"
                  onClick={() => excluirUsuarioEAtualizar(usuario)}
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
              <button onClick={() => novoUsuario()}>Adicionar Usuário</button>
            </th>
          </tr>
        </tfoot>
      </table>
      {modalVisivel ? (
        <div className="modal">
          <UsuarioForm
            usuarioInicial={usuarioASerEditado}
            callback={(usuarioCallback) => {
              setModalVisivel(false);
              if (usuarioCallback === null) {
                return;
              }

              if (usuarioCallback.id === 0) {
                postUsuario(usuarioCallback);
              } else {
                putUsuario(usuarioCallback);
              }
              atualizarUsuarios();
            }}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
