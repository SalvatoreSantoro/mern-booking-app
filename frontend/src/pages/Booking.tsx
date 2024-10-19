import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const adultCount = search.adultCount;
  const childCount = search.childCount;

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(
        (search.checkOut.getTime() - search.checkIn.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setNumberOfNights(Math.ceil(nights));
    }
    
  }, [search.checkIn, search.checkOut]);

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

  const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent"],
    queryFn: () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    enabled: !!hotelId && numberOfNights > 0,
  });


  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={adultCount}
        childCount={childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData.clientSecret }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
