import Header from './components/Header.js';
import Loader from './components/Loader.js';

export default class App {
  constructor($target) {
    this.$target = $target;
    this.isLoading = false;

    this.loading = new Loader({ $target });

    this.children = [new Header({ $target })];
    this.render();
  }

  handleLoading(loadStatus) {
    this.isLoading = loadStatus;
    this.loading.setState(this.isLoading);
  }

  render() {
    this.children.forEach((child) => child.render());
  }
}
