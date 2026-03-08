"use client"

import CustomButton from "@/components/CustomButton/CustomButton"
import CustomTextInput from "@/components/CustomTextInput/CustomTextInput"
import CustomToast from "@/components/CustomToast/CustomToast"
import Spacer from "@/components/Spacer/Spacer"
import UploadComponent from "@/components/UploadComponent/UploadComponent"
import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client/react"
import { Formik } from "formik"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import * as Yup from "yup"


const ADD_COUNTRY = gql`

    mutation CreateCountry(
     $name:String!,
     $callingCode:String!,
     $currencyName:String!,
     $currencyCode:String!,
     $flagUri:String!
     ){
        createCountry(
         name:$name,
         callingCode:$callingCode,
         currencyName:$currencyName,
         currencyCode:$currencyCode,
         flagUri:$flagUri
         ){
           id
        }
    }
   `

const Page=()=>{
   
   const router = useRouter()
  const [createCountry,{data,loading,error,reset}] = useMutation<CreateCountryData>(ADD_COUNTRY)

  useEffect(()=>{
    if(!error && data && data.createCountry){
         reset()
         router.back()
    }
  },[data,error,reset])


    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        callingCode: Yup.string().required("Calling code is required"),
        currencyName: Yup.string().required("Currency Name is required"),
        currencyCode: Yup.string().required("Currency code is required"),
        flagUri: Yup.string().required("Flag Uri is required"),
    })

    
    return (
     
            <div className="w-full min-h-screen flex flex-col justify-start items-center bg-white py-14">
            <Formik
            onSubmit={(values,options)=>{
              console.log(values)
              createCountry({
                variables:{
                    name:values.name,
                    callingCode:values.callingCode,
                    currencyCode:values.currencyCode,
                    currencyName:values.currencyName,
                    flagUri:values.flagUri
                }
              })
              options.resetForm()
            }}

            validationSchema={validationSchema}

           initialValues={{
             name:"",
             callingCode:"",
             currencyName:"",
             currencyCode:"",
             flagUri:"",
           }}
        >
          {({handleChange,handleSubmit,values,touched,errors,setFieldValue})=>(
        
            <div className="w-[60%] h-full">
                <CustomToast
                    isError={!!error}
                    isSuccess={!!data?.createCountry}
                    message={error ? "Something has gone wrong" : "Country added successfully"}
                    show={!!(error || data)} // The !! converts the object/null to a strict boolean
                />
              <CustomTextInput
                placeholder="Name"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name && touched.name ? errors.name : ""}
               />
  
              <Spacer />

              <CustomTextInput
                placeholder="Calling Code"
                value={values.callingCode}
                onChange={handleChange("callingCode")}
                error={errors.callingCode && touched.callingCode ? errors.callingCode : ""}
               />

                <Spacer />

                <CustomTextInput
                placeholder="Currency Name"
                value={values.currencyName}
                onChange={handleChange("currencyName")}
                error={errors.currencyName && touched.currencyName ? errors.currencyName : ""}
                />

                <Spacer />

                <CustomTextInput
                placeholder="Currency Code"
                value={values.currencyCode}
                onChange={handleChange("currencyCode")}
                error={errors.currencyCode && touched.currencyCode ? errors.currencyCode : ""}
                />


                <Spacer/>

                <UploadComponent
                  title="Upload Flag"
                  onUpload={(uri)=> setFieldValue("flagUri",uri) }
                  uri={values.flagUri.length > 0 ? values.flagUri : undefined}
                 />

                <Spacer />
                
                <CustomButton
                  title="Submit"
                  onClick={()=> handleSubmit()}
                  loading={loading}
                />
                                            
            </div>
          )}
        </Formik>
         </div>
    )
}

export default Page
