import React, { useState } from "react";
import ModelInventory from "../../snippets/Model_Inventory";
import ShowInventoryProductsList from "./ShowInventoryProductsList";
import {  NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FetchProducts } from "../../api/FetchProducts";
import { Icon } from '@iconify/react';
import HomepageCards from "../Card/HomepageCards";
import TableComponent from "../Tables/TableComponent";
const Inventory = () => {
    const [modelopen, setmodelopen] = useState(false);

    const openModel = () => {
        setmodelopen(true);
    }

    const closemodel = () => {
        setmodelopen(false);
    }
    const cardsData = [
        {
          icon: <Icon icon="iconamoon:category-light"  />,
          title: "14",
          subtitle: "Categories",
          percentage: "0.43%",
          trend: (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737V10.0849H4.35716V2.47737Z" />
            </svg>
          ),
        },
        {
          icon: <Icon icon="fluent-mdl2:product-variant" className="fill-primary" />,
          title: "868",
          subtitle: "Total Products",
          percentage: "1.23%",
          trend: (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737V10.0849H4.35716V2.47737Z" />
            </svg>
          ),
        },
        {
            icon: <Icon icon="la:sellsy" className="fill-primary" />,
            title: "5",
            subtitle: "Top Selling",
            percentage: "1.23%",
            trend: (
              <svg
                className="fill-meta-3"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737V10.0849H4.35716V2.47737Z" />
              </svg>
            ),
          },
          {
            icon: <Icon icon="icon-park-outline:chart-stock" className="fill-primary" />,
            title: "12",
            subtitle: "Low Stocks",
            percentage: "1.23%",
            trend: (
              <svg
                className="fill-meta-3"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737V10.0849H4.35716V2.47737Z" />
              </svg>
            ),
          },
      ];

    return (
        <>
         <FetchProducts>
         <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 py-3">
         {cardsData.map((card, index) => (
            <HomepageCards 
            key={index}
            icon={card.icon}
            title={card.title}
            subtitle={card.subtitle}
            percentage={card.percentage}
            trend={card.trend}
            />
        ))}
        </div>
            <div className="overall">
                <ShowInventoryProductsList openModel={openModel} />
            </div>
            <ModelInventory isOpen={modelopen} onClose={closemodel} />
            </FetchProducts>
        </>
    )
}

export default Inventory;
