import { useDonePrescriptionMutation } from "@/services/api/prescription";
import { Button } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FinishButton = ({ id }: { id: number }) => {
  const navigate = useNavigate();

  const [mutate, { isSuccess, isLoading }] = useDonePrescriptionMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/pharmacist/order");
    }
  }, [isSuccess, navigate]);

  return (
    <Button
      leftSection={<IconCheck />}
      loading={isLoading}
      onClick={() => mutate(id)}
    >
      Selesai
    </Button>
  );
};
