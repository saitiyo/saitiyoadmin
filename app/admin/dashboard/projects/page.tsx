"use client";
import React from 'react';
import { Col, Row, Table } from 'antd';
import {gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/CustomButton/CustomButton';
import { useEffect } from 'react';
import { renderToHTML } from 'next/dist/server/render';
import Image from 'next/image';


export const GET_PROJECTS = gql`
    query GetSites {
      getSites {
        name
        logoUrl
        status
        daysLeft
        progress
        notificationCount
        endDate
        _id
      }
}
`

const ProjectsPage = () => {

    const router = useRouter();
    
    const {data} = useQuery<any>(GET_PROJECTS);

    const [projects,setProjects] = React.useState<any>([])

      useEffect(()=>{
        if(data && data.getSites){
           setProjects(data.getSites)
        }
      },[data])

    // const dataSource = [
    //     {
    //       key: '1',
    //       name: 'Project 1',
    //       logoUrl: 'PRJ001',
    //       status: 'Active',
    //       daysLeft: 30,
    //     },
    //   ];

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'logoUrl',
        dataIndex: 'logoUrl',
        key: 'logoUrl',
        render:(data:any)=>(
          <div className="w-auth h-auto">
            <Image src={data} alt="logo" width={50} height={50} className=""/>
          </div>
        )
      },
      {
        title: 'status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Days Left',
        dataIndex: 'daysLeft',
        key: 'daysLeft',
      },
    ];



  return(
  <div>
    <Row gutter={8}>
            <Col xs={0} sm={0} md={12} style={{display:"flex",alignItems:"center"}}>
             <div style={{fontSize:"40px",fontWeight:"bold",color:"black"}}>Projects</div>
            </Col>

            <Col xs={12} sm={12} md={6}  style={{display:"flex",alignItems:"center"}}>
              
            </Col>
        </Row>
    <Table dataSource={projects} columns={columns} />
  </div>)
}

export default ProjectsPage;
