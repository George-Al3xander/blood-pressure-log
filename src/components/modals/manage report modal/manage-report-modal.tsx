import React from "react"
import EditIcon from "@mui/icons-material/Edit"
import ModalWrapper, { modalContainerStyle } from "../modal-wrapper"
import ManageLogForm from "../../log/manage-report-form"
import { ButtonProps, IconButton, Modal, Box } from "@mui/material"
import {
  CreateReportModalProps,
  CreateReportProps,
  LogReport,
  ManageReportProps,
  TOptAction,
  UpdateReportModalProps,
  UpdateReportProps,
} from "@/types/types"
import { useTranslations } from "next-intl"
import { Button } from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import { manageReport } from "../../../../lib/mongo/utils"
import { TReportData } from "../../../../lib/auth/zodSchemas"
import PostAddIcon from "@mui/icons-material/PostAdd"

const TriggerButton = ({
  reqType,
  ...props
}: { reqType: string } & ButtonProps) => {
  const t = useTranslations("table")

  return reqType == "PUT" ? (
    <IconButton aria-label="edit" {...props}>
      <EditIcon />
    </IconButton>
  ) : (
    <Button
      startIcon={<PostAddIcon />}
      size="large"
      variant="contained"
      color="warning"
      fullWidth
      {...props}
    >
      {t("btn_create.default")}
    </Button>
  )
}

export default function ManageReportModal(
  props: UpdateReportModalProps & { type: "PUT" | "POST" }
): JSX.Element
export default function ManageReportModal(
  props: CreateReportModalProps & { type: "PUT" | "POST" }
): JSX.Element

export default function ManageReportModal({
  defaultValue,
  type,
  onOptimistic: withoutCallback,
}: (UpdateReportModalProps | CreateReportModalProps) & {
  type: "PUT" | "POST"
}) {
  const manageFunc = (data: LogReport | TReportData) => manageReport(type, data)
  // return (
  //   <ModalWrapper trigger={<TriggerButton type={type} />}>
  //     <ManageLogForm
  //       defaultValue={defaultValue}
  //       onValidationSuccess={manageFunc}
  //       onOptimistic={onOptimistic}
  //       type={type}
  //     />
  //   </ModalWrapper>
  // )
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onOptimistic = (args: TOptAction) => withoutCallback(args, handleClose)
  return (
    <div>
      <TriggerButton onClick={handleOpen} reqType={type} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="log-manage-modal-title"
        aria-describedby="log-manage-modal-description"
      >
        <Box sx={modalContainerStyle}>
          <ManageLogForm
            defaultValue={defaultValue}
            onValidationSuccess={manageFunc}
            onOptimistic={onOptimistic}
            type={type}
          />
        </Box>
      </Modal>
    </div>
  )
}
