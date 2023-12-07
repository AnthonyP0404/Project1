import { useLocation, useNavigate } from "react-router-dom";

function AmmendProperty() {
    let property = useLocation().state.property
    let navigate = useNavigate()

    function submitChanges() {
        let url = "http://localhost:8081/property/" + property.id
        let ref = fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    address: getInfo("address"),
                    postcode: getInfo("postcode"),
                    type: getInfo("type"),
                    bedroom: getInfo("bedroom"),
                    bathroom: getInfo("bathroom"),
                    garden: getInfo("garden"),
                    price: getInfo("price"),
                    sellerId: getInfo("sellerId")
                }
            )
        })
        ref.then(() => {
            alert("Property details have been ammended successfully.")
            navigate('/propertiesPage/viewProperty', { state: { property } })
        })
    }

    function getInfo(param) {
        switch (param) {
            case "address":
                if (document.getElementById("address").value == "") return property.address
                else {
                    property.address = document.getElementById("address").value
                    return property.address
                }
            case "postcode":
                if (document.getElementById("postcode").value == "") return property.postcode
                else {
                    property.postcode = document.getElementById("postcode").value
                    return property.postcode
                }
            case "type":
                if (document.getElementById("type").value == "") return property.type
                else {
                    property.type = document.getElementById("type").value
                    return property.type
                }
            case "bedroom":
                if (document.getElementById("bedroom").value == "") return property.bedroom
                else {
                    property.bedroom = document.getElementById("bedroom").value
                    return property.bedroom
                }
            case "bathroom":
                if (document.getElementById("bathroom").value == "") return property.bathroom
                else {
                    property.bathroom = document.getElementById("bathroom").value
                    return property.bathroom
                }
            case "garden":
                if (document.getElementById("garden").value == "") return property.garden
                else {
                    property.garden = document.getElementById("garden").value
                    return property.garden
                }

            case "price":
                if (document.getElementById("price").value == "") return property.price
                else {
                    property.price = document.getElementById("price").value
                    return property.price
                }
            case "sellerId":
                if (document.getElementById("sellerId").value == "") return property.sellerId
                else {
                    property.sellerId = document.getElementById("sellerId").value
                    return property.sellerId
                }
            default: return "something went wrong"
        }
    }

    /////////////////////////////////////////////////////////////////////

    return (
        <div id="pageComponent">
            <div id="ammendPropertyPage">
                <h1 id="pageHeading"> <b>Property #{property.id} </b> </h1>
                <p style={{ color: 'white' }}> Please ammend the details surrounding the selected property below. </p>

                <div id="submitPropertyForm">
                    <h2> Property Information </h2> <br />

                    <span> Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="address" placeholder={property.address} /> </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span> Postcode: &nbsp;&nbsp; <input type="text" id="postcode" placeholder={property.postcode} /> </span> <br /><br />
                    <span> Type: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="type" placeholder={property.type} /> </span> <br /><br />
                    <span> Bedrooms: &nbsp;&nbsp; <input type="text" id="bedroom" placeholder={property.bedroom} /> </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span> Bathrooms: <input type="text" id="bathroom" placeholder={property.bathroom} /> </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span> Gardens: <input type="text" id="garden" placeholder={property.garden} /> </span> <br /><br />
                    <span> Price: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="price" placeholder={property.price} /> </span> <br /><br />
                    <span> Seller ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="sellerId" placeholder={property.sellerId} /> </span> <br /><br />

                    <input type="button" className="marginedButton" value="Submit" onClick={() => submitChanges()} />
                    <input type="button" className="marginedButton" value="Cancel" onClick={() => navigate('/propertiesPage/viewProperty', { state: { property } })} />

                </div>
            </div>
        </div>
    );
}

export default AmmendProperty;