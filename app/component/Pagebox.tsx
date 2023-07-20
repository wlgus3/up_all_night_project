"use client";
import { useEffect, useState } from "react";

import PageComponent from "./pagination.js";

const Pagebox = (props: any) => {
  const [page, setPage] = useState(1);
  console.log("총 게시글 ", props.postcount);
  return (
    <div>
      <PageComponent postcount={props.postcount} page={page} setPage={setPage} />
    </div>
  );
};
export default Pagebox;
