import axios from "axios";
import config from "../configurations/config";

class PolicyService {
  async postCall(url, data, token) {
    const header = {
      // Authorization: `Bearer ${token}`,
    };
    // console.log(header);
    return axios.post(url, data, { headers: header });
  }

  // async policyContent() { }

  async policyContent(payload, token) {
    let url = `${config.baseUrl}/api/policy`;
    // console.log(url, token);
    return this.postCall(url, payload, token);
  }

  async privacyPolicyContent(payload) {
    let url = `${config.baseUrl}/api/privacyPolicy`;
    // console.log(url, token);
    return this.postCall(url, payload);
  }

  async policyAcceptance(payload, token) {
    let url = `${config.baseUrl}/api/policyAccept`;
    // console.log(url, token);
    return this.postCall(url, payload, token);
  }
}

const policyService = new PolicyService();

export default policyService;
