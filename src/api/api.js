import axios from 'axios';

const http = axios.create({
  baseURL: 'https://front-test.beta.aviasales.ru/',
});

export const searchAPI = {
  getSearchID() {
    return http.get('search')
      .then((response) => response.data);
  },

  getTickets(searchId) {
    return http.get('tickets', {
      params: {
        searchId,
      }
    }).then((response) => response.data);
  },
};