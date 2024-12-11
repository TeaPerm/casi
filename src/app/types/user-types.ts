export type loginResponse = {
  accessToken : string,
  refreshToken: string,
}

export type registerResponse = {
  message: string,
}


export type userDetailsResponse= {
  name: string,
  credit: number,
  email: string
}
