const API_ENDPOINT = 'http://localhost:8080/hh';

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 500) {
        alert(`데이터를 가져오지 못했습니다. 다시 시도해 주세요`);
      }
      throw new Error('api를 가져오는데 문제가 발생하였습니다.');
    }

    return response.json();
  } catch (e) {
    console.warn(e);
  }
};

const api = {
  getCity: () => fetchData(`${API_ENDPOINT}/map?act=sido`),
  getDong: (sido) => fetchData(`${API_ENDPOINT}/map?act=gugun&sido=${sido}`),
  getGugun: (gugun) => fetchData(`${API_ENDPOINT}/map?act=dong&gugun=${gugun}`),
  getApt: (dong) => fetchData(`${API_ENDPOINT}/map?act=apt&dong=${dong}`),
};

export default api;
