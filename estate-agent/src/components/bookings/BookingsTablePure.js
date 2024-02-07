import { Button, Modal } from "react-bootstrap";

const BookingsTablePure = (props) => {
  return (
    <div className="col-md-6">
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the booking?!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            data-testid="abortDeleteBookingButton"
            onClick={() => {
              props.handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            data-testid="deleteBookingButton"
            onClick={() => {
              props.DeleteBooking(props.bookingID);
              props.handleClose();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <table id="viewPropertyTable" data-testid="bookingsTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Datetime</th>
            <th>Buyer</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.bookings.map((booking, i) => (
            <tr key={i}>
              <td>{booking.id}</td>
              <td>{booking.time}</td>
              <td>{booking.buyerId}</td>
              {
                <td>
                  <Button
                    data-testid="showCancelModal"
                    onClick={() => props.handleCancelBooking(booking.id)}
                  >
                    Cancel
                  </Button>
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTablePure;
