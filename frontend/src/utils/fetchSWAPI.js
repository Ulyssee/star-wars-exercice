export async function fetchResource(url) {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error('Erreur fetchResource :', error);
      return null;
    }
  }
  
  export async function fetchMultipleResources(urls) {
    try {
      const requests = urls.map((u) => fetch(u).then((res) => res.json()));
      return Promise.all(requests);
    } catch (error) {
      console.error('Erreur fetchMultipleResources :', error);
      return [];
    }
  }
  