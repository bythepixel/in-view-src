import Component from '@bythepixel/component-loader';
import runInView from '@bythepixel/run-in-view';

class InViewSrc extends Component {
  static selector = '[data-src]'

  constructor(element) {
    super(element);
    this.boundCleanup = () => this.cleanup();
    this.boundRemoveMaskStyles = () => this.removeMaskStyles();
    this.init.bind(this);
    this.$state = {
      initialized: false,
    };
    runInView(this.$container, () => this.init());
  }

  init() {
    if (this.$state.initialized) return;
    this.$state.initialized = true;
    this.$container.addEventListener('load', this.boundRemoveMaskStyles);
    requestAnimationFrame(() => {
      this.$container.src = this.$container.dataset.src;
    });
  }

  removeMaskStyles() {
    this.$container.addEventListener('transitionend', this.boundCleanup);
    requestAnimationFrame(() => {
      this.$container.style.transition = 'opacity 500ms ease-out';
      this.$container.style.setProperty('--image-opacity', 'initial');
    });
  }

  cleanup() {
    this.$container.removeEventListener('load', this.boundCleanup);
    requestAnimationFrame(() => {
      this.$container.removeAttribute(InViewSrc.selector.replace(/[[\]']+/g, ''));
      this.$container.style.transition = null;
    });
  }
}

export default InViewSrc;
