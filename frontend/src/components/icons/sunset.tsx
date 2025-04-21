import { SVGProps } from "react"

export const ICSunset = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 -1 30 30"
    {...props}
  >
    <title>{"sunset"}</title>
    <path
      fill={props.color ?? 'black'}
      fillRule="evenodd"
      d="M28 22H2a1 1 0 0 0 0 2h26a1 1 0 1 0 0-2ZM3 8.414A.999.999 0 1 0 4.414 7L3 5.586A.999.999 0 1 0 1.586 7L3 8.414ZM29 18H1a1 1 0 1 0 0 2h28a1 1 0 1 0 0-2Zm-4 8H5a1 1 0 0 0 0 2h20a1 1 0 1 0 0-2ZM15 4a1 1 0 0 0 1-1V1a1 1 0 1 0-2 0v2a1 1 0 0 0 1 1Zm12 4.414L28.414 7A.999.999 0 1 0 27 5.586L25.586 7A.999.999 0 1 0 27 8.414ZM5.218 16c.928-4.562 4.943-8 9.782-8s8.854 3.438 9.782 8h2.104C26.118 10.359 21.096 6 15 6 8.904 6 3.882 10.359 3.114 16h2.104Z"
    />
  </svg>
)
