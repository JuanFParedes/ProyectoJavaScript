import { LitElement, html, css } from 'lit';

class IMCCalculador extends LitElement {
  static styles = css`
    .imc-calculator {
      margin: 20px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      max-width: 300px;
    }
    .imc-calculator h1 {
      font-size: 1.5em;
      margin-bottom: 10px;
    }
    .imc-calculator label {
      display: block;
      margin-top: 10px;
    }
    .imc-calculator input {
      width: calc(100% - 22px);
      padding: 10px;
      margin-top: 5px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .imc-calculator button {
      padding: 10px 20px;
      border: none;
      background-color: #007bff;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
    .imc-calculator button:hover {
      background-color: #0056b3;
    }
    .imc-calculator p {
      margin-top: 10px;
      font-size: 1.2em;
    }
    .imc-calculator img {
      margin-top: 10px;
      max-width: 100%;
      border-radius: 5px;
    }
  `;

  static properties = {
    altura: { type: Number },
    peso: { type: Number },
    imcResultado: { type: Number },
    imcCategoria: { type: String },
    imcImagen: { type: String }
  };

  constructor() {
    super();
    this.altura = 0;
    this.peso = 0;
    this.imcResultado = null;
    this.imcCategoria = '';
    this.imcImagen = '';
  }

  calculateIMC() {
    const alturaEnMetros = this.altura / 100;
    this.imcResultado = this.peso / (alturaEnMetros * alturaEnMetros);
    this.determineCategory();
  }

  determineCategory() {
    if (this.imcResultado < 18.5) {
      this.imcCategoria = 'Bajo peso';
      this.imcImagen = 'public/img/bajo-peso.jpg';
    } else if (this.imcResultado >= 18.5 && this.imcResultado < 24.9) {
      this.imcCategoria = 'Peso normal';
      this.imcImagen = 'public/img/peso-normal.jpg';
    } else if (this.imcResultado >= 25 && this.imcResultado < 29.9) {
      this.imcCategoria = 'Sobrepeso';
      this.imcImagen = 'public/img/sobrepeso.png';
    } else {
      this.imcCategoria = 'Obesidad';
      this.imcImagen = 'public/img/obesidad.jpg';
    }
  }

  render() {
    return html`
      <div class="imc-calculator">
        <h1>Calculadora de IMC</h1>
        <label for="height">Altura (cm):</label>
        <input id="height" type="number" @input="${(e) => this.altura = e.target.value}">
        <label for="weight">Peso (kg):</label>
        <input id="weight" type="number" @input="${(e) => this.peso = e.target.value}">
        <button @click="${this.calculateIMC}">Calcular IMC</button>
        ${this.imcResultado !== null ? html`
          <p>Tu IMC es: ${this.imcResultado.toFixed(2)}</p>
          <p>Clasificación: ${this.imcCategoria}</p>
          <img src="${this.imcImagen}" alt="${this.imcCategoria}">
        ` : ''}
      </div>
    `;
  }
}

customElements.define('imc-calculador', IMCCalculador);


