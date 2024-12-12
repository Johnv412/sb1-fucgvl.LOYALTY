import axios from 'axios';

const api = axios.create({
  baseURL: (window as any).pizzaRewardsSettings?.apiUrl || '/wp-json/pizza-rewards/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': (window as any).pizzaRewardsSettings?.nonce,
  },
});

export const getRewards = async (page = 1, perPage = 10, search = '') => {
  const response = await api.get('/rewards', {
    params: { page, per_page: perPage, search },
  });
  return response.data;
};

export const createReward = async (reward: any) => {
  const response = await api.post('/rewards', reward);
  return response.data;
};

export const updateReward = async (reward: any) => {
  const response = await api.put(`/rewards/${reward.id}`, reward);
  return response.data;
};

export const deleteReward = async (id: number) => {
  await api.delete(`/rewards/${id}`);
};

export const getStores = async () => {
  const response = await api.get('/stores');
  return response.data;
};

// Add more API functions as needed