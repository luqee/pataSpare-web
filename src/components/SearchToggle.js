import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { SearchIcon } from "@/styles/header.module.css"

export const SearchToggle = ()=>{
    const toggleSearchBar = (event) =>{
        let searchBar = document.getElementById('searchBar')
        searchBar.style.display = searchBar.style.display == 'block'? 'none': 'block';
    }

    return <span className={SearchIcon}><FontAwesomeIcon icon={faSearch} onClick={toggleSearchBar}/></span>
}