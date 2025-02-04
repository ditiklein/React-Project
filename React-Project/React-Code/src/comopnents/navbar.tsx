import { Link } from "react-router-dom"

export default ()=>{
    return (
        <div>
          <Link to="home" style={{ margin: "5px", fontSize: "25px" }}>
            Home
          </Link>
          <Link to="recipes" style={{ margin: "5px", fontSize: "25px" }}>
            Recipes
          </Link>
        </div>
      );
    

}