import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function BookingsTable(props) {
    function handleCancelBooking(bookingId){

    }
    
  return (
    <>

    <Table striped="columns">
      <thead>
        <tr>
          <th>#</th>
          <th>Datetime</th>
          <th>Buyer</th>
          <th>Action</th>
        </tr>
      </thead>


      <tbody>
        {props.bookings.map((booking)=>(
            <tr>
                <td>{booking.id}</td>
                <td>{booking.buyerid}</td>
                <td>{booking.time}</td>
                {/* <td><Button>
                    <Link onClick={()=>handleCancelBooking(booking.id)}>Cancel</Link>
                    </Button></td> */}
          </tr>
        ))}
        
      </tbody>
    </Table>
    </>
  )
}
