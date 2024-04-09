import { localeProvider } from "../../../../../lib/tests/utils"
import ManageReportModal from "../manage-report-modal"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import realData from "../../../../../public/json/realData.json"
import { TReportData } from "../../../../../lib/auth/zodSchemas"
import { LogReport } from "@/types/types"
import { server } from "@/mocks/server"
import { HttpResponse, http } from "msw"
const dummyRep = {
  ...realData.reports[0],
  _id: "ZOtSOdMX9T",
  date: new Date(realData.reports[0].date),
} as LogReport

describe("Render", () => {
  describe("create", () => {
    beforeEach(() => {
      const onOpt = jest.fn()
      localeProvider({
        toRender: <ManageReportModal onOptimistic={onOpt} type="POST" />,
      })
    })
    it("should render the create modal btn", () => {
      const btn = screen.getByText("Add")
      expect(btn).toBeInTheDocument()
    })
  })
  describe("edit", () => {
    beforeEach(() => {
      const onErr = jest.fn()
      const onOpt = jest.fn()
      localeProvider({
        toRender: <ManageReportModal onOptimistic={onOpt} type="PUT" />,
      })
    })
    it("should render the edit modal btn", () => {
      const btn = screen.getByRole("button", {
        name: /edit/i,
      })
      expect(btn).toBeInTheDocument()
    })
  })
})

describe("Behavior", () => {
  let onErr: any
  let onOpt: any
  describe("create", () => {
    beforeEach(async () => {
      onErr = jest.fn()
      onOpt = jest.fn()
      localeProvider({
        toRender: <ManageReportModal onOptimistic={onOpt} type="POST" />,
      })
      const btn = screen.getByText("Add")
      await userEvent.click(btn)
    })
    //afterEach(() => jest.clearAllMocks())
    it("should open up the modal after click", async () => {
      const sysInput = screen.getByPlaceholderText("130")
      const diaInput = screen.getByPlaceholderText("80")
      const pulseInput = screen.getByPlaceholderText("75")
      const notesInput = screen.getByLabelText(/notes/i)
      const dateInput = screen.getByLabelText("Date")

      expect(sysInput).toBeInTheDocument()
      expect(diaInput).toBeInTheDocument()
      expect(pulseInput).toBeInTheDocument()
      expect(notesInput).toBeInTheDocument()
      expect(dateInput).toBeInTheDocument()
    })
    describe("validation success", () => {
      beforeEach(async () => {
        const sysInput = screen.getByPlaceholderText("130")
        const diaInput = screen.getByPlaceholderText("80")
        const pulseInput = screen.getByPlaceholderText("75")
        const notesInput = screen.getByLabelText(/notes/i)
        const dateInput = screen.getByLabelText("Date")
        await userEvent.type(sysInput, "125")
        await userEvent.type(diaInput, "70")
        await userEvent.type(pulseInput, "80")
        //await userEvent.type(dateInput, "5122021330")
        await userEvent.type(
          notesInput,
          "Damn basdasdasdsadasdasdsdasdasdasdsadasdasdasr"
        )
        const btn = screen.getByText("Create")
        await userEvent.click(btn)
      })
      it("should invoke validation success callback", async () => {
        await waitFor(async () => await expect(onOpt).toHaveBeenCalled())
      })
      it("should invoke with right args", async () => {
        // const dt = new Date()
        // dt.setFullYear(2021)
        // dt.setMonth(5)
        // dt.setDate(12)
        // dt.setHours(15)
        // dt.setMinutes(30)

        const expected: TReportData = {
          sys: 125,
          dia: 70,
          pulse: 80,
          notes: "Damn basdasdasdsadasdasdsdasdasdasdsadasdasdasr",
          rating: 3,
          date: new Date(),
        }
        await waitFor(
          async () =>
            await expect(onOpt).toHaveBeenCalledWith(
              expect.objectContaining({
                action: "POST",
                newReport: expect.objectContaining({
                  sys: 125,
                  dia: 70,
                  pulse: 80,
                  notes: "Damn basdasdasdsadasdasdsdasdasdasdsadasdasdasr",
                  rating: 3,
                }),
              })
            )
        )
      })
      it("should call put on opt", async () => {
        await waitFor(() => expect(onOpt).toHaveBeenCalledTimes(2))
      })
      it("should reset inputs", () => {
        const sysInput = screen.getByPlaceholderText("130")
        const diaInput = screen.getByPlaceholderText("80")
        const pulseInput = screen.getByPlaceholderText("75")
        const notesInput = screen.getByLabelText(/notes/i)

        expect(sysInput).toHaveValue(null)
        expect(pulseInput).toHaveValue(null)
        expect(diaInput).toHaveValue(null)
        expect(notesInput).toHaveValue("")
      })
      // it("should return ")
      // describe("server error", () => {
      //   //HEEEEEEEEEEEEEEEEEEEEEEERE
      // })
    })
  })
  describe("edit", () => {
    beforeEach(async () => {
      onErr = jest.fn()
      onOpt = jest.fn()
      localeProvider({
        toRender: (
          <ManageReportModal
            defaultValue={dummyRep}
            onOptimistic={onOpt}
            type="PUT"
          />
        ),
      })
      const btn = screen.getByRole("button", {
        name: /edit/i,
      })
      await userEvent.click(btn)
    })
    afterEach(() => jest.clearAllMocks())

    it("should open up the modal after click", () => {
      const sysInput = screen.getByDisplayValue("138")
      const diaInput = screen.getByDisplayValue("58")
      const pulseInput = screen.getByDisplayValue("67")
      expect(sysInput).toBeInTheDocument()
      expect(diaInput).toBeInTheDocument()
      expect(pulseInput).toBeInTheDocument()
    })
    it("should invoke with right args", async () => {
      const btn = screen.getByText("Create")
      await userEvent.click(btn)
      await waitFor(
        async () =>
          await expect(onOpt).toHaveBeenCalledWith({
            action: "PUT",
            newReport: dummyRep,
          })
      )
    })
  })
})
describe("Server error", () => {
  let onOpt: any
  beforeEach(async () => {
    server.use(
      http.post("/api/mongo/reports", () => {
        return HttpResponse.json({ msg: "Err" }, { status: 400 })
      })
    )
    onOpt = jest.fn()
    localeProvider({
      toRender: <ManageReportModal onOptimistic={onOpt} type="POST" />,
    })
    const btn = screen.getByText("Add")
    await userEvent.click(btn)
    const sysInput = screen.getByPlaceholderText("130")
    const diaInput = screen.getByPlaceholderText("80")
    const pulseInput = screen.getByPlaceholderText("75")
    const notesInput = screen.getByLabelText(/notes/i)
    const dateInput = screen.getByLabelText("Date")
    await userEvent.type(sysInput, "125")
    await userEvent.type(diaInput, "70")
    await userEvent.type(pulseInput, "80")
    //await userEvent.type(dateInput, "5122021330")
    await userEvent.type(
      notesInput,
      "Damn basdasdasdsadasdasdsdasdasdasdsadasdasdasr"
    )
    const btnCreate = screen.getByText("Create")
    await userEvent.click(btnCreate)
  })
  it("should return error action", async () => {
    await waitFor(
      () =>
        expect(onOpt).toHaveBeenCalledWith(
          expect.objectContaining({ action: "ERROR" })
        )
      //expect(onOpt).toHaveBeenCalledTimes(2)
    )
  })
})
