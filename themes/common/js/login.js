document.addEventListener('DOMContentLoaded', function() {
  var username = document.querySelector('#username');
  username && username.setAttribute('type', 'email');
  var email = document.querySelector('#email');
  email && email.setAttribute('type', 'email');
  var form = document.querySelector('form');
  form && form.setAttribute('novalidate', '');
});
