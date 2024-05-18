import { usePostPrescriptionMutation } from "@/services/api/prescription";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ButtonAdd = () => {
  const navigate = useNavigate();
  const [mutate, { data, isSuccess, isLoading }] =
    usePostPrescriptionMutation();

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/order-add/" + data.data.id);
    }
  }, [isSuccess, data, navigate]);

  return (
    <Tooltip label="Buat Pesanan Baru">
      <ActionIcon loading={isLoading} onClick={() => mutate()}>
        <IconPlus />
      </ActionIcon>
    </Tooltip>
  );
};
