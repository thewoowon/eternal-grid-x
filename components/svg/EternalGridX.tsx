/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

const PATH_D: string[] = [
  "M646.155 124.906L220.418 363.383L220.418 880.349L646.155 1119.63L1072.69 880.348L1072.69 363.383L646.155 124.906Z",
  "M230.822 354.58L356.462 429.004L633.351 270.553L633.351 132.109",
  "M221.218 865.144L350.86 786.719L418.082 621.066L350.06 455.412L218.818 376.987",
  "M1071.89 865.144L941.343 790.72L875.029 621.066L941.343 453.812L1072.69 378.588",
  "M1061.68 354.887L935.048 428.204L658.96 270.553L658.96 134.51",
  "M658.959 1110.82L658.402 972.378L935.847 815.528L1059.09 888.351",
  "M633.351 1111.62L633.908 972.378L357.262 814.728L233.223 887.551",
  "M562.928 338.575L380.47 442.608L470.098 495.425L562.928 338.575Z",
  "M383.671 474.619L430.086 586.655L458.095 520.233L383.671 474.619Z",
  "M908.163 769.211L861.748 657.175L833.739 723.596L908.163 769.211Z",
  "M908.163 473.018L861.748 585.054L833.739 518.633L908.163 473.018Z",
  "M383.671 767.61L430.086 655.574L458.095 721.995L383.671 767.61Z",
  "M729.275 338.973L911.733 443.007L822.105 495.824L729.275 338.973Z",
  "M562.926 904.357L380.47 800.319L470.1 747.504L562.926 904.357Z",
  "M729.277 904.357L911.733 800.319L822.103 747.504L729.277 904.357Z",
  "M441.289 621.066L478.101 533.038L570.131 586.654L570.131 658.678L478.101 710.695L441.289 621.066Z",
  "M849.899 621.066L813.087 531.437L721.057 586.654L721.057 658.678L813.087 711.495L849.899 621.066Z",
  "M580.532 561.847L490.103 508.23L601.34 316.968L626.948 301.763L614.143 338.575L614.142 522.634L580.532 561.847Z",
  "M711.451 561.847L801.879 508.23L690.642 316.968L665.034 301.763L677.84 338.575L677.84 522.634L711.451 561.847Z",
  "M711.444 680.666L801.874 734.281L690.642 925.546L665.034 940.751L677.839 903.939L677.835 719.88L711.444 680.666Z",
  "M580.362 680.666L489.932 734.281L601.164 925.546L626.772 940.751L613.968 903.939L613.972 719.88L580.362 680.666",
];

const EternalGridX = ({ fill = "none", width = 1294, height = 1244 }) => {
  const pathsRef = useRef<Array<SVGPathElement | null>>([]);
  const [pathLengths, setPathLengths] = useState<number[]>([]);

  useEffect(() => {
    if (pathsRef.current.length) {
      const lengths = pathsRef.current.map(
        (path) => path?.getTotalLength() || 0
      );
      setPathLengths(lengths);
    }
  }, []);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1294 1244"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      {PATH_D.map((d, index) => {
        const length = pathLengths[index] || 0;

        const draw = keyframes`
          from {
            stroke-dasharray: ${length};
            stroke-dashoffset: ${length};
          }
          to {
            stroke-dasharray: ${length};
            stroke-dashoffset: 0;
          }
        `;

        const pathAnimation = css`
          stroke-dasharray: ${length};
          stroke-dashoffset: ${length};
          animation: ${draw} 2.5s ease-in-out 1s forwards;
        `;

        return (
          <path
            key={index}
            ref={(el) => {
              if (el) {
                pathsRef.current[index] = el;
              }
            }}
            css={pathAnimation}
            d={d}
            stroke="white"
            strokeWidth="10"
          />
        );
      })}
    </svg>
  );
};

export default EternalGridX;
