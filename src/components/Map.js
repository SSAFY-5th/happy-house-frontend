import api from '../api/api.js';
import { getStringMaxLen } from '../utils/snippet.js';

export default class Map {
  constructor({ $target }) {
    this.mapWrapper = document.createElement('section');

    $target.appendChild(this.mapWrapper);
  }

  render = () => {
    const template = `
        <div class="map">
            <div class="map-title-wrap">
                <div class="map-title-text">
                    <span>
                        <select id="sido">
                            <option value="11"># 서울특별시</option>
                        </select>
                    </span>
                    <span>
                        <select id="gugun">
                            <option value="0"># ＿＿＿＿구</option>
                        </select>
                    </span>
                    <span>
                        <select id="dong">
                            <option value="0"># ＿＿＿＿동</option>
                        </select>
                    </span>
                </div>
            </div>
            <div id="map"></div>
        </div>
    `;

    this.mapWrapper.insertAdjacentHTML('afterbegin', template);
  };
}
