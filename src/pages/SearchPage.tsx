import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  return (
    <span>
      User Searched for {city} and {" "}
      <span>
        {results?.data.map((restaurant) => (
          <span>
            found {restaurant.restaurantName}, {restaurant.city}
          </span>
        ))}
      </span>
    </span>
  );
};

export default SearchPage;
