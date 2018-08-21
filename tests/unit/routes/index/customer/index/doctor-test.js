import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | index/customer/index/doctor', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:index/customer/index/doctor');
    assert.ok(route);
  });
});
