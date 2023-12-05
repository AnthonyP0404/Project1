import ViewAllSellers from "./ViewAllSellers";
import { useNavigate } from "react-router-dom";


function AddSeller() {
    let navigate = useNavigate()

    function fieldCheck() {
        let allFieldsFilled = true;
        if (document.getElementById("fname").value == "") { document.getElementById("fname").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("sname").value == "") { document.getElementById("sname").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("phone").value == "") { document.getElementById("phone").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("addr").value == "") { document.getElementById("addr").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("pcode").value == "") { document.getElementById("pcode").placeholder = '*required field*'; allFieldsFilled = false; }

        if (allFieldsFilled) saveData()
    }

    function saveData() {
        let buyer = {
            "firstName": document.getElementById("fname").value,
            "surname": document.getElementById("sname").value,
            "address": document.getElementById("addr").value,
            "postcode": document.getElementById("pcode").value,
            "phone": document.getElementById("phone").value
        }

        let ref = fetch("http://localhost:8081/seller", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buyer)
        })
        ref.then((x) => {
            alert("Seller added successfully.")
            document.getElementById("fname").value = ""
            document.getElementById("sname").value = ""
            document.getElementById("addr").value = ""
            document.getElementById("pcode").value = ""
            document.getElementById("phone").value = ""
            navigate("/sellersPage")
        }
        )
    }


    return (
        <div id="pageComponent">
            <h1 id="pageHeading"> <b>Sellers List</b> </h1>
            <p style={{ color: 'white' }}> Below is a list of all the sellers. </p>
            <div id="addSellerForm">
                <h2> Enter Seller Information </h2> <br />
                <span> First Name: <input type="text" id="fname" /> </span>&nbsp;&nbsp;&nbsp;
                <span> Surname: <input type="text" id="sname" /> </span> <br /><br />
                <span> Phone: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="phone" /> </span> <br /><br />
                <span> Address: &nbsp;&nbsp;&nbsp; <input type="text" id="addr" /> </span>&nbsp;&nbsp;&nbsp;
                <span> Postcode: <input type="text" id="pcode" /> </span> <br /><br />

                <input type="button" className="marginedButton" value="Add" onClick={() => fieldCheck()} />
                <input type="button" className="marginedButton" value="Cancel" onClick={() => navigate("/sellersPage")} />

            </div>

            <br />

            <ViewAllSellers />
        </div>
    )
}
export default AddSeller;