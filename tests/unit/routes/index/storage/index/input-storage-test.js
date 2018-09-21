import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/storage/index/input-storage', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/storage/index/input-storage');
    assert.ok(route);
  });
});
