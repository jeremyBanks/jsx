export function textAsAttribute(text: string): string {
  let encoded = text;

  encoded = encoded.replaceAll("\0", "\uFFFD");

  encoded = encoded.replace(/&(?=[a-zA-Z0-9]+;|[a-zA-Z0-9]*$)/ug, "&amp;");

  if (encoded.length > 0 && !encoded.match(/[\t\n\f &>"'<=`]/)) {
    return encoded;
  } else if (!encoded.includes('"')) {
    return `"${encoded}"`;
  } else if (!encoded.includes("'")) {
    return `'${encoded}'`;
  } else {
    return `"${encoded.replaceAll('"', "&#34;")}"`;
  }
}

export function textAsChildOfTag(text: string, tag?: string): string {
  tag = tag?.toLowerCase();

  let encoded = text;

  encoded = encoded.replaceAll("\0", "\uFFFD");

  if (tag == "script") {
    // This is safe if the type is JSON or JavaScript because the only
    // location where this sequence can occur is in a string literal,
    // where this will be valid and equivalent, or a comment.
    encoded = encoded.replaceAll(
      /<\/script(?=[\t\n\f\r >\/]|$)/,
      "<\/script",
    );

    return encoded;
  }

  if (tag == "style") {
    // This is safe if the type is CSS because the only location where this
    // sequence can occur is in a string literal, where this will be valid
    // and equivalent, or a comment.
    encoded = encoded.replaceAll(
      /<\/style(?=[\t\n\f\r >\/]|$)/,
      "\\3C\/style",
    );

    return encoded;
  }

  if (tag == "!--") {
    // https://html.spec.whatwg.org/#comments
    encoded = encoded.replaceAll("<!--", "< !--");
    encoded = encoded.replaceAll("-->", "-- >");
    encoded = encoded.replaceAll("--!>", "-- !>");
    encoded = encoded.replace(/^>/ug, " >");
    encoded = encoded.replace(/^->/ug, "- >");
    encoded = encoded.replace(/<!-$/ug, "< !-");

    return encoded;
  }

  encoded = encoded.replace(/&(?=[a-zA-Z0-9]+;|[a-zA-Z0-9]*$)/ug, "&amp;");

  encoded = encoded.replaceAll("]]>", "]]&gt;");

  if (tag == "title") {
    encoded = encoded.replaceAll("<![CDATA[", "&lt;![CDATA[");
    encoded = encoded.replaceAll(
      /<\/title(?=[\t\n\f\r >\/]|$)/,
      "\\3C\/title",
    );
  } else if (tag == "textarea") {
    encoded = encoded.replaceAll("<![CDATA[", "&lt;![CDATA[");
    encoded = encoded.replaceAll(
      /<\/textarea(?=[\t\n\f\r >\/]|$)/,
      "\\3C\/textarea",
    );
  } else {
    encoded = encoded.replaceAll("<", "&gt;");
  }

  return encoded;
}
