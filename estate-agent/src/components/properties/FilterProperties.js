import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function FilterProperties() {
    let navigate = useNavigate()

    function dec(id) {
        if (document.getElementById(id).value > 1) document.getElementById(id).value--
        else if (document.getElementById(id).value == 1) document.getElementById(id).value = null
    }
    function inc(id) {
        if (document.getElementById(id) == null) document.getElementById(id).value = 1
        else document.getElementById(id).value++
    }

    function resetFilters() {
        document.getElementById("pType").selectedIndex = 0
        document.getElementById("pPrice").selectedIndex = 0
        document.getElementById("pStatus").selectedIndex = 0
        document.getElementById("pBedrooms").value = null
        document.getElementById("pBathrooms").value = null
        document.getElementById("pGardens").value = null
        document.getElementById("description").style.visibility = "hidden"
        document.getElementById("filteredPropertiesTableBody").innerHTML = ""
        document.getElementById("dataTable").style.visibility = "hidden"
    }


    //get all properties into array
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

    //had to remove the Withdraw button as this wouldnt allow resubmitting of property 
    function filterSearch() {
        document.getElementById("filteredPropertiesTableBody").innerHTML = ""
        document.getElementById("description").style.visibility = "visible"
        document.getElementById("dataTable").style.visibility = "visible"

        //from array, if matches filter then append to table
        for (let i = 0; i < properties.length; i++) {
            if (checkMatch(properties[i])) {
                let tr = document.createElement("tr")
                let tdID = document.createElement("td")
                let tdAddress = document.createElement("td")
                let tdPostcode = document.createElement("td")
                let tdType = document.createElement("td")
                let tdPrice = document.createElement("td")
                let tdBedroom = document.createElement("td")
                let tdBathroom = document.createElement("td")
                let tdGarden = document.createElement("td")
                let tdSellerId = document.createElement("td")
                let tdStatus = document.createElement("td")
                let tdBuyerId = document.createElement("td")
                let tdView = document.createElement("input")

                tdID.innerHTML = properties[i].id
                tdAddress.innerHTML = properties[i].address
                tdPostcode.innerHTML = properties[i].postcode
                tdType.innerHTML = properties[i].type
                tdPrice.innerHTML = properties[i].price
                tdBedroom.innerHTML = properties[i].bedroom
                tdBathroom.innerHTML = properties[i].bathroom
                tdGarden.innerHTML = properties[i].garden
                tdSellerId.innerHTML = properties[i].sellerId
                tdStatus.innerHTML = properties[i].status
                tdBuyerId.innerHTML = properties[i].buyerId
                if (properties[i].buyerId == null) tdBuyerId.innerHTML = ""

                tdView.value = "View"
                tdView.type = "button"
                tdView.style.width = "100%"
                tdView.style.padding = "13px"
                tdView.style.alignContent = "center"
                let property = properties[i]
                tdView.onclick = function () { navigate('/propertiesPage/viewProperty', { state: { property } }) }

                tr.appendChild(tdID)
                tr.appendChild(tdAddress)
                tr.appendChild(tdPostcode)
                tr.appendChild(tdType)
                tr.appendChild(tdPrice)
                tr.appendChild(tdBedroom)
                tr.appendChild(tdBathroom)
                tr.appendChild(tdGarden)
                tr.appendChild(tdSellerId)
                tr.appendChild(tdStatus)
                tr.appendChild(tdBuyerId)
                tr.appendChild(tdView)

                document.getElementById("filteredPropertiesTableBody").appendChild(tr)
            }
        }
    }


    //check if property matches the filters
    function checkMatch(property) {
        //check it matches the type if set
        if (document.getElementById("pType").selectedIndex == 0 || document.getElementById("pType").value == property.type) {
            //check it matches price range if set
            if (
                (document.getElementById("pPrice").selectedIndex) == 0 ||
                (document.getElementById("pPrice").selectedIndex == 1 && property.price < 50000) ||
                (document.getElementById("pPrice").selectedIndex == 2 && property.price >= 50000 && property.price <= 100000) ||
                (document.getElementById("pPrice").selectedIndex == 3 && property.price >= 100000 && property.price <= 150000) ||
                (document.getElementById("pPrice").selectedIndex == 4 && property.price >= 150000 && property.price <= 200000) ||
                (document.getElementById("pPrice").selectedIndex == 5 && property.price >= 200000 && property.price <= 250000) ||
                (document.getElementById("pPrice").selectedIndex == 6 && property.price > 250000)
            ) {
                //check it matches status if set
                if (document.getElementById("pStatus").selectedIndex == 0 || document.getElementById("pStatus").value == property.status) {
                    //check if number of bedrooms match if set
                    if (document.getElementById("pBedrooms").value == "" || parseInt(document.getElementById("pBedrooms").value) == property.bedroom) {
                        //check if number of bathrooms match if set
                        if (document.getElementById("pBathrooms").value == "" || parseInt(document.getElementById("pBathrooms").value) == property.bathroom) {
                            //check if number of gardens match if set
                            if (document.getElementById("pGardens").value == "" || parseInt(document.getElementById("pGardens").value) == property.garden) {
                                return true
                            }
                        } else return false
                    } else return false
                } else return false

            } else return false
        } else return false
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div id="pageComponent">

            <h1 id="pageHeading"> <b>Property List</b> </h1>
            <p id="description" style={{ color: 'white', visibility: 'hidden' }}> Below is a list of all the properties that match the filters.</p>

            <div id="filterPropertiesForm">
                <h2> Enter Property Filters </h2> <br />

                <select id="pType" className="filterDropdowns">
                    <option> --- Filter by property type --- </option>
                    <option> APARTMENT </option>
                    <option> DETACHED </option>
                    <option> SEMI-DETACHED </option>
                </select>

                <select id="pPrice" className="filterDropdowns">
                    <option> --- Filter by price range (£) --- </option>
                    <option> &lt; 50 000 </option>
                    <option> 50 000 - 100 000 </option>
                    <option> 100 000 - 150 000 </option>
                    <option> 150 000 - 200 000 </option>
                    <option> 200 000 - 250 000 </option>
                    <option> &gt; 250 000 </option>
                </select>

                <select id="pStatus" className="filterDropdowns">
                    <option> --- Filter by status --- </option>
                    <option> FOR SALE </option>
                    <option> SOLD </option>
                    <option> WITHDRAWN </option>
                </select>

                <br /><br />

                <label for="pBedrooms">Bedrooms: &nbsp; </label>
                <button className="numberInputs" onClick={() => dec("pBedrooms")}>-</button>
                <input type="text" id="pBedrooms" className="numberInputs" />
                <button className="numberInputs" onClick={() => inc("pBedrooms")}>+</button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <label for="pBathrooms">Bathrooms: &nbsp; </label>
                <button className="numberInputs" onClick={() => dec("pBathrooms")}>-</button>
                <input type="text" id="pBathrooms" className="numberInputs" />
                <button className="numberInputs" onClick={() => inc("pBathrooms")}>+</button>

                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <label for="pGardens">Gardens: &nbsp; </label>
                <button className="numberInputs" onClick={() => dec("pGardens")}>-</button>
                <input type="text" id="pGardens" className="numberInputs" />
                <button className="numberInputs" onClick={() => inc("pGardens")}>+</button>

                <br /><br /><br />

                <input type="button" className="marginedButton" value="Search" onClick={() => filterSearch()} />
                <input type="button" className="marginedButton" value="Reset" onClick={() => resetFilters()} />
                <input type="button" className="marginedButton" value="Cancel" onClick={() => navigate("/propertiesPage")} />
            </div>

            <br />


            <div id="pageComponent">
                <div id="dataTable" style={{ visibility: "hidden" }}>
                    <table id="filteredPropertiesTable">
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

                        <tbody id="filteredPropertiesTableBody">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FilterProperties;