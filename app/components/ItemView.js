import Marionette from 'backbone.marionette';
import template from '../templates/item.jst';

export default Marionette.View.extend({
  template: template,

  ui: {
    prev: '#prev',
    next: '#next',
    list: '.bb-carousel-list',
    main: '.bb-random-image'
  },

  events: {
    'click @ui.prev': 'prev',
    'click @ui.next': 'next'
  },

  initialize() {
    const options = this.model.attributes;
    this.title = options.title || "";
    this.images = options.images || [];
    this.toShow = options.show || 4;
    this.first = 0;
    this.last = this.toShow;
  },

  build() {
    if(!this.images.length) {
      return;
    }

    const callback = (image) => {
      return `<li><img src="${image}" class='carousel-item'></li>`;
    };

    this.display = _.map(this.images, callback);
  },

  onRender() {
    this.bindUIElements();
    this.build();
    this.displayItems();
  },

  prev(e) {
    e.preventDefault();
    if(this.first <= 0) {
        return;
    }

    this.first -= this.toShow;
    this.last -= this.toShow;
    this.displayItems();
  },

  next(e) {
    e.preventDefault();
    if(this.last >= this.images.length) {
        return;
    }

    this.first += this.toShow;
    this.last += this.toShow;
    this.displayItems();
  },

  randomImage() {
    let total = this.images.length - 1;
    let random = _.random(this.first, this.last - 1);

    if(random > total) {
      random = total;
    }

    this.main = this.images[random];
    this.ui.main.html(`<img src=${this.main} >`);
  },

  displayItems() {
    this.handleDisabledState();
    this.randomImage();
    this.ui.list.html(this.display.slice(this.first, this.last).join(''));
  },

  handleDisabledState() {
    if(this.first <= 0) {
      this.ui.prev.addClass('disabled');
    } else {
      this.ui.prev.removeClass('disabled');
    }

    if(this.last >= this.images.length) {
      this.ui.next.addClass('disabled');
    } else {
      this.ui.next.removeClass('disabled');
    }
  }
});
