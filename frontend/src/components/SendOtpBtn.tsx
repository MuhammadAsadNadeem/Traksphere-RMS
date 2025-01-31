// MDLink.tsx

import { Button } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import toaster from "../utils/toaster";
import authThunk from "../store/thunks/authThunk";

type SendOtpBtnProps = {
  email: string;
};

const SendOtpBtn: React.FC<SendOtpBtnProps> = ({ email }) => {
  const [isSended, setIsSended] = useState(false);
  const dispatch = useAppDispatch();

  const onClick = async () => {
    try {
      if (email) {
        setIsSended(true);
        await dispatch(authThunk.sendOtp(email)).unwrap();
        setTimeout(() => {
          setIsSended(false);
        }, 5000);
      } else {
        toaster.info("Add email to get 6-digit code");
      }
    } catch (error) {
      toaster.error(error as string);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={isSended}
    >
      Send
    </Button>
  );
};

export default SendOtpBtn;
