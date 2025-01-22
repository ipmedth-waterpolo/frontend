import {ref, computed} from 'vue';
import axios from 'axios';

const userData = ref({
  userID: localStorage.getItem('userID') || null,
  username: localStorage.getItem('username') || null,
  userEmail: localStorage.getItem('userEmail') || null,
  userRole: localStorage.getItem('userRole') || null,
});

// Make isAdminOrTrainer reactive with computed
const isAdminOrTrainer = computed(() => {
  return userData.value.userRole === 'admin' || userData.value.userRole === 'trainer';
});

const isAdmin = computed(() => userData.value.userRole === 'admin');

const callAndSetUserData = async () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
    withCredentials: false,
  });

  // Attach the authorization token if it exists
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  try {
    const response = await axiosInstance.get('/user');
    setUserData(response.data.user);
  } catch (error) {
    console.error('User is not logged in');
  }
};

const setUserData = (user: any) => {
  userData.value = {
    userID: user.id,
    username: user.name,
    userEmail: user.email,
    userRole: user.role,
  };

  localStorage.setItem('userID', user.id);
  localStorage.setItem('username', user.name);
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('userRole', user.role);
};

const clearUserData = () => {
  userData.value = {
    userID: null,
    username: null,
    userEmail: null,
    userRole: null,
  };

  localStorage.removeItem('userID');
  localStorage.removeItem('username');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userRole');
};

const useUserData = () => ({
  userData,
  isAdminOrTrainer,
  isAdmin,
  callAndSetUserData,
  clearUserData,
});

export default useUserData;
