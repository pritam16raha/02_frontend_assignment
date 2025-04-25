import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Widget = {
  id: string;
  name: string;
  description?: string;
  data?: { name: string; value: number; color: string }[];
};

type WidgetStore = {
  widgets: Record<string, Widget[]>;
  addWidget: (category: string, widget: Widget) => void;
  removeWidget: (category: string, widgetId: string) => void;
  setWidgets: (category: string, widgets: Widget[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const useWidgetStore = create<WidgetStore>()(
  persist(
    (set) => ({
      widgets: {},

      addWidget: (category, widget) =>
        set((state) => ({
          widgets: {
            ...state.widgets,
            [category]: [...(state.widgets[category] || []), widget],
          },
        })),

      removeWidget: (category, widgetId) =>
        set((state) => ({
          widgets: {
            ...state.widgets,
            [category]:
              state.widgets[category]?.filter((w) => w.id !== widgetId) || [],
          },
        })),

      setWidgets: (category, widgets) =>
        set((state) => ({
          widgets: {
            ...state.widgets,
            [category]: widgets,
          },
        })),

      searchQuery: "",
      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: "dashboard-widgets",
    }
  )
);
