import React from 'react'
import HomepageCards from '../../Card/HomepageCards'
import TopSellingStock from '../../Tables/TopSellingStock'
import LowQuantityStock from '../../Tables/LowQuantityStock'
import ChartOne from '../../Charts/ChartOne'
import ChartTwo from '../../Charts/ChartTwo'
import ChartThree from '../../Charts/ChartThree'
import { Icon } from '@iconify/react';
export default function Index() {
    const cardsData = [
        {
          icon: <Icon icon="hugeicons:view"  />,
          title: "$3.456K",
          subtitle: "Total views",
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
          icon: <Icon icon="lineicons:cart" className="fill-primary" />,
          title: "$1.234K",
          subtitle: "Total Profit",
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
            icon: <Icon icon="system-uicons:bag" className="fill-primary" />,
            title: "$1.234K",
            subtitle: "Total Product",
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
            icon: <Icon icon="ci:users" className="fill-primary" />,
            title: "$1.234K",
            subtitle: "Total Users",
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
    <div className="mx-auto max-w-screen-2xl ">
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
            <div className="grid pt-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-4">
              <TopSellingStock/>
              <LowQuantityStock/>
            </div>
            <div className="grid pt-6 grid-cols-1">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4  py-3">
                <ChartTwo />
                <ChartThree />
              </div>
              <ChartOne />
            </div>
    </div>
  )
}
