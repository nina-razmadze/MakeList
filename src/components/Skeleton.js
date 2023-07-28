import classNames from 'classnames';

export default function Skeleton({ times, className }) {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-blue-200',
    'rounded',
    'mb-2.5',
    className
  );
  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-blue-200',
    'via-white',
    'to-blue-200'
  );

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div className={outerClassNames} key={i}>
          <div className={innerClassNames}></div>
        </div>
      );
    });
  return boxes;
}
