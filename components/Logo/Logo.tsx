import logo from "../../assets/saitiyologo.png"

type Props = {}

const Logo = (props: Props) => {
  return (
      <div style={{ width: "50px", height: "50px", display:"flex",marginBottom: "1rem", justifyContent:"center",alignItems:"center"}}>
        <img src={logo.src} style={{objectFit:"contain", width:"100%",height:"100%"}}/>
    </div>
  )
}

export default Logo