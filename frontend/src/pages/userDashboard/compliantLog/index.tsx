import { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { keyframes } from "@mui/system";

interface ComplaintFormData {
  regNumber: string;
  complaint: string;
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Complaint = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComplaintFormData>();

  const onSubmit: SubmitHandler<ComplaintFormData> = async () => {
    setLoadingBtn(true);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        backgroundColor: "#f7f7f7",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        animation: `${fadeIn} 0.6s ease-out`,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" align="center" gutterBottom>
          Report a Complaint
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Registration Number"
            fullWidth
            variant="outlined"
            id="regNumber"
            placeholder="e.g., 2020CS999"
            error={!!errors.regNumber}
            helperText={errors.regNumber ? errors.regNumber.message : ""}
            {...register("regNumber", {
              required: "Registration Number is required",
              pattern: {
                value: /^[0-9]{4}[A-Za-z]{2}[0-9]{1,3}$/,
                message: "Invalid Registration Number format",
              },
            })}
            sx={{
              "@media (max-width: 600px)": {
                fontSize: "14px",
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            label="Complaint Details"
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            id="complaint"
            placeholder="Type your complaint here..."
            error={!!errors.complaint}
            helperText={errors.complaint ? errors.complaint.message : ""}
            {...register("complaint", {
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Complaint must be at least 10 characters long",
              },
            })}
            sx={{
              "@media (max-width: 600px)": {
                fontSize: "14px",
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          sx={{
            py: 2,
            "@media (max-width: 600px)": {
              fontSize: "16px",
              padding: "10px",
            },
          }}
          disabled={loadingBtn}
        >
          {loadingBtn ? "Submitting..." : "Submit Complaint"}
        </Button>
      </form>
    </Container>
  );
};

export default Complaint;
