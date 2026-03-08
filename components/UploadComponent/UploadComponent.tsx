"use client"

import { AiOutlineCamera } from "react-icons/ai"
import {CldUploadWidget } from "next-cloudinary"



type Props = {
  className?: string
  title?: string
  onUpload: (uri: string) => void
  uri?: string
}

const UploadComponent = ({
  className,
  title = " Upload",
  uri,
  onUpload,
}: Props) => {
  




  return (
    <CldUploadWidget
      uploadPreset="pbwhmlbn"
      onSuccess={(result:any)=>{
        onUpload(result?.info.secure_url)
      }}
      >
      {({open})=>(
          <div
          className={`w-full h-fit flex items-center justify-start ${className}`}
          onClick={()=> open()}
        >
          {/* upload circle */}
          <div className="w-[80px] h-[80px] rounded-full bg-gray-100 flex items-center justify-center">
            {uri && uri.length > 0 ? (
              <div className=" w-full h-full  overflow-hidden max-w-[80px] max-h-[80px] rounded-full">
                <img
                  alt="uploaded img"
                  src={uri}
                  className="w-[80px] h-[80px]"
                />
              </div>
            ) : (
              <AiOutlineCamera size={40} className="text-gray-200" />
            )}
          </div>
          {/* text */}
          <div className="ml-2">
            <div className="text-gray-800 text-[16px] font-bold">
              {title}
            </div>
            <div className="text-gray-400 text-[12px] font-semibold">
              Square / circular logos work best. Minimum 256px x 256px
            </div>
          </div>
  </div>
      )}
    </CldUploadWidget>
  )
}

export default UploadComponent
