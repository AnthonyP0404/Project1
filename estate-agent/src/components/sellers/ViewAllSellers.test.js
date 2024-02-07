/**
 * @jest-environment jsdom
 */
import ViewAllSellersPure from "./ViewAllSellersPure";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("sellers/ViewAllSellers tests", () => {
  it("should render the viewAllSellers table with correct data", async () => {
    const props = {
      sellers: [
        {
          id: 1,
          firstName: "John",
          surname: "Doe",
          address: "1 High Street, Cardiff",
          postcode: "CF1 1AA",
          phone: "01234567890",
        },
        {
          id: 2,
          firstName: "Anna",
          surname: "Smith",
          address: "2 Main Street, Cardiff",
          postcode: "CF1 1AB",
          phone: "01234567891",
        },
        {
          id: 3,
          firstName: "Peter",
          surname: "Jones",
          address: "3 Low Street, Cardiff",
          postcode: "CF1 1AC",
          phone: "01234567892",
        },
      ],
      deleteRow: () => {},
    };

    render(<ViewAllSellersPure {...props} />);
    const component = screen.getByTestId("sellersTable");
    const sellerRows = screen.getAllByTestId("sellerRow");
    expect(component).toBeInTheDocument();
    expect(sellerRows.length).toEqual(3);
    expect(await screen.findByText("Anna")).toBeInTheDocument();
  });

  it("should call the props.deleteRow function when the delete button is pressed with the correct id", () => {
    const props = {
      sellers: [
        {
          id: 23,
          firstName: "John",
          surname: "Doe",
          address: "1 High Street, Cardiff",
          postcode: "CF1 1AA",
          phone: "01234567890",
        },
      ],
      deleteRow: jest.fn(),
    };

    render(<ViewAllSellersPure {...props} />);
    const deleteButton = screen.getByTestId("deleteButton");

    //act
    fireEvent.click(deleteButton);

    //assert
    expect(props.deleteRow).toHaveBeenCalledWith(props.sellers[0].id);
  });
});
