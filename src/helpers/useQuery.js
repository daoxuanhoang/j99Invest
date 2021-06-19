import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default useQuery;

// import useQuery from "helpers/useQuery";

// const params = useQuery();
// console.log(params.get("name"));
