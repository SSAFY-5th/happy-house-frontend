export default class Footer {
  constructor({ $target }) {
    this.footerWrapper = document.createElement('section');

    $target.appendChild(this.footerWrapper);
    this.render();
  }

  render = () => {
    const template = `
        <div style="height: 1000px; width: 100%"></div>
    `;

    this.footerWrapper.insertAdjacentHTML('afterbegin', template);
  };
}
