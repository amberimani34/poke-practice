import { useState, useEffect } from 'react';

function Form ({ newPokemon }) {
    // the way that I'm setting this up can be used with any controlled form
    // you always use formData and setFormData and the properties are you form fields

    const [formData, setFormData] = useState({
        searchterm: '',
    })

    let baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
    let initialUrl = baseUrl + 'eevee';

    useEffect(() => {getOnePokemon(initialUrl)}, [])

    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value});
    }

    // this is only to demonstrate how controlled forms work
    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(`in submit and formula is: `, formData.searchterm)
        let url = baseUrl + formData.searchterm;
        getOnePokemon(url);
        newPokemon({})
        setFormData({searchterm: ''})
    }

    const getOnePokemon = async(url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            newPokemon(data);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <input type='text' name='searchterm' value={formData.searchterm} onChange={handleChange}/>
                <input type="submit" value='find Pokemon' />
            </form>
            <p>type in Pokemon name or id to search</p>
        </div>
    )
}

export default Form;