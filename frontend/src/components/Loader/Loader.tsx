import { FC } from "react";
import loadingImage from '../../img/loading.gif'; 

export const Loader: FC = () => {
  return (
    <div className="d-flex justify-content-center">
      <img 
        src={loadingImage} 
        alt="Загрузка..." 
        style={{ width: 30, height: 30 }}
      />
    </div>
  );
};