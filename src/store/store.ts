// src/store/store.ts
import { create } from "zustand";
import {
  volunteers as mockVolunteers,
  events as mockEvents,
} from "../core/mockData";
import type { Volunteer, Event } from "../core/mockData";

interface Store {
  events: Event[];
  currentVolunteer: Volunteer | null;
  assignRole: (roleId: string, volunteerId: string) => void;
}

export const useStore = create<Store>((set) => ({
  events: mockEvents,
  currentVolunteer: mockVolunteers[0] || null,

  assignRole: (roleId: string, volunteerId: string) =>
    set((state: Store) => ({
      events: state.events.map((ev) => ({
        ...ev,
        roles: ev.roles.map((r) =>
          r.assignment_id === roleId
            ? { ...r, volunteer_id: volunteerId, status: "Confirmed" }
            : r,
        ),
      })),
    })),
}));
