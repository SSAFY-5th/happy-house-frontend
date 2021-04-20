import Header from './components/Header.js';
import Section from './components/Section.js';
import Map from './components/Map.js';
import Footer from './components/Footer.js';
import Loader from './components/Loader.js';
import api from './api/api.js';
import { getStringMaxLen } from './utils/snippet.js'
import { locations, opt } from './assets/constants.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.isLoading = false;

    this.loading = new Loader({ $target, isLoading: false });

    this.children = [
      new Header({ $target }),
      new Section({ $target }),
      new Map({ $target }),
      new Footer({ $target }),
    ];
    this.render();

    this.map = new google.maps.Map(document.getElementById('map'), opt);
    this.initMap();

    this.handleClickToSearch();

    this.fetchGu();
    this.fetchDong();
  }

  initMap = () => {
    const infowindow = new google.maps.InfoWindow();

    for (let i = 0; i < locations.length; i++) {
      const marker = new google.maps.Marker({
        id: i,
        title: locations[i][0],
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        icon: './src/assets/marker.svg',
        map: this.map,
      });

      google.maps.event.addListener(
        marker,
        'click',
        ((marker, i) => {
          return () => {
            infowindow.setContent(locations[i][0]);
            infowindow.open(this.map, marker);
          };
        })(marker, i)
      );

      if (marker) {
        marker.addListener('click', () => {
          console.log(marker.title);
          this.map.setZoom(15);
          this.map.panTo(marker.getPosition());
        });
      }
    }
  };

  handleLoading = (loadStatus) => {
    this.isLoading = loadStatus;
    this.loading.setState(this.isLoading);
  };

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

  fetchGu = () => {
    const gugun = document.getElementById('gugun');
    gugun.addEventListener('click', async () => {
      this.loading.setState(true);
      setTimeout(async () => {
        this.loading.setState(false);
      }, 1000)

      try {
        const data = await api.getDong(document.getElementById('sido').value);
        const gugunSelect = document.getElementById('gugun');

        if (data.length > 0) {
          gugunSelect.innerHTML = '';

          const len = getStringMaxLen(data, 'gugun_name');

          data.forEach((each) => {
            const myOption = document.createElement('option');
            myOption.text = '# ' + '＿'.repeat(len - [...each.gugun_name].length) + each.gugun_name;
            myOption.value = each.gugun_code;
            gugunSelect.appendChild(myOption);
          });
        }
      } catch (e) {
        console.warn(e);
      }
    });
  };

  fetchDong = async () => {
    const gugun = document.getElementById('dong');
    gugun.addEventListener('click', async () => {
      this.loading.setState(true);
      setTimeout(async () => {
        this.loading.setState(false);
      }, 1000)

      try {
        const data = await api.getGugun(document.getElementById('gugun').value);
        const dongSelect = document.getElementById('dong');

        if (data.length > 0) {
          dongSelect.innerHTML = '';

          const len = getStringMaxLen(data, 'dong');

          data.forEach((each) => {
            const myOption = document.createElement('option');
            myOption.text = '# '+ '＿'.repeat(len - [...each.dong].length)  + each.dong;
            myOption.value = each.code;
            dongSelect.appendChild(myOption);
          });
        }
      } catch (e) {
        console.warn(e);
      }
    });
  };

  render = () => {
    this.children.forEach((child) => child.render());
  };
}
