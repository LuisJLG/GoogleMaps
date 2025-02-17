import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CustomSvgProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const Archive: React.FC<CustomSvgProps> = ({
  width = 35,
  height = 35,
  strokeColor = "#979797",
  strokeWidth = 4,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 35 35"
      fill="none"
    >
      <Path
        d="M28.4375 15.1245V28.4375C28.4375 29.3077 28.0918 30.1423 27.4764 30.7577C26.8611 31.373 26.0265 31.7187 25.1562 31.7188H9.84375C8.97351 31.7187 8.13891 31.373 7.52356 30.7577C6.9082 30.1423 6.5625 29.3077 6.5625 28.4375V6.5625C6.5625 5.69226 6.9082 4.85766 7.52356 4.24231C8.13891 3.62695 8.97351 3.28125 9.84375 3.28125H16.5942C17.1742 3.28134 17.7304 3.51173 18.1405 3.92178L27.797 13.5782C28.207 13.9884 28.4374 14.5446 28.4375 15.1245Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 3.82812V12.0312C17.5 12.6114 17.7305 13.1678 18.1407 13.578C18.5509 13.9883 19.1073 14.2188 19.6875 14.2188H27.8906"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.0312 19.6875H22.9688"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.0312 25.1562H22.9688"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Archive;
