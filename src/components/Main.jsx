import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromChefClaude } from "../ai"
export default function Main() {
   

    const [ingredients, setIngredients] = React.useState([])
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [recipe, setRecipe] = React.useState("")

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")

        if (newIngredient.trim() !== "") {
            setIngredients(prevIngredients => [
                ...prevIngredients,
                newIngredient
            ])
        }
    }

  const [loading, setLoading] = React.useState(false)

async function toggleRecipeShown() {
  setLoading(true)
  const recipeResult = await getRecipeFromChefClaude(ingredients)
  setRecipe(recipeResult)
  setRecipeShown(true)
  setLoading(false)
}

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                />
            )}

            {recipeShown && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}