import axios from "axios";
import config from "../configurations/config";
import authService from './authServices';

class DashBoardService {
  constructor() {
    // Initialize an Axios instance for this service
    this.service = axios.create({
      baseURL: config.baseUrl,
    });

    // Add a request interceptor
    this.service.interceptors.request.use(
      (config) => {
        // Modify the request before sending it
        // For example, add authorization header
        const token = '';
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    this.service.interceptors.response.use(
      (response) => {
        // Handle the response data
        if (response && (response?.data?.status == "Expired" || response?.data?.statusCode == "401")) {
          // Log out the user or perform other actions when a 401 response is received
          authService.logoutUser("Session Expired! Please login again");
          console.log('User is not authenticated. Logging out...', response?.data);
          // Add your logout logic here
        }
        return response;
      },
      (error) => {
        // Handle the response error
        if (error.response && error.response.status === 401) {
          authService.logoutUser("Session Expired! Please login again");
          // Log out the user or perform other actions when a 401 response is received
          console.log('User is not authenticated. Logging out...');
          // Add your logout logic here
        }
        return Promise.reject(error);
      }
    );
  }

  async getApiCall(url, token) {
    const header = {
      // "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return await this.service.get(url, { headers: header });
  }

  async putApiCall(url, data, token) {
    const header = {
      // "Accept": "application/json",
      Authorization: `Bearer ${token}`,
    };
    return await this.service.put(url, data, { headers: header });
  }

  async postApiCall(url, data, token = null) {
    const header = {
      // Authorization: `Bearer ${token}`,
    };

    return await this.service.post(url, data, { headers: header });
  }

  async postCall(url, data, token) {
    const header = {
      // Authorization: `Bearer ${token}`,
    };
    return await this.service.post(url, data, { headers: header });
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
    // console.log(url);
    return this.putApiCall(url, data, token);
  }

  async statusUpdateNew(accountID, data, token) {
    let url = `${config.baseUrl}/api/activitySubmit`;
    // /
    // console.log(url);
    return this.postApiCall(url, data, token);
  }

  async getTrailRemark(data, token) {
    let url = `${config.baseUrl}/api/getActivity`;
    // console.log(url);
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

  // async partnerActivity(role, id, token) {
  //   // http://localhost:5000/api/partner-activity/client/22
  //   let url = `${config.baseUrl}/api/partner-activity/${role}/${id}`;
  //   // console.log(url);
  //   return this.getApiCall(url, token);
  // }

  async getMastersList(data, token) {
    let url = `${config.baseUrl}/api/getMasterData`;
    return this.postApiCall(url, data, token);
  }

  async accountActivity(data) {
    let url = `${config.baseUrl}/api/dashboard/accountActivity`;
    return await this.service.post(url, data);
  };

  async accountActivityAll(data) {
    let url = `${config.baseUrl}/api/dashboard/accountActivity/all`;
    return await this.service.post(url, data);
  };

  async partnerActivity(data) {
    let url = `${config.baseUrl}/api/dashboard/partnerActivity`;
    return await this.service.post(url, data);
  };

  async getPartnerActivityAll(data) {
    let url = `${config.baseUrl}/api/dashboard/partnerActivity/all`;
    return await this.service.post(url, data);
  };

  async getAccountListDetails(data) {
    let url = `${config.baseUrl}/api/accountGridData`;
    return await this.service.post(url, data);
  };

  async getAccountListDetailsFiltered(data) {
    let url = `${config.baseUrl}/api/accountGridDataFiltered`;
    return await this.service.post(url, data);
  };

  async getMasterData(data) {
    let url = `${config.baseUrl}/api/getMasterData`;
    return await this.service.post(url, data);
  };

  async getAgentList(data) {
    let url = `${config.baseUrl}/api/getPartnerUserList`;
    return await this.service.post(url, data);
  };
}

const dashboardService = new DashBoardService();

export default dashboardService;

export const getMasterData = async (data) => {
  let url = `${config.baseUrl}/api/getMasterData`;
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
//     const cancelToken = params.reqToken ?? this.service.CancelToken.source();
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
