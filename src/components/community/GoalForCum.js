import styled, { keyframes } from "styled-components";

function GoalForCum({ color, percent, size, image }) {
  return (
    <Chart size={size+'vw'}>
      <AniSvg viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#ebebeb"
          strokeWidth="7"
        />
        <AnimatedCircle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={`${2 * Math.PI * 90 * percent} ${
            2 * Math.PI * 90 * (1 - percent)
          }`}
          strokeDashoffset={2 * Math.PI * 90 * 0.25}
        />
      </AniSvg>
      
    </Chart>
  );
}

export default GoalForCum;

const Chart = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: ${({ size }) => size};
height: ${({ size }) => size};
position: relative;
/* padding: 10px; */
position: absolute;
top: 50%; left: 50%;
transform: translate(-50%, -50%);
`;

const TextArea = styled.div`
  position: relative;
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

