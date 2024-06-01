import { usePostDiagnoseMutation } from "@/services/api/diagnose";
import { Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

interface FinishButtonProps {
  disabled?: boolean;
}

export const FinishButton = ({ disabled }: FinishButtonProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id as string;

  const [mutate] = usePostDiagnoseMutation();

  return (
    <Button
      disabled={disabled}
      onClick={() => {
        mutate(id).then(() => {
          navigate("/doctor/appointment");
        });
      }}
    >
      Selesai
    </Button>
  );
};
