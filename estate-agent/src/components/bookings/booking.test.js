//import { getBookingDateTimeString } from "../properties/ViewProperty"
import ViewProperty from "../properties/ViewProperty"
import {render,screen,cleanup} from '@testing-library/react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import * as router from 'react-router-dom'
import { Router } from "react-router-dom";
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


    const mockUseLocationValue = {
        pathname: 'http://localhost:3000/propertiesPage/viewProperty',
        search:'',
        state: { property:{
            "id": 2,
            "address": "22 Maple Street, Maple City",
            "postcode": "MC1 1MC",
            "type": "SEMI",
            "price": 150000,
            "bedroom": "5",
            "bathroom": 2,
            "garden": 1,
            "sellerId": 2,
            "status": "FOR SALE"
          }},
          hash:''
    }
    jest.mock('react-router-dom',()=>({
        ...jest.requireActual('react-router-dom'),
        useLocation: jest.fn().mockImplementation(() => {
            return mockUseLocationValue;
        })

    }))
    describe("<ViewProperty />",()=>{
        it("should render ViewProperty",()=>{
            render(<BrowserRouter><Routes><Route path="/propertiesPage/viewProperty" element={<ViewProperty/>} /></Routes></BrowserRouter>)
            const viewPropertyElement = screen.getByTestId("viewproperty-1")
            expect(viewPropertyElement).toBeInTheDocument();
        })
    })


    // test("should render viewproperty component",()=>{
       

    //   //  jest.spyOn()
    //     render(<ViewProperty/>)
    //     const viewPropertyElement = screen.getByTestId("viewproperty-1")
    //     expect(viewPropertyElement).toBeInTheDocument();
    // })



// describe('Addition', ()=>{
//     it('knows that 2+2 = 4', ()=>{
//         expect(2+2).toBe(4)
//     })
// })