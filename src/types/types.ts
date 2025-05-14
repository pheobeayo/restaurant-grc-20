
export type Restaurant = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  cuisine: string;
  rating: number;
  url: string;
};
