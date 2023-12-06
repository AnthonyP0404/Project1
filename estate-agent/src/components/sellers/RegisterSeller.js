import ViewAllSellers from "./ViewAllSellers";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";


function RegisterSeller() {
    let navigate = useNavigate()

    function fieldCheck() {
        let allFieldsFilled = true;
        if (document.getElementById("fname").value == "") { document.getElementById("fname").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("sname").value == "") { document.getElementById("sname").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("phone").value == "") { document.getElementById("phone").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("addr").value == "") { document.getElementById("addr").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("pcode").value == "") { document.getElementById("pcode").placeholder = '*required field*'; allFieldsFilled = false; }

        if (allFieldsFilled) {
            if (newSellerCheck()) saveData()
            else {
                alert("Seller with this 'First Name' and 'Surname' already exists.")
            }
        }
    }

    let [sellers, addSeller] = useState([])
    useEffect(() => { sendRequest() }, []) //this line stops the page from constantly fetching
    function newSellerCheck() {
        
        let fname = document.getElementById("fname").value.toLowerCase()
        let sname = document.getElementById("sname").value.toLowerCase()

        for (let i = 0; i < sellers.length; i++) {
            if (sellers[i].firstName.toLowerCase() == fname && sellers[i].surname.toLowerCase() == sname) {
                return false
            }
        }
        return true
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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
export default RegisterSeller;