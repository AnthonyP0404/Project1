import { useEffect, useState } from "react"

function ViewAllProperties() {

    let [properties, addProperties] = useState([])

    function sendRequest() {
        let url = "http://localhost:8081/property"
        fetch(url).then(processResponse)
    }
    function processResponse(response) {
        let res = response.json()
        res.then(processRecords)
    }
    function processRecords(records) {
        addProperties(records)
    }
    useEffect(() => { sendRequest() }, []) //this line stops the page from constantly fetching


    // let withdrawnProperties = []
    function withdrawProperty(propertyID) {
        let choice = window.confirm("Do you want to withdraw this property?")
        if (choice) {
            let url = "http://localhost:8081/property/" + propertyID
            //store it into withdrawnProperties then run the below
            let ref = fetch(url, { method: "Delete" })
            ref.then(() => {
                alert("Property of id " + propertyID + " has been withdrawn.")
                window.location.reload(false);
            })

        }
    }

    return (
        <div id="pageComponent">
            <div id="dataTable">

                <table id="allProperties">
                    <thead>
                        <tr>
                            <th> Property ID </th>
                            <th> Address     </th>
                            <th> Postcode    </th>
                            <th> Type        </th>
                            <th> Price (£)   </th>
                            <th> Bedroom     </th>
                            <th> Bathroom    </th>
                            <th> Garden      </th>
                            <th> Seller ID   </th>
                            <th> Status      </th>
                            <th> Buyer ID    </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            properties.map((property) =>
                                <tr>
                                    <td> {property.id}        </td>
                                    <td> {property.address}   </td>
                                    <td> {property.postcode}  </td>
                                    <td> {property.type}      </td>
                                    <td> {property.price}     </td>
                                    <td> {property.bedroom}   </td>
                                    <td> {property.bathroom}  </td>
                                    <td> {property.garden}    </td>
                                    <td> {property.sellerId}  </td>
                                    <td> {property.status}    </td>
                                    <td> {property.buyerId}   </td>
                                    <td style={{ backgroundColor: 'white' }}>
                                        {/* potentially add edit button here too */}
                                        <input type="button" value="Withdraw" onClick={() => withdrawProperty(property.id)} />
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
export default ViewAllProperties;