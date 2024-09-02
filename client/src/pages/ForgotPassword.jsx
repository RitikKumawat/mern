import { getPasswordResetToken } from "../services/operations/authAPI";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [emailSent, setEmailSend] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSend));
  };

  const changeHandler = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div className="text-richblack-100 flex justify-center items-center mt-[6rem]">
      {loading ? (
        <div>Loading......</div>
      ) : (
        <div className="flex flex-col gap-6">
          <h1 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]">
            {!emailSent ? "Reset your password" : "Check your Email"}
          </h1>
          <p className="text-richblack-100 font-medium leading-[1.375rem]">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full ">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Email Address<sup className=" text-pink-500">*</sup>
                </p>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={changeHandler}
                  placeholder="Enter Email Address"
                  name="email"
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-200 p-[12px]"
                />
              </label>
            )}
            <div className="flex gap-4 mt-4">
              <button type="submit" className="yellowButton">
                {!emailSent ? "Reset Password" : "Resend Email"}
              </button>
              <div className="blackButton w-fit">
                <Link to="/login">Back to login</Link>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
