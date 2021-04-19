export default class Loader {
  constructor({ $target, isLoading }) {
    this.loaderWrapper = document.createElement('div');
    this.loaderWrapper.className = 'loader-wrapper';

    $target.appendChild(this.loaderWrapper);

    const loader = document.createElement('div');
    loader.className = 'loader';
    this.loaderWrapper.appendChild(loader);

    this.isLoading = isLoading;

    this.render();
  }

  setState(status) {
    this.isLoading = status;
    this.render();
  }

  render() {
    if (this.isLoading) {
      this.loaderWrapper.removeAttribute(
        'style',
      );
    } else {
      this.loaderWrapper.setAttribute(
        'style',
        'display: none !important;'
      );
    }
  }
}
