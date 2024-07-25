
export const createRandomUserData = () => {
  return {
    email: `user-${Math.floor(Math.random() * 999)}@gmail.net`,
    name: `user_${Math.floor(Math.random() * 555)}`,
    gender: "male",
    status: "active",
  };
};