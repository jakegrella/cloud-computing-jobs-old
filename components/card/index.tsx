import { Children, cloneElement, ReactElement } from "react";
import styles from "./card.module.css";

export function Card({ children, className = null }) {
  const childrenWithClass = Children.map(children, (child: ReactElement) =>
    cloneElement(child, {
      className: child.props.className
        ? `cardChild ${child.props.className}`
        : `cardChild`,
    })
  );

  return (
    <div className={`${styles.card} ${className ?? ""}`}>
      {childrenWithClass}
    </div>
  );
}
