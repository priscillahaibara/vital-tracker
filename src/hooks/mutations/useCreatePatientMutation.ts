import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPatient } from "@/services/patients/createPatient";

export function useCreatePatientMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}
