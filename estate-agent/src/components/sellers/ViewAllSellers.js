import { useEffect, useState } from "react";
import ViewAllSellersPure from "./ViewAllSellersPure";

function ViewAllSellers() {
  let [sellers, addSeller] = useState([]);

  function sendRequest() {
    let url = "http://localhost:8081/seller";
    fetch(url).then(processResponse);
  }

  function processResponse(response) {
    let res = response.json();
    res.then(processRecords);
  }

  function processRecords(records) {
    addSeller(records);
  }

  useEffect(() => {
    sendRequest();
  }, []); //this line stops the page from constantly fetching

  function deleteRow(sellerID) {
    let choice = window.confirm("Do you want to delete this user?");
    if (choice) {
      let url = "http://localhost:8081/seller/" + sellerID;
      let ref = fetch(url, { method: "Delete" });
      ref.then(() => {
        alert("Buyer of id " + sellerID + " has been deleted.");
        window.location.reload(false);
      });
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return <ViewAllSellersPure deleteRow={deleteRow} sellers={sellers} />;
}
export default ViewAllSellers;
