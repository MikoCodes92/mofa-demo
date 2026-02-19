// src/core/mockData.ts

export type Volunteer = {
  volunteer_id: string;
  full_name: string;
};

export type RoleAssignment = {
  assignment_id: string;
  role_name: string;
  volunteer_id?: string;
  status: "Open" | "Confirmed";
};

export type Event = {
  event_id: string;
  title: string;
  date: string;
  roles: RoleAssignment[];
};

export const volunteers: Volunteer[] = [
  { volunteer_id: "v1", full_name: "Ahmed Ali" },
];

export const events: Event[] = [
  {
    event_id: "e1",
    title: "State Visit – Protocol Cadets",
    date: "2026-03-01",
    roles: [
      { assignment_id: "r1", role_name: "Gate Cadet", status: "Open" },
      { assignment_id: "r2", role_name: "VIP Escort", status: "Open" },
    ],
  },
];
