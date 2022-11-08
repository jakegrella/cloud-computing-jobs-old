import { Children, cloneElement, ReactElement } from "react";
import styles from "./card.module.css";

export default function Card({ children }) {
  const childrenWithClass = Children.map(children, (child: ReactElement) =>
    cloneElement(child, {
      className: child.props.className
        ? `cardChild ${child.props.className}`
        : `cardChild`,
    })
  );

  return <div className={styles["card"]}>{childrenWithClass}</div>;
}
