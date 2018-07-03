import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', function() {
    this.route('account', function() {
      this.route('login');
    });
  });
});

export default Router;
