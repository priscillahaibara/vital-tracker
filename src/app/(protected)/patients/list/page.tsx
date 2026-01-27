"use client";

import { usePatientsQuery } from "@/hooks/queries/patients/usePatientsQuery";

export default function PatientsListPage() {
  const { data, isLoading, isError } = usePatientsQuery();

  if (isLoading) return <p>Loading patients...</p>;
  if (isError) return <p>Failed to load patients.</p>;

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Patients List</h2>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-center">Name</th>
            <th className="p-2 text-center">Age</th>
            <th className="p-2 text-center">Condition</th>
            <th className="p-2 text-center">Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((patient) => (
            <tr key={patient.id} className="border-b text-center">
              <td className="p-2">{patient.name}</td>
              <td className="p-2">{patient.age}</td>
              <td className="p-2">{patient.condition ?? "-"}</td>
              <td className="p-2">{patient.risk_level ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
