import ViewAllBuyers from "./ViewAllBuyers";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

function RegisterBuyer() {
    let navigate = useNavigate()

    function fieldCheck() {
        let allFieldsFilled = true;
        if (document.getElementById("fname").value == "") { document.getElementById("fname").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("sname").value == "") { document.getElementById("sname").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("phone").value == "") { document.getElementById("phone").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("addr").value == "") { document.getElementById("addr").placeholder = '*required field*'; allFieldsFilled = false; }
        if (document.getElementById("pcode").value == "") { document.getElementById("pcode").placeholder = '*required field*'; allFieldsFilled = false; }

        if (allFieldsFilled) {
            if (newBuyerCheck()) saveData()
            else {
                alert("Buyer with this 'First Name' and 'Surname' already exists.")
            }
        }

    }

    let [buyers, addBuyers] = useState([])
    useEffect(() => { sendRequest() }, []) //this line stops the page from constantly fetching
    function newBuyerCheck() {
        
        let fname = document.getElementById("fname").value.toLowerCase()
        let sname = document.getElementById("sname").value.toLowerCase()

        for (let i = 0; i < buyers.length; i++) {
            if (buyers[i].firstName.toLowerCase() == fname && buyers[i].surname.toLowerCase() == sname) {
                return false
            }
        }
        return true
    }
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


    function saveData() {
        let buyer = {
            "firstName": document.getElementById("fname").value,
            "surname": document.getElementById("sname").value,
            "address": document.getElementById("addr").value,
            "postcode": document.getElementById("pcode").value,
            "phone": document.getElementById("phone").value
        }

        let ref = fetch("http://localhost:8081/buyer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buyer)
        })
        ref.then((x) => {
            alert("Buyer added successfully.")
            document.getElementById("fname").value = ""
            document.getElementById("sname").value = ""
            document.getElementById("addr").value = ""
            document.getElementById("pcode").value = ""
            document.getElementById("phone").value = ""
            navigate("/buyersPage")
        }
        )
    }


    return (
        <div id="pageComponent">
            <h1 id="pageHeading"> <b>Buyers List</b> </h1>
            <p style={{ color: 'white' }}> Below is a list of all the buyers. </p>
            <div id="addBuyerForm">
                <h2> Enter Buyer Information </h2> <br />
                <span> First Name: <input type="text" id="fname" /> </span>&nbsp;&nbsp;&nbsp;
                <span> Surname: <input type="text" id="sname" /> </span> <br /><br />
                <span> Phone: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="text" id="phone" /> </span> <br /><br />
                <span> Address: &nbsp;&nbsp;&nbsp; <input type="text" id="addr" /> </span>&nbsp;&nbsp;&nbsp;
                <span> Postcode: <input type="text" id="pcode" /> </span> <br /><br />

                <input type="button" className="marginedButton" value="Add" onClick={() => fieldCheck()} />
                <input type="button" className="marginedButton" value="Cancel" onClick={() => navigate("/buyersPage")} />

            </div>

            <br />

            <ViewAllBuyers />
        </div>
    )
}
export default RegisterBuyer;