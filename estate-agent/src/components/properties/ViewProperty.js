import { useLocation, useNavigate } from "react-router-dom";

function ViewProperty() {
    let property = useLocation().state.property
    let navigate = useNavigate()

    function statusCheck() {
        console.log(property.status)
        switch (property.status) {
            case "FOR SALE":
                console.log("for sale")
                return createForSaleButtons()
            case "WITHDRAWN":
                console.log("withdrawn")
                return createWithdrawnButtons()
            default:
                console.log("sold")
                return createSoldButtons()
        }
    }

    function createForSaleButtons() {
        return [<input type='button' value='Withdraw' onClick={() => withdrawProperty()} />,
        <input type='button' value='Ammend' className="marginedButton" onClick={() => ammendProperty()} />,
        <input type='button' value='Back' className="marginedButton" onClick={() => navigate('/propertiesPage')} />]
    }
    function createWithdrawnButtons() {
        return [<input type='button' value='Resubmit' onClick={() => resubmitProperty()} />,
        <input type='button' value='Ammend' className="marginedButton" onClick={() => ammendProperty()} />,
        <input type='button' value='Back' className="marginedButton" onClick={() => navigate('/propertiesPage')} />]
    }
    function createSoldButtons() {
        return [<input type='button' value='Back' className="marginedButton" onClick={() => navigate('/propertiesPage')} />]
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
                navigate('/propertiesPage/viewProperty', {state: {property}})
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
                navigate('/propertiesPage/viewProperty', {state: {property}})
            })
        }
    }
    function ammendProperty() {
        return ""
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div id="pageComponent">
            <div id="viewPropertyPage">
                <h1 id="pageHeading"> <b>Property #{property.id} </b> </h1>
                <p style={{ color: 'white' }}> Below are all details surrounding the selected property. </p>

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

                <div id="viewPropertyFunctionality">
                    {statusCheck()}
                </div>

            </div>
        </div>
    );
}

export default ViewProperty;