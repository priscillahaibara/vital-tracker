"use client";

import { useParams } from "next/navigation";
import PageTitle from "@/components/ui/PageTitle";
import { usePatientQuery } from "@/hooks/queries/patients/usePatientQuery";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import RiskBadge from "@/components/ui/RiskBadge";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const { data: patient, isLoading, isError } = usePatientQuery(id);

  if (isLoading) {
    return (
      <div>
        <PageTitle>Patient Details</PageTitle>
        <section className="mb-3 min-h-44 max-w-md rounded-lg border p-4 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">General Data</h2>
          <LoadingSkeleton rows={4} height="h-4" />
        </section>

        <section className="mb-3 max-w-md rounded-lg border p-4 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">Vital Signs</h2>
        </section>
      </div>
    );
  }

  if (isError || !patient) {
    return (
      <div>
        <PageTitle>Patient Details</PageTitle>
        <section className="mb-3 min-h-44 max-w-md rounded-lg border p-4 shadow-sm">
          <h2 className="mb-2 text-xl font-semibold">General Data</h2>
          <p>Failed to load patient data.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Vital Signs</h2>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageTitle>Patient Details</PageTitle>
      <section className="mb-3 min-h-44 max-w-md rounded-lg border p-4 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold">General Data</h2>
        <p>Name: {patient?.name}</p>
        <p>Age: {patient?.age}</p>
        <p>Condition: {patient?.condition ?? "-"}</p>
        <p>
          Risk level: <RiskBadge level={patient.risk_level} />
        </p>
      </section>
      <section className="mb-3 max-w-md rounded-lg border p-4 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold">Vital Signs</h2>
      </section>
    </div>
  );
}
