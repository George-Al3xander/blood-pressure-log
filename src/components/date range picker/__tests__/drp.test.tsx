import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import DateRangePicker from "../date-range-picker"


import dayjs from "dayjs"
import { localeProvider } from "../../../../lib/tests/utils"


describe("Render", () => {
  describe("en locale", () => {
    beforeEach(() =>
      localeProvider({ locale: "en", toRender: <DateRangePicker /> })
    )
    it("should render the component with the 'en' locale", () => {
      const btn = screen.getByText("Select")
      expect(btn).toBeInTheDocument()
    })

    it("should render the date picking inputs", () => {
      const fromInput = screen.getByLabelText("From")
      const toInput = screen.getByLabelText("To")

      expect(fromInput).toBeInTheDocument()
      expect(toInput).toBeInTheDocument()
    })

    it("shouldn't render the date picking inputs: wrong labels", () => {
      const fromInput = screen.queryByLabelText("FromFrom")
      const toInput = screen.queryByLabelText("ToYou")

      expect(fromInput).not.toBeInTheDocument()
      expect(toInput).not.toBeInTheDocument()
    })
  })

  it("should render the component with the 'uk' locale", () => {
    localeProvider({ locale: "uk", toRender: <DateRangePicker /> })

    const btn = screen.getByText("Обрати")
    expect(btn).toBeInTheDocument()
  })
})

describe("Behavior", () => {
  describe("input test", () => {
    beforeEach(() => {
      localeProvider({ toRender: <DateRangePicker /> })
    })
    it("should correspond to the user input: from", async () => {
      const fromInput = screen.getByLabelText("From")

      expect(fromInput).toBeInTheDocument()
      await userEvent.type(fromInput, "6122024")
      expect(fromInput).toHaveValue("06/12/2024")
    })

    it("should correspond to the user input: from, hardcode check", async () => {
      const fromInput = screen.getByLabelText("From")

      expect(fromInput).toBeInTheDocument()
      await userEvent.type(fromInput, "01222014")
      expect(fromInput).toHaveValue("01/22/2014")
    })

    it("should correspond to the user input: from", async () => {
      const fromInput = screen.getByLabelText("From")

      expect(fromInput).toBeInTheDocument()
      await userEvent.type(fromInput, "6122024")
      expect(fromInput).toHaveValue("06/12/2024")
    })

    it("should correspond to the user input: to, hardcode check", async () => {
      const toInput = screen.getByLabelText("To")

      expect(toInput).toBeInTheDocument()
      await userEvent.type(toInput, "01222014")
      expect(toInput).toHaveValue("01/22/2014")
    })
  })

  describe("zod validation test", () => {
    let fromInput: HTMLElement
    let toInput: HTMLElement
    let btn: HTMLElement
    const mockSuccess = jest.fn()
    beforeEach(() => {
      localeProvider({
        toRender: <DateRangePicker onValidationSuccess={mockSuccess} />,
      })
      fromInput = screen.getByLabelText("From")
      toInput = screen.getByLabelText("To")
      btn = screen.getByText("Select")
    })
    afterEach(async () => {
      await userEvent.clear(fromInput)
      await userEvent.clear(toInput)
      jest.clearAllMocks()
    })
    it("should call the onValidationSuccess callback", async () => {
      await userEvent.type(fromInput, "01222014")
      await userEvent.type(toInput, "6122024")
      await userEvent.click(btn)

      await waitFor(() => expect(mockSuccess).toHaveBeenCalled())
    })
    it("shouldn't call the onValidationSuccess callback", async () => {
      await userEvent.type(toInput, "01222014")
      await userEvent.type(fromInput, "6122024")
      await userEvent.click(btn)

      await waitFor(() => expect(mockSuccess).not.toHaveBeenCalled())
    })
    it("should display the right number of the error messages", async () => {
      await userEvent.type(toInput, "01222014")
      await userEvent.type(fromInput, "6122024")
      await userEvent.click(btn)

      const errs = screen.getAllByRole("alert")
      expect(errs.length).toBe(2)
    })

    it("should return right value from the onValidation success callback", async () => {
      await userEvent.type(fromInput, "01222014")
      await userEvent.type(toInput, "6122024")
      await userEvent.click(btn)
      const calls = mockSuccess.mock.calls[0][0]
      const { from, to } = calls
      expect(dayjs(from).format("MM/DD/YYYY")).toBe("01/22/2014")
      expect(dayjs(to).format("MM/DD/YYYY")).toBe("06/12/2024")
    })

    it("should return right value from the onValidation success callback: wrong input", async () => {
      await userEvent.type(fromInput, "12222016")
      await userEvent.type(toInput, "12122025")
      await userEvent.click(btn)
      const calls = mockSuccess.mock.calls[0][0]
      const { from, to } = calls
      expect(dayjs(from).format("MM/DD/YYYY")).not.toBe("01/22/2014")
      expect(dayjs(to).format("MM/DD/YYYY")).not.toBe("06/12/2024")
    })
  })
})
