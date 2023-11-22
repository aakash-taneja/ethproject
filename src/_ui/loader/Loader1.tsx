import React from "react";
import styling from "../../styles/Loader.module.css"; // Import the styles
import { Image } from "@chakra-ui/react";

const Loader1: React.FC = () => {
  return (
    <div className={styling.box}>
      <Image
        src="https://i.ibb.co/gWRssjK/Logo.png"
        alt="Your Image"
        className={styling.image}
      />
    </div>
  );
};

export default Loader1;
