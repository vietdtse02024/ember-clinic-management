import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/product/index/unit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/product/index/unit');
    assert.ok(route);
  });
});
