import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function BookingsTable(props) {
    function handleCancelBooking(bookingId){

    }
    
  return (
    <div className="col-md-6">
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
                {<td><Button onclick={()=>handleCancelBooking(booking.id)}>
                    Cancel
                    </Button></td>}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}
