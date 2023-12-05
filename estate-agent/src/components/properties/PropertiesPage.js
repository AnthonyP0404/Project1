import { Link } from "react-router-dom";
import ViewAllProperties from "./ViewAllProperties";

function PropertiesPage() {
    return (
        <div id="pageComponent">
            <div id="propertiesPage">
                <h1 id="pageHeading"> <b>Property List</b> </h1>
                <p style={{ color: 'white' }}> Below is a list of all the properties. </p>

                <span style={{ float: 'left', marginLeft: '20px' }}><Link className="linkColour" to={"./buyProperty"}> Buy a property </Link> </span>
                <span style={{ float: 'left', marginLeft: '20px' }}><Link className="linkColour" to={"./submitProperty"}> Submit a property </Link> </span>
                <span style={{ float: 'left', marginLeft: '20px' }}><Link className="linkColour" to={"./filterProperties"}> Filter properties </Link> </span>
                <ViewAllProperties />

            </div>
        </div>
    );
}

export default PropertiesPage;