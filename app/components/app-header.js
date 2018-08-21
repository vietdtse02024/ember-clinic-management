import Component from '@ember/component';

export default Component.extend({
  actions:{
    logout(){
      window.location.href = '../authen/login';
    }
  }
});
