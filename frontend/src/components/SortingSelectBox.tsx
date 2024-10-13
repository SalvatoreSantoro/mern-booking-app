type Props = {
  selectedSortingOption?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const sortingOptions = [
  { name: "Star Rating", value: "starRating" },
  { name: "Price Per Night (low to high)", value: "pricePerNightAsc" },
  { name: "Price Per Night (high to low)", value: "pricePerNightDesc" },
];

const SortingSelectBox = ({ selectedSortingOption, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <label className="flex items-center space-x-2">
        <select
          className="p-2 border rounded-md w-full"
          value={
            selectedSortingOption === undefined
              ? "default"
              : selectedSortingOption
          }
          onChange={(event) => onChange(event)}
        >
          <option value={"default"} hidden>
            {" "}
            Sort By{" "}
          </option>
          {sortingOptions.map((option) => (
            <option value={option.value}> {option.name} </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SortingSelectBox;
