interface SafebooruImage {
  file_url: string;
  tags: string;
}

interface TagSuggestion {
  value: string;
  label: string;
  count: number;
}

export async function searchImages(
  query: string,
  page: number = 1
): Promise<SafebooruImage[]> {
  try {
    const res = await fetch(
      `https://sssproxy.leanghokoeng5.workers.dev/https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=${query}&pid=${
        page - 1
      }`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await res.json();

    // Handle empty response or invalid data
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((post: any) => ({
      file_url: post.file_url || "",
      tags: post.tags || "",
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export async function getTagSuggestions(
  query: string
): Promise<TagSuggestion[]> {
  try {
    const res = await fetch(
      `https://sssproxy.leanghokoeng5.workers.dev/https://safebooru.org/index.php?page=dapi&s=tag&q=index&json=1&name_pattern=${query}*`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tag suggestions");
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((tag: any) => ({
      value: tag.name,
      label: `${tag.name} (${tag.count})`,
      count: tag.count,
    }));
  } catch (error) {
    console.error("Error fetching tag suggestions:", error);
    return [];
  }
}
