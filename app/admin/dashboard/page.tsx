'use client'
import DashboardCard from "@/components/DashboardCard/DashboardCard"
import { gql} from '@apollo/client';
import { useQuery} from '@apollo/client/react';
import { useState, useEffect } from "react"
// import { Business } from "@/types/types";



    const GET_DASHBOARD_STATS = gql`
      query DashboardStats {
        dashboardStats {
            totalBusinesses
            totalUsers
            totalPoducts
            totalSles
        }
        }
    `;

    interface Stats {
      totalBusinesses: number
      totalUsers: number
      totalPoducts: number
      totalSles: number
  }



const Page = () => {

    const { data,loading } = useQuery(GET_DASHBOARD_STATS);
    const [stats, setStats] = useState<Stats | undefined>();

    // useEffect(() => {
    //   if (data && data.dashboardStats) {
    //     setStats(data.dashboardStats);
    //   }
    // }, [data]);


    

    return (
     <div className="w-full min-h-screen bg-white p-5">
      <div className="flex justify-between">
        <DashboardCard title="Users" content={stats ? stats.totalUsers : 0}/>
        <DashboardCard title="Businesses" content={stats ? stats.totalBusinesses : 0}/>
        <DashboardCard title="Products" content={stats ? stats.totalPoducts:0}/>
        <DashboardCard title="Sales" content={stats ? stats.totalSles : 0}/>
      </div>
        </div>
    )
}

export default Page
