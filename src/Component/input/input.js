export default Input;
function Input(props){
  const {type,placeholder,onValueChange,value}=props;
  return(
    <>
    <input value={value} type={type} placeholder={placeholder} onChange={onValueChange}></input>
    </>
  )
}