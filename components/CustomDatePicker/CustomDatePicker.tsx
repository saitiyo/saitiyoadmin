import { DatePicker } from "antd"

type Props = {
  onChange: (date: string) => void
  placeholder: string
  value?: string; // Add this line
}

const CustomDatePicker = ({ onChange, placeholder }: Props) => {
  const dateFormat = "DD/MM/YYYY"
  return (
    <DatePicker
      style={{ width: "100%", height: "40px" }}
      format={dateFormat}
      placeholder={placeholder}
      onChange={(date) => {
        let _formatedDate = date ? date.format(dateFormat) : "mm/dd/yyyy"
        onChange(_formatedDate)
      }}
    />
  )
}

export default CustomDatePicker
