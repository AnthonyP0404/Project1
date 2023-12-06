import { Link } from "react-router-dom";
import ViewAllBuyers from "./ViewAllBuyers";

function BuyersPage() {
    return (
        <div id="pageComponent">
            <div id="buyersPage">
                <h1 id="pageHeading"> <b>Buyers List</b> </h1>
                <p style={{ color: 'white' }}> Below is a list of all the buyers. </p>

                <span style={{ float: 'left', marginLeft: '20px' }}><Link className="linkColour" to={"./registerBuyer"}>Register buyer</Link> </span>
                <ViewAllBuyers />

            </div>
        </div>
    );
}

export default BuyersPage;