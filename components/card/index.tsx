import React, { Children, cloneElement, ReactElement } from "react";
import styles from "./card.module.css";

export function Card({ children, className = null }) {
  const clonedChild = Children.map(children, (child: ReactElement) => {
    return child === null
      ? child
      : cloneElement(child, {
          className: child?.props.className
            ? `cardChild ${child.props.className}`
            : `cardChild`,
        });
  });

  return (
    <div className={`${styles.card} ${className ?? ""}`}>{clonedChild}</div>
  );
}
