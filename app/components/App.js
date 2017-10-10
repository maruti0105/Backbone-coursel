import Marionette from 'backbone.marionette';
import collection from './CarouselCollection';
 import CollectionView from './CollectionView';
import ItemView from './ItemView';

export default Marionette.Application.extend({
  region: '#app',

  onStart() {
    this.showView(new CollectionView({ collection }));
  }

});
