const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

const requestBase64 = async (url, cb) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error loading image: ${response.status}`);
    }

    const body = await blobToDataUrl(await response.blob());
    cb(null, response, body);
  } catch (error) {
    cb(error);
  }
};

export default { requestBase64 };
