import { useEffect, useState } from "react";
import "./UsuarioForm.css";
import { getPapeis } from "../utils/papel";
import Selector from "./Selector";

export default function UsuarioForm({ usuarioInicial, callback }) {
  async function atualizarPapeis() {
    const papeis = await getPapeis();
    setPapeis(papeis);
  }

  function removerPapel(papel) {
    setUsuario({
      ...usuario,
      papeis: usuario.papeis.filter((p) => p.id !== papel.id),
    });
  }

  function adicionarPapel() {
    console.log("adicionado papel", papelSelecionado);
    for (const papel of usuario.papeis) {
      if (papel.id === papelSelecionado.id) {
        return;
      }
    }

    setUsuario({
      ...usuario,
      papeis: [...usuario.papeis, papelSelecionado],
    });
  }

  const editando = usuarioInicial !== null;

  const [usuario, setUsuario] = useState(
    editando ? usuarioInicial : { id: 0, nome: "", papeis: [] }
  );
  const [papeis, setPapeis] = useState([]);
  const [papelSelecionado, setPapelSelecionado] = useState({});

  useEffect(() => {
    atualizarPapeis();
  });

  useEffect(() => {
    if (papeis.length > 0) {
      setPapelSelecionado(papeis[0]);
    }
  }, [papeis]);

  return (
    <div className="form">
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          type="text"
          value={usuario.nome}
          onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="papeis">Papéis:</label>
        {usuario.papeis.length === 0 ? (
          ""
        ) : (
          <>
            <ul>
              {usuario.papeis.map((papel) => (
                <li key={papel.id}>
                  <span>{papel.descricao}</span>
                  <span className="btn" onClick={() => removerPapel(papel)}>
                    <i className="bi bi-x-circle"></i>
                  </span>
                </li>
              ))}
            </ul>

            <Selector
              style={{ display: "inline" }}
              options={papeis}
              optionToString={(papel) => papel.descricao}
              handleChange={(papel) => setPapelSelecionado(papel)}
            />
            <span
              onClick={() => adicionarPapel()}
              style={{ paddingLeft: "15px" }}
            >
              <i className="bi bi-plus-square-fill"></i>
            </span>
          </>
        )}
      </div>

      <div className="btns">
        <button onClick={() => callback(null)}>Cancelar</button>
        <button onClick={() => callback(usuario)}>
          {editando ? "Atualizar Usuário" : "Adicionar Usuário"}
        </button>
      </div>
    </div>
  );
}
