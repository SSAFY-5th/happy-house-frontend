import api from '../api/api.js';
import { getStringMaxLen } from '../utils/snippet.js';

export default class Map {
  constructor({ $target, handleLoading }) {
    this.handleLoading = handleLoading;
    this.mapWrapper = document.createElement('section');

    $target.appendChild(this.mapWrapper);

    this.render();
    this.fetchCity();
    this.fetchGu();
    this.fetchDong();
  }

  fetchCity = async () => {
    try {
      const data = await api.getCity();
      const sidoSelect = document.getElementById('sido');

      if (data.length > 0) {
        sidoSelect.innerHTML = '';

        const len = getStringMaxLen(data, 'sido_name');

        data.forEach((each) => {
          const myOption = document.createElement('option');
          myOption.text =
            '# ' +
            '＿'.repeat(len - [...each.sido_name].length) +
            each.sido_name;
          myOption.value = each.sido_code;
          sidoSelect.appendChild(myOption);
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  fetchGu = () => {
    const gugun = document.getElementById('gugun');
    gugun.addEventListener('click', () => {
      this.handleLoading(true);
      setTimeout(async () => {
        try {
          const data = await api.getDong(document.getElementById('sido').value);
          const gugunSelect = gugun;

          if (data.length > 0) {
            gugunSelect.innerHTML = '';

            const len = getStringMaxLen(data, 'gugun_name');

            data.forEach((each) => {
              const myOption = document.createElement('option');
              myOption.text =
                '# ' +
                '＿'.repeat(len - [...each.gugun_name].length) +
                each.gugun_name;
              myOption.value = each.gugun_code;
              gugunSelect.appendChild(myOption);
            });
          }
        } catch (e) {
          console.warn(e);
        }

        this.handleLoading(false);
      }, 1000);
    });
  };

  fetchDong = () => {
    const gugun = document.getElementById('dong');
    gugun.addEventListener('click', () => {
      this.handleLoading(true);
      setTimeout(async () => {
        try {
          const data = await api.getGugun(
            document.getElementById('gugun').value
          );
          const dongSelect = document.getElementById('dong');

          if (data.length > 0) {
            dongSelect.innerHTML = '';

            const len = getStringMaxLen(data, 'dong');

            data.forEach((each) => {
              const myOption = document.createElement('option');
              myOption.text =
                '# ' + '＿'.repeat(len - [...each.dong].length) + each.dong;
              myOption.value = each.dong;
              dongSelect.appendChild(myOption);
            });
          }
        } catch (e) {
          console.warn(e);
        }

        this.handleLoading(false);
      }, 1000);
    });
  };

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
