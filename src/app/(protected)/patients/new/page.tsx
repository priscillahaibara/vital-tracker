"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePatientMutation } from "@/hooks/mutations/useCreatePatientMutation";
import {
  type Condition,
  CONDITION_OPTIONS,
  CreatePatientInput,
} from "@/types/patient";
import PageTitle from "@/components/ui/PageTitle";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Page() {
  const createPatientMutation = useCreatePatientMutation();
  const router = useRouter();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [conditions, setConditions] = useState<Condition[]>([]);

  const trimmedName = name.trim();
  const numericAge = Number(age);

  const isNameEmpty = !trimmedName;
  const isAgeInvalid =
    age.trim() === "" ||
    Number.isNaN(numericAge) ||
    !Number.isInteger(numericAge) ||
    numericAge < 0 ||
    numericAge > 130;

  const isInvalid = isNameEmpty || isAgeInvalid;

  const toggleCondition = (conditionId: Condition) => {
    setConditions((prev) => {
      if (prev.includes(conditionId)) {
        return prev.filter((c) => c !== conditionId);
      }
      return [...prev, conditionId];
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInvalid || createPatientMutation.isPending) return;

    const patient: CreatePatientInput = {
      name: trimmedName,
      age: numericAge,
      condition: conditions.length ? conditions : null,
    };

    createPatientMutation.mutate(patient, {
      onSuccess: (patient) => {
        setName("");
        setAge("");
        setConditions([]);
        router.push(`/patients/${patient.id}`);
      },
      onError: (error) => {
        console.error("Supabase error: ", error);
      },
    });
  };

  return (
    <div>
      <PageTitle>New Patient</PageTitle>
      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
        <div className="grid grid-cols-[100px_1fr] items-center gap-2">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            type="text"
            placeholder="Gregory House"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-[100px_1fr] items-center gap-2">
          <label htmlFor="age">Age</label>
          <Input
            id="age"
            type="number"
            placeholder="55"
            value={age}
            min={0}
            max={130}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <p className="mb-2">Conditions:</p>
          {CONDITION_OPTIONS.map((condition) => (
            <label
              key={condition.id}
              className="flex items-center gap-2 py-0.5"
            >
              <input
                type="checkbox"
                checked={conditions.includes(condition.id)}
                onChange={() => toggleCondition(condition.id)}
                className="h-4 w-4 cursor-pointer rounded-md border-neutral-400"
              />
              <span>{condition.label}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isInvalid || createPatientMutation.isPending}
            loading={createPatientMutation.isPending}
          >
            Create Patient
          </Button>
        </div>
        {createPatientMutation.isError && (
          <p className="text-sm text-red-500"></p>
        )}
      </form>
    </div>
  );
}
