import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"
import { defaultLocale, locales } from "@/middleware"
import { render } from "@testing-library/react"

export const localeProvider = ({
  locale = defaultLocale,
  toRender,
}: {
  locale?: (typeof locales)[number]
  toRender: ReactNode
}) => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter")
  const messages = require(`../../messages/${locale}.json`)
  useRouter.mockImplementationOnce(() => ({
    query: { locale: locale },
  }))

  render(
    <NextIntlClientProvider messages={messages} locale={locale}>
      {toRender}
    </NextIntlClientProvider>
  )
}
