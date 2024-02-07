/**
 * @jest-environment jsdom
 */
import BookingsTable from "./BookingsTable";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("bookings/BookingsTable tests", () => {
  it("should render the bookings table correctly", () => {
    //arrange
    const props = {
      DeleteBooking: () => {},
      bookings: [],
    };
    //act
    render(<BookingsTable {...props} />);
    //assert
    const bokingsTableElement = screen.getByTestId("bookingsTable");
    expect(bokingsTableElement).toBeInTheDocument();
  });

  it("should find the cancel booking button and display the confirmation modal", () => {
    //arrange
    const props = {
      DeleteBooking: () => {},
      bookings: [
        {
          buyerId: 10,
          propertyId: 11,
          time: "2023-03-09T09:15:00.040Z",
          id: 11,
        },
      ],
    };

    //act
    render(<BookingsTable {...props} />);
    const cancelBookingButton = screen.getByTestId("showCancelModal");
    fireEvent.click(cancelBookingButton);

    //assert
    const confirmDeleteButton = screen.getByTestId("deleteBookingButton");
    expect(confirmDeleteButton).toBeInTheDocument();
  });

  it("should detect that the confirm delete button has been pressed", () => {
    //arrange
    const props = {
      DeleteBooking: jest.fn(),
      bookings: [
        {
          buyerId: 10,
          propertyId: 11,
          time: "2023-03-09T09:15:00.040Z",
          id: 11,
        },
      ],
    };
    render(<BookingsTable {...props} />);
    const cancelBookingButton = screen.getByTestId("showCancelModal");
    fireEvent.click(cancelBookingButton);

    //act
    const confirmDeleteButton = screen.getByTestId("deleteBookingButton");
    fireEvent.click(confirmDeleteButton);

    //assert
    expect(props.DeleteBooking).toHaveBeenCalledWith(props.bookings[0].id);
  });

  it("should abort the deletion of a booking if the cancel button is clicked", () => {
    //arrange
    const props = {
      DeleteBooking: jest.fn(),
      bookings: [
        {
          buyerId: 10,
          propertyId: 11,
          time: "2023-03-09T09:15:00.040Z",
          id: 11,
        },
      ],
    };
    render(<BookingsTable {...props} />);
    const cancelBookingButton = screen.getByTestId("showCancelModal");
    fireEvent.click(cancelBookingButton);
    const abortDeleteButton = screen.getByTestId("abortDeleteBookingButton");
    //act

    fireEvent.click(abortDeleteButton);

    //assert
    expect(props.DeleteBooking).not.toHaveBeenCalled();
  });
});
