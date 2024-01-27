import axios from "axios";
import config from "../configurations/config";

class PolicyService {
  async postCall(url, data, token) {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    // console.log(header);
    return axios.post(url, data, { headers: header });
  }

  async policyContent() {}

  async policyAcceptance(Id, token) {
    let url = `${config.baseUrl}/api/policyAccept`;
    // console.log(url, token);
    return this.postCall(url, "", token);
  }
}

const policyService = new PolicyService();

export default policyService;
