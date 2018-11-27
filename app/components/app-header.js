import Component from '@ember/component';

export default Component.extend({
  actions:{
    logout(){
      localStorage.setItem('isAuthen', false);
      window.location.href = '../authen/login';
    }
  }
});
