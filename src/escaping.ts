export function textAsAttributeValue(
  text: string,
  grammar: "html" | "xml" | "unknown",
): string {
  let encoded = text;

  encoded = encoded.replaceAll("\0", "\uFFFD");

  encoded = encoded.replaceAll(/&(?=[a-zA-Z0-9]|$)/ug, "&amp;");

  if (
    grammar === "html" && encoded.length > 0 &&
    !encoded.match(/[\t\n\f &>"'<=`]/)
  ) {
    return encoded;
  } else if (!encoded.includes('"')) {
    return `"${encoded}"`;
  } else if (!encoded.includes("'")) {
    return `'${encoded}'`;
  } else {
    return `"${encoded.replaceAll('"', "&#34;")}"`;
  }
}

export function textAsTextNode(
  text: string,
  tag: string | undefined,
  grammar: "html" | "xml" | "unknown",
): string {
  tag = tag?.toLowerCase();

  let encoded = text;

  encoded = encoded.replaceAll("\0", "\uFFFD");

  if (tag == "script" && grammar != "xml") {
    // This is safe if the type is JSON or JavaScript because the only
    // location where this sequence can occur is in a string or regex literal,
    // where this will be valid and equivalent, or a comment... EXCEPT if this
    // is inside of a tagged template literal and the tag function is something
    // like String.raw which looks at the literal string including escape
    // sequences. That case seems inherently unavoidable.
    encoded = encoded.replaceAll(
      /<\/script(?=[\t\n\f\r >\/]|$)/ug,
      "</\\u0073cript",
    );

    return encoded;
  }

  if (tag == "style" && grammar != "xml") {
    // This is safe if the type is CSS because the only location where this
    // sequence can occur is in a string literal, where this will be valid
    // and equivalent, or a comment.
    encoded = encoded.replaceAll(
      /<\/style(?=[\t\n\f\r >\/]|$)/ug,
      "\\3C\/style",
    );

    return encoded;
  }

  if (tag == "!--") {
    // https://html.spec.whatwg.org/#comments
    encoded = encoded.replaceAll("<!--", "< !--");
    encoded = encoded.replaceAll("-->", "-- >");
    encoded = encoded.replaceAll("--!>", "-- !>");
    encoded = encoded.replaceAll(/^>/ug, " >");
    encoded = encoded.replaceAll(/^->/ug, "- >");
    encoded = encoded.replaceAll(/<!-$/ug, "< !-");

    return encoded;
  }

  if (grammar === "html") {
    encoded = encoded.replaceAll(/&(?=[a-zA-Z0-9]|$)/ug, "&amp;");
  } else {
    encoded = encoded.replaceAll("&", "&amp;");
  }

  encoded = encoded.replaceAll("]]>", "]]&gt;");

  if (tag == "title" && grammar == "html") {
    encoded = encoded.replaceAll("<![CDATA[", "&lt;![CDATA[");
    encoded = encoded.replaceAll(
      /<\/title(?=[\t\n\f\r >\/]|$)/ug,
      "&lt;/title",
    );
  } else if (tag == "textarea" && grammar == "html") {
    encoded = encoded.replaceAll("<![CDATA[", "&lt;![CDATA[");
    encoded = encoded.replaceAll(
      /<\/textarea(?=[\t\n\f\r >\/]|$)/ug,
      "&lt;/textarea",
    );
  } else {
    encoded = encoded.replaceAll("<", "&lt;");
  }

  return encoded;
}
