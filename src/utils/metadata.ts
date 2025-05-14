export function buildMetadata(restaurant: any) {
  return {
    name: restaurant.name,
    location: `${restaurant.address}, ${restaurant.city}, ${restaurant.state}`,
    cuisine: restaurant.cuisine || 'Unknown',
    rating: restaurant.rating || 'N/A',
    url: restaurant.website || '',
  };
}
