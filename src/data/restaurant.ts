import axios from 'axios';

const SF_DATASET_URL = 'https://data.sfgov.org/resource/pyih-qa8i.json?$limit=50';

export async function getSanFranciscoRestaurants() {
  try {
    const response = await axios.get(SF_DATASET_URL);
    const restaurants = response.data;

    const uniqueByName = new Map();

    for (const r of restaurants) {
      if (r.business_name && r.latitude && r.longitude) {
        uniqueByName.set(r.business_name, r);
      }
    }

    return Array.from(uniqueByName.values()).map((r) => ({
      name: r.business_name,
      location: {
        latitude: parseFloat(r.latitude),
        longitude: parseFloat(r.longitude),
        address: `${r.business_address || ''}, ${r.city || 'San Francisco'}, CA`,
      },
      cuisine: r.business_type || 'Unknown',
      rating: parseInt(r.inspection_score || '0'),
      url: '',
    }));
  } catch (error) {
    console.error('Failed to fetch SF Open Data:', error);
    return [];
  }
}