export const saveProfile = (address, profile) => {
  if (!address) return;
  localStorage.setItem(
    `profile_${address}`,
    JSON.stringify(profile)
  );
};

export const getProfile = (address) => {
  if (!address) return null;
  const data = localStorage.getItem(`profile_${address}`);
  return data ? JSON.parse(data) : null;
};
