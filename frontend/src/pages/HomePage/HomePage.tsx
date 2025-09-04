import { FC } from "react";

import "./homePage.css";

export const HomePage: FC = () => {
  return (
    <div className="banner my-4 d-flex justify-content-center align-items-center">
      <div className="text-center text-white">
        <p className="fs-1 fw-medium mb-1">
          Диск под надзором котиков!
        </p>
        <p className="fs-4">
          ฅ^•ﻌ•^ฅ
        </p>
      </div>
    </div>
  );
};
