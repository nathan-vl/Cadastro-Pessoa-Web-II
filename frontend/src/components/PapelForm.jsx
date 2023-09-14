import { useState } from "react";
import "./UsuarioForm.css";

export default function PapelForm({ papelInicial, callback }) {
  const editando = papelInicial !== null;

  const [papel, setPapel] = useState(
    editando ? papelInicial : { id: 0, nome: "", papeis: [] }
  );

  return (
    <div className="form">
      <div>
        <label htmlFor="descricao">Descrição:</label>
        <input
          id="descricao"
          type="text"
          value={papel.descricao}
          onChange={(e) => setPapel({ ...papel, descricao: e.target.value })}
        />
      </div>

      <div className="btns">
        <button onClick={() => callback(null)}>Cancelar</button>
        <button onClick={() => callback(papel)}>
          {editando ? "Atualizar Papel" : "Adicionar Papel"}
        </button>
      </div>
    </div>
  );
}
