import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";

const Booking = () => {
  const search = useSearchContext();
  const checkIn = search.checkIn;
  const checkOut = search.checkOut;
  const adultCount = search.adultCount;
  const childCount = search.childCount;

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights = Math.abs(
        (search.checkOut.getTime() -
          search.checkIn.getTime()) / (1000 * 60 * 60 * 24)
      );
      setNumberOfNights(Math.ceil(nights));
    }
  }, [checkIn, checkOut]);

  const { hotelId } = useParams();

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelByID"],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
    enabled: !!hotelId,
  });

  const { data: currentUser } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: apiClient.fetchCurrentUser,
  });

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary
        checkIn={checkIn}
        checkOut={checkOut}
        adultCount={adultCount}
        childCount={childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
