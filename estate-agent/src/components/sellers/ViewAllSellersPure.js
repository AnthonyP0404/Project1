const ViewAllSellersPure = (props) => {
  return (
    <div id="pageComponent">
      <div id="dataTable" data-testid="sellersTable">
        <table id="allSellers">
          <thead>
            <tr>
              <th> Seller ID </th>
              <th> First Name </th>
              <th> Surname </th>
              <th> Phone # </th>
              <th> Address </th>
              <th> Postcode </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.sellers.map((seller, i) => (
              <tr data-testid="sellerRow" key={i}>
                <td> {seller.id} </td>
                <td> {seller.firstName} </td>
                <td> {seller.surname} </td>
                <td> {seller.phone} </td>
                <td> {seller.address} </td>
                <td> {seller.postcode} </td>
                <td style={{ backgroundColor: "white" }}>
                  <input
                    data-testid="deleteButton"
                    type="button"
                    value="Delete"
                    onClick={() => props.deleteRow(seller.id)}
                  />
                  {/* potentially add edit button here as well */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllSellersPure;
