import React from "react";
import { Svg, Path } from "react-native-svg";

const ContactSvg = ({ color, size }) => (
  <Svg
    width={`${size}`}
    height={`${size}`}
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12.5625 25.6377C19.374 25.6377 25.0137 19.998 25.0137 13.1865C25.0137 6.38721 19.3618 0.735352 12.5503 0.735352C5.75098 0.735352 0.111328 6.38721 0.111328 13.1865C0.111328 19.998 5.76318 25.6377 12.5625 25.6377ZM12.5625 17.3491C8.88818 17.3491 6.06836 18.6553 4.82324 20.1201C3.1875 18.2891 2.19873 15.8599 2.19873 13.1865C2.19873 7.43701 6.78857 2.81055 12.5503 2.81055C18.312 2.81055 22.9263 7.43701 22.9385 13.1865C22.9507 15.8721 21.9497 18.3013 20.3018 20.1323C19.0688 18.6675 16.2368 17.3491 12.5625 17.3491ZM12.5625 15.2739C14.9062 15.2983 16.7495 13.2964 16.7495 10.6719C16.7495 8.20605 14.9062 6.15527 12.5625 6.15527C10.2188 6.15527 8.36328 8.20605 8.37549 10.6719C8.3877 13.2964 10.2188 15.2495 12.5625 15.2739Z"
      fill={color}
    />
  </Svg>
);

export default ContactSvg;
