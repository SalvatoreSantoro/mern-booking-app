type Props = {
  selectedMaxPrice?: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const prices = [50, 100, 200, 300, 500];

const PriceFilter = ({ selectedMaxPrice, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2"> Max Price </h4>
      <label className="flex items-center space-x-2">
        <select
          className="p-2 border rounded-md w-full"
          value={selectedMaxPrice === undefined ? "default" : selectedMaxPrice}
          onChange={onChange}
        >
          <option value={"default"} hidden>
            {" "}
            Select Max Price{" "}
          </option>
          {prices.map((price) => (
            <option value={price}> {price} </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default PriceFilter;
