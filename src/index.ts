import { getSanFranciscoRestaurants } from './data/restaurant.js';
import { publishRestaurants } from './publisher/publish.js';

(async () => {
  try {
    const restaurants = await getSanFranciscoRestaurants();
    await publishRestaurants(restaurants);
  } catch (err) {
    console.error("❌ Error in publishing flow:", err);
    process.exit(1);
  }
})();
