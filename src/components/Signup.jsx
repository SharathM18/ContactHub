import "../assets/style/login.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loading from "../../utils/Loading";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config.js";
import { useState } from "react";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must 8 character long" })
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/, {
      message: "Invalid password",
    }),
});

const Signup = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData) => {
    try {
      const { email, password } = formData;
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="form_container container">
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="field">
            <label htmlFor="email" className="input_label">
              Email
            </label>
            <input
              type="email"
              className="input_field"
              {...register("email")}
            />
            {errors.email && (
              <p className="errors_msg">{errors.email.message}</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="password" className="input_label">
              Password
            </label>
            <input
              type="password"
              className="input_field"
              {...register("password")}
            />
            {errors.password && (
              <p className="errors_msg">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn">
            {isSubmitting ? <Loading /> : "Signup"}
          </button>
          {error && <p className="errors_msg">{error}</p>}

          <div className="signup_msg">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
