import {useReactModalStore} from './store'
import type {JSX, ReactNode} from 'react'
import {CheckCircleFill, ExclamationCircleFill, ExclamationTriangleFill, InfoCircleFill,X} from 'react-bootstrap-icons'

const iconMap: Record<AlertType, JSX.Element> = {
    danger: <ExclamationCircleFill/>,
    success: <CheckCircleFill/>,
    warning: <ExclamationTriangleFill/>,
    info: <InfoCircleFill/>,
}

type AlertType = 'danger' | 'success' | 'warning' | 'info'

const defaultHeadings: Record<AlertType, string> = {
    danger: 'Something went wrong',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
}

const showAlertModal = (
    message: ReactNode,
    variant: AlertType,
    heading?: string
) => {
    const {build, show} = useReactModalStore.getState()

    const textColorMap: Record<AlertType, string> = {
        danger: 'text-danger',
        success: 'text-success',
        warning: 'text-warning',
        info: 'text-primary',
    }

    build({
        title: undefined,
        body: (
            <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-start gap-2">
                    <div className={`fs-4 mt-1 ${textColorMap[variant]}`}>
                        {iconMap[variant]}
                    </div>
                    <div>
                        <div className={`fw-semibold ${textColorMap[variant]}`}>
                            {heading}
                        </div>
                        <div className="text-muted small mt-1">
                            {message}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => useReactModalStore.getState().hide()}
                    className="border-0 bg-transparent p-0 ms-2 mt-1"
                    aria-label="Close"
                >
                    <X size={32} className="text-secondary" />
                </button>
            </div>

        ),
        buttons: [],
    })

    show()
}


// Dialog wrappers
export const showError = (message: ReactNode, heading = defaultHeadings.danger) =>
    showAlertModal(message, 'danger', heading)

export const showSuccess = (message: ReactNode, heading = defaultHeadings.success) =>
    showAlertModal(message, 'success', heading)

export const showWarning = (message: ReactNode, heading = defaultHeadings.warning) =>
    showAlertModal(message, 'warning', heading)

export const showInfo = (message: ReactNode, heading = defaultHeadings.info) =>
    showAlertModal(message, 'info', heading)
