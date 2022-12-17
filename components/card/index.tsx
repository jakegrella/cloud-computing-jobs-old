import React, { Children, cloneElement, ReactElement } from "react";
import styles from "./card.module.css";

interface ICardProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    React.AriaAttributes {
  unpadded?: boolean;
}

export function Card({
  children,
  dangerouslySetInnerHTML,
  className,
  unpadded = false,
}: ICardProps) {
  const clonedChild = Children.map(children, (child: ReactElement) => {
    return child === null
      ? child
      : cloneElement(child, {
          className: child?.props?.className
            ? `cardChild ${child.props.className}`
            : `cardChild`,
        });
  });

  return (
    <div
      className={`${styles.card} ${unpadded && styles.unpadded} ${
        className && className
      }`}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {clonedChild}
    </div>
  );
}
