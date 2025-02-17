import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CustomSvgProps {
  width?: number;
  height?: number;
  fillColor?: string;
}

const Client: React.FC<CustomSvgProps> = ({
  width = 24,
  height = 25,
  fillColor = "#6D01D1",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
    >
      <Path
        d="M15.8842 2.10383C14.7982 0.976988 13.2815 0.356445 11.6074 0.356445C9.92437 0.356445 8.40261 0.973234 7.32171 2.09311C6.22908 3.22532 5.69672 4.76407 5.82171 6.42564C6.06948 9.70374 8.66489 12.3704 11.6074 12.3704C14.5499 12.3704 17.1408 9.70428 17.3925 6.42672C17.5192 4.78016 16.9835 3.24462 15.8842 2.10383ZM21.4288 24.3844H1.78602C1.52892 24.3876 1.2743 24.3357 1.04069 24.2324C0.80709 24.1292 0.600373 23.9771 0.435585 23.7874C0.0728634 23.3707 -0.0733411 22.8017 0.0349172 22.2262C0.505897 19.715 1.97575 17.6056 4.28601 16.1248C6.33845 14.8102 8.93833 14.0867 11.6074 14.0867C14.2765 14.0867 16.8763 14.8108 18.9288 16.1248C21.239 17.6051 22.7089 19.7145 23.1799 22.2256C23.2881 22.8011 23.1419 23.3702 22.7792 23.7869C22.6145 23.9767 22.4078 24.1288 22.1742 24.2322C21.9406 24.3355 21.6859 24.3875 21.4288 24.3844Z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default Client;
