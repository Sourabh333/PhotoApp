export default Button;
function Button(props){
const {value,clickHandler}=props;
return(
    <>
    <button class ="btn-primary" onClick={clickHandler}>{value}</button>
    </>
)
}