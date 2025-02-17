import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlusIcon = ({ width = 31, height = 31, color = "#ffffff" , stroke = '3'}) => (
    <Svg width={width} height={height} viewBox="0 0 31 31" fill="none" >
        <Path
            d="M15.4949 7.49219V24.3672M23.9324 15.9297H7.05743"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="square"
            strokeLinejoin="round"
        />
    </Svg>
);

export default PlusIcon;
