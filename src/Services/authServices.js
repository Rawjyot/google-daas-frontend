import axios from "axios";
import config from "../configurations/config";
import { sha256, sha256Bytes } from 'js-sha256';

class AuthService {
  async apiPostCall(url, data) {
    return await axios.post(url, data);
  }

  async login({ userId, userPassword, userToken }) {
    try {
      // sha256("Denave@123").then(hash => {
      // console.log(sha256("Denave@123"));
      // })
      // return;
      const data = {
        userId,
        userPassword: sha256(userPassword),
        // "23C5667F5E0B028051582D37E03C4EA5CE74043CFDAB3D664770C6CE7FE706BA",
        userToken,
      };
      const url = `${config.baseUrl}/api/loginGoogle`;
      const res = await this.apiPostCall(url, data);
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async forgetPassword({ email }) {
    try {
      const url = `${config.baseUrl}/api/forgotpassword?email=${email}`;
      return await this.apiPostCall(url);
    } catch (err) {
      throw err;
    }
  }
  async verifyViaEmail(email, otp) {
    try {
      const url = `${config.baseUrl}/api/verifyEmail?email=${email}&otp=${otp}`;
      // console.log(url)
      return await this.apiPostCall(url);
    } catch (err) {
      throw err;
    }
  }

  async resendCode() {
    try {
    } catch (err) {
      throw err;
    }
  }
  async createNewPassword(newPassword, ResetToken) {
    try {
      const url = `${config.baseUrl}/api/resetPasswordViaMail?token=${ResetToken}&newPassword=${newPassword}`;
      // console.log(url)
      return this.apiPostCall(url);
    } catch (err) {
      throw err;
    }
  }

  async logout(payload) {
    try {
      const url = `${config.baseUrl}/api/logout`;
      return await this.apiPostCall(url, payload);
    } catch (err) {
      throw err;
    }
  }

  async logoutUser(errorMessage) {

    // Trigger logout and redirect to login
    // logoutUser();
    localStorage.clear();
    localStorage.setItem('sessionExpired', errorMessage);
    window.location.href = "/";
    // You can also redirect to the login page using your preferred routing method
    // Example: window.location.href = '/login';
    // }
    // If it's not a 401 error, you can handle it in other ways or rethrow it
    return Promise.reject(error);
  };


}

const authService = new AuthService();
export default authService;
