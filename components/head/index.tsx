import NextHead from "next/head";

interface IHeadProps {
  title: string;
  description: string;
  keywords?: string;
  faviconHref?: string;
}

export function Head({
  title,
  description,
  keywords,
  faviconHref = "/favicon.ico",
}: IHeadProps): JSX.Element {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href={faviconHref} />
    </NextHead>
  );
}
