import axios from "axios";
import config from "../configurations/config";

class DashBoardService {
  async getApiCall(url, token) {
    const header = {
      // "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return await axios.get(url, { headers: header });
  }

  async putApiCall(url, data, token) {
    const header = {
      // "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return await axios.put(url, data, { headers: header });
  }

  async postApiCall(url, data, token = null) {
    const header = {
      // Authorization: `Bearer ${token}`,
    };

    return await axios.post(url, data, { headers: header });
  }

  async postCall(url, data, token) {
    const header = {
      // Authorization: `Bearer ${token}`,
    };
    return await axios.post(url, data, { headers: header });
  }

  async AccountList(role, id, token) {
    let url = `${config.baseUrl}/api/account/${role}/${id}`;
    // if (role === "user") {
    //   url = `${config.baseUrl}/api/account/users?id=${id}`;
    // } else if (role === "Client") {
    //   // url = `${config.baseUrl}/api/account/clients?id=10`;
    //   url = `${config.baseUrl}/api/account/clients?id=${id}`;
    // } else {
    //   url = `${config.baseUrl}/api/account/partners?id=${id}`;
    // }

    // console.log(url);
    return this.getApiCall(url, token);
  }

  async totalAccountDetails(role, id, token) {
    // let url = `${config.baseUrl}/api/account/${role}/${id}`;
    let url;
    if (role === "user") {
      url = `${config.baseUrl}/api/account/users?id=${id}`;
    } else if (role === "Client") {
      // url = `${config.baseUrl}/api/account/clients?id=10`;
      url = `${config.baseUrl}/api/account/clients?id=${id}`;
    } else {
      url = `${config.baseUrl}/api/account/partners?id=${id}`;
    }

    // console.log(url);
    return this.getApiCall(url, token);
  }

  async getAccountDetails(companyName, token) {
    let url = `${config.baseUrl}/api/account/accountdetailbyName?accountName=${companyName}`;
    // console.log(url);
    return this.getApiCall(url, token);
  }

  async getAccountDetailsNew(data, token) {
    let url = `${config.baseUrl}/api/accountDetails`;
    // console.log(url);
    return this.postApiCall(url, data, token);
  }

  async getTotalAccountNumber(role, ID, token) {
    let url;
    if (role === "user") {
      url = `${config.baseUrl}/api/account/totalProfiledContactsByUserID/?userID=${ID}`;
    } else if (role === "Client") {
      url = `${config.baseUrl}/api/account/clients?id=${ID}`;
    } else {
      url = `${config.baseUrl}/api/account/totalProfiledAccountsbypartner/?partnerId=${ID}`;
    }
    // console.log(url, token);
    return this.getApiCall(url, token);
  }
  async getTotalContactNumber(role, ID, token) {
    let url;
    // console.log(url, token);
    return this.getApiCall(url, token);
  }
  async getContactCount(companyName, token) {
    let url = `${config.baseUrl}/api/account/contacts/count?accountName=${companyName}`;
    // console.log(url, token);
    return this.getApiCall(url, token);
  }

  async getContacts(companyName, token) {
    // http://localhost:5000/api/account/contactdetails
    let url = `${config.baseUrl}/api/account/contactdetails/${companyName}`;
    // console.log(url);
    return this.getApiCall(url, token);
  }

  async statusUpdate(accountID, data, token) {
    let url = `${config.baseUrl}/api/account/statusupdate?accountId=${accountID}`;
    // /
    console.log(url);
    return this.putApiCall(url, data, token);
  }

  async statusUpdateNew(accountID, data, token) {
    let url = `${config.baseUrl}/api/activitySubmit`;
    // /
    console.log(url);
    return this.postApiCall(url, data, token);
  }

  async getTrailRemark(data, token) {
    let url = `${config.baseUrl}/api/getActivity`;
    console.log(url);
    return this.postApiCall(url, data, token);
  }
  // async addMark(accountId, data, token) {
  //   let url = `${config.baseUrl}/api/add-remark?accountId=${accountId}`;
  //   // console.log(url);
  //   return this.postApiCall(url, data, token);
  // }

  async accountActivity(role, id, token) {
    let url = `${config.baseUrl}/api/dashboard/accountActivity`;
    return this.getApiCall(url, token);
  }

  async partnerActivity(role, id, token) {
    // http://localhost:5000/api/partner-activity/client/22
    let url = `${config.baseUrl}/api/partner-activity/${role}/${id}`;
    // console.log(url);
    return this.getApiCall(url, token);
  }

  async getMastersList(data, token) {
    let url = `${config.baseUrl}/api/getMasterData`;
    console.log(url);
    return this.postApiCall(url, data, token);
  }
}

const dashboardService = new DashBoardService();

export default dashboardService;

export const accountActivity = async (data) => {
  let url = `${config.baseUrl}/api/dashboard/accountActivity`;
  return await axios.post(url, data);
};

export const accountActivityAll = async (data) => {
  let url = `${config.baseUrl}/api/dashboard/accountActivity/all`;
  return await axios.post(url, data);
};

export const partnerActivity = async (data) => {
  let url = `${config.baseUrl}/api/dashboard/partnerActivity`;
  return await axios.post(url, data);
};

export const getPartnerActivityAll = async (data) => {
  let url = `${config.baseUrl}/api/dashboard/partnerActivity/all`;
  return await axios.post(url, data);
};

export const getAccountListDetails = async (data) => {
  let url = `${config.baseUrl}/api/accountGridData`;
  return await axios.post(url, data);
};

export const getAccountListDetailsFiltered = async (data) => {
  let url = `${config.baseUrl}/api/accountGridDataFiltered`;
  return await axios.post(url, data);
};

export const getMasterData = async (data) => {
  let url = `${config.baseUrl}/api/getMasterData`;
  return await axios.post(url, data);
};

export const getAgentList = async (data) => {
  let url = `${config.baseUrl}/api/getPartnerUserList`;
  return await axios.post(url, data);
};

// export async function send(
//   params: {
//     baseurl: string;
//     method: string;
//     url: string;
//     obj?: FormData | object | string;
//     reqToken?: CancelTokenSource;
//   },
//   headers?: object,
//   config?: object
// ): Promise<any> {
//   let Url;
//   let Params;

//   if (!params || typeof params !== 'object') {
//     throw new Error('params is undefined or not an object');
//   }
//   try {
//     const cancelToken = params.reqToken ?? axios.CancelToken.source();
//     const encryptedList = JSON.parse(
//       SessionStorage.getItem('encryptedUrl') ?? '[]'
//     );
//     const randomValue = randomGenerateNumber();
//     if (params.method === 'POST') {
//       Url = params.baseurl + params.url;
//       const isMultipart: boolean =
//         headers?.['Content-Type'] === 'multipart/form-data';
//       const isEncryption =
//         (encryptedList?.length > 0 &&
//           checkAvailUrl(encryptedList, Url) &&
//           !isMultipart) ||
//         checkAvailUrl(staticEncryptedUrl, Url);
//       headers = { ...headers, auth: encryptRSAWithPublicKey(randomValue) };

//       Params =
//         isEncryption && params.obj
//           ? {
//               data: encryptWithIvSalt(
//                 randomValue,
//                 REACT_APP_IV,
//                 JSON.stringify(params.obj)
//               ),
//             }
//           : params.obj;

//       return await post(Url, Params, cancelToken, headers, config, randomValue);
//     } else {
//       Url = params.baseurl + params.url;
//       return await get(Url, cancelToken);
//     }
//   } catch (err: any) {
//     let errData;
//     if (err.code === 'ERR_CANCELED' || err.code === 'ERR_NETWORK') {
//       errData = {
//         error: {
//           errorCode: err.code,
//         },
//       };
//     } else {
//       errData = err?.response.data;
//     }
//     const error = handleError(errData);

//     throw new ServerError(error);
//   }
// }
