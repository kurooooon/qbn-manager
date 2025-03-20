import clsx from "clsx";

export const iconNames = [
  "loupe",
  "teacher",
  "arrow-down",
  "circle-person",
] as const;

type Props = {
  name: (typeof iconNames)[number];
  className: string;
};

export const Icon = ({ name, className }: Props) => {
  return (
    <span
      className={clsx([
        "relative inline-block aspect-square",
        "[&>svg]:absolute [&>svg]:top-0 [&>svg]:left-0",
        className,
      ])}
    >
      {/* デザインのアイコンサイズが一定ではないので汎用的にはなっていない */}
      {(() => {
        switch (name) {
          case "loupe":
            return (
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m19.755 20.754.995-.995c.33-.33.33-.865.004-1.195l-3.505-3.505a.843.843 0 0 0-.598-.246h-.573a7.277 7.277 0 0 0 1.547-4.5A7.311 7.311 0 0 0 10.312 3 7.311 7.311 0 0 0 3 10.313a7.311 7.311 0 0 0 7.312 7.312 7.277 7.277 0 0 0 4.5-1.547v.573c0 .225.088.44.247.598l3.505 3.505a.84.84 0 0 0 1.191 0zm-9.443-5.941c-2.485 0-4.5-2.011-4.5-4.5 0-2.486 2.011-4.5 4.5-4.5 2.486 0 4.5 2.01 4.5 4.5 0 2.485-2.01 4.5-4.5 4.5z"
                  fill="currentColor"
                  fillRule="nonzero"
                  role="img"
                />
              </svg>
            );
          case "teacher":
            return (
              <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M29.6 24c1.323 0 2.4-1.113 2.4-2.48V5.68c0-1.368-1.077-2.48-2.4-2.48H10.4C9.077 3.2 8 4.312 8 5.68V8c1.171 0 2.255.339 3.2.89V6.4h17.6v14.4h-3.2v-3.2h-6.4v3.2h-3.812a6.373 6.373 0 0 1 1.985 3.2H29.6zM8 19.2a4.8 4.8 0 1 0 0-9.6 4.8 4.8 0 0 0 0 9.6zm5.6 9.6c1.314 0 2.393-1.056 2.4-2.369a5.6 5.6 0 0 0-5.6-5.631c-.12 0-.239.017-.353.054-.648.21-1.33.346-2.047.346a6.601 6.601 0 0 1-2.047-.346A1.14 1.14 0 0 0 5.6 20.8 5.6 5.6 0 0 0 0 26.431C.007 27.744 1.087 28.8 2.4 28.8h11.2z"
                  fill="currentColor"
                  fillRule="nonzero"
                  role="img"
                />
              </svg>
            );
          case "arrow-down":
            return (
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m8.525 11.01 4.25-4.25a.747.747 0 0 0 0-1.06l-.706-.706a.747.747 0 0 0-1.06 0L7.997 8.006 4.984 4.994a.747.747 0 0 0-1.059 0l-.706.706a.747.747 0 0 0 0 1.06l4.25 4.25a.743.743 0 0 0 1.056 0z"
                  fill="currentColor"
                  fillRule="nonzero"
                  role="img"
                />
              </svg>
            );
          case "circle-person":
            return (
              <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.995 27.625c6.422 0 11.625-5.203 11.625-11.625S22.417 4.375 15.995 4.375 4.37 9.578 4.37 16s5.203 11.625 11.625 11.625zm0-10.5a4.125 4.125 0 1 1 0-8.25 4.125 4.125 0 0 1 0 8.25zm0 7.875a8.982 8.982 0 0 1-6.867-3.197c.881-1.66 2.606-2.803 4.617-2.803.112 0 .225.019.333.052.61.196 1.247.323 1.917.323.67 0 1.312-.127 1.917-.323.108-.033.22-.052.333-.052 2.01 0 3.736 1.144 4.617 2.803A8.982 8.982 0 0 1 15.995 25z"
                  fill="currentColor"
                  fillRule="nonzero"
                />
              </svg>
            );
          default:
            return null;
        }
      })()}
    </span>
  );
};
