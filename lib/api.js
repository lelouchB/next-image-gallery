const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

export const getCuratedPhotos = async () => {
  const res = await fetch(
    `https://api.pexels.com/v1/curated?page=21&per_page=6`,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const responseJson = await res.json();
  return responseJson.photos;
};

export const getQueryPhotos = async (query) => {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const responseJson = await res.json();
  return responseJson.photos;
};

export const getPhotoById = async (id) => {
  const res = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
    headers: {
      Authorization: API_KEY,
    },
  });
  const responseJson = await res.json();
  return responseJson;
};
