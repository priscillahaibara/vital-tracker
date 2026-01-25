import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/services/patients/getPatients";

export function usePatientsQuery() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
}
