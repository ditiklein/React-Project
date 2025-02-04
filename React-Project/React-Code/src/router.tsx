import { createBrowserRouter } from 'react-router'
import AppLayot from './comopnents/appLayot'
import Update from './comopnents/Update'
import Home from './comopnents/Home'
import RecipesList from './comopnents/recipes/recipesList'
import ShowRecipe from './comopnents/recipes/ShowRecipe'

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayot></AppLayot>,
    children: [
      { path: 'update', element: <Update></Update> },
      { path: "recipes", element: <RecipesList />,
        children:[{path:":id",element:<ShowRecipe></ShowRecipe>}]
       },
      { path: "home", element: <Home/> },
      { index:true, element: <Home/> },

    ]
  }
])