import ModalWrapper from "./ModalWrapper"
import React from "react"
/***
 * 
 * 
 * @description : The point of this component is to provided a HOC for other components when on using a modal
 * how and hide a modal
 * @params ComponentTriggingModal: A clickable element that will trigger the Modal on Click
 * @params ModalStructure: The structure that will be displayed as the focused Modal
 */

 interface IModalContext {
     toggle?: any
 }

 export const ModalContext = React.createContext<IModalContext>({
     toggle: undefined
 });

 const ModalProvider = ModalContext.Provider;

 const ModalControllerWrapper = (ComponentTriggingModal: React.FunctionComponent, ModalStructure: React.FunctionComponent) => {
    const [ModalIsOpen, setOpenState] = React.useState(false)
    
    const toggleModal = ( e ) => {
        e.preventDefault();
        setOpenState(!ModalIsOpen)
    }


    return (props) => (
        <>
            {ModalIsOpen && 
            <ModalProvider value={{toggle: toggleModal}}>
                <ModalWrapper onClick={toggleModal}>
                    <ModalStructure/>
                </ModalWrapper>
            </ModalProvider>
            }

            <ComponentTriggingModal {...props } onClick={toggleModal} />
        </>
    );
}

export default ModalControllerWrapper