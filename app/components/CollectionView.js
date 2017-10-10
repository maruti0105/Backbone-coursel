import Marionette from 'backbone.marionette';
import Backbone from 'backbone';
import ItemView from './ItemView';

export default Marionette.CollectionView.extend({
  tagName: 'div',
  className: 'carousels',
  childView: ItemView
});
