import React from 'react';
import {Svg, Path} from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
}
export const PencilIcon: React.FC<Props> = ({
  width = 30,
  height = 30,
  strokeColor = 'black',
  strokeWidth = 2,
  fillColor = 'transparent',
}) => (
  <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    <Path
      d="M10.8633 25.3124H5.62501C5.37637 25.3124 5.13791 25.2136 4.96209 25.0378C4.78628 24.862 4.68751 24.6235 4.68751 24.3749V19.1366C4.68708 19.0149 4.71067 18.8943 4.75692 18.7817C4.80317 18.669 4.87117 18.5667 4.95704 18.4804L19.0196 4.41787C19.1068 4.32929 19.2108 4.25894 19.3254 4.21093C19.4401 4.16291 19.5632 4.13818 19.6875 4.13818C19.8118 4.13818 19.9349 4.16291 20.0496 4.21093C20.1643 4.25894 20.2683 4.32929 20.3555 4.41787L25.5821 9.64443C25.6706 9.73167 25.741 9.83565 25.789 9.95032C25.837 10.065 25.8617 10.1881 25.8617 10.3124C25.8617 10.4367 25.837 10.5598 25.789 10.6745C25.741 10.7892 25.6706 10.8931 25.5821 10.9804L11.5195 25.0429C11.4333 25.1287 11.3309 25.1967 11.2183 25.243C11.1057 25.2892 10.985 25.3128 10.8633 25.3124V25.3124Z"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.9375 7.5L22.5 14.0625"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
