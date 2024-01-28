import { useEffect, useState } from "react";
import dashboardService from "../Services/dashBoardService";

const useDashboardAccountCall = (companyName, token) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dashboardService
      .getAccountDetailsNew(companyName, token)
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
};
export const useDashboardContactCountCall = (companyName, token) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dashboardService
      .getContactCount(companyName, token)
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
};
export const useDashboardContactCall = (companyName, token) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dashboardService
      .getContacts(companyName, token)
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
};
export const useTotalAccountNumberCall = (role, partnerID, token) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dashboardService
      .getTotalAccountNumber(role, partnerID, token)
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
};
export const useGetTrailRemarkCall = (payload, token) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    dashboardService
      .getTrailRemark(payload, token)
      .then((res) => {
        // console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return data;
};
// export const useGetAccountActivityCall = (role, id, token) => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const call = async () => {
//       let res = await dashboardService.accountActivity(role, id, token);
//       console.log(res.data);
//       setData(res.data);
//     };
//     call();
//   }, []);
//   return data;
// };

export default useDashboardAccountCall;
