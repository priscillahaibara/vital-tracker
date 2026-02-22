import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/services/patients/getPatients";
import { Patient } from "@/types/patient";

export function usePatientsQuery() {
  return useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
}
