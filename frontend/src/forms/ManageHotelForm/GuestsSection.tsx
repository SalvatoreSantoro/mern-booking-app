import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="font-semibold text-sm text-gray-700 rounded-md grid grid-cols-2 gap-5 p-6 bg-gray-300">
        <label>
          Adults
          <input
            type="number"
            className="h-7 rounded w-full outline-none py-2 px-3"
            min={1}
            {...register("adultCount", { required: "This field is required." })}
          ></input>
          {errors.adultCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>

        <label>
          Children
          <input
            type="number"
            className="h-7 rounded w-full outline-none py-2 px-3"
            min={0}
            {...register("childCount", { required: "This field is required." })}
          ></input>
          {errors.childCount && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
