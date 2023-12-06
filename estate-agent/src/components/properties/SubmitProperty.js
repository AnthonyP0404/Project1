import ViewAllProperties from "./ViewAllProperties";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";


function SubmitProperty() {
    let navigate = useNavigate()

    function fieldCheck() {
        let allFieldsFilled = true;
        if (document.getElementById("address").value == "") { document.getElementById("address").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("postcode").value == "") { document.getElementById("postcode").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("type").value == "") { document.getElementById("type").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("price").value == "") { document.getElementById("price").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("bedroom").value == "") { document.getElementById("bedroom").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("bathroom").value == "") { document.getElementById("bathroom").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("garden").value == "") { document.getElementById("garden").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("sellerId").value == "") { document.getElementById("sellerId").placeholder = '*required field*'; }

        if (allFieldsFilled) {
            if (document.getElementById("sellerId").value == "") alert("Property requires a 'Seller ID'.")
            else if (!checkSellerExists()) alert("Seller with this ID does not exist.")
            else saveData()
        }
    }

    let [sellers, addSeller] = useState([])
    useEffect(() => { sendRequest() }, []) //this line stops the page from constantly fetching
    function checkSellerExists() {
        let sID = parseInt(document.getElementById("sellerId").value)
        for(let i = 0; i < sellers.length; i++) {
            if (sellers[i].id == sID) return true
        }
        return false
    }

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

    function saveData() {
        let property = {
            "address": document.getElementById("address").value,
            "postcode": document.getElementById("postcode").value,
            "type": document.getElementById("type").value,
            "price": document.getElementById("price").value,
            "bedroom": document.getElementById("bedroom").value,
            "bathroom": document.getElementById("bathroom").value,
            "garden": document.getElementById("garden").value,
            "sellerId": document.getElementById("sellerId").value,
            "status": "FOR SALE"
        }

        let ref = fetch("http://localhost:8081/property", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(property)
        })
        ref.then((x) => {
            alert("Property submitted successfully.")
            document.getElementById("address").value = ""
            document.getElementById("postcode").value = ""
            document.getElementById("type").value = ""
            document.getElementById("bedroom").value = ""
            document.getElementById("bathroom").value = ""
            document.getElementById("garden").value = ""
            document.getElementById("price").value = ""
            document.getElementById("sellerId").value = ""
            navigate("/propertiesPage")
        }
        )
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div id="pageComponent">
            <h1 id="pageHeading"> <b>Property List</b> </h1>
            <p style={{ color: 'white' }}> Below is a list of all the properties. </p>
            <div id="submitPropertyForm">
                <h2> Enter Property Information </h2> <br />

                <span> Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="address" /> </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span> Postcode: &nbsp;&nbsp; <input type="text" id="postcode" /> </span> <br /><br />
                <span> Type: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="type" /> </span> <br /><br />
                <span> Bedrooms: &nbsp;&nbsp; <input type="text" id="bedroom" /> </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span> Bathrooms: <input type="text" id="bathroom" /> </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span> Gardens: <input type="text" id="garden" /> </span> <br /><br />
                <span> Price: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="price" /> </span> <br /><br />
                <span> Seller ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="sellerId" /> </span> <br /><br />

                <input type="button" className="marginedButton" value="Add" onClick={() => fieldCheck()} />
                <input type="button" className="marginedButton" value="Cancel" onClick={() => navigate("/propertiesPage")} />

            </div>

            <br />

            <ViewAllProperties />
        </div>
    )
}
export default SubmitProperty;