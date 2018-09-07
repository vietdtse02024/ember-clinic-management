import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/product/index/product-group', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/product/index/product-group');
    assert.ok(route);
  });
});
