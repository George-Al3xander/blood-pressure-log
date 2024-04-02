import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import PrintReports from "../print-reports"
import { localeProvider } from "../../../../lib/tests/utils"
import { server } from "@/mocks/server"
import { HttpResponse, http } from "msw"
it("Dummy happy path", () => {
  expect(12).toBe(12)
})

describe("Render", () => {
  beforeEach(() => localeProvider({ toRender: <PrintReports /> }))
  describe("should render the date range picker", () => {
    it("should render the select button", () => {
      const btn = screen.getByText("Select")
      expect(btn).toBeInTheDocument()
    })
    it("should render the dates inputs", () => {
      const fromInput = screen.getByLabelText("From")
      const toInput = screen.getByLabelText("To")

      expect(fromInput).toBeInTheDocument()
      expect(toInput).toBeInTheDocument()
    })
  })
})

describe("Behavior", () => {
  beforeEach(() => localeProvider({ toRender: <PrintReports /> }))

  describe("validation", () => {
    describe("fail", () => {
      it("should display error messages after wrong date range input", async () => {
        const fromInput = screen.getByLabelText("From")
        const toInput = screen.getByLabelText("To")
        const btn = screen.getByText("Select")
        await userEvent.type(toInput, "01222014")
        await userEvent.type(fromInput, "6122024")
        await userEvent.click(btn)

        const errs = screen.getAllByRole("alert")
        expect(errs.length).toBe(2)
      })
    })

    describe("success", () => {
      let fromInput: HTMLElement
      let toInput: HTMLElement
      let btn: HTMLElement
      beforeEach(async () => {
        fromInput = screen.getByLabelText("From")
        toInput = screen.getByLabelText("To")
        btn = screen.getByText("Select")
        await userEvent.type(fromInput, "01222014")
        await userEvent.type(toInput, "6122024")
        await userEvent.click(btn)
      })

      it("shouldn't render error messages", () => {
        const errs = screen.queryAllByRole("alert")
        expect(errs.length).toBe(0)
      })
      it("should render the print ready ui", () => {
        const printText = screen.getByText("Ready to print")
        expect(printText).toBeInTheDocument()
      })
    })
    describe("Fetch error", () => {
      beforeEach(async () => {
        server.use(
          http.get("/api/mongo/reports", () => {
            return HttpResponse.json({ msg: "Err" }, { status: 400 })
          })
        )
        const fromInput = screen.getByLabelText("From")
        const toInput = screen.getByLabelText("To")
        const btn = screen.getByText("Select")
        await userEvent.type(fromInput, "01222014")
        await userEvent.type(toInput, "6122024")
        await userEvent.click(btn)
      })
      it("should display the error window message", async () => {
        const text = screen.getByText("Error")
        const btn = screen.getByText("Try again")
        await waitFor(() => expect(text).toBeInTheDocument())
        await waitFor(() => expect(btn).toBeInTheDocument())
      })
      describe("should go back, after the reset button click", () => {
        beforeEach(async () => {
          const btn = screen.getByText("Try again")
          await userEvent.click(btn)
        })
        it("should remove error message window", async () => {
          const btn = screen.queryByText("Try again")
          const text = screen.queryByText("Error")

          await waitFor(() => expect(text).not.toBeInTheDocument())
          await waitFor(() => expect(btn).not.toBeInTheDocument())
        })
        it("should show date range select", () => {
          const btnSelect = screen.getByText("Select")
          expect(btnSelect).toBeInTheDocument()
        })
      })
    })
  })
})
