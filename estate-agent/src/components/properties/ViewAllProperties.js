import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ViewAllProperties() {
    let navigate = useNavigate()

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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
                                    <td> {property.id}         </td>
                                    <td> {property.address}    </td>
                                    <td> {property.postcode}   </td>
                                    <td> {property.type}       </td>
                                    <td> {property.price}      </td>
                                    <td> {property.bedroom}    </td>
                                    <td> {property.bathroom}   </td>
                                    <td> {property.garden}     </td>
                                    <td> {property.sellerId}   </td>
                                    <td> {property.status}     </td>
                                    <td> {property.buyerId}    </td>
                                    <td style={{ backgroundColor: 'white' }}>
                                        <input type='button' value='View' onClick={() => navigate('/propertiesPage/viewProperty', {state: {property}})} />
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