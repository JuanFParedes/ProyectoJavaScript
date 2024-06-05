import { LitElement, html, css } from 'lit';

class ApiDataList extends LitElement {
  static styles = css`
    /* Estilos encapsulados */
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      cursor: pointer;
      margin-bottom: 5px;
    }
    li:hover {
      background-color: #f0f0f0;
    }
    .details {
      font-size: 0.9em;
      margin-left: 20px;
      display: none;
    }
    .active {
      display: block;
    }
  `;

  static properties = {
    dataList: { type: Array },
    activeItem: { type: Object },
  };

  constructor() {
    super();
    this.dataList = [];
    this.activeItem = null;
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      this.dataList = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  render() {
    return html`
      <button @click=${this.fetchData}>Actualizar datos</button>
      <ul>
        ${this.dataList.map(
          item => html`
            <li @click=${() => this.showDetails(item)}>
              ${item.name}
              <div class="details ${this.activeItem === item ? 'active' : ''}">
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Teléfono:</strong> ${item.phone}</p>
                <p><strong>Website:</strong> ${item.website}</p>
              </div>
            </li>
          `
        )}
      </ul>
    `;
  }

  showDetails(item) {
    this.activeItem = item === this.activeItem ? null : item;
  }
}

customElements.define('api-data-list', ApiDataList);
