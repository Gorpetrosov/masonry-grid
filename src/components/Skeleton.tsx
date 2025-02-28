import {memo} from "react";
import {FaImage} from "react-icons/fa";


const Skeleton = () => {
    return (
        <div
            className="skeleton"
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#e0e0e0",
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} >
            <FaImage size={40} color="#666" />
        </div>
    )
}

export default memo(Skeleton);