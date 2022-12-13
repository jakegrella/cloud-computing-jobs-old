import NextHead from "next/head";

interface IHeadProps {
  title: string;
  description: string;
  faviconHref: string;
}

export function Head({
  title,
  description,
  faviconHref,
}: IHeadProps): JSX.Element {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={faviconHref} />
    </NextHead>
  );
}
