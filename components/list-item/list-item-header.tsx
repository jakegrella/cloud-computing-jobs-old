import Image from "next/image";
import styles from "./list-item.module.css";

interface IListItemHeaderProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
}

export function ListItemHeader({
  imageSrc,
  imageAlt,
  title,
  subtitle,
}: IListItemHeaderProps) {
  return (
    <div className={styles.listItem_header}>
      <Image
        src={imageSrc}
        className={styles.listItem_header_image}
        alt={imageAlt}
        width={36}
        height={36}
      />
      <div>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
    </div>
  );
}
