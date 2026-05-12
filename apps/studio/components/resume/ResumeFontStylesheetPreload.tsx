import { RESUME_EDITOR_FONT_STYLESHEET_HREFS } from "@/features/documents/utils/font-registry";

export function ResumeFontStylesheetPreload() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {RESUME_EDITOR_FONT_STYLESHEET_HREFS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}
