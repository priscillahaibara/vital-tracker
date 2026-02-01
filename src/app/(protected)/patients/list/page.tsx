"use client";

import { usePatientsQuery } from "@/hooks/queries/patients/usePatientsQuery";
import RiskBadge from "@/components/ui/RiskBadge";
import PageTitle from "@/components/ui/PageTitle";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { data, isLoading, isError } = usePatientsQuery();

  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredPatients = data?.filter((patient) =>
    patient.name.toLowerCase().includes(normalizedSearch),
  );

  if (isLoading) {
    return (
      <div>
        <PageTitle>Patients List</PageTitle>
        <div className="animate-pulse space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-full rounded bg-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <PageTitle>Patients List</PageTitle>
        <p>Failed to load patients.</p>
      </div>
    );
  }

  if (data && data.length === 0) {
    return (
      <div>
        <PageTitle>Patients List</PageTitle>
        <p>No patients registered yet.</p>
      </div>
    );
  }

  return (
    <div>
      <PageTitle>Patients List</PageTitle>

      <div className="mb-6 flex">
        <Input
          type="text"
          placeholder="Search patient by name..."
          icon={<Search size={18} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
      </div>

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
          {filteredPatients?.map((patient) => (
            <tr key={patient.id} className="border-b text-center">
              <td className="p-2">{patient.name}</td>
              <td className="p-2">{patient.age}</td>
              <td className="p-2">{patient.condition ?? "-"}</td>
              <td className="p-2">
                <RiskBadge level={patient.risk_level} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
