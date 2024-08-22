import React from "react";
import SendIcon from '@mui/icons-material/Send';

const SendIconButton: React.FC = () => {
    return (
        <div style={{ cursor: 'pointer' }}>
            <SendIcon style={{ color: "#F8A801", width: "28px" }} />
        </div>
    );
};

export default SendIconButton;