export const isIndonesianNumber = (phoneNumber) => {
  const regex = new RegExp("^628[0-9]{9,12}");
  return regex.test(phoneNumber);
};

export const normalizeIndonesiaPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== "string") {
    return "";
  }
  return phoneNumber.replace(/\D/g, "").replace(/^0/, "62");
};

export const validateEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
};
