import React from 'react'
import { IoIosMailUnread, IoIosHome } from "react-icons/io";
import { FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-secondary d-flex flex-column min-vh-50 mt-auto'>
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <p>Basic</p>
                    <span>About us</span><br />
                    <span>Contact us</span><br />
                    <span>Careers</span><br />
                </div>
                <div className="col-md-2">
                    <p>Help</p>
                    <span>Payments</span><br />
                    <span>Shipping</span><br />
                    <span>FAQ</span><br />
                </div>
                <div className="col-md-8">
                    <p>Address</p>
                    <IoIosMailUnread/><span> ajc7094@mailinator.com</span><br />
                    <FaPhone/><span> 8105982990</span><br />
                    <IoIosHome/><span> Pratappur-9, pratappur nawalparasi, Nepal</span><br />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer