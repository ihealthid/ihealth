import { useDonePrescriptionMutation } from "@/services/api/prescription";
import { Button } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface FinishButtonProps {
  id: number;
}
export const FinishButton = ({ id }: FinishButtonProps) => {
  const navigate = useNavigate();
  const [mutate] = useDonePrescriptionMutation();
  return (
    <Button
      leftSection={<IconCheck />}
      onClick={() => {
        mutate(id).then(() => {
          navigate("/order");
        });
      }}
    >
      Selesai
    </Button>
  );
};
