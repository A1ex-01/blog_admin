import classNames from 'classnames';
import { useState } from 'react';

interface FoldBoxProps {
  rows?: number;
  children: React.ReactNode;
}

export default function FoldBox({ rows = 1, children }: FoldBoxProps) {
  const [isFold, setIsFold] = useState(true);
  // const safeClassNames = useMemo(() => {
  //   return {
  //     'line-clamp-1': 1,
  //     'line-clamp-2': 2,
  //     'line-clamp-3': 3,
  //     'line-clamp-4': 4,
  //     'line-clamp-5': 5,
  //     'line-clamp-6': 6,
  //     'line-clamp-7': 7,
  //     'line-clamp-8': 8,
  //     'line-clamp-9': 9,
  //   };
  // }, []);
  return (
    <>
      <div className={classNames('', isFold ? `line-clamp-${rows}` : '')}>
        {children}
      </div>
      {!!children && children !== '-' && (
        <div className="btn">
          {isFold ? (
            <a onClick={() => setIsFold(false)} className="text-[#1677ff]">
              查看更多
            </a>
          ) : (
            <a onClick={() => setIsFold(true)} className="text-[#1677ff]">
              折叠
            </a>
          )}
        </div>
      )}
    </>
  );
}
