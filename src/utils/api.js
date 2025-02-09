// src/utils/api.js
export const predictDengueCases = async (data) => {
    try {
      const response = await fetch('https://web-production-3456a.up.railway.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };