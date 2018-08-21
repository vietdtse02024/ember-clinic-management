import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/setting/index/role', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/setting/index/role');
    assert.ok(route);
  });
});
