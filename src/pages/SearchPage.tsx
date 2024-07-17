import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams(); 
  const { results, isLoading } = useSearchRestaurants(city);
  
  return <span>User Searched for {city}</span>
}

export default SearchPage;