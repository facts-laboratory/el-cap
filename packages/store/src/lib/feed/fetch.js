// FILE NEEDS TO BE REMOVED AND REPLACED WITH KIT FUNCTION
export async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
