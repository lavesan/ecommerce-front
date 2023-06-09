import { useQuery } from "@tanstack/react-query";
import { EnterpriseService } from "@/services/enterprise.service";

export const useFindEnterprisesQuery = () => {
  const enterpriseService = EnterpriseService.getInstance();

  return useQuery({
    queryKey: ["enterprises"],
    queryFn: () => enterpriseService.findAll(),
    refetchInterval: 5 * 60000,
  });
};
