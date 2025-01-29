// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod"; // Resolver for integrating Zod schema validation with react-hook-form
import { Search } from "lucide-react"; // Search icon from lucide-react library
import { useForm } from "react-hook-form"; // Hooks and components from react-hook-form
import { z } from "zod"; // Zod library for schema validation
import { Form, FormControl, FormField, FormItem } from "./ui/form"; // UI components for form layout
import { Input } from "./ui/input"; // UI component for input field
import { Button } from "./ui/button"; // UI component for button
import { useEffect } from "react";

// Define schema for form validation using Zod
const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Search query is required", // Error message for required field
  }),
});

// Define TypeScript type for the form based on the schema
export type SearchForm = z.infer<typeof formSchema>;

// Define props type for the SearchBar component
type Props = {
  onSubmit: (formData: SearchForm) => void; // Function to handle form submission
  placeholder: string; // Placeholder text for the input field
  onReset?: () => void; // Function to handle form reset
  searchQuery: string; // Search query string
};

// SearchBar component definition
const SearchBar = ({ onSubmit, onReset, placeholder, searchQuery }: Props) => {
  // Initialize the form using useForm hook with schema resolver
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    // Form component from react-hook-form
    <Form {...form}>
      {/* Form element with onSubmit handler */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`} // style form to look cohesive and responsive to errors
      >
        {/* Search icon with styling */}
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 hidden md:block"
        />
        {/* FormField component to manage the form state and rendering */}
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              {/* FormControl component to wrap the input field */}
              <FormControl>
                {/* Input component with props from react-hook-form and placeholder */}
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Conditionally render the Clear button if the form is dirty (has changes) */}
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button type="submit" className="rounded-full bg-orange-500">
          Search
        </Button>
      </form>
    </Form>
  );
};

// Export the SearchBar component as the default export
export default SearchBar;
