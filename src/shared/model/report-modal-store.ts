import { TReport } from "@/shared/model/report";
import { create } from "zustand";

export type ReportModalActions = {
    setOpen: (open: boolean) => void;
    toggleOpen: () => void;
    openModal: () => void;
    closeModal: () => void;
    setReport: (r: TReport) => void;
    clearReport: () => void;
};

export type ReportModalState = {
    open: boolean;
    report: TReport | null;
    actions: ReportModalActions;
};

const reportModalStore = create<ReportModalState>((set) => ({
    open: false,
    report: null,
    actions: {
        setOpen: (open: boolean) => set({ open }),
        openModal: () => set({ open: true }),
        closeModal: () => set({ open: false }),
        toggleOpen: () => set(({ open }) => ({ open: !open })),
        setReport: (r: TReport) => set({ report: r }),
        clearReport: () => set({ report: null }),
    },
}));

export const useReportModalOpenStatus = () => reportModalStore((s) => s.open);
export const useModalReport = () => reportModalStore((s) => s.report);
export const useReportModalActions = () => reportModalStore((s) => s.actions);
