import { AxiosError } from "axios";

export function AxiosErrorHandler(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      return typeof error.response.data === "string"
        ? error.response.data
        : JSON.stringify(error.response.data);
    } else if (error.request) {
      // console.log(error.request);
      return "No response received from server";
    } else {
      // console.log("Error", error.message);
      return error.message;
    }
  } else if (error instanceof Error) {
    // console.log(error?.message);
    return error?.message;
  } else {
    return "Something went wrong";
  }
}
