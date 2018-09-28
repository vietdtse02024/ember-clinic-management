import Component from '@ember/component';
export default Component.extend({

  parent: null,
  eventName: null,

  tooltipShown: false,

  didInsertElement: function() {
    this._super(...arguments);

    // sub
    var parent = this.get('parent');
    var eventName = this.get('eventName');
    if (parent && eventName) {
      parent.on(eventName, this, 'showTooltip');
      parent.on('removeTooltip', this, 'removeTooltip');
    }
  },

  willDestroyElement: function() {
    this.removeTooltip();
    var parent = this.get('parent');
    var eventName = this.get('eventName');

    if (parent && eventName) {
      parent.off(eventName, this, 'showTooltip');
    }
  },

  showTooltip: function(title) {
    title = title.string || title;
    let $input = this.$().find('input');
    if (!this.get('tooltipShown')) {
      var parent = this.get('parent');
      var container = this.$().closest('.tooltip-container');
      if (container.length === 0) {
        container = parent ? '#' + parent.$().attr('id') : 'body';
      }
      $input.attr('data-original-title', title)
        .tooltip({
          // title: title,
          placement: "auto top",
          container: container,
          trigger: 'manual'
        }).tooltip('show');
      this.set('tooltipShown', true);
    } else {
      $input.attr('data-original-title', title)
        .tooltip('show');
    }
  },

  removeTooltip: function() {
    if (this.get('tooltipShown') && !this.isDestroying) {
      this.$().find('input').tooltip('destroy');
      this.toggleProperty('tooltipShown');
    }
  }
});
