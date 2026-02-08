import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "@/services/patients/getPatientById";

export function usePatientQuery(id: string) {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatientById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}
