import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

function ViewAllBuyers() {
    let navigate = useNavigate()

    let [buyers, addBuyers] = useState([])

    function sendRequest() {
        let url = "http://localhost:8081/buyer"
        fetch(url).then(processResponse)
    }


    function processResponse(response) {
        let res = response.json()
        res.then(processRecords)
    }

    function processRecords(records) {
        addBuyers(records)
    }

    useEffect(() => { sendRequest() }, []) //this line stops the page from constantly fetching

    function deleteRow(buyerID) {
        let choice = window.confirm("Do you want to delete this user?")
        if (choice) {
            let url = "http://localhost:8081/buyer/" + buyerID
            let ref = fetch(url, { method: "Delete" })
            ref.then(() => {
                alert("Buyer of id " + buyerID + " has been deleted.")
                window.location.reload(false);
            })

        }
    }

    return (
        <div id="pageComponent">
            <div id="dataTable">

                <table id="allBuyers">
                    <thead>
                        <tr>
                            <th> Buyer ID </th>
                            <th> First Name </th>
                            <th> Surname </th>
                            <th> Phone # </th>
                            <th> Address </th>
                            <th> Postcode </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer) =>
                                <tr>
                                    <td> {buyer.id}        </td>
                                    <td> {buyer.firstName} </td>
                                    <td> {buyer.surname}   </td>
                                    <td> {buyer.phone}     </td>
                                    <td> {buyer.address}   </td>
                                    <td> {buyer.postcode}  </td>
                                    <td style={{ backgroundColor: 'white' }}>
                                        <input type="button" value="Delete" onClick={() => deleteRow(buyer.id)} />
                                        {/* potentially add edit button here as well */}
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ViewAllBuyers;