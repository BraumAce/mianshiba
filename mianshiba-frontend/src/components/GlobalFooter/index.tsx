"use client";

import React from "react";
import "./index.css";

/**
 * 全局底部栏
 * @constructor
 */
export default function GlobalFooter() {
  const [currentYear, setCurrentYear] = React.useState<number>(2024);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={"global-footer"}>
      <div>© {currentYear} 面试吧</div>
      <div>
        <a href={"https://github.com/BraumAce/mianshiba"} target={"_blank"} rel={"noopener noreferrer"}>
          作者：BraumAce
        </a>
      </div>
    </footer>
  );
}
