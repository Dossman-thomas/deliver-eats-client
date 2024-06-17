import { z } from "zod";

const formSchema = z.object({
    restaurantName: z.string({
        required_error: "Please enter a valid restaurant name",
    }),
    city: z.string({
        required_error: "Please enter a valid city name",
    }), 
    country: z.string({
        required_error: "Please enter a valid country",
    }), 
    deliveryPrice: z.coerce.number({
        required_error: "Delivery price is required",
        invalid_type_error: "Please enter a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "Estimated delivery time is required",
        invalid_type_error: "Please enter a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "Please select at least one item",
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "Please enter a valid name"),
        price: z.coerce.number().min(1, "Please enter a valid price"),
    })),
    imageFile: z.instanceof(File, {
        message: "Please upload an image",
    }),
})

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
}

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  
}

export default ManageRestaurantForm;