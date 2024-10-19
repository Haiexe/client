import React, {useState, useEffect} from "react";
import { InputForm, Button } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import *  as actions from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector(state => state.auth)
  
  const [isRegister, setRegister] = useState(location.state?.flag)
  const [payload, setPayload] = useState({
    phone: '',
    password: '',
    name:''
  })
  const [invalidFields, setInvalidFields] = useState([])

  useEffect(()=>{
    setRegister(location.state?.flag)
  }, [location.state?.flag])

  useEffect(() => {
    isLoggedIn && navigate('/')
  },[isLoggedIn])

  const handleSubmit = async () => {
    let finalPayload = isRegister ? payload : {
      phone: payload.phone,
      password: payload.password
    }
    let invalids = validate(finalPayload)
    if(invalids ===0)
    // console.log(payload)
      isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));
    // console.log(response)
    // console.log(invalids)
    
  }
  const validate = (payload) =>{
    let invalids = 0
    let field = Object.entries(payload)
    field.forEach(item => {
      if(item[1] === '') {
        setInvalidFields(prev => [...prev,{
          name: item[0],
          message: 'Không được bỏ trống các trường'
        }])
        invalids++
      }
    })
    field.forEach(item =>  {
      switch (item[0]) {
        case "password":
          if(item[1].length<6){
            setInvalidFields(prev => [...prev,{
              name: item[0],
              message: 'Mật khẩu phải có ít nhất 6 kí tự'
            }])
            invalids++
          }
          break;
        case "phone":
          if(!+item[1]  ){
            setInvalidFields(prev => [...prev,{
              name: item[0],
              message: 'Số điện thoại sai định dạng'
            }])
            invalids++
          }
          break;
        default:
          break;
      }
    })
    return invalids;
  }

  return (
  <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">{isRegister ? 'Đăng kí tài khoản' : 'Đăng nhập'}</h3>
        <div className="w-full flex flex-col gap-3">
        {isRegister && <InputForm setInvalidFields = {setInvalidFields} invalidFields = {invalidFields} label={'Họ tên '} value={payload.name} setValue={setPayload}type={'name'}/>}
        <InputForm setInvalidFields = {setInvalidFields} invalidFields = {invalidFields} label={'Số diện thoại'} value={payload.phone} setValue={setPayload} type={'phone'}/>
        <InputForm setInvalidFields = {setInvalidFields} invalidFields = {invalidFields} label={'Mật khẩu'} value={payload.password} setValue={setPayload} type={'password'}/>
        <Button
        text={isRegister ? "Đăng kí" : "Đăng nhập"}
        bgColor='bg-secondary1'
        textColor='text-white'
        fullWidth
        onClick={handleSubmit}
      />
      </div>
      <div className="mt-7 flex items-center justify-between">
        {isRegister 
          ? <small>Bạn đã có tài khoản ? <span 
            className="text-blue-500 hover:underline cursor-pointer" 
            onClick={() => {
              setRegister(false)
              setPayload({
                phone: '',
                password: '',
                name:''
              })
            }} 
          >
            Đăng nhập ngay
          </span></small> :
        <>
          <small className="text-[blue] hover:text-[red] cursor-pointer">Quên mật khẩu</small>
          <small onClick={() => {
            setRegister(true) 
            setPayload({
              phone: '',
              password: '',
              name:''
            })
            }} className="text-[blue] hover:text-[red] cursor-pointer">Đăng kí</small>
        </>}
      </div>
      
  </div>
  )
};

export default Login;
