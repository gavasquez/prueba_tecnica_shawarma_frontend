

export type Data = Array<Record<string, string>>;

export type ApiUpdloadResponse = {
  message: string;
  data: Data;
}


export type ApiSearchResponse = {
  data: Data;
}