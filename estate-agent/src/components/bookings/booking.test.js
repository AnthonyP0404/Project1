//import { getBookingDateTimeString } from "../properties/ViewProperty"
import ViewProperty from "../properties/ViewProperty"
import {render,screen,cleanup} from '@testing-library/react'

 describe("make new booking", ()=> {

    let container = null;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    // test("Test get booking date time string",()=>{

    //     let inputDate = '2024-03-01'
    //     let inputTime = 10
    //     let expectedResult ='Fri Mar 01 2024 10:00:00 GMT+0000 (Greenwich Mean Time)'
    //     //const wrapper = shallow(<ViewProperty/>)
    //    let result = ViewProperty.prototype.getBookingDateTimeString(inputDate,inputTime)

    // //     let result =  render(<ViewProperty/>,container)
        
    // //   let  result= render(<ViewProperty/>,container).getBookingDateTimeString(inputDate,inputTime)
        
   
     
    //  //expect(result).toEqual(expectedResult)
    // })

    test("should render viewproperty component",()=>{
        render(<ViewProperty/>)
        const viewPropertyElement = screen.getAllByTestId('viewproperty-1');
        expect(viewPropertyElement).toBeInTheDocument();
    })



})

// describe('Addition', ()=>{
//     it('knows that 2+2 = 4', ()=>{
//         expect(2+2).toBe(4)
//     })
// })