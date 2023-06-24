export type Session = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};


export type ApiResponse<T>{
  data:[],
  totalPage:number,
  page:number

}
