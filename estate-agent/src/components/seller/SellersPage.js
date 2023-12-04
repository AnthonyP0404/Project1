import { Link } from "react-router-dom";
import ViewAllSellers from "./ViewAllSellers";

function SellersPage() {
    return (
        <div id="pageComponent">
            <div id="sellersPage">
                <h1 id="pageHeading"> <b>Sellers Page</b> </h1>
                <p style={{ color: 'white' }}> Below is a list of all the sellers. </p>

                <span style={{ float: 'left', marginLeft: '20px' }}><Link className="linkColour" to={"./addSeller"}> Add seller</Link> </span>
                <ViewAllSellers />

            </div>
        </div>
    );
}

export default SellersPage;