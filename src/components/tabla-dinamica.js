import { LitElement, html, css } from 'lit';
class TablaDinamica extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    .input-row {
      display: flex;
      margin-bottom: 10px;
    }
    .input-row input {
      margin-right: 10px;
    }
    .delete-row-button {
      background-color: #f44336;
      color: white;
      border: none;
      cursor: pointer;
    }
    .delete-row-button:hover {
      background-color: #da190b;
    }
  `;
  constructor() {
    super();
    this.tableData = [];
  }
  render() {
    return html`
      <div class="input-row">
        <input id="name-input" type="text" placeholder="Nombre">
        <input id="age-input" type="text" placeholder="Edad">
        <button @click="${this.addRow}">Agregar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          ${this.tableData.map((row, index) => html`
            <tr>
              <td>${row.name}</td>
              <td>${row.age}</td>
              <td><button class="delete-row-button" @click="${() => this.deleteRow(index)}">Eliminar</button></td>
            </tr>
          `)}
        </tbody>
      </table>
    `;
  }
  addRow() {
    const nameInput = this.shadowRoot.getElementById('name-input').value.trim();
    const ageInput = this.shadowRoot.getElementById('age-input').value.trim();
    if (nameInput && ageInput) {
      this.tableData = [...this.tableData, { name: nameInput, age: ageInput }];
      this.requestUpdate();
      this.shadowRoot.getElementById('name-input').value = '';
      this.shadowRoot.getElementById('age-input').value = '';
    }
  }
  deleteRow(index) {
    this.tableData.splice(index, 1);
    this.requestUpdate();
  }
}
customElements.define('tabla-dinamica', TablaDinamica);
