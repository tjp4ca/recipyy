import React from "react";
// import StripeContainer from "./StripeContainer";
import StripeContainer from "../components/StripeContainer.js"

const Donation = () => {
  return (
    <div>

     <div className="row justify-content-center donateChoice">
         <div className="form-check form-check-inline col-1 donateChoice justify-content-center ">
           <input className="form-check-input" type="radio" name="inlineRadioOptions" value="1" />
           <label className="form-check-label donateAmount" htmlFor="inlineRadio1">$1</label>
         </div>
         <div className="form-check form-check-inline col-1 donateChoice justify-content-center ">
           <input className="form-check-input" type="radio" name="inlineRadioOptions" value="5" />
           <label className="form-check-label donateAmount" htmlFor="inlineRadio2">$5</label>
         </div>
         <div className="form-check form-check-inline col-1 donateChoice justify-content-center ">
           <input className="form-check-input" type="radio" name="inlineRadioOptions" value="10" />
           <label className="form-check-label donateAmount" htmlFor="inlineRadio3">$10</label>
         </div>
         <div className="form-check form-check-inline col-1 donateChoice justify-content-center ">
           <input className="form-check-input" type="radio" name="inlineRadioOptions" value="20" />
           <label className="form-check-label donateAmount" htmlFor="inlineRadio3">$20</label>
         </div>
      </div>

  


      <StripeContainer />




      

      <div className="row justify-content-center">
      <form className="cardForm" method="POST">

          <a href="https://checkout.stripe.com/c/pay/cs_test_a1aW8ebGcJH2gxiLdXFPtHE9pTkeGxDDLh9XAkwtybhby7s6R9KEkYWrN5#fidkdWxOYHwnPyd1blpxYHZxWlFcampIVGRwc2FAQXQwMUtsUXVtTDJvfScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl" 
            className="cardLink">

            <div className='creditContainer row justify-content-center'>

                <div className='creditBox'>
                    <h3 className='bank'>Recipyy Bank</h3>
                    <img src='./chip.png' className='chip' />
                    <img src='./contactless.png' className='contactless' />
                    <h3 className='number'>4242 4242 4242 4242</h3>
                    <h5 className='card-holder'><span>card holder</span><br />
                        GW Bootcamp
                    </h5>
                    <h5 className='valid'><span>Valid Thru</span><br />04/24</h5>
                    <img src='./visa.png' className='visa' />
                </div>

            </div>
            
          </a>

      </form>
      </div>




      



    </div>
  );
};

export default Donation;