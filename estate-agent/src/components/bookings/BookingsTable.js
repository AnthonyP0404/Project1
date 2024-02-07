import React, { useState} from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function BookingsTable(props) {

  const [show, setShow] = useState(false); 
  const [bookingID, setBookingID] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    function handleCancelBooking(bookingId){
      setBookingID(bookingId);
      handleShow();
    }
    
  return (
    <div className="col-md-6">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the booking?!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{props.DeleteBooking(bookingID); handleClose()}}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    <table  id="viewPropertyTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Datetime</th>
          <th>Buyer</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.bookings.map((booking)=>(
            <tr>
                <td>{booking.id}</td>
                <td>{booking.time}</td>                
                <td>{booking.buyerId}</td>
                {<td><Button onClick={()=>handleCancelBooking(booking.id)} >
                    Cancel
                    </Button></td>}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
