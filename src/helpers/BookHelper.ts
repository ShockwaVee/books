const url = "https://www.googleapis.com/books/v1";

export const searchUrl = `${url}/volumes?q=`;
export const fetchUrl = `${url}/volumes/`;

export const renderAuthors = (authors: string[] | undefined) => {
  if (!authors) {
    return "-";
  }
  return authors.join(", ");
};
