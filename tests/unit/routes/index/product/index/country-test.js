import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/product/index/country', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/product/index/country');
    assert.ok(route);
  });
});
