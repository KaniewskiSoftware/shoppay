import CircledIconBtn from "@/components/buttons/circledIconBtn";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "@/components/inputs/loginInput";
import styles from "@/styles/forgot.module.scss";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import * as Yup from "yup";
const emailValidation = Yup.object({
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password."
    )
    .email("Enter a valid email address."),
});

export default function forgot() {
  const country = {
    name: "Poland",
    flag: "https://image.similarpng.com/very-thumbnail/2020/06/Poland-flag-icon-on-transparent-background-PNG.png",
  };

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotHandler = async () => {};
  return (
    <>
      <Header country={country} />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Forgot your password ? <Link href="/signin">Login instead.</Link>
            </span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{ email }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CircledIconBtn type="submit" text="Sign In" />
                {error && <span className={styles.error}>{error}</span>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}
