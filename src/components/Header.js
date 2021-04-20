export default class Header {
  constructor({ $target }) {
    this.headerWrapper = document.createElement('nav');

    $target.appendChild(this.headerWrapper);
    this.render();
    this.handleClickToSearch();
  }

  handleClickToSearch = () => {
    const button = document.querySelector('#toSearch');
    button.addEventListener('click', () => {
      window.scrollTo({
        top: document.getElementById('wrapper').clientHeight - 58,
        left: 0,
        behavior: 'smooth',
      });
    });
  };
  render = () => {
    const template = `
        <div class="header-container">
            <div class="header-left">
                <div class="header-logo-text"># 해피하우스 🔥</div>
            </div>
            <div class="header-right">
                <div class="header-button"><a id="toSearch" href="#">매물 찾기</a></div>
                <div class="header-button "><button class="header-button-primary" href="#">로그인</button></div>
            </div>
        </div>
    `;

    this.headerWrapper.insertAdjacentHTML('afterbegin', template);
  };
}
