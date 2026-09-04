type JsonLdProps = { data: Record<string, unknown> };

/** Renders structured data. Content is generated on the server, never user input. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
