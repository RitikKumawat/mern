import { resetPassword } from "../services/operations/authAPI";
import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };
  return (
    <div className="text-richblack-100 mt-[5rem] flex justify-center">
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div className="flex flex-col gap-6">
          <h1 className="text-white font-semibold text-[1.875rem] leading-[2.375rem]">
            Choose new Password
          </h1>
          <p className="text-richblack-100 font-medium leading-[1.375rem]">
            Almost done. Enter your new password and you are all set.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
            <label>
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                New Password*
              </p>
              <div className="flex items-center relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  name="password"
                  className=" bg-richblack-800 rounded-[0.5rem] text-richblack-200 w-full p-[12px]"
                />
                <span
                  className="absolute right-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible fontSize={24} />
                  ) : (
                    <AiFillEye fontSize={24} />
                  )}
                </span>
              </div>
            </label>

            <label>
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Confirm New Password*
              </p>
              <div className="relative flex items-center">
                <input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="bg-richblack-800 rounded-[0.5rem] text-richblack-200 w-full p-[12px]"
                />
                <span
                  className="absolute right-3"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible fontSize={24} />
                  ) : (
                    <AiFillEye fontSize={24} />
                  )}
                </span>
              </div>
            </label>
            <div className=" flex gap-3">
              <button type="submit" className="yellowButton">
                Reset Password
              </button>
              <Link to="/login" className="blackButton">
                <p>Back to Login</p>
              </Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
