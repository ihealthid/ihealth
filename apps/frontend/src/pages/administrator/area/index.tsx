import { SimpleGrid } from "@mantine/core";
import { ProvinceSection } from "./components/ProvinceSection";
import { RegencySection } from "./components/RegencySection";
import { DistrictSection } from "./components/DistrictSection";
import { VillageSection } from "./components/VillageSection";

export const Component = () => {
  return (
    <SimpleGrid cols={2}>
      <ProvinceSection />
      <RegencySection />
      <DistrictSection />
      <VillageSection />
    </SimpleGrid>
  );
};
