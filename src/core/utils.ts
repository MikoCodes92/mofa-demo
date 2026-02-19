import create from "zustand";
import { events, Volunteer, Event } from "./mockData";

interface Store {
  events: Event[];
  assignRole: (roleId: string, volunteerId: string) => void;
  currentVolunteer: Volunteer;
}

export const useStore = create<Store>((set) => ({
  events,
  currentVolunteer: events[0]?.roles[0]?.volunteer_id
    ? null
    : {
        volunteer_id: "vol1",
        full_name: "Alice Protocol",
        email: "alice@mofa.gov",
        rank: "Cadet",
        office_id: "office1",
      },
  assignRole: (roleId, volunteerId) =>
    set((state) => ({
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
