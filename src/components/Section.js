export default class Section {
  constructor({ $target }) {
    this.sectionWrapper = document.createElement('section');

    $target.appendChild(this.sectionWrapper);
    this.scroll();
  }

  scroll = () => {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      const checkPoint = document.getElementById('wrapper').clientHeight - 400;

      let opacity = 0;
      if (currentScroll <= checkPoint) {
        opacity = 1 - currentScroll / checkPoint;
      }

      document.querySelector('#text').style.opacity = opacity;
      document.querySelector('#text').style.fontSize = opacity * 8 + 'vw';
    });
  };

  render = () => {
    const template = `
      <div id="wrapper">
        <div id="text-section">
          <p id="text">
            FIND,
            <br/>
            NEW HOUSE
          </p>
        </div>
      </div>
    `;

    this.sectionWrapper.insertAdjacentHTML('afterbegin', template);
  };
}
