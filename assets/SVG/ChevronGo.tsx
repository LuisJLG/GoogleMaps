import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronGo = ({ width = 13, height = 22, stroke = '#CCCCCC', strokeWidth=4 }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 13 22" // Ajustado al tamaño real del ícono
    fill="none"
  >
    <Path
      d="M1 1L11 11L1 21" // Simplificado y ajustado para el ícono
      stroke={stroke}
      strokeWidth={strokeWidth} // Reducido para evitar un trazo muy grueso
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChevronGo;
