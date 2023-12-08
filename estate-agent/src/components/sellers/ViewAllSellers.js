import { useEffect, useState } from "react"

function ViewAllSellers() {

    let [sellers, addSeller] = useState([])

    function sendRequest() {
        let url = "http://localhost:8081/seller"
        fetch(url).then(processResponse)
    }


    function processResponse(response) {
        let res = response.json()
        res.then(processRecords)
    }

    function processRecords(records) {
        addSeller(records)
    }

    useEffect(() => { sendRequest() }, []) //this line stops the page from constantly fetching

    function deleteRow(sellerID) {
        let choice = window.confirm("Do you want to delete this user?")
        if (choice) {
            let url = "http://localhost:8081/seller/" + sellerID
            let ref = fetch(url, { method: "Delete" })
            ref.then(() => {
                alert("Buyer of id " + sellerID + " has been deleted.")
                window.location.reload(false);
            })

        }
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div id="pageComponent">
            <div id="dataTable">

                <table id="allSellers">
                    <thead>
                        <tr>
                            <th> Seller ID </th>
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
                            sellers.map((seller) =>
                                <tr>
                                    <td> {seller.id}        </td>
                                    <td> {seller.firstName} </td>
                                    <td> {seller.surname}   </td>
                                    <td> {seller.phone}     </td>
                                    <td> {seller.address}   </td>
                                    <td> {seller.postcode}  </td>
                                    <td style={{ backgroundColor: 'white' }}>
                                        <input type="button" value="Delete" onClick={() => deleteRow(seller.id)} />
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
export default ViewAllSellers;