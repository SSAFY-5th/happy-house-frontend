export default class Info {
  constructor({ $target }) {
    this.infoWrapper = document.createElement('section');
    this.infoWrapper.id = 'info-section';

    $target.appendChild(this.infoWrapper);
  }

  renderProps = (data) => {
    if (data.length) {
      document.getElementById('info-section').innerHTML = '';
      const template = `
        <div class="info-wrapper">
            ${data.map((each) => {
            return `
                <div class="info-container">
                    <div class="info">
                        <div class="info-title">
                            ${each.aptName}
                        </div>
                        <div class="info-bottom">
                            <div class="info-jibun">
                                지번: ${each.jibun}
                            </div>
                            <div class="info-lat-lng">
                                위도/경도: ${parseFloat(each.lat).toFixed(3)}, ${parseFloat(each.lng).toFixed(3)}
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('')}
        </div>
      `;
      console.log(template)

      this.infoWrapper.insertAdjacentHTML('afterbegin', template);
    }
  };
}
