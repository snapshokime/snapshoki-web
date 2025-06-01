import {useReactModalStore} from './store'
import ReactBootstrapModal from './ReactBootstrapModal'

export default function ReactBootstrapModalRenderer() {
    const {
        isOpen,
        title,
        body,
        buttons,
        hide
    } = useReactModalStore()

    return (
        <ReactBootstrapModal
            isOpen={isOpen}
            onHide={hide}
            title={title}
            body={body}
            buttons={buttons}
        />
    )
}
