export function textAsAttributeValue(text: string): string {
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
    // location where this sequence can occur is in a string or regex literal,
    // where this will be valid and equivalent, or a comment... EXCEPT if this
    // is inside of a tagged template literal and the tag function is something
    // like String.raw which looks at the literal string including escape
    // sequences. That case seems inherently unavoidable.
    encoded = encoded.replaceAll(
      /<\/script(?=[\t\n\f\r >\/]|$)/,
      "</\\u0073cript",
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
      "&lt;/title",
    );
  } else if (tag == "textarea") {
    encoded = encoded.replaceAll("<![CDATA[", "&lt;![CDATA[");
    encoded = encoded.replaceAll(
      /<\/textarea(?=[\t\n\f\r >\/]|$)/,
      "&lt;/textarea",
    );
  } else {
    encoded = encoded.replaceAll("<", "&lt;");
  }

  return encoded;
}
