import axios from "axios";

export const fetchItems = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
