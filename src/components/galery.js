class GaleriaImagenes extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .gallery {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    justify-content: center;
                }
                .thumbnail {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    cursor: pointer;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    transition: transform 0.2s;
                }
                .thumbnail:hover {
                    transform: scale(1.1);
                }
                .modal {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
                .modal img {
                    max-width: 90%;
                    max-height: 90%;
                }
                .modal.show {
                    display: flex;
                }
                .modal-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    color: white;
                    font-size: 2em;
                    cursor: pointer;
                }
                .modal-nav.prev {
                    left: 20px;
                }
                .modal-nav.next {
                    right: 20px;
                }
            </style>
            <div class="gallery"></div>
            <div class="modal">
                <span class="modal-nav prev">&#9664;</span>
                <img src="" alt="Expanded Image">
                <span class="modal-nav next">&#9654;</span>
            </div>
        `;

        this.imageUrls = [];
        this.currentIndex = 0;

        this.galleryContainer = this.shadowRoot.querySelector('.gallery');
        this.modal = this.shadowRoot.querySelector('.modal');
        this.modalImage = this.shadowRoot.querySelector('.modal img');
        this.prevButton = this.shadowRoot.querySelector('.modal-nav.prev');
        this.nextButton = this.shadowRoot.querySelector('.modal-nav.next');

        this.prevButton.addEventListener('click', () => this.navigate(-1));
        this.nextButton.addEventListener('click', () => this.navigate(1));
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal || e.target === this.modalImage) {
                this.modal.classList.remove('show');
            }
        });
    }

    static get observedAttributes() {
        return ['images'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'images') {
            this.imageUrls = newValue.split(',');
            this.renderThumbnails();
        }
    }

    renderThumbnails() {
        this.galleryContainer.innerHTML = '';
        this.imageUrls.forEach((url, index) => {
            const img = document.createElement('img');
            img.src = url;
            img.classList.add('thumbnail');
            img.addEventListener('click', () => this.openModal(index));
            this.galleryContainer.appendChild(img);
        });
    }

    openModal(index) {
        this.currentIndex = index;
        this.modalImage.src = this.imageUrls[index];
        this.modal.classList.add('show');
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.imageUrls.length) % this.imageUrls.length;
        this.modalImage.src = this.imageUrls[this.currentIndex];
    }
}

customElements.define('galeria-imagenes', GaleriaImagenes);
