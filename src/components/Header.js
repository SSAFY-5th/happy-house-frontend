export default class Header {
  constructor({ $target }) {
    this.headerWrapper = document.createElement('nav');

    $target.appendChild(this.headerWrapper);
  }

  render() {
    const template = `
        <div class="header-container">
            <div class="header-left">
                <div class="header-logo">HAPPY HOUSE 🏘</div>
            </div>
            <div class="header-right">
                <div class="header-button"><a href="#">매물 찾기</a></div>
                <div class="header-button "><button class="header-button-primary" href="#">로그인</button></div>
            </div>
        </div>
    `;

    this.headerWrapper.insertAdjacentHTML('afterbegin', template);
  }
}
