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
import CustomDatePicker from "@/components/CustomDatePicker/CustomDatePicker"
import Logo from "@/components/Logo/Logo"



  const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!, $endDate: String!, $logoUrl: String) {
    createProject(name: $name, endDate: $endDate, logoUrl: $logoUrl) {
      id
      name
      endDate
      logoUrl
    }
  }
      
   `

const ProjectPage=()=>{
   
   const router = useRouter()
  const [createProject,{data,loading,error,reset}] = useMutation<CreateProjectData>(CREATE_PROJECT)

  useEffect(()=>{
    if(!error && data && data.createProject){
         reset()
         router.back()
    }
  },[data,error,reset])


    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        endDate: Yup.string().required("End date is required"),
    })

    
    return (
     
            <div className="w-full min-h-screen flex flex-col justify-start items-center bg-white py-14">
            <Formik
            onSubmit={(values,options)=>{
              console.log(values)
              createProject({
                variables:{
                    name:values.name,
                    endDate:values.endDate,
                    logoUrl:values.logoUrl
                }
              })
              options.resetForm()
            }}

            validationSchema={validationSchema}

           initialValues={{
             name:"",
             endDate:"",
             logoUrl:""
           }}
        >
          {({handleChange,handleSubmit,values,touched,errors,setFieldValue})=>(
        
            <div className="w-[60%] h-full">
                <CustomToast
                    isError={!!error}
                    isSuccess={!!data?.createProject}
                    message={error ? "Something has gone wrong" : "Project added successfully"}
                    show={!!(error || data)} // The !! converts the object/null to a strict boolean
                />
              <CustomTextInput
                placeholder="Name"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name && touched.name ? errors.name : ""}
               />
  
              <Spacer />

              <CustomDatePicker
                placeholder="End Date"
                value={values.endDate}
                onChange={(date:string)=> setFieldValue("endDate",date)}
              />

                <Spacer/>

              <UploadComponent
                onUpload={(url:string)=> setFieldValue("logoUrl",url)}

              />

                <Spacer/>

                
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

export default ProjectPage
