"use client"
import { Col, Divider, Row, Table, TableColumnsType } from "antd"
import CustomButton from "@/components/CustomButton/CustomButton"
import { useEffect, useState } from "react"
import Spacer from "@/components/Spacer/Spacer"
import { gql} from '@apollo/client';
import { useQuery} from '@apollo/client/react';
import Image from "next/image"
import { useRouter } from "next/navigation"



export const GET_COUNTRIES = gql`
 query Countries {
  countries {
    id
    name
    flagUri
    callingCode
    currencyName
    currencyCode
  }
}
`



const CountriesPage = () => {
  
  const {data} = useQuery<any>(GET_COUNTRIES);
  
  const router = useRouter()

  const [countries,setCountries] = useState<any>([])


  useEffect(()=>{
    if(data && data.countries){
       setCountries(data.countries)
    }
  },[data])



  const _columns:TableColumnsType<CountryType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Calling Code',
      dataIndex: 'callingCode',
      key: 'callingCode',
    },
    {
      title: 'Currency Name',
      dataIndex: 'currencyName',
      key: 'currencyName',
    },

    {
      title: 'Currency Code',
      dataIndex: 'currencyCode',
      key: 'currencyCode',
    },
    {
      title: 'Flag',
      key: 'flag',
      render:(data:any)=>(
        <div className="w-auth h-auto">
           <Image  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flag_of_Uganda.svg/500px-Flag_of_Uganda.svg.png" width={50} height={50} alt="flag" />
        </div>
      )
    },
  ]

  return (
    <div>
         <Row gutter={8}>
            <Col xs={0} sm={0} md={12} style={{display:"flex",alignItems:"center"}}>
             <div style={{fontSize:"40px",fontWeight:"bold",color:"black"}}>Countries</div>
            </Col>

            <Col xs={12} sm={12} md={6}  style={{display:"flex",alignItems:"center"}}>
              
            </Col>

            <Col xs={0} sm={0} md={6}  style={{display:"flex",alignItems:"center"}}>
                <CustomButton 
                   title='Add Country'
                   onClick={()=> router.push("/admin/dashboard/countries/add")}
                 />
            </Col>
        </Row>
        <Divider/>
         <Spacer height={20} />
          <Table
            columns={_columns}
            dataSource={countries}
            pagination={false}
           />
    
    </div>
  )
}

export default CountriesPage
