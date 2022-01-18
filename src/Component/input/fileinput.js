export default FInput;
function FInput(props){
  const {type,onValueChange,name}=props;
  return(
    <>
    <input name={name} type={type}  onChange={onValueChange}></input>
    </>
  )
}