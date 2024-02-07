import React, { useState } from "react";
import BookingsTablePure from "./BookingsTablePure";

export default function BookingsTable(props) {
  const [show, setShow] = useState(false);
  const [bookingID, setBookingID] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleCancelBooking(bookingId) {
    setBookingID(bookingId);
    handleShow();
  }

  return (
    <BookingsTablePure
      show={show}
      DeleteBooking={props.DeleteBooking}
      handleClose={handleClose}
      handleShow={handleShow}
      handleCancelBooking={handleCancelBooking}
      bookingID={bookingID}
      bookings={props.bookings}
    />
  );
}
