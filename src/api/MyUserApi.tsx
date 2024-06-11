import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query"; // Import the useMutation hook from react-query for handling mutations
import { toast } from "sonner";

// Base URL for the API, loaded from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Custom  hook for getting a user's information from the db
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {

    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        "Content-Type": "application/json", // Set the content type to JSON
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };

};

// Define the type for the request payload to create a user
type CreateUserRequest = {
  auth0Id: string; // The user's Auth0 ID
  email: string; // The user's email address
};

// Custom hook for creating a new user
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0(); // Call the useAuth0 hook to retrieve the getAccessTokenSilently function to get the access token

  // Function to send a POST request to create a new user
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently(); // Retrieve the access token using the getAccessTokenSilently function

    // Send a POST request to the API endpoint with the user data
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(user), // Convert the user object to a JSON string for the request body
    });

    // Check if the response is not OK (i.e., status code is not in the range 200-299)
    if (!response.ok) {
      // Throw an error if the request failed
      throw new Error("Failed to create user");
    }
  };

  // Use the useMutation hook to create a mutation for the createMyUserRequest function
  const {
    mutateAsync: createUser, // Renaming mutateAsync to createUser for better readability
    isLoading, // Boolean indicating if the mutation is in progress
    isError, // Boolean indicating if there was an error with the mutation
    isSuccess, // Boolean indicating if the mutation was successful
  } = useMutation(createMyUserRequest);

  // Return the mutation function and status booleans from the hook
  return {
    createUser, // Function to trigger the mutation
    isLoading, // Loading state
    isError, // Error state
    isSuccess, // Success state
  };
};

type updateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: updateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "Put",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading,
  };
};
