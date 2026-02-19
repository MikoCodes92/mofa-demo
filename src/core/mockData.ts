export interface Volunteer {
  volunteer_id: string;
  full_name: string;
  email: string;
  rank: string;
  office_id: string;
}

export interface Role {
  assignment_id: string;
  role_name: string;
  volunteer_id: string | null;
  status: "Pending" | "Confirmed" | "Completed";
}

export interface Event {
  event_id: string;
  title: string;
  date: string;
  location?: string;
  description?: string;
  type?: "Diplomatic" | "Community";
  volunteersNeeded?: number;
  spotsLeft?: number;
  roles: Role[];
}

export const events: Event[] = [
  {
    event_id: "1",
    title: "AU Summit Preparation",
    date: "2024-03-15",
    location: "African Union Headquarters",
    description:
      "Help prepare materials and coordinate logistics for the AU Summit",
    type: "Diplomatic",
    volunteersNeeded: 10,
    spotsLeft: 5,
    roles: [
      {
        assignment_id: "role1",
        role_name: "Registration Assistant",
        volunteer_id: null,
        status: "Pending",
      },
      {
        assignment_id: "role2",
        role_name: "Protocol Officer",
        volunteer_id: null,
        status: "Pending",
      },
    ],
  },
  // Add more events as needed
];
