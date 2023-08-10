import { Link } from 'react-router-dom'

const CreateChat = (props) => {
    return ( 
        <Link to="/">
            <button className="create-chat" onClick={props.toggleSidebar}>+</button>
        </Link>
    );
}
 
export default CreateChat;