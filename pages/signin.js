import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginInput from "@/components/inputs/loginInput";
import styles from "@/styles/signin.module.scss";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import { getProviders, signIn } from "next-auth/react";

const country = {
  name: "Poland",
  flag: "https://image.similarpng.com/very-thumbnail/2020/06/Poland-flag-icon-on-transparent-background-PNG.png",
};

const initialValues = {
  login_email: "",
  login_password: "",
};
export default function signin({ providers }) {
  const [user, setUser] = useState(initialValues);
  const { login_email, login_password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password."),
  });
  return (
    <>
      <Header country={country} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us! <Link href="#">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign In</h1>
            <p>Get access to one of the best Eshopping services in the world</p>
            <Formik
              enableReinitialize
              initialValues={{ login_email, login_password }}
              validationSchema={loginValidation}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign In" />
                  <div className={styles.forgot}>
                    <Link href="/forget">Forgot password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => (
                  <div key={provider.name}>
                    <button
                      className={styles.social__btn}
                      onClick={() => signIn(provider.id)}
                    >
                      <img src={`../../icons/${provider.name}.png`} alt="" />
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return {
    props: { providers },
  };
}
