// fetchBookCover.js
// Returns a promise resolving to an image URL or null if not found.
export async function fetchBookCover(title, author) {
  try {
    const q = encodeURIComponent(`${title} ${author}`);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=5`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.items || data.items.length === 0) return null;

    // Find first item with imageLinks
    for (const item of data.items) {
      const img = item.volumeInfo?.imageLinks;
      if (img?.thumbnail) {
        // return thumbnail (convert http to https)
        return img.thumbnail.replace(/^http:\/\//i, "https://");
      } else if (img?.smallThumbnail) {
        return img.smallThumbnail.replace(/^http:\/\//i, "https://");
      }
    }
    return null;
  } catch (err) {
    console.warn("fetchBookCover error", err);
    return null;
  }
}
