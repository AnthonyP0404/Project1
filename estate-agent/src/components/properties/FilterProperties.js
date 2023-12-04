import ViewAllProperties from "./ViewAllProperties";
import { useNavigate } from "react-router-dom";

function FilterProperties() {
    let navigate = useNavigate()

    function filterSearch() {
        
    }


    return (
        <div id="pageComponent">
            <h1 id="pageHeading"> <b>Properties Page</b> </h1>
            <p style={{ color: 'white' }}> Below is a list of all the properties. </p>

            <div id="filterPropertyForm">
                <h2> Enter Property Filters </h2> <br />
                

                <input type="button" className="marginedButton" value="Add" onClick={() => filterSearch()} />
                <input type="button" className="marginedButton" value="Cancel" onClick={() => navigate("/propertiesPage")} />
            </div>
        </div>
    );
}

export default FilterProperties;