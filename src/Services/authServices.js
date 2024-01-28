import axios from "axios";
import config from "../configurations/config";

class AuthService {
  async apiPostCall(url, data) {
    return await axios.post(url, data);
  }

  async login({ userId, userPassword, userToken }) {
    try {
      const data = {
        userId,
        userPassword:
          "23C5667F5E0B028051582D37E03C4EA5CE74043CFDAB3D664770C6CE7FE706BA",
        userToken,
      };
      const url = `${config.baseUrl}/api/loginGoogle`;
      const res = await this.apiPostCall(url, data);
      return res;
    } catch (err) {
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
}

const authService = new AuthService();
export default authService;
