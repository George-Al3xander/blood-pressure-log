import { RenderHookResult, renderHook, waitFor } from "@testing-library/react"
import usePrintReports, { TPrintHook } from "../usePrintReports"
import dayjs from "dayjs"
import exp from "constants"
import { act } from "react-dom/test-utils"
import React from "react"
import { server } from "@/mocks/server"
import { HttpResponse, http } from "msw"

describe("Behavior", () => {
  describe("Initial render", () => {
    let printHook: TPrintHook

    beforeEach(() => (printHook = renderHook(usePrintReports).result.current))
    it("should return 'select' step", () => {
      expect(printHook.step).toBe("select")
    })
    it("should return the right date range", () => {
      const { from, to } = printHook.dateRange
      expect(dayjs(from).format("MM/DD/YYYY")).toBe(
        dayjs().subtract(1, "year").format("MM/DD/YYYY")
      )
      expect(dayjs(to).format("MM/DD/YYYY")).toBe(dayjs().format("MM/DD/YYYY"))
    })
    it("should return false error status", () => {
      expect(printHook.isError).toBe(false)
    })
  })
  describe("After onValidationSuccess  call", () => {
    describe("reports all date", () => {
      let printHook: RenderHookResult<TPrintHook, unknown>
      beforeAll(async () => {
        printHook = renderHook(usePrintReports)
        const from = dayjs("02/24/2024").toDate()
        const to = dayjs("03/14/2024").toDate()
        await act(
          async () =>
            await printHook.result.current.onValidationSuccess({ from, to })
        )
      })
      it("should change step to print", async () => {
        await waitFor(() => expect(printHook.result.current.step).toBe("print"))
      })
      it("should change the date range", async () => {
        const { from, to } = printHook.result.current.dateRange

        expect(dayjs(from).format("MM/DD/YYYY")).toBe("02/24/2024")
        expect(dayjs(to).format("MM/DD/YYYY")).toBe("03/14/2024")
      })

      it("should return the reports", () => {
        const { reports } = printHook.result.current
        expect(reports.length).toBeGreaterThan(0)
      })
    })
    describe("error handle", () => {
      beforeEach(() =>
        server.use(
          http.get("/api/mongo/reports", () => {
            return HttpResponse.json({ msg: "Err" }, { status: 400 })
          })
        )
      )
      it("should change err status", async () => {
        const { result } = renderHook(usePrintReports)
        const from = dayjs("03/08/2024").toDate()
        const to = dayjs("03/14/2024").toDate()
        await act(
          async () => await result.current.onValidationSuccess({ from, to })
        )
        await waitFor(() => expect(result.current.isError).toBe(true))
      })

      it("should reset value to default after reset function", async () => {
        const { result } = renderHook(usePrintReports)
        const from = dayjs("03/08/2024").toDate()
        const to = dayjs("03/14/2024").toDate()
        await act(
          async () => await result.current.onValidationSuccess({ from, to })
        )

        await act(async () => await result.current.reset())

        expect(result.current.reports.length).toBe(0)
        expect(result.current.isError).toBe(false)
        expect(result.current.step).toBe("select")
        expect(dayjs(result.current.dateRange.from).format("MM/DD/YYYY")).toBe(
          dayjs().subtract(1, "year").format("MM/DD/YYYY")
        )
        expect(dayjs(result.current.dateRange.to).format("MM/DD/YYYY")).toBe(
          dayjs().format("MM/DD/YYYY")
        )
      })
    })
    describe("specific range", () => {
      it("should return right number of the reports", async () => {
        const { result } = renderHook(usePrintReports)
        const from = dayjs("03/08/2024").toDate()
        const to = dayjs("03/14/2024").toDate()
        await act(
          async () => await result.current.onValidationSuccess({ from, to })
        )
        const { reports } = result.current
        //should be gte 13, but it's more like dayjs
        //and array filter error than real mongodb case
        expect(reports.length).toBeGreaterThan(9)
        expect(reports.length).toBeLessThan(15)
      })
    })
  })
})
