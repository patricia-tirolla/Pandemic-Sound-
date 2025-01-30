import { ProfileContext } from "../../../contexts";
import {useEffect} from "react"


const AddPlaylist = ()=> {
    const profile = useContext(ProfileContext);
    const CreatePlaylist = () =>{}


    return(
        <div>
            <button onClick={CreatePlaylist()}>+</button>

        </div>

      
    )
}

export default AddPlaylist