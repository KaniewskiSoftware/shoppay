import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Main from "@/home/main";

export default function Home({ country }) {
  const { data: session } = useSession();
  return (
    <>
      <Header country={country} />
      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  // let data = await axios
  //   .get("https://api.ipregistry.co/?key=czht5i5bn54v2sgy")
  //   .then((res) => {
  //     return res.data.location.country;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  return {
    props: {
      // country: { name: data.name, flag: data.flag.emojitwo },
      country: {
        name: "Poland",
        flag: "https://image.similarpng.com/very-thumbnail/2020/06/Poland-flag-icon-on-transparent-background-PNG.png",
      },
    },
  };
}
