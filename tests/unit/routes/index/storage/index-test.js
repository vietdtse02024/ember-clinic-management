import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/storage/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/storage/index');
    assert.ok(route);
  });
});
