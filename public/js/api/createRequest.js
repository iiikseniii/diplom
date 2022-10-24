/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let formData = null;
    let url = options.url;
  
    if (options.data) {
      if (options.method === 'GET') {
        url += '?' + Object.entries(options.data).map(entry => entry.map(encodeURIComponent).join('=')).join('&');
      } else {
        formData = new FormData();
        Object.entries(options.data).forEach(v => formData.append(...v));
      }
    }
  
    if (options.callback) {
      let err = null;
      let response = null;
  
      xhr.onload = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          response = xhr.response;
        } else {
          alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        }
        options.callback(err, response);
      }
  
      xhr.onerror = () => {
        err = xhr.response;
        options.callback(err, response);
        alert(`Ошибка: ${xhr.status}`);
      }
    };
  
    xhr.open(options.method, url);
    xhr.send(formData);
  };
