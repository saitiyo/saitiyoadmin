"use client";

import CustomButton from "@/components/CustomButton/CustomButton";
import CustomTextInput from "@/components/CustomTextInput/CustomTextInput";
import CustomPasswordInput from "@/components/CustomPasswordInput/CustomPasswordInput";
import Spacer from "@/components/Spacer/Spacer";
import Logo from "@/components/Logo/Logo";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormDataType = {
  email: string;
  password: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must have atleast 6 characters")
    .max(50, "Too Long!")
    .required("Password is required"),
});

const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (values: FormDataType) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (values.email && values.password) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Invalid credentials");
        }

        const data = await response.json();
        const realToken = data.payload || data.accessToken;

        if (realToken) {
          localStorage.setItem("SUPER_ADMIN_ACCESS_TOKEN", realToken);
          setSuccess(true);
          
            router.push("/admin/dashboard");
          
        } else {
          throw new Error("No token received from server");
        }
      } else {
        throw new Error("Email and password are required");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setTimeout(() => setError(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        handleLogin(values);
        actions.resetForm();
      }}
    >
      {({ values, errors, handleSubmit, handleChange, touched }) => {
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "20px",
              paddingRight: "20px",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            {/* Toast notifications */}
            {error && (
              <div
                style={{
                  position: "fixed",
                  top: "20px",
                  right: "20px",
                  padding: "12px 20px",
                  backgroundColor: "#f5222d",
                  color: "white",
                  borderRadius: "4px",
                  zIndex: 1000,
                }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                style={{
                  position: "fixed",
                  top: "20px",
                  right: "20px",
                  padding: "12px 20px",
                  backgroundColor: "#52c41a",
                  color: "white",
                  borderRadius: "4px",
                  zIndex: 1000,
                }}
              >
                Login successful! Redirecting...
              </div>
            )}

            <Spacer height={20} />
            <Logo />
            <Spacer height={25} />

            <CustomTextInput
              placeholder="Email"
              onChange={handleChange("email")}
              value={values.email}
              error={touched.email && errors.email ? errors.email : ""}
            />
            <Spacer height={15} />
            <CustomPasswordInput
              placeholder="Password"
              onChange={handleChange("password")}
              value={values.password}
              error={touched.password && errors.password ? errors.password : ""}
              disabled={false}
            />

            <Spacer height={25} />

            <CustomButton
              title="Login"
              loading={loading}
              onClick={() => handleSubmit()}
            />
          </div>
        );
      }}
    </Formik>
  );
};

export default AdminPage;
