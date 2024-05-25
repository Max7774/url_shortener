import Button from "@UI/Button/Button";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";

type CampaignsType = {
  uuid: string;
  fileName: string;
};

const Campaigns: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const [campaigns, setCampaigns] = useState<CampaignsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getAllCampaigns = async () => {
    const response = await axios<CampaignsType[]>(
      `${process.env.REACT_APP_SERVER_URL}/get-campaigns`
    );

    setCampaigns(response.data);
  };

  useEffect(() => {
    getAllCampaigns();
  }, [isLoading]);

  // Получаем текущие элементы для отображения на странице
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);

  // Вычисляем количество страниц
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(campaigns.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 m-10">
        {currentItems.map((item) => (
          <div className="justify-self-center">
            <a
              href={`${process.env.REACT_APP_SERVER_URL}/get-file/${item.uuid}`}
              download
            >
              <Button variant="orange">{item.fileName}</Button>
            </a>
          </div>
        ))}
      </div>
      <div className="pt-10 border-t-2 border-gray flex justify-center flex-wrap items-center gap-10 px-20">
        {pageNumbers.map((number) => (
          <Button
            variant={currentPage === number ? "gray" : "orange"}
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
