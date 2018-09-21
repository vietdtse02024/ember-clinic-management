import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/' }, function() {
    this.route('welcome');

    this.route('setting', function() {
      this.route('index', { path: '/' }, function() {
        this.route('option');
        this.route('role');
        this.route('staff');
      });
    });

    this.route('customer', function() {
      this.route('index', { path: '/' }, function() {
        this.route('customer');
        this.route('doctor');
      });
    });
    this.route('product', function() {
      this.route('index', { path: '/' }, function() {
        this.route('product');
        this.route('product-group');
        this.route('unit');
        this.route('country');
        this.route('producer');
        this.route('supplier');
        this.route('barcode');
      });
    });

    this.route('storage', function() {
      this.route('index', { path: '/' }, function() {
        this.route('input-storage');
      });
    });
  });

  this.route('authen', function() {
    this.route('login');
  });
});

export default Router;
