"use client";

import { useParams } from "next/navigation";
import PageTitle from "@/components/ui/PageTitle";
import { usePatientQuery } from "@/hooks/queries/patients/usePatientQuery";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const { data: patient, isLoading, isError } = usePatientQuery(id);

  return (
    <div>
      <PageTitle>Patient Details</PageTitle>
      <section className="mb-3">
        <h2 className="mb-2 text-xl font-semibold">General Data</h2>
        <p>Name: {patient?.name}</p>
        <p>Age: {patient?.age}</p>
        <p>Condition: {patient?.condition ?? "-"}</p>
        <p>Risk level: {patient?.risk_level ?? "-"}</p>
      </section>
      <section>
        <h2 className="mb-2 text-xl font-semibold">Vital Signs</h2>
      </section>
    </div>
  );
}
