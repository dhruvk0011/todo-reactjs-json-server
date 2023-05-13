const apiRequest = async (url = "", optionsObj = null, errorMessage = null) => {
  try {
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Please reload message!");
  } catch (err) {
    errorMessage = err.message;
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return errorMessage;
  }
};

export default apiRequest;
