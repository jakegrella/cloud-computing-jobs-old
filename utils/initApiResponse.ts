interface IApiResponse {
  status: number;
  data?: any;
  message?: string;
}

export const initApiResponse: IApiResponse = {
  status: 500,
  data: {},
  message: "Unknown Error",
};
