import React from "react";
import styles from "../../styles/Loader.module.css"; // Import the styles
import Image from "next/image";

const Loader1: React.FC = () => {
  return (
    <div className={styles.box}>
      <Image
        src="https://i.ibb.co/gWRssjK/Logo.png"
        alt="Your Image"
        className={styles.image}
      />
    </div>
  );
};

export default Loader1;
