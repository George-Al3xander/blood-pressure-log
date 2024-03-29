import { render, screen, waitFor } from "@testing-library/react"
import DateRangePicker from "../date-range-picker"
import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"
import { defaultLocale, locales } from "@/middleware"
import userEvent from "@testing-library/user-event"
import dayjs from "dayjs"
const localeProvider = ({
  locale = defaultLocale,
  toRender,
}: {
  locale?: (typeof locales)[number]
  toRender: ReactNode
}) => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter")
  const messages = require(`../../../../messages/${locale}.json`)
  useRouter.mockImplementationOnce(() => ({
    query: { locale: locale },
  }))

  render(
    <NextIntlClientProvider messages={messages} locale={locale}>
      {toRender}
    </NextIntlClientProvider>
  )
}

describe("Render", () => {
  it("should render the component with the 'en' locale", () => {
    localeProvider({ locale: "en", toRender: <DateRangePicker /> })

    const btn = screen.getByText("Print")
    expect(btn).toBeInTheDocument()
  })

  it("should render the component with the 'uk' locale", () => {
    localeProvider({ locale: "uk", toRender: <DateRangePicker /> })

    const btn = screen.getByText("Друк")
    expect(btn).toBeInTheDocument()
  })

  it("should render the date picking inputs", () => {
    localeProvider({ locale: "en", toRender: <DateRangePicker /> })
    const fromInput = screen.getByLabelText("From")
    const toInput = screen.getByLabelText("To")

    expect(fromInput).toBeInTheDocument()
    expect(toInput).toBeInTheDocument()
  })

  it("shouldn't render the date picking inputs: wrong labels", () => {
    localeProvider({ locale: "en", toRender: <DateRangePicker /> })
    const fromInput = screen.queryByLabelText("FromFrom")
    const toInput = screen.queryByLabelText("ToYou")

    expect(fromInput).not.toBeInTheDocument()
    expect(toInput).not.toBeInTheDocument()
  })
})

describe("Behavior", () => {
  describe("input test", () => {
    it("should correspond to the user input: from", async () => {
      localeProvider({ toRender: <DateRangePicker /> })
      const fromInput = screen.getByLabelText("From")

      expect(fromInput).toBeInTheDocument()
      await userEvent.type(fromInput, "6122024")
      expect(fromInput).toHaveValue("06/12/2024")
    })

    it("should correspond to the user input: from, hardcode check", async () => {
      localeProvider({ toRender: <DateRangePicker /> })
      const fromInput = screen.getByLabelText("From")

      expect(fromInput).toBeInTheDocument()
      await userEvent.type(fromInput, "01222014")
      expect(fromInput).toHaveValue("01/22/2014")
    })

    it("should correspond to the user input: from", async () => {
      localeProvider({ toRender: <DateRangePicker /> })
      const fromInput = screen.getByLabelText("From")

      expect(fromInput).toBeInTheDocument()
      await userEvent.type(fromInput, "6122024")
      expect(fromInput).toHaveValue("06/12/2024")
    })

    it("should correspond to the user input: to, hardcode check", async () => {
      localeProvider({ toRender: <DateRangePicker /> })
      const toInput = screen.getByLabelText("To")

      expect(toInput).toBeInTheDocument()
      await userEvent.type(toInput, "01222014")
      expect(toInput).toHaveValue("01/22/2014")
    })
  })
  describe("validation test", () => {
    it("should do validate the dates", async () => {
      const mockSuccess = jest.fn()
      localeProvider({ toRender: <DateRangePicker /> })
      const fromInput = screen.getByLabelText("From")
      const toInput = screen.getByLabelText("To")
      const btn = screen.getByText("Print")

      await userEvent.type(fromInput, "01222014")
      await userEvent.type(toInput, "6122024")
      await userEvent.click(btn)

       expect(mockSuccess).toHaveBeenCalled()
      
    })
  })
})
