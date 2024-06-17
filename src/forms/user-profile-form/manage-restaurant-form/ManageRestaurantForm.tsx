import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";

const formSchema = z.object({
  // creating a schema for form validation
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
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Please enter a valid name"),
      price: z.coerce.number().min(1, "Please enter a valid price"),
    })
  ),
  imageFile: z.instanceof(File, {
    message: "Please upload an image",
  }),
});

type restaurantFormData = z.infer<typeof formSchema>; // creating a type based on properties in formSchema

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    }, // initial values for the form
  });

  const onSubmit = (formDataJson: restaurantFormData) => {
    // TODO: Convert formDataJson to a new FormData object
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
