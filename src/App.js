import Loader from './components/Loader.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.isLoading = false;

    this.loading = new Loader({ $target });
  handleLoading(loadStatus) {
    this.isLoading = loadStatus;
    this.loading.setState(this.isLoading);
  }

  }
}
