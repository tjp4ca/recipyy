import React from 'react';

const Team = () => {
  return (

        // <div className='teamContainer'>
        //     <img src='./kenny.png' />
        //     <img src='./matt.png' />
        //     <img src='./mike.png' />
        //     <img src='./nino.png' />
        // </div>




<div className='gitContainer'>
    <h3 className='teamTitle row justify-content-center'>Scan Your Github QR Code</h3>
<div className='gitRow row justify-content-center'>
        <div className="gitBox col card-deck justify-content-around">
        <div className="gitCard col-2 card ml-5 align-items-center">
            {/* <img className="gitIcon card-img-top" src="./kenny.png" alt="Card image cap" /> */}
            <div className='gitIcon1'></div>
            <div className="card-body">
            <a href='https://github.com/kea6t'>
                <h5 className="card-title">Kenneth Asay</h5>
            </a>
            </div>
            <div className="card-footer">
            <small className="qrCodeTxt text-muted">QR Code Scanning...</small>
            </div>
        </div>
        <div className="gitCard col-2 card align-items-center">
            {/* <img className="gitIcon card-img-top" src="./matt.png" alt="Card image cap" /> */}
            <div className='gitIcon2'></div>
            <div className="card-body">
            <a href='https://github.com/nealmm'>
                <h5 className="card-title">Matthew Neal</h5>
            </a>
            </div>
            <div className="card-footer">
            <small className="qrCodeTxt text-muted">QR Code Scanning...</small>
            </div>
        </div>
        <div className="gitCard col-2 card align-items-center">
            {/* <img className="gitIcon card-img-top" src="./mike.png" alt="Card image cap" /> */}
            <div className='gitIcon3'></div>
            <div className="card-body">
            <a href='https://github.com/tjp4ca'>
                <h5 className="card-title">Michael Park</h5>
            </a>
            </div>
            <div className="card-footer">
            <small className="qrCodeTxt text-muted">QR Code Scanning...</small>
            </div>
        </div>
        <div className="gitCard col-2 card mr-5 align-items-center">
            {/* <img className="gitIcon card-img-top" src="./nino.png" alt="Card image cap" /> */}
            <div className='gitIcon4'></div>
            <div className="card-body">
            <a href='https://github.com/nsuff'>
                <h5 className="card-title">Nino Suffoletta</h5>
            </a>
            </div>
            <div className="card-footer">
            <small className="qrCodeTxt text-muted">QR Code Scanning...</small>
            </div>
        </div>
        </div>
    </div>
</div>
   









    );
};

export default Team;