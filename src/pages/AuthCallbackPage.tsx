import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {

    const navigate = useNavigate(); // Call the useNavigate hook to retrieve the navigate function

    const { user } = useAuth0(); // Call the useAuth0 hook to retrieve the user object
    const { createUser } = useCreateMyUser(); // Call the useCreateMyUser hook to create a new user

    const hasCreatedUser = useRef(false); // Define a ref to track whether the user has been created

    useEffect(() => { // Define a useEffect hook to run when the component mounts

        // Log the user object to the console
        console.log("USER", user);

        // Check if the user object exists and contains the sub and email properties
        if (user?.sub && user?.email && !hasCreatedUser.current) {

            createUser({ auth0Id: user.sub, email: user.email }); // Call the createUser function with the user's Auth0 ID and email

            hasCreatedUser.current = true; // Set the hasCreatedUser ref to true
        }

        navigate("/"); // Navigate to the home page

    }, [ createUser, navigate, user ]); // Define the dependencies for the useEffect hook

    return <>Loading...</>; // Return a loading message

}

export default AuthCallbackPage;