import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "ab616094185e46909cc518ab2c6f88bb",
  },
});
