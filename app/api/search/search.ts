import axios from "axios";

const base_url = "http://127.0.0.1:8000/api/search";

export async function SearchByKeyword(
  keyword: string,
  type: string,
  cursor_id: string | null = null
) {
  try {
    const resposne = await axios.get(base_url, {
      params: {
        keyword: keyword,
        type: type,
        cursor_id: cursor_id
      },
    });
    return resposne.data;
  } catch (err) {
    console.error(err);
  }
}
