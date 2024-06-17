import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)} // check if the cuisine is included in the field value
          onCheckedChange={(checked) => { // when the checkbox is checked, add the cuisine to the field value. When it is unchecked, remove the cuisine from the field value
            if(checked){
                field.onChange([...field.value, cuisine]); // add the cuisine to the field value
            } else {
                field.onChange(
                    field.value.filter((value: string) => value !== cuisine) // remove the cuisine from the field value
                );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">
        {cuisine}
      </FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;
