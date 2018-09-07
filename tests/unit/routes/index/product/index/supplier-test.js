import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/product/index/supplier', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/product/index/supplier');
    assert.ok(route);
  });
});
