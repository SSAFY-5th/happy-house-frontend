import Header from './components/Header.js';
import Section from './components/Section.js';
import Map from './components/Map.js';
import Info from './components/Info.js';
import Footer from './components/Footer.js';
import Loader from './components/Loader.js';
import api from './api/api.js';
import { locations, opt } from './assets/constants.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.isLoading = false;

    this.loading = new Loader({ $target, isLoading: false });
    this.header = new Header({ $target });
    this.section = new Section({ $target });
    this.map = new Map({ $target, handleLoading: this.handleLoading });
    this.info = new Info({ $target });
    this.footer = new Footer({ $target });

    this.map = new google.maps.Map(document.getElementById('map'), opt);

    this.initMap();

    this.fetchApt();
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

  initializeMap = (lat = 37.5665734, lng = 126.978179, zoom = 12) => {
    const multi = {
      lat,
      lng,
    };

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: multi,
      zoom,
    });
  };

  addMarker = (tmpLat, tmpLng, aptName) => {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(parseFloat(tmpLat), parseFloat(tmpLng)),
      label: {
        text: aptName,
        color: 'black',
        fontSize: '10px',
        fontWeight: 'bold',
      },
      icon: './src/assets/marker.svg',
      title: aptName,
    });
    marker.addListener('click', () => {
      this.map.setZoom(17);
      this.map.setCenter(marker.getPosition());
      callHouseDealInfo();
    });
    marker.setMap(this.map);
  };

  fetchApt = () => {
    const apt = document.getElementById('dong');
    apt.addEventListener('change', () => {
      this.handleLoading(true);
      setTimeout(async () => {
        try {
          const data = await api.getApt(apt.options[apt.selectedIndex].value);

          if (data.length > 0) {
            this.info.renderProps(data);
            this.initializeMap();
            data.forEach(({ lat, lng, aptName }, index) => {
              this.addMarker(lat, lng, aptName);
              if (index === data.length - 1) {
                this.map.setZoom(15);
                this.map.setCenter({
                  lat: parseFloat(lat),
                  lng: parseFloat(lng),
                });
              }
            });
          }
        } catch (e) {
          console.warn(e);
        }

        this.handleLoading(false);
      }, 1000);
    });
  };

  handleLoading = (loadStatus) => {
    this.isLoading = loadStatus;
    this.loading.setState(this.isLoading);
  };
}
