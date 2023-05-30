import CircledIconBtn from "@/components/buttons/circledIconBtn";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "@/components/inputs/loginInput";
import DotLoaderSpinner from "@/components/loaders/dotLoader";
import styles from "@/styles/reset.module.scss";
import axios from "axios";
import jwt from "jsonwebtoken";
import { Form, Formik } from "formik";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import * as Yup from "yup";

const passwordValidation = Yup.object({
  password: Yup.string()
    .required(
      "Please enter your new password. It must be atleast 6 characters long"
    )
    .min(6, "Password must be atleast 6 characters.")
    .max(36, "Password can't be more than 36 characters"),
  confirmPassword: Yup.string()
    .required("Confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});

export default function reset({ user_id }) {
  const country = {
    name: "Poland",
    flag: "https://image.similarpng.com/very-thumbnail/2020/06/Poland-flag-icon-on-transparent-background-PNG.png",
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload(true);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country={country} />
      <div className={styles.reset}>
        <div>
          <div className={styles.reset__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password ?{" "}
              <button onClick={() => signIn()}>Login instead.</button>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{ password, confirmPassword }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  name="confirmPassword"
                  icon="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <CircledIconBtn type="submit" text="Change" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const { token } = query;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

  return {
    props: {
      user_id: user_id.id,
    },
  };
}
