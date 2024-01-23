import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Carousel from 'react-bootstrap/Carousel';

import imageApartment1 from './../../img/houses/APARTMENT/img1.jpg';
import imageApartment2 from './../../img/houses/APARTMENT/img2.jpg';
import imageApartment3 from './../../img/houses/APARTMENT/img3.jpg';

import imageSemi1 from './../../img/houses/SEMI/img1.jpg';
import imageSemi2 from './../../img/houses/SEMI/img2.jpg';
import imageSemi3 from './../../img/houses/SEMI/img3.jpg';

import imageDetached1 from './../../img/houses/DETACHED/img1.jpg';
import imageDetached2 from './../../img/houses/DETACHED/img2.jpg';
import imageDetached3 from './../../img/houses/DETACHED/img3.jpg';

import BookingsTable from "../bookings/BookingsTable";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

function ViewProperty() {
    let property = useLocation().state.property
    let navigate = useNavigate()
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



    let imageUrl1 = './../../img/houses/' + property.type + '/img1.jpg'

    function statusCheck() {
        switch (property.status) {
            case "FOR SALE":
                return createForSaleButtons()
            case "WITHDRAWN":
                return createWithdrawnButtons()
            default:
                return createSoldButtons()
        }
    }

    function createForSaleButtons() {
        return [<input type='button' value='Buy' onClick={() => buyProperty()} />,
        <input type='button' value='Withdraw' className="marginedButton" onClick={() => withdrawProperty()} />,
        <input type='button' value='Ammend' className="marginedButton" onClick={() => navigate('/propertiesPage/viewProperty/ammendProperty', { state: { property } })} />,
        <input type='button' value='Delete' className="marginedButton" onClick={() => deleteProperty()} />,
        <input type='button' value='Back' className="marginedButton" onClick={() => navigate('/propertiesPage')} />]
    }
    function createWithdrawnButtons() {
        return [<input type='button' value='Resubmit' onClick={() => resubmitProperty()} />,
        <input type='button' value='Ammend' className="marginedButton" onClick={() => navigate('/propertiesPage/viewProperty/ammendProperty', { state: { property } })} />,
        <input type='button' value='Delete' className="marginedButton" onClick={() => deleteProperty()} />,
        <input type='button' value='Back' className="marginedButton" onClick={() => navigate('/propertiesPage')} />]
    }
    function createSoldButtons() {
        return [<input type='button' value='Delete' onClick={() => deleteProperty()} />,
        <input type='button' value='Back' className="marginedButton" onClick={() => navigate('/propertiesPage')} />]
    }

    let [buyers, addBuyers] = useState([])
    let [bookings, setBookings] = useState([])
    let [bookingsFlag, setbookingsFlag] = useState(false)
    function sendRequest() {
        let url = "http://localhost:8081/buyer"
        fetch(url).then(processResponse)
        let url2 = "http://localhost:8081/booking"
        fetch(url2).then(res=>res.json().then(setBookings))

    }
    function processResponse(response) {
        let res = response.json()
        res.then(processRecords)
    }
    function processResponse2(response) {
        let res = response.json()
        res.then(processRecords)
    }
    function processRecords(records) {
        addBuyers(records)
    }

    useEffect(() => { sendRequest() }, []) //this line stops the page from constantly fetching
    function buyProperty() {
        let bID = parseInt(prompt("Please enter your buyer ID:"))
        if (bID != null) {
            let buyerExists = false
            for (let i = 0; i < buyers.length; i++) {
                if (buyers[i].id == bID) {
                    buyerExists = true
                    break
                }
            }
            if (buyerExists) {
                let url = "http://localhost:8081/property/" + property.id
                let ref = fetch(url, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            status: "SOLD",
                            buyerId: bID
                        }
                    )
                })
                ref.then(() => {
                    property.status = "SOLD"
                    property.buyerId = bID
                    navigate('/propertiesPage/viewProperty', { state: { property } })
                })
            } else alert("Buyer with this ID does not exist. Please register in the 'Buyers' page or enter a valid Buyer ID.")
        }
    }

    function withdrawProperty() {
        let choice = window.confirm("Do you want to withdraw this property?")
        if (choice) {
            let url = "http://localhost:8081/property/" + property.id
            let ref = fetch(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        status: "WITHDRAWN"
                    }
                )
            })
            ref.then(() => {
                property.status = "WITHDRAWN"
                navigate('/propertiesPage/viewProperty', { state: { property } })
            })
        }
    }

    function resubmitProperty() {
        let choice = window.confirm("Do you want to resubmit this property?")
        if (choice) {
            let url = "http://localhost:8081/property/" + property.id
            let ref = fetch(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        status: "FOR SALE"
                    }
                )
            })
            ref.then(() => {
                property.status = "FOR SALE"
                navigate('/propertiesPage/viewProperty', { state: { property } })
            })
        }
    }

    function deleteProperty() {
        let choice = window.confirm("Do you want to delete this property?")
        if (choice) {
            let url = "http://localhost:8081/property/" + property.id
            let ref = fetch(url, { method: "Delete" })
            ref.then(() => {
                alert("Property of id " + property.id + " has been deleted.")
                navigate('/propertiesPage')
            })
        }
    }

    function setbookingsFlagReverse(){
        if(!bookingsFlag){
            setbookingsFlag(false)
        }else{
            setbookingsFlag(true)
        }
    }


    function chooseImage(num) {
        switch (property.type) {
            case "SEMI":
                switch (num) {
                    case 1: return imageSemi1
                    case 2: return imageSemi2
                    case 3: return imageSemi3
                    default: return imageSemi1
                }
            case "DETACHED":
                switch (num) {
                    case 1: return imageDetached1
                    case 2: return imageDetached2
                    case 3: return imageDetached3
                    default: return imageDetached1
                }
            case "APARTMENT":
                switch (num) {
                    case 1: return imageApartment1
                    case 2: return imageApartment2
                    case 3: return imageApartment3
                    default: return imageApartment1
                }
        }

    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div id="pageComponent">
            <div id="viewPropertyPage">
                <h1 id="pageHeading"> <b>Property #{property.id} </b> </h1>
                <p style={{ color: 'white' }}> Below are all details surrounding the selected property. </p>

                <div className="container p-5">
                    <div className="grid">
                        <div className="row">
                            <div className="col-md-6">
                                <Carousel className="m-4">
                                    <Carousel.Item>
                                        <img src={chooseImage(1)} /> 
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={chooseImage(2)} /> 
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img src={chooseImage(3)} /> 
                                    </Carousel.Item>
                                </Carousel>
                            </div>

                            <div className="col-md-6">
                                <table id="viewPropertyTable">
                                    <tr> <td style={{ width: "30%" }}> ID </td> <td> {property.id} </td> </tr>
                                    <tr> <td> Address   </td> <td> {property.address}   </td> </tr>
                                    <tr> <td> Postcode  </td> <td> {property.postcode}  </td> </tr>
                                    <tr> <td> Type      </td> <td> {property.type}      </td> </tr>
                                    <tr> <td> Price     </td> <td> {property.price}     </td> </tr>
                                    <tr> <td> Bedrooms  </td> <td> {property.bedroom}   </td> </tr>
                                    <tr> <td> Bathrooms </td> <td> {property.bathroom}  </td> </tr>
                                    <tr> <td> Gardens   </td> <td> {property.garden}    </td> </tr>
                                    <tr> <td> Seller ID </td> <td> {property.sellerId}  </td> </tr>
                                    <tr> <td> Status    </td> <td> {property.status}    </td> </tr>
                                    <tr> <td> Buyer ID  </td> <td> {property.buyerId}   </td> </tr>
                                </table> <br /><br />
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={handleShow}>Add booking</button>
                <BookingsTable bookings={bookings}/>

                

                <div id="viewPropertyButtons">
                    {statusCheck()}
                </div>

            </div>
            <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
           
        </div>
    );
}

export default ViewProperty;