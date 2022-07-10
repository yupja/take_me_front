import styled, { keyframes } from "styled-components";

function DountChart({ color, percent, size, image }) {
  return (
    <Chart size={size+'px'}>
      <AniSvg viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#ebebeb"
          strokeWidth="20"
        />
   
        <AnimatedCircle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="20"
          strokeDasharray={`${2 * Math.PI * 90 * percent} ${
            2 * Math.PI * 90 * (1 - percent)
          }`}
          strokeDashoffset={2 * Math.PI * 90 * 0.25}
        />
      </AniSvg>
      <Img 
      size={size/1.4+'px'}
      src={image}/>
    </Chart>
  );
}

export default DountChart;

const Chart = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: ${({ size }) => size};
height: ${({ size }) => size};
position: relative;
padding: 10px;
`;

const AniSvg = styled.svg`
  position: relative;
`;

const circleFill = keyframes`
  0%{
    stroke-dasharray:0 ${2 * Math.PI * 90};
  }
`;

const AnimatedCircle = styled.circle`
  animation: ${circleFill} 2s ease;
`;

const Img = styled.img`
  position: absolute;
  border-radius: 50%;
  width: ${({ size }) => size}*0.5;
  height: ${({ size }) => size};
`;
