document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Действия при отправке формы регистрации
  });
  
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Действия при отправке формы авторизации
  });
  document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('#register-form input[type="email"]').value;
    const password = document.querySelector('#register-form input[type="password"]').value;
    
    // Отправляем POST-запрос на API
    fetch('/api/users/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': email, // Добавьте поле "username"
        'email': email,
        'password': password,
        'password2': password
      })
    })
    .then(response => {
      if (response.ok) {
        // Обработка успешной регистрации
        alert('Регистрация прошла успешно!');
      } else {
        // Обработка ошибки
        alert('Ошибка регистрации!');
      }
    })
    .catch(error => {
      // Обработка ошибки
      console.error('Ошибка запроса:', error);
      alert('Ошибка запроса!');
    });
  });

  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('#login-form input[type="email"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;
    
    // Отправляем POST-запрос на API
    fetch('/api/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': email, 
        'password': password
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json(); 
      } else {
        // Обработка ошибки
        alert('Ошибка авторизации!');
      }
    })
    .then(data => {
      // Получаем JWT-токен
      const token = data.access;
      
      // Сохраняем токен (например, в локальное хранилище браузера)
      localStorage.setItem('token', token);

      // Перенаправляем пользователя на главную страницу (или другую защищенную страницу)
      window.location.href = '/'; 
    })
    .catch(error => {
      // Обработка ошибки
      console.error('Ошибка запроса:', error);
      alert('Ошибка запроса!');
    });
  });