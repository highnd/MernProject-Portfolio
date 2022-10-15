import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("user/create", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    // if (response?.data) return response.data.error;

    return { err: response.data.error };
    // console.log(response?.data.error);
  }
};

export const verifyEmailUser = async (userInfo) => {
  // const {email,OTP} =userInfo
  try {
    const { data } = await client.post("user/verfiy-email", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    // if (response?.data) return response.data.error;

    return { err: response.data.error };
    // console.log(response?.data.error);
  }
};

export const signInUser = async (userInfo) => {
  // const {email,OTP} =userInfo
  try {
    const { data } = await client.post("user/sign-in", userInfo);
    return data;
  } catch (error) {
    const { response } = error;
    // if (response?.data) return response.data.error;

    return { err: response.data.error };
    // console.log(response?.data.error);
  }
};

export const getIsAuth = async (token) => {
  // const {email,OTP} =userInfo
  try {
    const { data } = await client.get("user/is-auth", {
      headers: {
        authorization: "Bearer " + token,
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;

    // if (response?.data) return response.data.error;

    return { err: response.data.error };
    // console.log(response?.data.error);
  }
};

export const forgetPassword = async (email) => {
  // const {email,OTP} =userInfo
  try {
    const { data } = await client.post("user/forget-password", { email });
    return data;
  } catch (error) {
    const { response } = error;

    // if (response?.data) return response.data.error;

    return { err: response.data.error };
    // console.log(response?.data.error);
  }
};

export const verifyPasswordReset = async (token, userId) => {
  // const {email,OTP} =userInfo
  try {
    const { data } = await client.post("user/verify-password-reset-token", {
      token,
      userId,
    });
    return data;
  } catch (error) {
    const { response } = error;

    // if (response?.data) return response.data.error;

    return { err: response.data.error };
    // console.log(response?.data.error);
  }
};

export const resetPassword = async (PasswordData) => {
  // const {email,OTP} =userInfo
  try {
    const { data } = await client.post("user/reset-password", PasswordData);
    return data;
  } catch (error) {
    const { response } = error;

    // if (response?.data) return response.data.error;

    return { err: response.data.error };
    // console.log(response?.data.error);
  }
};

export const resendEmailVerToken = async (userId) => {
  // const {email,OTP} =userInfo
  try {
    const { data } = await client.post("user/resend-verfiy-email", { userId });
    return data;
  } catch (error) {
    const { response } = error;

    // if (response?.data) return response.data.error;

    return { err: response.data.error };
    // console.log(response?.data.error);
  }
};
