"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePatientsQuery } from "@/hooks/queries/patients/usePatientsQuery";
import { ChevronRight, Search } from "lucide-react";
import RiskBadge from "@/components/ui/RiskBadge";
import PageTitle from "@/components/ui/PageTitle";
import { Input } from "@/components/ui/Input";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { Button } from "@/components/ui/Button";
import { CONDITION_LABELS } from "@/types/patient";

export default function Page() {
  const router = useRouter();
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
        <LoadingSkeleton rows={10} height="h-10" />
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

      <table className="mb-4 w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-center">Name</th>
            <th className="p-2 text-center">Age</th>
            <th className="p-2 text-center">Condition</th>
            <th className="p-2 text-center">Risk Level</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients && filteredPatients.length > 0 ? (
            filteredPatients?.map((patient) => (
              <tr
                key={patient.id}
                tabIndex={0}
                role="link"
                onClick={() => router.push(`/patients/${patient.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") router.push(`/patients/${patient.id}`);
                }}
                className="cursor-pointer border-b text-center transition-colors hover:bg-neutral-50 focus:bg-neutral-100 focus:outline-none"
              >
                <td className="p-2">{patient.name}</td>
                <td className="p-2">{patient.age}</td>
                <td className="p-2">{patient.condition?.length ? patient.condition.map(c => CONDITION_LABELS[c]).join(', ') : '-'}</td>
                <td className="p-2">
                  <RiskBadge level={patient.risk_level} />
                </td>
                <td className="p-2 text-right text-neutral-700">
                  <ChevronRight size={18} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-3">
                No patients match your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-end">
        <Button onClick={() => router.push("/patients/new")}>
          Add patient
        </Button>
      </div>
    </div>
  );
}
