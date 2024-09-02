import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: apiClient.fetchMyHotels,
  });

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex rounded-md bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
              <div className="mr-1"><BsMap/></div>
                <div>{hotel.city} , {hotel.country}</div>
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
              <div className="mr-1"><BsBuilding/></div>
                <div>{hotel.type}</div>
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
              <div className="mr-1"><BiMoney/></div>
                <div>€{hotel.pricePerNight} per night</div>
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
              <div className="mr-1"><BiHotel/></div>
                <div>
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
              </div>

              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
              <div className="mr-1"><BiStar/></div>
                <div>
                  {hotel.starRating} Star Rating
                </div>
              </div>

            </div>
            <span className="flex justify-end">
              <Link to={`/edit-hotel/${hotel._id}`} className="flex bg-blue-600 text-white text-xl font-bold p-2 rounded-md hover:bg-blue-500">
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
