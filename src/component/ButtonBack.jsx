import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";

export default function ButtonBack() {
    const navigate = useNavigate();
    return (
        <Button type={'back'} onClick={(e) => {
            e.preventDefault();
            navigate('/app')
        }
        }>&larr; Back</Button>
    );
}