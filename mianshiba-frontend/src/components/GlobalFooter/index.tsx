"use client";
import React from "react";
import "./index.css";

/**
 * 全局底部栏
 * @constructor
 */
export default function GlobalFooter() {
  const currentYear: number = new Date().getFullYear();

  return (
    <div className={"global-footer"}>
      <div>© {currentYear} 面试吧</div>
      <div>
        <a href={"https://github.com/BraumAce/mianshiba"} target={"_blank"}>
          作者：BraumAce
        </a>
      </div>
    </div>
  );
}
