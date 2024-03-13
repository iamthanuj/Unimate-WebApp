import React from "react";
import ColorLogo from "../assets/colorLogo.png";
import NavBar from "../components/NavBar";

function Helps() {
  return (
    <div className="font-inter">
        <NavBar/>
      <div className="bg-landing-bg h-screen flex justify-center items-center">
        <div>
          <div className="bg-white rounded-lg p-9 flex flex-col justify-center items-center gap-2">
            <div className="mb-3">
              <img
                src={ColorLogo}
                alt="logo-image"
                className="w-72 mx-auto mb-3"
              />

              <h2 className="mb-2 text-lg font-semibold text-gray-900 ">
                Email Us about our Unimate Platform
              </h2>
              <ul className="max-w-md space-y-1 text-black list-disc list-inside">
                <li>If you see there are inappropriate posts</li>
                <li>If there is a profile posting inappropriate posts</li>
                <li>
                  Any other Issues
                </li>
              </ul>
              <h2 className=" text-xl text-center mt-3 font-semibold text-gray-900 ">
                admin@unimate.com
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Helps;
